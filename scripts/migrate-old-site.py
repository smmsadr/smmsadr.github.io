#!/usr/bin/env python3
"""Migrate article content from mahdi.sadrn.com into src/content/writing."""

from __future__ import annotations

import re
import subprocess
import textwrap
from datetime import datetime
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString, Tag

BASE = "https://mahdi.sadrn.com"
ROOT = Path(__file__).resolve().parents[1]
WORK_DIR = ROOT / "src" / "content" / "writing"

STOCK_IMAGES = [
    "/assets/stock-1.jpg",
    "/assets/stock-2.jpg",
    "/assets/stock-3.jpg",
    "/assets/stock-4.jpg",
]

STOCK_ALTS = [
    "Iridescent ripples of a bright blue and pink liquid",
    "A bright pink sheet of paper used to wrap flowers curves in front of rich blue background",
    "Pearls of silky soft white cotton bubble up under vibrant lighting",
    "Soft pink and baby blue water ripples together in a subtle texture",
]

SPAM_DOMAINS = {
    "likefunny.org",
    "smart24.com.ua",
    "myastrolog.org",
    "aromat24.com.ua",
}

SPAM_TEXT = re.compile(r"[\u0400-\u04ff]+")

ARTICLES: dict[str, dict] = {
    "technological-singularity-consequences": {
        "path": "/index.php/computer-science/30-technological-singularity-consequeses",
        "tags": ["Computer Science", "AI", "Philosophy"],
        "publishDate": "2014-08-01 00:00:00",
    },
    "why-is-programming-important": {
        "path": "/index.php/computer-science/27-why-is-programming-important",
        "tags": ["Programming", "Computer Science", "Coursera"],
        "publishDate": "2014-07-11 00:00:00",
    },
    "could-a-computer-have-a-mind": {
        "path": "/index.php/computer-science/28-could-a-computer-have-a-mind",
        "tags": ["Computer Science", "Philosophy", "Coursera"],
        "publishDate": "2013-12-10 00:00:00",
    },
    "computer-architecture": {
        "path": "/index.php/computer-science/39-computer-architecture",
        "tags": ["Computer Science", "Architecture", "University of Malaya"],
        "publishDate": "2014-12-01 00:00:00",
    },
    "atomic-force-microscopy": {
        "path": "/index.php/physics/32-atomic-force-microscopy",
        "tags": ["Physics", "Condensed Matter", "Microscopy"],
        "publishDate": "2009-12-01 00:00:00",
    },
    "wkb-approximation": {
        "path": "/index.php/physics/37-wkb-approximation",
        "tags": ["Physics", "Quantum Mechanics"],
        "publishDate": "2009-12-01 00:00:00",
    },
    "ising-model-and-simulation": {
        "path": "/index.php/physics/26-ising-model-and-simulation",
        "tags": ["Physics", "Simulation", "Computational Physics"],
        "publishDate": "2008-12-01 00:00:00",
    },
    "heisenberg-model": {
        "path": "/index.php/physics/33-heisenberg-model",
        "tags": ["Physics", "Solid State", "Sharif University"],
        "publishDate": "2006-08-01 00:00:00",
    },
    "correspondence-principle": {
        "path": "/index.php/physics/31-correspondence-principle",
        "tags": ["Physics", "Philosophy of Science", "Sharif University"],
        "publishDate": "2004-12-01 00:00:00",
    },
    "semiconductor-production-with-czochralski-process": {
        "path": "/index.php/physics/34-semiconductor-production-with-czochralski-process",
        "tags": ["Physics", "Semiconductors", "Materials"],
        "publishDate": "2009-12-01 00:00:00",
    },
    "review-of-in-defense-of-science-and-rationality-by-karl-popper": {
        "path": "/index.php/15-uncategorised/reviews/36-review-of-in-defense-of-science-and-rationality-by-karl-popper",
        "tags": ["Philosophy of Science", "Reviews", "Karl Popper"],
        "publishDate": "2014-01-01 00:00:00",
    },
    "anselm-of-canterbury": {
        "path": "/index.php/15-uncategorised/reviews/35-anselm-of-canterbury",
        "tags": ["Philosophy", "Reviews", "Theology"],
        "publishDate": "2014-01-01 00:00:00",
    },
}


def fetch(path: str) -> str:
    url = BASE + path
    result = subprocess.run(
        ["curl", "-sL", "-A", "Mozilla/5.0", url],
        check=True,
        capture_output=True,
        text=True,
    )
    return result.stdout


def is_spam_link(href: str | None) -> bool:
    if not href:
        return True
    return any(domain in href for domain in SPAM_DOMAINS)


