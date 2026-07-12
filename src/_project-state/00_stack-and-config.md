# 00_stack-and-config.md — Belasica (APPEND-ONLY)

> Log of stack and config decisions with **exact pinned versions** (`next@16.x.y`, never
> `latest` or `^`-only). Append dated entries; never rewrite past ones. This is what keeps
> the build reproducible. Rationale for the picks lives in the Plan and `Decisions.md`;
> this file is the version authority.

## 2026-07-12 — Kickoff: locked stack (versions pinned at 1.01/1.02 install)
- Framework: Next.js 16 (App Router) + React 19 + TypeScript — pin exact versions at `npm install` in 1.01
- Styling: Tailwind v4 + shadcn/ui + lucide-react — pin at 1.01
- Content & assets: Sanity (free tier) + next-sanity client — pin at 1.02
- Email: Resend SDK — pin at 1.07
- Analytics: @vercel/analytics — pin at 1.08
- Hosting: Vercel Pro, auto-deploy from `DinovLazar/belasica` `main`, preview per branch
- DNS/CDN: Cloudflare — configured at 2.07
- Rule for every future entry: exact version, date, one-line reason.
