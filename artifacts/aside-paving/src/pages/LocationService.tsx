import { useState } from "react";
import { Link } from "wouter";
import { useSearch } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO, IMAGES } from "@/lib/constants";
import { locationData } from "@/data/locationData";
import { serviceData } from "@/data/serviceData";
import { getDescriptionIndex, formatLocation, generateLocationFAQs } from "@/utils/locationUtils";
import { Phone, MessageSquare, CheckCircle2, ChevronDown, ChevronRight, MapPin, ExternalLink, Shield, Clock, Star, Award } from "lucide-react";

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-border rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-muted/50 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span>{faq.question}</span>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: faq.answer }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function LocationService({ service }: { service: string }) {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const locationSlug = params.get("location") || "";

  const svc = serviceData[service];
  const locData = locationData[locationSlug];

  if (!svc || !locData || !locationSlug) {
    return (
      <Layout>
        <div className="container mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-3xl font-serif font-bold mb-4">Location Not Found</h1>
          <p className="text-muted-foreground mb-8">The location or service you're looking for doesn't exist.</p>
          <Button asChild><Link href="/locations">View All Locations</Link></Button>
        </div>
      </Layout>
    );
  }

  const locationName = formatLocation(locationSlug);
  const idx = getDescriptionIndex(locationSlug, service);
  const faqs = generateLocationFAQs(svc.faqs, locationName, svc.title, svc.relatedServices);
  const otherServices = Object.values(serviceData).filter(s => s.slug !== service);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Aside Paving",
    "description": `${svc.title} in ${locationName}`,
    "url": `https://asidepaving.ie/${svc.slug}?location=${locationSlug}`,
    "telephone": CONTACT_INFO.office,
    "address": { "@type": "PostalAddress", "addressLocality": locationName, "addressRegion": `Co. ${locData.county}`, "addressCountry": "IE" },
    "geo": { "@type": "GeoCoordinates", "latitude": locData.lat, "longitude": locData.lng },
    "areaServed": `${locationName}, Co. ${locData.county}`
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* 1. BREADCRUMBS */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-3 text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span>{svc.title}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">{locationName}</span>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative bg-black text-white min-h-[50vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.hero.home})` }}
        />
        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-16">
          <div className="max-w-3xl bg-black/40 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded bg-primary text-white text-sm font-bold tracking-wider mb-6">
              <MapPin className="w-4 h-4" /> Serving {locData.description}, Co. {locData.county}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4">
              {svc.title} in {locationName}, Co. {locData.county}
            </h1>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              {locData.heroTexts[idx]}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8" asChild>
                <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer">Get a Free Quote</a>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black font-bold h-14 px-8" asChild>
                <a href={`tel:${CONTACT_INFO.office}`}><Phone className="mr-2 h-5 w-5" /> Call Now</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT — Two Column */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* LEFT COLUMN */}
            <div className="lg:w-2/3">
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                {svc.descriptions[idx]}
              </p>

              <h2 className="text-2xl font-serif font-bold mb-6">{svc.title} Options in {locationName}</h2>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {svc.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-serif font-bold mb-4">Other Services in {locationName}</h3>
              <div className="flex flex-wrap gap-2 mb-10">
                {svc.relatedServices.map((rs, i) => (
                  <Link key={i} href={`/${rs.slug}?location=${locationSlug}`} className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors">
                    {rs.name} in {locationName}
                  </Link>
                ))}
              </div>

              <h3 className="text-xl font-serif font-bold mb-4">Why Choose Aside Paving?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {svc.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN — Sticky Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-28 space-y-6">
                <div className="bg-muted/30 rounded-xl border border-border p-6 space-y-4">
                  <h3 className="font-serif font-bold text-lg mb-2">Contact Us</h3>
                  <a href={`tel:${CONTACT_INFO.office}`} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border hover:border-primary transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-bold">{CONTACT_INFO.office}</div>
                      <div className="text-xs text-muted-foreground">Office</div>
                    </div>
                  </a>
                  <a href={`tel:${CONTACT_INFO.tj}`} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border hover:border-primary transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-bold">{CONTACT_INFO.tj}</div>
                      <div className="text-xs text-muted-foreground">TJ</div>
                    </div>
                  </a>
                  <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] transition-colors">
                    <MessageSquare className="w-5 h-5 text-[#25D366]" />
                    <div>
                      <div className="font-bold text-[#25D366]">WhatsApp Us</div>
                      <div className="text-xs text-muted-foreground">Send photos for a quote</div>
                    </div>
                  </a>
                </div>

                <div className="bg-primary/5 rounded-xl border border-primary/10 p-6">
                  <h3 className="font-serif font-bold text-lg mb-4">Why Aside Paving?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-primary" /><span className="text-sm font-medium">Est. 1985</span></div>
                    <div className="flex items-center gap-3"><Shield className="w-5 h-5 text-primary" /><span className="text-sm font-medium">Fully Insured</span></div>
                    <div className="flex items-center gap-3"><Star className="w-5 h-5 text-primary" /><span className="text-sm font-medium">Free Quotes</span></div>
                    <div className="flex items-center gap-3"><Award className="w-5 h-5 text-primary" /><span className="text-sm font-medium">Local Experts</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA BAND */}
      <section className="bg-foreground text-white py-16">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">Transform Your {locationName} Home Today</h2>
          <div className="flex flex-wrap justify-center gap-8 mb-10 text-sm md:text-base">
            <div className="text-center"><div className="text-2xl font-bold text-primary">40+</div><div className="text-gray-400">Years</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-primary">1000+</div><div className="text-gray-400">Projects</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-primary">3</div><div className="text-gray-400">Counties</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-primary">Free</div><div className="text-gray-400">Quotes</div></div>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-10" asChild>
            <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer">Request a Free Quote</a>
          </Button>
        </div>
      </section>

      {/* 5. MAP + ATTRACTIONS */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-serif font-bold mb-6">{locationName} Service Area</h2>
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=${locData.lat},${locData.lng}&zoom=13`}
                width="100%"
                height="350"
                loading="lazy"
                title={`Map of ${locationName}`}
                className="rounded-xl border border-border"
              />
              <p className="text-sm text-muted-foreground mt-3">
                Service Area: {locationName}, Co. {locData.county} — Coordinates: {locData.lat}°N, {Math.abs(locData.lng)}°W
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl border border-border p-6 h-full">
                <h2 className="text-2xl font-serif font-bold mb-2">Discover {locationName}</h2>
                <h3 className="text-muted-foreground mb-6">Local Attractions Near {locationName}</h3>
                <ul className="space-y-4">
                  {locData.attractions.map((a, i) => (
                    <li key={i}>
                      <a href={a.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="font-medium group-hover:text-primary transition-colors">{a.name}</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-center text-muted-foreground mb-10">{svc.title} in {locationName}, Co. {locData.county}</p>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* 7. BRANDING SECTION */}
      <section className="relative bg-black text-white py-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${IMAGES.hero.home})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto max-w-4xl px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Aside Paving</h2>
          <p className="text-lg text-gray-300 mb-8">Est. 1985. Serving Dublin, Kildare & Meath.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8" asChild>
              <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer">Get a Free Quote</a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black font-bold h-14 px-8" asChild>
              <Link href="/paving-services">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 8. OTHER SERVICES IN LOCATION */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-serif font-bold text-center mb-8">Other Services in {locationName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((os, i) => (
              <Link key={i} href={`/${os.slug}?location=${locationSlug}`} className="block p-6 bg-white rounded-xl border border-border hover:border-primary hover:shadow-md transition-all text-center group">
                <h3 className="font-serif font-bold group-hover:text-primary transition-colors">{os.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">in {locationName}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NEARBY AREAS */}
      <section className="py-12 bg-white border-t border-border">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-serif font-bold mb-6">{svc.title} in Nearby Areas</h2>
          <div className="flex flex-wrap gap-2">
            {locData.nearby
              .filter(n => locationData[n])
              .map((n, i) => (
                <Link key={i} href={`/${svc.slug}?location=${n}`} className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-muted/50 border border-border text-sm font-medium hover:bg-primary/10 hover:border-primary hover:text-primary transition-colors">
                  {svc.title} in {formatLocation(n)}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
