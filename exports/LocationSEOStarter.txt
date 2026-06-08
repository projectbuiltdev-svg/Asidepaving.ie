/**
 * ============================================================================
 * LOCATION pSEO STARTER — self-contained, plug-and-play
 * ============================================================================
 *
 * Drop this single file into a new site and you get the full location/service
 * SEO structure used on asidepaving.ie:
 *
 *   1. <LocationsDropdown />   — nested main-nav dropdown
 *   2. <HomepageServiceLinks /> — homepage "Services Across {region}" grid
 *   3. <FooterServiceAreas />  — collapsible county→town→service accordion
 *                                + "Popular Service Areas" SEO grid
 *
 * TO ADAPT FOR A NEW SITE, edit ONLY the CONFIG block below:
 *   - SERVICES      : your service list
 *   - COUNTIES      : your regions + every town you serve
 *   - POPULAR_AREAS : per-region shortlist shown in the nav dropdown
 *   - TOP_TOWNS     : towns featured in the footer "Popular" rows
 *   - REGION_LABEL  : e.g. "Dublin, Kildare & Meath"
 *   - BRAND_NAME    : your business name
 *
 * The route convention every link uses is:  /{service-slug}?location={town-slug}
 * Make sure your app renders a page at that route (a single dynamic component
 * keyed off the `location` query param serves all town+service combinations).
 *
 * DEPENDENCIES (already standard in this stack):
 *   - wouter            (Link / routing)        → swap for next/link, react-router, etc.
 *   - lucide-react      (icons)
 *   - shadcn/ui dropdown-menu  (only for LocationsDropdown)
 *
 * If you don't use shadcn dropdown, the dropdown is the only piece that needs
 * a swap — the homepage + footer sections are plain divs and work anywhere.
 * ============================================================================
 */

import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

/* ==========================================================================
 * CONFIG — edit this block per site
 * ======================================================================== */

export const BRAND_NAME = "Aside Paving";
export const REGION_LABEL = "Dublin, Kildare & Meath";

export interface ServiceDef {
  label: string;
  slug: string;
}

export const SERVICES: ServiceDef[] = [
  { label: "Driveways", slug: "driveways" },
  { label: "Patios", slug: "patios" },
  { label: "Block Paving", slug: "block-paving" },
  { label: "Garden Walls", slug: "garden-walls" },
  { label: "Artificial Grass", slug: "artificial-grass" },
];

export interface CountyDef {
  key: string;
  name: string;
  towns: string[];
}

/** Every town you serve, grouped by region. Drives the footer accordion + counts. */
export const COUNTIES: CountyDef[] = [
  {
    key: "dublin",
    name: "Dublin",
    towns: [
      "Swords","Malahide","Howth","Portmarnock","Donabate","Rush","Lusk","Skerries","Balbriggan",
      "Blanchardstown","Castleknock","Lucan","Palmerstown","Clondalkin","Tallaght","Dundrum",
      "Blackrock","Dún Laoghaire","Dalkey","Killiney","Shankill","Stillorgan","Sandyford","Foxrock",
      "Cabinteely","Rathfarnham","Templeogue","Terenure","Harold's Cross","Ranelagh","Rathgar",
      "Sandymount","Clontarf","Raheny","Baldoyle","Sutton","Crumlin","Walkinstown","Mulhuddart",
      "Ongar","Clonsilla","Rathcoole","Saggart","Monkstown","Ringsend","Ballsbridge","Drumcondra",
      "Glasnevin","Finglas","Santry","Artane","Coolock","Beaumont","Kilbarrack","Ballymun","Cabra",
      "Phibsborough","Stoneybatter","Inchicore","Kilmainham","Drimnagh","Ballyfermot","Chapelizod",
      "Adamstown","Citywest","Knocklyon","Firhouse","Ballyboden","Churchtown","Goatstown",
      "Mount Merrion","Booterstown","Sandycove","Donnybrook","Milltown","Rathmines","Portobello",
      "Dolphin's Barn","Marino","Fairview","Harmonstown","Killester","Tyrrelstown","Hartstown",
      "Belmayne","Clongriffin","Kinsealy","Ayrfield","East Wall","Smithfield",
    ],
  },
  {
    key: "kildare",
    name: "Kildare",
    towns: [
      "Naas","Newbridge","Maynooth","Celbridge","Leixlip","Clane","Kilcock","Kildare Town",
      "Sallins","Athy","Monasterevin","Rathangan","Kilcullen","Prosperous","Kill","Allenwood",
      "Ballymore Eustace","Johnstown Bridge",
    ],
  },
  {
    key: "meath",
    name: "Meath",
    towns: [
      "Navan","Ashbourne","Dunshaughlin","Ratoath","Trim","Kells","Laytown","Bettystown",
      "Enfield","Drogheda","Slane","Duleek","Dunboyne","Clonee","Stamullen","Gormanston",
      "Athboy","Oldcastle","Nobber","Ballivor",
    ],
  },
];