def clean_text(text: str) -> str:
    text = SPAM_TEXT.sub("", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def inline_to_md(node: Tag | NavigableString) -> str:
    if isinstance(node, NavigableString):
        return clean_text(str(node))

    if not isinstance(node, Tag):
        return ""

    name = node.name.lower()
    if name == "a":
        href = node.get("href", "")
        if is_spam_link(href):
            return inline_children(node)
        text = clean_text(node.get_text(" ", strip=True))
        if not text:
            return ""
        if href.startswith("/"):
            href = BASE + href
        href = href.replace("&amp;", "&")
        return f"[{text}]({href})"

    if name == "img":
        src = node.get("src", "")
        if "Cc-by" in src or "creativecommons" in src.lower():
            return ""
        alt = node.get("alt") or ""
        if not src:
            return ""
        if src.startswith("/"):
            src = BASE + src
        return f"![{alt}]({src})"

    if name in {"strong", "b"}:
        inner = inline_children(node)
        return f"**{inner}**" if inner else ""

    if name in {"em", "i"}:
        inner = inline_children(node)
        return f"*{inner}*" if inner else ""

    if name == "br":
        return "\n"

    if name == "sup":
        return f"^{inline_children(node)}^"

    if name == "sub":
        return f"~{inline_children(node)}~"

    return inline_children(node)


def inline_children(node: Tag) -> str:
    parts = [inline_to_md(child) for child in node.children]
    return clean_text("".join(parts))


def block_to_md(node: Tag, depth: int = 0) -> str:
    name = node.name.lower()

    if name in {"script", "style", "nav", "header", "footer"}:
        return ""

    if name in {"h1", "h2", "h3", "h4", "h5", "h6"}:
        text = clean_text(node.get_text(" ", strip=True))
        if not text:
            imgs = [inline_to_md(img) for img in node.find_all("img")]
            imgs = [img for img in imgs if img]
            return "\n\n".join(imgs) + ("\n\n" if imgs else "")
        level = min(int(name[1]), 4)
        return f"{'#' * level} {inline_children(node)}\n\n"

    if name == "p":
        text = inline_children(node)
        return f"{text}\n\n" if text else ""

    if name == "blockquote":
        text = inline_children(node)
        if not text:
            return ""
        return "\n".join(f"> {line}" for line in textwrap.wrap(text, width=90)) + "\n\n"

    if name == "ul":
        lines = []
        for li in node.find_all("li", recursive=False):
            item = inline_children(li)
            if item:
                lines.append(f"- {item}")
        return "\n".join(lines) + ("\n\n" if lines else "")

    if name == "ol":
        lines = []
        for index, li in enumerate(node.find_all("li", recursive=False), start=1):
            item = inline_children(li)
            if item:
                lines.append(f"{index}. {item}")
        return "\n".join(lines) + ("\n\n" if lines else "")

    if name == "pre":
        code = node.get_text("\n", strip=False).strip("\n")
        return f"```\n{code}\n```\n\n" if code else ""

    if name == "table":
        rows = []
        for tr in node.find_all("tr"):
            cells = [clean_text(td.get_text(" ", strip=True)) for td in tr.find_all(["td", "th"])]
            if any(cells):
                rows.append("| " + " | ".join(cells) + " |")
        if not rows:
            return ""
        header = rows[0]
        separator = "| " + " | ".join("---" for _ in rows[0].split("|")[1:-1]) + " |"
        body = rows[1:]
        return "\n".join([header, separator, *body]) + "\n\n"

    if name == "div":
        parts = []
        for child in node.children:
            if isinstance(child, Tag):
                part = block_to_md(child, depth + 1)
                if part:
                    parts.append(part)
        return "".join(parts)

    if name == "img":
        return inline_to_md(node) + "\n\n"

    parts = []
    for child in node.children:
        if isinstance(child, Tag):
            part = block_to_md(child, depth + 1)
            if part:
                parts.append(part)
    return "".join(parts)


def parse_article(html: str) -> tuple[str, str, str]:
    soup = BeautifulSoup(html, "html.parser")
    article = soup.select_one("article.uk-article")
    if not article:
        raise ValueError("Article block not found")

    title_el = article.select_one(".uk-article-title")
    title = clean_text(title_el.get_text(" ", strip=True)) if title_el else "Untitled"

    address_el = article.select_one("address")
    source_line = clean_text(address_el.get_text(" ", strip=True)) if address_el else ""

    content_root = article.select_one(".uk-article-content") or article
    for remove in content_root.select(".uk-article-title, .uk-article-meta, address"):
        remove.decompose()

    blocks: list[str] = []
    for child in content_root.children:
        if isinstance(child, Tag):
            block = block_to_md(child)
            if block.strip():
                blocks.append(block)

    body = "".join(blocks).strip()
    if source_line:
        body = f"*{source_line}*\n\n{body}" if body else f"*{source_line}*"

    return title, source_line, body


def first_sentence(text: str, limit: int = 180) -> str:
    plain = re.sub(r"\*+", "", text)
    plain = re.sub(r"\[[^\]]+\]\([^)]+\)", lambda m: m.group(0).split("]")[0][1:], plain)
    match = re.search(r"(.{20,}?)[.!?](\s|$)", plain)
    sentence = match.group(1).strip() + "." if match else plain.strip()
    if len(sentence) > limit:
        sentence = sentence[: limit - 1].rsplit(" ", 1)[0] + "…"
    return sentence


def yaml_quote(value: str) -> str:
    if "\n" in value or ":" in value or value.startswith('"'):
        escaped = value.replace('"', '\\"')
        return f'"{escaped}"'
    return value


def write_markdown(slug: str, meta: dict, title: str, body: str) -> None:
    idx = list(ARTICLES.keys()).index(slug)
    img = STOCK_IMAGES[idx % len(STOCK_IMAGES)]
    img_alt = STOCK_ALTS[idx % len(STOCK_ALTS)]
    description = first_sentence(body.replace("*", ""))

    tags_yaml = "\n".join(f"  - {tag}" for tag in meta["tags"])
    frontmatter = f"""---
title: {yaml_quote(title)}
publishDate: {meta['publishDate']}
img: {img}
img_alt: {yaml_quote(img_alt)}
description: |
  {description}
tags:
{tags_yaml}
---

"""

    path = WORK_DIR / f"{slug}.md"
    path.write_text(frontmatter + body + "\n", encoding="utf-8")
    print(f"Wrote {path.name} ({len(body)} chars)")


def main() -> None:
    WORK_DIR.mkdir(parents=True, exist_ok=True)
    for slug, meta in ARTICLES.items():
        html = fetch(meta["path"])
        title, _, body = parse_article(html)
        write_markdown(slug, meta, title, body)


if __name__ == "__main__":
    main()
