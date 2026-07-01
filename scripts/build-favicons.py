"""Regenerate public/favicon.ico (multi-size) and public/favicon.svg from public/favicon.png."""
import base64
import io
import os
import struct

from PIL import Image

SRC = 'public/favicon.png'
ICO_PATH = 'public/favicon.ico'
SVG_PATH = 'public/favicon.svg'
ICO_SIZES = [16, 32, 48, 64, 128, 256]
SVG_EMBED = 64


def build_ico(src_img: Image.Image, sizes: list[int], out_path: str) -> None:
    """Manually assemble a multi-image PNG-encoded ICO."""
    png_bytes = []
    for s in sizes:
        buf = io.BytesIO()
        src_img.resize((s, s), Image.LANCZOS).save(buf, format='PNG', optimize=True)
        png_bytes.append(buf.getvalue())

    num = len(sizes)
    header = struct.pack('<HHH', 0, 1, num)
    entries = b''
    data = b''
    offset = 6 + num * 16
    for s, blob in zip(sizes, png_bytes):
        w = 0 if s >= 256 else s
        h = 0 if s >= 256 else s
        entries += struct.pack('<BBBBHHII', w, h, 0, 0, 1, 32, len(blob), offset)
        data += blob
        offset += len(blob)

    with open(out_path, 'wb') as f:
        f.write(header + entries + data)


def build_svg(src_img: Image.Image, size: int, out_path: str) -> None:
    """Wrap a compact PNG raster inside an SVG for /favicon.svg."""
    buf = io.BytesIO()
    src_img.resize((size, size), Image.LANCZOS).save(buf, format='PNG', optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode('ascii')
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}">'
        f'<image width="{size}" height="{size}" href="data:image/png;base64,{b64}"/>'
        f'</svg>\n'
    )
    with open(out_path, 'w') as f:
        f.write(svg)


def main() -> None:
    im = Image.open(SRC).convert('RGBA')
    print(f'source: {SRC} {im.size}')

    build_ico(im, ICO_SIZES, ICO_PATH)
    print(f'wrote {ICO_PATH} ({os.path.getsize(ICO_PATH)} bytes)')

    with open(ICO_PATH, 'rb') as f:
        head = f.read(6)
    reported = struct.unpack('<HHH', head)[2]
    print(f'ICO reports {reported} images inside (expected {len(ICO_SIZES)})')

    build_svg(im, SVG_EMBED, SVG_PATH)
    print(f'wrote {SVG_PATH} ({os.path.getsize(SVG_PATH)} bytes)')


if __name__ == '__main__':
    main()

