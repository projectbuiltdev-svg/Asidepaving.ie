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
- **129 locations** × **5 services** = **645 unique location+service pages**
- Counties: Dublin (~95 areas), Kildare (~18 areas), Meath (~20 areas)
- Services: driveways, patios, block-paving, garden-walls, artificial-grass
- Routes: `/{service}?location={town-slug}` (e.g. `/driveways?location=swords`)
- `/locations` index page groups all towns by county with links to all services

### pSEO Files
- `src/data/locationData.ts` — 129 locations with coords, nearby towns, attractions, hero texts
- `src/data/serviceData.ts` — 5 services with features, descriptions, benefits, FAQs
- `src/utils/locationUtils.ts` — hashing, formatting, FAQ generation utilities
- `src/pages/LocationService.tsx` — 9-section location+service page component
- `src/pages/Locations.tsx` — county-grouped index page
- `src/pages/ArtificialGrassRouter.tsx` — handles `/artificial-grass` route conflict (original page vs pSEO)
- `public/sitemap.xml` — 654 URLs total

### SEO Features
- **SSR meta injection**: `server.ts` replaces `<!--ssr-*-->` placeholders in `index.html` per page (title, description, keywords, canonical, OG, Twitter)
- **Schema markup** (via `src/components/SchemaMarkup.tsx`): Organization, LocalBusiness, Service, BreadcrumbList, FAQPage, AggregateRating, WebSite — rendered as `<script type="application/ld+json">` per page
- **Breadcrumbs** (`src/components/Breadcrumbs.tsx`): Semantic `nav[aria-label="Breadcrumb"]` on all service and location pages
- **Internal linking** (`src/components/InternalLinks.tsx`): ServiceLinksGrid, NearbyAreasLinks, CountyAreaLinks, RelatedServicesLinks — context-aware cross-linking on location and service pages
- **Homepage popular locations section**: Links to top services and areas
- **301 redirects** in `server.ts`: `/driveway` → `/driveways`, `/cobblelock` → `/block-paving`, etc.
- **HTTP headers**: `X-Robots-Tag: index, follow`, production `Cache-Control: public, max-age=3600`
- **Technical SEO in `index.html`**: hreflang (en-ie, en), theme-color, format-detection, OG image dimensions, geo tags
- **404 page**: SEO-friendly with service links and `noindex` meta
- **robots.txt** and **sitemap.xml** at `/public/`
- FAQ schema on every location page, LocalBusiness schema on every page
- Google Maps embed per location
