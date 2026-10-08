# Portfolio

> My personal corner of the internet where I share thoughts and experiences in writing, not in short clips or fast feeds.

[Live Site](https://abijith.sh)

## Why This Exists

I chose a blog format because I value putting ideas into full sentences. In a world of reels, stories, and rapid scroll, writing lets me slow down and explore things more fully.

I built this site as a home for my thinking. It is where I collect:

- Reflections from my work and life
- Things I am learning
- Occasional technical posts

I am not on video or social media much. Writing helps me articulate things clearly, and this felt like the right format.

## What You Will Find Here

This site is lightly opinionated and intentionally simple. Some content will be polished; other posts may be drafts. All of it is here because it helped me think, and I hope it helps readers too.

## Running Locally

```bash
bun install
bun run dev
```

Visit `http://localhost:4321`

## Browser checks

`bun run verify` runs the existing quality checks. To run the browser regression
suite locally, install the browsers once, then run the tests:

```bash
bunx playwright install --with-deps chromium firefox webkit
bun run test:browser
```

The suite builds the site and starts its own preview server. CI runs it on pull
requests. It checks responsive layouts, enlarged text, keyboard navigation,
article overflow, client navigation, motion preferences, and touch feedback.

## CSS structure

`src/styles/tokens.css` and `base.css` are inlined by the layout for first paint.
`global.css` holds shared patterns, and `motion.css` holds animation and reduced
motion rules. Media cards and empty states own their scoped styles. Article pages
import `prose.css`. Use the shared `Container` for page widths and gutters, and
keep inline styles for per-instance values such as reveal delays and panel colors.

## DevContainer Support

This project includes a devcontainer configuration for consistent development environments. Works with both Docker and Podman.

**Using Docker:**

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Install VSCode [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. Open project in VSCode and click "Reopen in Container"

**Using Podman:**

1. Install [Podman](https://podman.io/getting-started/installation)
2. Configure VSCode to use Podman: `"dev.containers.dockerPath": "podman"`
3. Open project in VSCode and click "Reopen in Container"

## Inspiration

This site draws inspiration from a few projects whose creators I admire:

- [steipete.me](https://steipete.me) — a clear example of a personal blog focused on substance and openness
- [astro-erudite](https://astro-erudite.vercel.app/) template
- [merox-erudite](https://merox-erudite.vercel.app/) template

Their simplicity and thoughtfulness shaped how I approached mine.

## Technical Details

For development guidelines, project structure, and contribution info, see [AGENTS.md](AGENTS.md).

## Deployment

This site is deployed on Vercel and served from the custom domain `abijith.sh`.

## License

This project uses a dual licensing approach. See [LICENSE](LICENSE) for details.

- **Code**: MIT License - free to use, modify, and distribute
- **Blog Content**: CC BY 4.0 - share and adapt with attribution
