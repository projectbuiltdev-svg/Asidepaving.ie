import { Layout } from "@/components/layout/Layout";
import { FreeQuoteCTA } from "@/components/shared/FreeQuoteCTA";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { ContactForm } from "@/components/shared/ContactForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CountyAreaLinks, RelatedServicesLinks } from "@/components/InternalLinks";
import { SchemaScript, getLocalBusinessSchema, getServiceSchema, getBreadcrumbSchema } from "@/components/SchemaMarkup";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { serviceFAQs } from "@/data/serviceFAQs";
import { IMAGES, GALLERY_ALTS, CATCHMENT_AREAS } from "@/lib/constants";
import { Leaf, Sun, Shield, Droplets } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ArtificialGrass() {
  const benefits = [
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: "Extremely Natural",
      desc: "Highest quality materials that are extremely natural to look at."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Pet & Child Friendly",
      desc: "Safe for the whole family and easy to clean."
    },
    {
      icon: <Sun className="w-8 h-8 text-primary" />,
      title: "UV Resistant",
      desc: "Remains vibrant and soft through all seasons without fading."
    },
    {
      icon: <Droplets className="w-8 h-8 text-primary" />,
      title: "Low Maintenance",
      desc: "No more watering, pesticides, fertilizers, or mowing."
    }
  ];

  return (
    <Layout>
      <SchemaScript data={getLocalBusinessSchema()} />
      <SchemaScript data={getServiceSchema("Artificial Grass", "artificial-grass", "Premium artificial grass supply and installation across Dublin, Kildare and Meath. Child safe, pet friendly, UV resistant.")} />
      <SchemaScript data={getBreadcrumbSchema([
        { name: "Home", url: "https://asidepaving.ie" },
        { name: "Artificial Grass", url: "https://asidepaving.ie/artificial-grass" }
      ])} />

      <Breadcrumbs items={[{ label: "Artificial Grass" }]} />

      <section className="relative bg-black text-white min-h-[50vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.hero.grass})` }}
        />
        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-16">
          <div className="max-w-3xl bg-black/40 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <span className="inline-block py-1 px-3 rounded bg-primary text-white text-sm font-bold tracking-wider mb-6">
              FULLY REG. INSURED CONTRACTOR
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Artificial Grass Installations</h1>
            <div className="h-1 w-24 bg-primary mb-6" />
            <h2 className="text-xl font-bold text-gray-300">Aside Paving</h2>
            <p className="text-lg text-gray-300">Professional Driveway & Patio Specialist | EST. 1985</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="md:w-1/2 prose prose-lg">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Evergreen Garden Spaces</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We've been installing artificial grass in homes and businesses since 1985. That means decades of professional experience from garden experts.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                The artificial grass/astro turf that we use for garden spaces installations, are of the highest quality and extremely natural to look at. Artificial astro turf/grass stands are always evergreen, for you and your family to enjoy your lawn all year round.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                We want your garden to be almost maintenance free and our expert team of garden pro's ensures your artificial grass is cut and laid perfectly.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src={IMAGES.hero.grass} 
                alt="Artificial grass installation by Aside Paving Dublin" 
                className="rounded-lg shadow-xl w-full h-auto object-cover aspect-4/3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, idx) => (
              <Card key={idx} className="border-none shadow-md bg-white hover-elevate">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{benefit.icon}</div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">{benefit.title}</h4>
                  <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20 text-center max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-2">Service Areas</h3>
            <p className="text-muted-foreground mb-6">Our service catchment areas include: {CATCHMENT_AREAS}</p>
            <p className="text-lg font-serif font-bold text-primary">
              Get in Touch and allow us to completely transform your visual garden spaces with beautiful landscaped artificial grass.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Artificial Grass Gallery</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {IMAGES.gallery.slice(6, 9).map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg shadow-sm aspect-video">
                <img 
                  src={img} 
                  alt={GALLERY_ALTS[idx + 6]} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <RelatedServicesLinks serviceSlug="artificial-grass" />
          <CountyAreaLinks serviceSlug="artificial-grass" />
        </div>
      </section>

      <ServiceFAQ serviceSlug="artificial-grass" faqs={serviceFAQs["artificial-grass"]} />

      <ContactForm />
      <FreeQuoteCTA />
      <TestimonialsSection />
    </Layout>
  );
}
