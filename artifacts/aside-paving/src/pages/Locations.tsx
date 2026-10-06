import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { locationData } from "@/data/locationData";
import { serviceData } from "@/data/serviceData";
import { formatLocation } from "@/utils/locationUtils";
import { IMAGES } from "@/lib/constants";
import { MapPin } from "lucide-react";

export default function Locations() {
  const counties = ["Dublin", "Kildare", "Meath"] as const;
  const locationsByCounty: Record<string, string[]> = {};

  for (const [slug, data] of Object.entries(locationData)) {
    if (!locationsByCounty[data.county]) locationsByCounty[data.county] = [];
    locationsByCounty[data.county].push(slug);
  }

  const allServices = Object.values(serviceData);
  const totalLocations = Object.keys(locationData).length;
  const totalPages = totalLocations * allServices.length;

  return (
    <Layout>
      <section className="relative bg-black text-white min-h-[50vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.hero.home})` }}
        />
        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-16 text-center">
          <div className="inline-block bg-black/40 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <span className="inline-block py-1 px-3 rounded bg-primary text-white text-sm font-bold tracking-wider mb-6">
              SERVICE AREAS
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              Paving Services Across Dublin, Kildare & Meath
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {totalPages} service pages across {totalLocations} locations — find expert paving near you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          {counties.map(county => {
            const slugs = locationsByCounty[county] || [];
            return (
              <div key={county} className="mb-16 last:mb-0">
                <div className="flex items-center gap-3 mb-8">
                  <MapPin className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-serif font-bold">County {county}</h2>
                  <span className="text-sm text-muted-foreground">({slugs.length} areas)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {slugs.sort().map(slug => {
                    const name = formatLocation(slug);
                    return (
                      <div key={slug} className="bg-muted/20 rounded-xl border border-border p-5 hover:border-primary/50 transition-colors">
                        <h3 className="font-serif font-bold text-lg mb-3">{name}</h3>
                        <ul className="space-y-1.5">
                          {allServices.map(s => (
                            <li key={s.slug}>
                              <Link
                                href={`/${s.slug}/${slug}`}
                                className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                              >
                                {s.title} in {name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
