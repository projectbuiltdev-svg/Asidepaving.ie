import { Layout } from "@/components/layout/Layout";
import { FreeQuoteCTA } from "@/components/shared/FreeQuoteCTA";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { ContactForm } from "@/components/shared/ContactForm";
import { internalLinkSets } from "@/components/InternalLinks";
import { SchemaScript, organisationSchema, getLocalBusinessSchema, aggregateRatingSchema, websiteSchema } from "@/components/SchemaMarkup";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { ReviewsSection } from "@/components/ReviewsSection";
import { HomepageFAQ } from "@/components/HomepageFAQ";
import { IMAGES, CATCHMENT_AREAS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  const services = [
    {
      title: "Paving Services",
      image: IMAGES.services.paving,
      link: "/paving-services",
      description: "Extensive selection of paving options for both consumer and commercial businesses."
    },
    {
      title: "Patios & Driveways",
      image: IMAGES.services.patios,
      link: "/patios-driveways",
      description: "Professional patio and driveway contractors with decades of experience."
    },
    {
      title: "Walls & Pillars",
      image: IMAGES.services.walls,
      link: "/walls-pillars",
      description: "Wide range of building materials options for pillars or retaining walls."
    },
    {
      title: "Artificial Grass",
      image: IMAGES.services.grass,
      link: "/artificial-grass",
      description: "High quality and extremely natural artificial grass installations."
    }
  ];

  return (
    <Layout>
      <SchemaScript data={organisationSchema} />
      <SchemaScript data={getLocalBusinessSchema()} />
      <SchemaScript data={aggregateRatingSchema} />
      <SchemaScript data={websiteSchema} />

      <section className="relative bg-black text-white min-h-[80vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.hero.home})` }}
        />
        
        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="max-w-3xl bg-black/40 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <span className="inline-block py-1 px-3 rounded bg-primary text-white text-sm font-bold tracking-wider mb-6">
              FULLY REG. INSURED CONTRACTOR
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-4">
              Aside Paving
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-gray-300 mb-8 tracking-wide">
              PROFESSIONAL DRIVEWAY & PATIO SPECIALISTS | EST.1985
            </h2>
            
            <p className="text-lg text-gray-200 mb-6 leading-relaxed">
              Aside Paving provides an extensive selection of paving options for both consumer and commercial businesses. We are experts in our field with decades of professional experience and happy testimonials from highly satisfied clients.
            </p>
            
            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              Choose paving options such as granite, limestone, asphalt, imprinted concrete, resin sandstone, porcelaine, cobblelock, gravel, tarmac and concrete slabs of various colors and designs. Increase the value of your property with a slick looking driveway and be the envy of your neighbors.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8" asChild>
                <Link href="/paving-services">View Our Services</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black font-bold h-14 px-8" asChild>
                <a href="#services">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-none mx-auto md:whitespace-nowrap">
              Additional services include: Walls & Pillars, Artificial Grass landscaping, patio & decking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden hover-elevate transition-all duration-300 border-0 shadow-md group">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>
                <CardContent className="p-6 bg-white">
                  <h3 className="text-xl font-bold font-serif mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{service.description}</p>
                  <Button variant="ghost" className="w-full group/btn p-0 justify-between hover:bg-transparent" asChild>
                    <Link href={service.link}>
                      <span className="font-bold text-primary group-hover/btn:text-primary/80">View Details</span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />

      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle2 className="w-12 h-12" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">Service Catchment Areas</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our service catchment areas include: <span className="font-bold text-foreground">{CATCHMENT_AREAS}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8">
            Paving Services Across Dublin, Kildare & Meath
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {internalLinkSets.homepage.map(link => (
              <a key={link.href} href={link.href}
                className="text-sm text-center py-3 px-4 rounded-lg border border-border bg-white hover:border-primary hover:text-primary transition-colors">
                {link.text}
              </a>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/locations" className="text-primary font-medium hover:underline">
              View all 135 service areas across Dublin, Kildare & Meath →
            </Link>
          </div>
        </div>
      </section>

      <BeforeAfterGallery />

      <ReviewsSection />

      <FreeQuoteCTA />

      <HomepageFAQ />
      
      <TestimonialsSection />
    </Layout>
  );
}
