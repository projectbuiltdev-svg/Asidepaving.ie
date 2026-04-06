import { Layout } from "@/components/layout/Layout";
import { FreeQuoteCTA } from "@/components/shared/FreeQuoteCTA";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { IMAGES, CATCHMENT_AREAS } from "@/lib/constants";
import { MapPin, ArrowRight } from "lucide-react";

export default function PatiosDriveways() {
  return (
    <Layout>
      <section className="relative bg-black text-white min-h-[50vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.hero.patios})` }}
        />
        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-16">
          <div className="max-w-3xl bg-black/40 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <span className="inline-block py-1 px-3 rounded bg-primary text-white text-sm font-bold tracking-wider mb-6">
              FULLY REG. INSURED CONTRACTOR
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Patios & Driveways</h1>
            <div className="h-1 w-24 bg-primary mb-6" />
            <h2 className="text-xl font-bold text-gray-300">TJ's Aside Paving</h2>
            <p className="text-lg text-gray-300">Professional Driveway & Patio Specialist | EST. 1985</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col-reverse md:flex-row gap-12 items-center mb-16">
            <div className="md:w-1/2 prose prose-lg">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Professional Contractors</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                TJ's Aside Paving are professional patio and driveway contractors with decades of experience.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                We provide a wide range of patio materials such as asphalt, imprinted concrete, sandstone, porcelain, granite, limestone, cobblelock, gravel, tarmac, resin and concrete slabs of differing designs and colours. Additional options include Hot tar and chip in all choice of colours.
              </p>
              
              <div className="bg-primary/5 border-l-4 border-primary p-6 mt-8 rounded-r-lg">
                <h4 className="font-bold text-foreground flex items-center gap-2 mb-2">
                  <MapPin className="text-primary w-5 h-5" /> 
                  Service Areas
                </h4>
                <p className="text-muted-foreground">{CATCHMENT_AREAS}</p>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src={IMAGES.hero.patios} 
                alt="Patio and Driveway installation" 
                className="rounded-lg shadow-xl w-full h-auto object-cover aspect-video"
              />
            </div>
          </div>

          <div className="bg-foreground text-white rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
            
            <h3 className="text-3xl font-serif font-bold mb-6 relative z-10">Let's start a Conversation!</h3>
            <p className="text-xl text-gray-300 mb-8 relative z-10">
              Get a free quotation onsite at your home and we'll help advise with the styling, materials/finish options and the overall function of your outdoor space.
            </p>
            <p className="text-lg text-primary font-bold relative z-10 flex items-center justify-center gap-2">
              <ArrowRight className="w-5 h-5" /> Contact us via Whatsapp and send images of the location. And We Go From There!
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Driveway & Patio Gallery</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {IMAGES.gallery.slice(0, 4).map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg shadow-sm aspect-square">
                <img 
                  src={img} 
                  alt={`Patio work example ${idx + 1}`} 
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
