# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Aside Paving Website (`artifacts/aside-paving`)

React SSR website cloned from asidepaving.ie. Express 5 server with Vite SSR.

### Key Architecture
- **SSR**: Express serves Vite SSR via `entry-server.tsx` with wouter static location hook
- **Routing**: wouter with `Switch/Route`, SSR passes query params via `hook.searchHook`
- **Images**: All WebP format in `src/assets/`, aliased `@assets`
- **Design tokens**: Earthy green primary (`hsl(142 40% 30%)`), Playfair Display serif headings, Outfit sans-serif body

### pSEO System (Programmatic SEO)
- **72 locations** × **5 services** = **360 unique location+service pages**
- Counties: Dublin (50 areas), Kildare (11 areas), Meath (11 areas)
- Services: driveways, patios, block-paving, garden-walls, artificial-grass
- Routes: `/{service}?location={town-slug}` (e.g. `/driveways?location=swords`)
- `/locations` index page groups all towns by county with links to all services

### pSEO Files
- `src/data/locationData.ts` — 72 locations with coords, nearby towns, attractions, hero texts
- `src/data/serviceData.ts` — 5 services with features, descriptions, benefits, FAQs
- `src/utils/locationUtils.ts` — hashing, formatting, FAQ generation utilities
- `src/pages/LocationService.tsx` — 9-section location+service page component
- `src/pages/Locations.tsx` — county-grouped index page
- `src/pages/ArtificialGrassRouter.tsx` — handles `/artificial-grass` route conflict (original page vs pSEO)
- `public/sitemap.xml` — 366 URLs total

### SEO Features
- FAQ schema markup (`FAQPage`) on every location page
- LocalBusiness schema on every location page
- Google Maps embed per location
- Cross-linking: nearby areas, related services, other services in same location
