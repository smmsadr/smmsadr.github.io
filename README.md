# Personal Website

Astro portfolio site based on the official `withastro/astro` portfolio example.

## Local Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Deploy to GitHub Pages

This repo includes `.github/workflows/deploy.yml`. To publish:

1. Create a GitHub repository.
2. Push this project to the repository's `main` branch.
3. In GitHub, open **Settings -> Pages**.
4. Set **Source** to **GitHub Actions**.
5. Push again, or run the **Deploy to GitHub Pages** workflow manually.

For your user site, name the repo `smmsadr.github.io`.

For a project site, set a repository variable named `BASE_PATH` to `/<repo-name>` and update the workflow build step to pass it:

```yaml
env:
  SITE: ${{ steps.pages.outputs.origin }}
  BASE_PATH: ${{ vars.BASE_PATH }}
```

## Customize

- Replace photos in `public/assets`.
- Edit homepage copy in `src/pages/index.astro`.
- Edit the about page in `src/pages/about.astro`.
- Replace starter posts in `src/content/writing`.
- Update social/contact links in `src/components/Nav.astro`, `src/components/Footer.astro`, and `src/components/ContactCTA.astro`.
