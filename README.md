# belasica

Code for the unofficial historical website of FK Belasica. Macedonian-language, non-commercial.

- **Content and photos live in Sanity**, not in this repo. This repo is code only — no photos, no secrets, no personal data.
- **Club facts** (exact name, founding year, stadium, league, colours) are pending verification. See `facts.md`. Nothing states them as fact until they are marked VERIFIED there.
- Agent rules: `CLAUDE.md`. Design tokens: `brand.md`. Live status: `src/_project-state/current-state.md`. Decisions: `Decisions.md`.

## Development

```
nvm use          # Node version from .nvmrc
npm install
npm run dev      # http://localhost:3000
npm run build
```

Hosted on Vercel. Every branch gets a preview deployment; `main` is production.
