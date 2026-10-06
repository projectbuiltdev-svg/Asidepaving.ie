import { IMAGES, CONTACT_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";

export function FreeQuoteCTA() {
  return (
    <section className="bg-primary text-primary-foreground py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Get a Free Onsite Consultation</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Get in touch for an onsite consultation at your home or business. Send us pictures via Whatsapp and we go from there. It's Free 2 Talk!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" variant="secondary" className="text-primary font-bold text-lg h-14 px-8" asChild data-testid="btn-cta-call">
            <a href={`tel:${CONTACT_INFO.officeTel}`}>
              <Phone className="mr-2 h-5 w-5" /> Call {CONTACT_INFO.office}
            </a>
          </Button>
          
          <Button size="lg" className="bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-lg h-14 px-8 border-none" asChild data-testid="btn-cta-whatsapp">
            <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="mr-2 h-5 w-5" /> WhatsApp Us Pictures
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
