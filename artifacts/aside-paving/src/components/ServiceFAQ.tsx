import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "wouter";
import { SchemaScript } from "@/components/SchemaMarkup";
import { SERVICE_AREA_COUNT } from "@/data/locationData";

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  serviceSlug: string;
  faqs: FAQ[];
  locationName?: string;
}

export function ServiceFAQ({ serviceSlug, faqs, locationName }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const serviceNames: Record<string, string> = {
    "driveways": "Driveways",
    "patios": "Patios",
    "block-paving": "Block Paving",
    "garden-walls": "Garden Walls",
    "artificial-grass": "Artificial Grass",
  };

  const relatedServices = Object.keys(serviceNames).filter(s => s !== serviceSlug);

  const heading = locationName
    ? `${serviceNames[serviceSlug]} in ${locationName} — FAQ`
    : `${serviceNames[serviceSlug]} — Frequently Asked Questions`;

  const faqSchema = {
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

  return (
    <section className="py-12 bg-gray-50">
      <SchemaScript data={faqSchema} />
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl font-bold mb-2 text-center">{heading}</h2>
        {locationName && (
          <p className="text-gray-500 text-center text-sm mb-8">
            Common questions about {serviceNames[serviceSlug].toLowerCase()} in {locationName}
          </p>
        )}

        <div className="space-y-3 mb-10">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === i}
              >
                <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                {openIndex === i
                  ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                }
              </button>
              <div className={`transition-all duration-300 ${openIndex === i ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm font-semibold text-gray-700 mb-4">Related Services from Aside Paving:</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {relatedServices.map(s => (
              <Link
                key={s}
                href={locationName
                  ? `/${s}/${locationName.toLowerCase().replace(/\s+/g, '-')}`
                  : `/${s}`
                }
                className="text-sm px-3 py-1.5 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-colors"
              >
                {serviceNames[s]}{locationName ? ` in ${locationName}` : ' Dublin'}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/locations" className="text-sm text-primary hover:underline font-medium">
              View all {SERVICE_AREA_COUNT} service areas →
            </Link>
            <Link href="/contact" className="text-sm text-primary hover:underline font-medium">
              Get a free quote →
            </Link>
            <Link href="/blog" className="text-sm text-primary hover:underline font-medium">
              Read our paving guides →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
