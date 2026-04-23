# Mathkin

> Math that clicks.

One AI tutor per grade, K through 10. Homework help. Test prep. Gentle drills. All in one app.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Package manager:** pnpm

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com). No environment variables required — the waitlist API URL is hardcoded.

## Status

**v0 skeleton** — landing page with waitlist form, `/try` route with hardcoded math problems (3 per grade, grades 1–10), and a `/api/waitlist` proxy route.
