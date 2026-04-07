import { Layout } from "@/components/layout/Layout";
import { FreeQuoteCTA } from "@/components/shared/FreeQuoteCTA";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { ContactForm } from "@/components/shared/ContactForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CountyAreaLinks, RelatedServicesLinks } from "@/components/InternalLinks";
import { SchemaScript, getLocalBusinessSchema, getServiceSchema, getBreadcrumbSchema } from "@/components/SchemaMarkup";
import { IMAGES } from "@/lib/constants";
import { HardHat } from "lucide-react";

export default function WallsPillars() {
  return (
    <Layout>
      <SchemaScript data={getLocalBusinessSchema()} />
      <SchemaScript data={getServiceSchema("Garden Walls & Pillars", "walls-pillars", "Professional wall and pillar construction for Dublin, Kildare and Meath. Brick, block, stone and rendered walls.")} />
      <SchemaScript data={getBreadcrumbSchema([
        { name: "Home", url: "https://asidepaving.ie" },
        { name: "Walls & Pillars", url: "https://asidepaving.ie/walls-pillars" }
      ])} />

      <Breadcrumbs items={[{ label: "Walls & Pillars" }]} />

      <section className="relative bg-black text-white min-h-[50vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.hero.walls})` }}
        />
        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-16">
          <div className="max-w-3xl bg-black/40 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <span className="inline-block py-1 px-3 rounded bg-primary text-white text-sm font-bold tracking-wider mb-6">
              FULLY REG. INSURED CONTRACTOR
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Walls & Pillars</h1>
            <div className="h-1 w-24 bg-primary mb-6" />
            <h2 className="text-xl font-bold text-gray-300">Aside Paving</h2>
            <p className="text-lg text-gray-300">Professional Driveway & Patio Specialist | EST. 1985</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img 
              src={IMAGES.hero.walls} 
              alt="Retaining Walls and Pillars" 
              className="rounded-lg shadow-lg w-full h-auto object-cover aspect-4/3"
            />
          </div>
          <div className="md:w-1/2 prose prose-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <HardHat className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Transform Your Outdoor Spaces</h3>
            
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Aside Paving has a wide range of building materials options for pillars or retaining walls, such as concrete blocks, sandstone, brick or specific materials clients want to use.
            </p>
            
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              We are the professional pillar and retaining wall construction Co. for Dublin homeowners or businesses, and client expectations are always met.
            </p>
            
            <div className="bg-muted p-6 rounded-lg border-l-4 border-accent mt-8">
              <p className="font-medium text-foreground mb-2">Transform your outdoor spaces with retaining walls or pillars!</p>
              <p className="text-muted-foreground">If you have budgetary restraints, don't worry, just give us a call to arrange an onsite consultation. Get a free on the spot quote and we answer any questions that you may have on the project.</p>
              <p className="text-primary font-bold mt-4">It's Free 2 Talk!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Walls & Pillars Gallery</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMAGES.gallery.slice(4, 7).map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg shadow-sm aspect-video">
                <img 
                  src={img} 
                  alt={`Walls work example ${idx + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <RelatedServicesLinks serviceSlug="garden-walls" />
          <CountyAreaLinks serviceSlug="garden-walls" />
        </div>
      </section>

      <ContactForm />
      <FreeQuoteCTA />
      <TestimonialsSection />
    </Layout>
  );
}
