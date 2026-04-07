import { Layout } from "@/components/layout/Layout";
import { FreeQuoteCTA } from "@/components/shared/FreeQuoteCTA";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { ContactForm } from "@/components/shared/ContactForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CountyAreaLinks, RelatedServicesLinks } from "@/components/InternalLinks";
import { SchemaScript, getLocalBusinessSchema, getServiceSchema, getBreadcrumbSchema } from "@/components/SchemaMarkup";
import { IMAGES } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";

export default function PavingServices() {
  const features = [
    "A driveway is an essential part of today's homes and therefore must be a functional commodity that increases the value of your property.",
    "Enhance the visual presence and value of your home or commercial business with a fantastic looking paved driveway.",
    "A beautifully paved drive or walkway makes an immediate statement and lifts the overall aesthetics of your property.",
    "Make a public statement that dramatically enhances the immediate surroundings of your investment."
  ];

  return (
    <Layout>
      <SchemaScript data={getLocalBusinessSchema()} />
      <SchemaScript data={getServiceSchema("Paving Services", "paving-services", "Professional paving services across Dublin, Kildare and Meath. Block paving, cobblelock, tarmac and more. Est. 1985.")} />
      <SchemaScript data={getBreadcrumbSchema([
        { name: "Home", url: "https://asidepaving.ie" },
        { name: "Paving Services", url: "https://asidepaving.ie/paving-services" }
      ])} />

      <Breadcrumbs items={[{ label: "Paving Services" }]} />

      <section className="relative bg-black text-white min-h-[50vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.hero.paving})` }}
        />
        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-16">
          <div className="max-w-3xl bg-black/40 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <span className="inline-block py-1 px-3 rounded bg-primary text-white text-sm font-bold tracking-wider mb-6">
              FULLY REG. INSURED CONTRACTOR
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Paving Services</h1>
            <div className="h-1 w-24 bg-primary mb-6" />
            <h2 className="text-xl font-bold text-gray-300">Aside Paving</h2>
            <p className="text-lg text-gray-300">Professional Driveway & Patio Specialist | EST. 1985</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4 flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/2">
            <img 
              src={IMAGES.hero.paving} 
              alt="Paving Services" 
              className="rounded-lg shadow-lg w-full h-auto object-cover aspect-video"
            />
          </div>
          <div className="md:w-1/2 prose prose-lg">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Aside Paving provides an extensive selection of paving options for both consumer and commercial businesses. We are experts in our field with decades of professional experience and happy testimonials from highly satisfied clients.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mt-4">
              Choose paving options such as granite, limestone, asphalt, imprinted concrete, resin sandstone, porcelaine, cobblelock, gravel, tarmac and concrete slabs of various colors and designs. Additional options include Hot tar and chip paving in all choice of colours.
            </p>
            
            <div className="mt-8 space-y-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Our Paving Work</h2>
            <p className="text-muted-foreground text-lg">Examples of our recent paving projects</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMAGES.gallery.map((img, idx) => (
              <div key={idx} className="group overflow-hidden rounded-lg shadow-md aspect-square relative">
                <img 
                  src={img} 
                  alt={`Paving work example ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold px-4 py-2 border-2 border-white rounded">View Project</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <RelatedServicesLinks serviceSlug="block-paving" />
          <CountyAreaLinks serviceSlug="block-paving" />
        </div>
      </section>

      <ContactForm />
      <FreeQuoteCTA />
      <TestimonialsSection />
    </Layout>
  );
}
