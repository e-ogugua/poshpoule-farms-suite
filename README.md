# PoshPOULE Farms Monorepo

Apps:
- public-site/ (SvelteKit)
- dashboard/ (SvelteKit)
- partner-portal/ (SvelteKit)
- buyer-app/ (SvelteKit)
- shared-components/ (Svelte lib)

Backend: Supabase (Postgres, Auth, Storage, Realtime)
Hosting: Netlify (frontend), Supabase (DB)
Default currency: ₦ (Naira)

## Quick Start
1) Create a Supabase project.
2) Copy `.env.example` to `.env` in each app as needed, and set root `apps/poshpoule/.env` for server functions.
3) Run SQL migrations and seed in Supabase (see `supabase/sql/`):
   - 01_schema.sql
   - 02_rls.sql
   - 03_seed.sql
4) Install deps and run:
```
npm install
npm run dev --workspace apps/poshpoule/public-site
```

## Environment Variables (root .env)
```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NETLIFY_AUTH_TOKEN=
WHATSAPP_TOKEN=
WHATSAPP_PHONE_ID=
TWILIO_SID=
TWILIO_AUTH_TOKEN=
SMTP_URL_OR_RESEND_KEY=
DEFAULT_CURRENCY=NGN
```

## Notifications
- WhatsApp Cloud: uses `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID`.
- Twilio SMS fallback: `TWILIO_SID`, `TWILIO_AUTH_TOKEN`. If keys missing, stubs log to console.

## PDF Generation
- Uses `pdf-lib` server-side stub to generate partner reports.

## RLS & Roles
- Roles: farmer (admin), partner, buyer
- Enforced via Supabase RLS in `02_rls.sql`.

## Tests
- Vitest unit tests for stock decrement and production aggregation.

## Deploy to Netlify
- Each app contains `netlify.toml` configured for SvelteKit adapter.
- Set env vars in Netlify UI to match `.env`.

## Packages
- shared-components/: UI components imported by apps via relative import or alias.
