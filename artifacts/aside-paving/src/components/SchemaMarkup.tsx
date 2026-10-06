import { CONTACT_INFO } from "@/lib/constants";

export const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Aside Paving",
  "url": "https://asidepaving.ie",
  "foundingDate": "1985",
  "description": "Professional paving contractors serving Dublin, Kildare and Meath since 1985. Driveways, patios, block paving, garden walls and artificial grass.",
  "areaServed": ["Dublin", "Kildare", "Meath"],
  "sameAs": []
};

export function getLocalBusinessSchema(overrides?: Record<string, unknown>) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Aside Paving",
    "image": "https://asidepaving.ie/og-logo.png",
    "url": "https://asidepaving.ie",
    "telephone": CONTACT_INFO.officeTel,
    "email": CONTACT_INFO.email,
    "foundingDate": "1985",
    "priceRange": "$$",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, Card, Bank Transfer",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": CONTACT_INFO.locality,
      "addressRegion": CONTACT_INFO.region,
      "addressCountry": CONTACT_INFO.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": CONTACT_INFO.lat,
      "longitude": CONTACT_INFO.lng
    },
    "areaServed": [
      { "@type": "City", "name": "Dublin" },
      { "@type": "AdministrativeArea", "name": "County Kildare" },
      { "@type": "AdministrativeArea", "name": "County Meath" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Paving Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Driveway Installation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Patio Installation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Block Paving" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Garden Walls" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Artificial Grass" } }
      ]
    },
    ...overrides
  };
}

export function getServiceSchema(serviceTitle: string, serviceSlug: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceTitle,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Aside Paving",
      "url": "https://asidepaving.ie"
    },
    "areaServed": ["Dublin", "Kildare", "Meath"],
    "url": `https://asidepaving.ie/${serviceSlug}`,
    "serviceType": serviceTitle
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export const aggregateRatingSchema = {
  ...getLocalBusinessSchema(),
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "6",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Aside Paving",
  "url": "https://asidepaving.ie",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://asidepaving.ie/locations",
    "query-input": "required name=search_term_string"
  }
};

export function SchemaScript({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
