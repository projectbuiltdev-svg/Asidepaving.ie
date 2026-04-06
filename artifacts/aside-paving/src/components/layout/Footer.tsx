import { CONTACT_INFO } from "@/lib/constants";
import { Phone, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white pt-12 pb-6 mt-20">
      <div className="container mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-2xl font-serif font-bold mb-4">TJ's Aside Paving</h3>
          <p className="text-gray-400 max-w-sm mb-4">
            Professional driveway and patio specialists established in 1985. Fully registered and insured contractor providing extensive paving and landscaping services.
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-gray-300">
              <Phone className="h-4 w-4 text-primary" /> 
              <span>Office: <a href={`tel:${CONTACT_INFO.office}`} className="hover:text-white transition-colors">{CONTACT_INFO.office}</a></span>
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <Phone className="h-4 w-4 text-primary" /> 
              <span>TJ: <a href={`tel:${CONTACT_INFO.tj}`} className="hover:text-white transition-colors">{CONTACT_INFO.tj}</a></span>
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <Phone className="h-4 w-4 text-primary" /> 
              <span>Tim: <a href={`tel:${CONTACT_INFO.tim}`} className="hover:text-white transition-colors">{CONTACT_INFO.tim}</a></span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <a 
            href={CONTACT_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-md font-bold hover:bg-[#1da851] transition-colors"
            data-testid="btn-whatsapp-footer"
          >
            <MessageSquare className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl px-4 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} TJ's Aside Paving. All rights reserved.</p>
      </div>
    </footer>
  );
}
