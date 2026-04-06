import { TESTIMONIALS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Happy Testimonials</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Decades of professional experience and happy testimonials from highly satisfied clients.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {TESTIMONIALS.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full shadow-sm border-0 bg-white">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex text-accent mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-foreground italic mb-6 flex-grow">"{testimonial.text}"</p>
                      <div className="mt-auto">
                        <p className="font-bold text-foreground">{testimonial.author}</p>
                        <p className="text-sm text-primary font-medium">{testimonial.service}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-4">
            <CarouselPrevious className="position-static transform-none" />
            <CarouselNext className="position-static transform-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
