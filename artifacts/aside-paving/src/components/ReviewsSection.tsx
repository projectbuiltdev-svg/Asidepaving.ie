import { testimonials } from "@/data/testimonials";
import { CONTACT_INFO } from "@/lib/constants";
import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SchemaScript } from "@/components/SchemaMarkup";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  );
}

export function ReviewsSection({ filterService }: { filterService?: string }) {
  const reviews = filterService
    ? testimonials.filter(t => t.service.toLowerCase().includes(filterService.toLowerCase())).slice(0, 3)
    : testimonials;

  if (reviews.length === 0) return null;

  const reviewSchema = !filterService ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Aside Paving",
    "telephone": CONTACT_INFO.officeTel,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": CONTACT_INFO.locality,
      "addressRegion": CONTACT_INFO.region,
      "addressCountry": CONTACT_INFO.country
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": String(testimonials.length),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonials.map(t => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": t.name },
      "reviewRating": { "@type": "Rating", "ratingValue": t.rating, "bestRating": 5 },
      "datePublished": t.date,
      "reviewBody": t.text
    }))
  } : null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4">
        {reviewSchema && <SchemaScript data={reviewSchema} />}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">What Our Customers Say</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            Trusted by homeowners across Dublin, Kildare & Meath since 1985
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(review => (
            <Card key={review.id} className="border-0 shadow-md">
              <CardContent className="p-6">
                <StarRating rating={review.rating} />
                <p className="text-muted-foreground mt-4 mb-4 text-sm leading-relaxed italic">
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div>
                    <p className="font-bold text-sm text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {review.location}
                    </p>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {review.service}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
