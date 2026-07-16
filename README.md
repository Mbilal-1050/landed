# Landed

AI resume & cover-letter builder with real ATS match scoring. Built with Next.js 14, Supabase (auth + database), Whop (payments), and Framer Motion.

## Stack
- **Next.js (App Router)** — frontend + API routes
- **Supabase** — real user accounts (email/password + Google OAuth) and Postgres database
- **Whop** — real subscription payments, using your existing Whop account
- **Tailwind CSS v4 + Framer Motion** — styling and animation

## Setup (step by step)

### 1. Install dependencies
```
npm install
```

### 2. Create a Supabase project
1. Go to [supabase.com](https://supabase.com) → New project.
2. Once it's ready, go to **Project Settings → API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` key (keep this secret — server only)
3. Go to **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, and run it. This creates the `profiles` and `resumes` tables with row-level security.
4. Go to **Authentication → Providers → Google**, enable it, and follow Supabase's guide to add your Google OAuth client ID/secret. Add `https://YOUR_DOMAIN/auth/callback` (and `http://localhost:3000/auth/callback` for local dev) as a redirect URL in both Supabase and your Google Cloud OAuth client.

### 3. Set up Whop for payments
1. In your Whop dashboard, create your Pro / Business plans (or however you want to price it).
2. Copy each plan's checkout link into `.env.local` (see below).
3. Go to **Whop Dashboard → Developer → Webhooks**, create a webhook pointing to `https://YOUR_DOMAIN/api/webhooks/whop`, subscribe to membership events, and copy the signing secret.
4. In `src/app/api/webhooks/whop/route.ts`, fill in `PLAN_MAP` with your real Whop plan IDs mapped to `"pro"` / `"business"`.

### 4. Environment variables
Copy the example file and fill in the real values:
```
cp .env.example .env.local
```

### 5. Run locally
```
npm run dev
```
Open http://localhost:3000

### 6. Deploy
Push this repo to GitHub, then import it into [Vercel](https://vercel.com/new). Add the same environment variables from `.env.local` in the Vercel project settings, then deploy. Update your Supabase redirect URL and Whop webhook URL to your live domain once deployed.

## Project structure
```
src/app/               # pages & routes (App Router)
  page.tsx              # landing page
  login/, signup/        # auth pages
  dashboard/              # protected dashboard
  api/webhooks/whop/       # payment webhook handler
  auth/callback/            # OAuth callback
src/components/          # UI components
src/lib/supabase/         # Supabase client helpers
supabase/schema.sql       # database schema to run in Supabase
```

## Notes
- Free/Pro/Business pricing and checkout links in `src/components/Pricing.tsx` are placeholders — replace with your real Whop plan prices and links.
- `middleware.ts` protects `/dashboard` — logged-out users are redirected to `/login`.
