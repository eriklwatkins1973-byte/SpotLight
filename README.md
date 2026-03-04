# Spotlight

AI-driven indie film discovery platform focused on cinematic DNA search.

## Contributing

Please review [CONTRIBUTING.md](CONTRIBUTING.md) for engineering standards, workflow, commit conventions, and handoff expectations.

## Docs Index

- Contributor guide: [CONTRIBUTING.md](CONTRIBUTING.md)
- Code of Conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- Security policy: [SECURITY.md](SECURITY.md)
- Changelog: [CHANGELOG.md](CHANGELOG.md)
- Supabase schema migration: [supabase/migrations/202603040001_spotlight_schema.sql](supabase/migrations/202603040001_spotlight_schema.sql)

## What this MVP includes

- Next.js 15 App Router foundation
- Cinematic DNA uploader flow (`/upload`)
- Industry scout dashboard search flow (`/scout`)
- API routes for:
  - Upload + multimodal analysis (`/api/upload`)
  - Scout filtering (`/api/scout/search`)
  - Stripe checkout bootstrap (`/api/checkout`)
- Integration stubs for Mux, Twelve Labs, Supabase, and Stripe

## Technical Stack

- Framework: Next.js 15+
- Video Infrastructure: Mux
- Video Intelligence: Twelve Labs (Marengo 2.6)
- Database/Auth: Supabase (PostgreSQL + RLS)
- Payments: Stripe

## Quick Start

1. Install dependencies:

	```bash
	npm install
	```

2. Create environment file:

	```bash
	cp .env.example .env.local
	```

3. Set required values in `.env.local`:

	- `MUX_TOKEN_ID`
	- `MUX_TOKEN_SECRET`
	- `TWELVE_LABS_API_KEY`
	- `TWELVELABS_DEFAULT_INDEX_ID`
	- `NEXT_PUBLIC_SUPABASE_URL`
	- `SUPABASE_SERVICE_ROLE_KEY`
	- `STRIPE_SECRET_KEY`

4. Start development server:

	```bash
	npm run dev
	```

5. Open `http://localhost:3000`

## Current behavior without credentials

The app intentionally degrades gracefully when keys are missing:

- Upload uses mock Mux IDs
- Twelve Labs analysis returns fallback cinematic metadata
- Scout search uses an in-memory fallback dataset
- Checkout returns a clear Stripe configuration error

The upload endpoint now initializes Mux direct-upload and returns `uploadUrl`, `uploadId`, and `twelveLabsIndexId` for client-side transfer orchestration.

This allows local development and UI iteration before provisioning services.

## Supabase schema

This repo includes a migration at `supabase/migrations/202603040001_spotlight_schema.sql` with:

- `profiles` (extends `auth.users`)
- `videos` (core film metadata and processing status)
- `cinematic_tags` (AI-extracted cinematic DNA tags)
- `subscriptions` (Stripe linkage)

It also enables RLS on `profiles` and `videos`, with policies for:

- public viewing of `ready` videos
- owner-only updates on videos

## Next steps

- Add authenticated uploads and role-based scout access via Supabase Auth + RLS
- Add Mux playback pages and SSAI ad policy configuration
- Replace fallback analysis parser with full Twelve Labs indexing workflow
- Wire Stripe webhooks for subscription lifecycle management