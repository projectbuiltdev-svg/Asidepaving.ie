import { Layout } from "@/components/layout/Layout";
import { FreeQuoteCTA } from "@/components/shared/FreeQuoteCTA";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { IMAGES } from "@/lib/constants";
import { HardHat } from "lucide-react";

export default function WallsPillars() {
  return (
    <Layout>
      <div className="bg-secondary/30 py-12 border-b border-border">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Walls & Pillars</h1>
          <div className="h-1 w-24 bg-primary mb-6" />
          <h2 className="text-xl font-bold text-muted-foreground">TJ's Aside Paving (Fully Reg. Insured Contractor)</h2>
          <p className="text-lg text-muted-foreground">Professional Driveway & Patio Specialist | EST. 1985</p>
        </div>
      </div>

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
              TJ's Aside Paving Has a wide range of building materials options for pillars or retaining walls, such as concrete blocks, sandstone, brick or specific materials clients want to use.
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

      <FreeQuoteCTA />
      <TestimonialsSection />
    </Layout>
  );
}
