import { Link, useLocation } from "wouter";
import { Phone, MessageSquare } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Header() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/paving-services", label: "Paving Services" },
    { href: "/patios-driveways", label: "Patios & Driveways" },
    { href: "/walls-pillars", label: "Walls & Pillars" },
    { href: "/artificial-grass", label: "Artificial Grass" },
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top Contact Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm font-medium">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> Office: {CONTACT_INFO.office}</span>
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> TJ: {CONTACT_INFO.tj}</span>
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> Tim: {CONTACT_INFO.tim}</span>
          </div>
          <a 
            href={CONTACT_INFO.whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-accent transition-colors"
            data-testid="link-whatsapp-top"
          >
            <MessageSquare className="h-3 w-3" /> WhatsApp Us
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto max-w-6xl px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="text-3xl font-serif font-bold text-primary flex items-center gap-2" data-testid="link-home-logo">
          TJ's Aside Paving
        </Link>

        <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`font-medium transition-colors hover:text-primary ${location === link.href ? 'text-primary border-b-2 border-primary' : 'text-foreground'}`}
              data-testid={`link-nav-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