/** Per-region shortlist shown in the nav dropdown (keep these short, ~6-12 each). */
export const POPULAR_AREAS: Record<string, string[]> = {
  dublin: ["Swords","Malahide","Blanchardstown","Lucan","Tallaght","Dundrum",
           "Clontarf","Sandyford","Blackrock","Dún Laoghaire","Castleknock","Raheny"],
  kildare: ["Naas","Maynooth","Celbridge","Leixlip","Newbridge","Clane"],
  meath: ["Navan","Ashbourne","Dunboyne","Ratoath","Trim","Dunshaughlin"],
};

/** Towns featured in the footer "Popular Service Areas" rows. */
export const TOP_TOWNS = [
  "Swords","Malahide","Lucan","Naas","Dundrum","Blanchardstown",
  "Navan","Tallaght","Blackrock","Maynooth","Sandyford","Ashbourne",
];

/** Towns used for the footer service×town SEO grid (one row of links per service). */
export const SEO_GRID_TOWNS = ["swords","tallaght","naas","navan","dundrum","lucan"];

/* ==========================================================================
 * HELPERS
 * ======================================================================== */

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

export function titleCase(slug: string): string {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/** Build a location+service URL — the single SEO route convention. */
export function serviceLocationHref(serviceSlug: string, townSlug: string): string {
  return `/${serviceSlug}?location=${townSlug}`;
}

const totalTowns = COUNTIES.reduce((n, c) => n + c.towns.length, 0);

/* ==========================================================================
 * 1. MAIN NAV — Locations dropdown
 * ======================================================================== */

export function LocationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1 text-sm font-medium text-gray-200 hover:text-amber-400 transition-colors outline-none"
        data-testid="dropdown-locations"
      >
        <MapPin className="w-4 h-4" />
        Locations
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Services</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SERVICES.map((service) => (
          <DropdownMenuItem key={service.slug} asChild>
            <Link href={`/${service.slug}`} className="cursor-pointer">
              {service.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Service Areas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {COUNTIES.map((county) => (
          <DropdownMenuSub key={county.key}>
            <DropdownMenuSubTrigger className="font-medium">
              County {county.name}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-56">
              <DropdownMenuLabel className="text-xs text-gray-500">Popular Areas</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(POPULAR_AREAS[county.key] ?? []).map((area) => (
                <DropdownMenuSub key={area}>
                  <DropdownMenuSubTrigger className="text-sm">{area}</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="w-48">
                    {SERVICES.map((service) => (
                      <DropdownMenuItem key={service.slug} asChild>
                        <Link
                          href={serviceLocationHref(service.slug, slugify(area))}
                          className="cursor-pointer text-sm"
                        >
                          {service.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/locations" className="cursor-pointer text-sm font-medium text-primary">
                  All {county.name} areas →
                </Link>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/locations" className="cursor-pointer font-medium text-primary">
            View all {totalTowns} service areas →
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ==========================================================================
 * 2. HOMEPAGE — "Services Across {region}" grid
 * ======================================================================== */

/** First 5 = service pages; rest = "Paving in {town}" sample location links. */
const HOMEPAGE_SAMPLE_TOWNS = ["Swords","Lucan","Naas","Navan","Dundrum","Malahide"];

export function HomepageServiceLinks() {
  const links = [
    ...SERVICES.map(s => ({ text: `${s.label} ${COUNTIES[0].name}`, href: `/${s.slug}` })),
    ...HOMEPAGE_SAMPLE_TOWNS.map(t => ({
      text: `${SERVICES[0].label} in ${t}`,
      href: serviceLocationHref(SERVICES[0].slug, slugify(t)),
    })),
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8">
          {BRAND_NAME} Services Across {REGION_LABEL}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {links.map(link => (
            <a
              key={link.href + link.text}
              href={link.href}
              className="text-sm text-center py-3 px-4 rounded-lg border border-border bg-white hover:border-primary hover:text-primary transition-colors"
            >
              {link.text}
            </a>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/locations" className="text-primary font-medium hover:underline">
            View all {totalTowns} service areas across {REGION_LABEL} →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 3. FOOTER — collapsible county→town→service + "Popular Service Areas"
 * ======================================================================== */

export function FooterServiceAreas() {
  const [expandedCounty, setExpandedCounty] = useState<string | null>(null);
  const toggleCounty = (key: string) =>
    setExpandedCounty(prev => (prev === key ? null : key));

  return (
    <div className="border-t border-gray-800 pt-10">
      <h4 className="font-bold text-lg mb-6 text-center">
        <MapPin className="w-5 h-5 inline-block mr-2 text-green-400" />
        {BRAND_NAME} Services By Location
      </h4>

      <div className="space-y-4">
        {COUNTIES.map((county) => (
          <div key={county.key} className="border border-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCounty(county.key)}
              className="w-full flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800 transition-colors text-left"
            >
              <span className="font-semibold text-white">
                County {county.name}{" "}
                <span className="text-gray-400 font-normal text-sm">({county.towns.length} areas)</span>
              </span>
              {expandedCounty === county.key
                ? <ChevronUp className="w-5 h-5 text-gray-400" />
                : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>

            <div className={`transition-all duration-300 ${expandedCounty === county.key ? "max-h-[6000px]" : "max-h-0"} overflow-hidden`}>
              <div className="p-4 bg-gray-800/30">
                {county.towns.map((town) => (
                  <div key={town} className="mb-4 last:mb-0">
                    <h5 className="text-sm font-semibold text-amber-400 mb-2">{town}</h5>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map((service) => (
                        <Link
                          key={`${service.slug}-${slugify(town)}`}
                          href={serviceLocationHref(service.slug, slugify(town))}
                          className="text-xs text-gray-400 hover:text-green-400 transition-colors bg-gray-800 px-2 py-1 rounded"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO fallback — crawlers without JS still get every link */}
            <noscript>
              <div className="p-4 bg-gray-800/30">
                {county.towns.map((town) => (
                  <div key={`noscript-${town}`} className="mb-2">
                    <span className="text-amber-400 text-sm">{town}: </span>
                    {SERVICES.map((service, idx) => (
                      <span key={`noscript-${service.slug}-${slugify(town)}`}>
                        <a
                          href={serviceLocationHref(service.slug, slugify(town))}
                          className="text-gray-400 text-xs hover:text-green-400"
                        >
                          {service.label}
                        </a>
                        {idx < SERVICES.length - 1 && <span className="text-gray-600"> | </span>}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </noscript>
          </div>
        ))}
      </div>

      {/* Popular Service Areas */}
      <div className="mt-8 pt-6 border-t border-gray-800">
        <p className="text-center text-green-400 text-lg font-bold mb-6">Popular Service Areas</p>

        {/* Top towns (link to first service) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-8">
          {TOP_TOWNS.map((town) => (
            <Link
              key={`popular-${slugify(town)}`}
              href={serviceLocationHref(SERVICES[0].slug, slugify(town))}
              className="text-sm text-green-400 hover:text-green-300 transition-colors text-center py-2 px-1 bg-gray-800/50 rounded hover:bg-gray-800"
            >
              {town}
            </Link>
          ))}
        </div>

        {/* Service × town SEO grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {SERVICES.flatMap((service) =>
            SEO_GRID_TOWNS.map((town) => ({
              label: `${service.label} ${titleCase(town)}`,
              slug: service.slug,
              town,
            }))
          ).map((item) => (
            <Link
              key={`seo-${item.slug}-${item.town}`}
              href={serviceLocationHref(item.slug, item.town)}
              className="text-xs text-white hover:text-green-400 transition-colors text-center py-2 px-1 bg-gray-800/50 rounded hover:bg-gray-800"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
 * 4. /locations INDEX PAGE — every town × every service (full link map)
 * ======================================================================== */

export function LocationsIndexSection() {
  const totalPages = totalTowns * SERVICES.length;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            {BRAND_NAME} Services Across {REGION_LABEL}
          </h1>
          <p className="text-lg text-muted-foreground">
            {totalPages} service pages across {totalTowns} locations — find expert service near you.
          </p>
        </div>

        {COUNTIES.map((county) => (
          <div key={county.key} className="mb-16 last:mb-0">
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-serif font-bold">County {county.name}</h2>
              <span className="text-sm text-muted-foreground">({county.towns.length} areas)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...county.towns].sort().map((town) => (
                <div key={town} className="bg-muted/20 rounded-xl border border-border p-5 hover:border-primary/50 transition-colors">
                  <h3 className="font-serif font-bold text-lg mb-3">{town}</h3>
                  <ul className="space-y-1.5">
                    {SERVICES.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={serviceLocationHref(s.slug, slugify(town))}
                          className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                        >
                          {s.label} in {town}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
