import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Phone, MessageSquare, Menu, X, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoImg from "@assets/logo.png";
import { LocationsDropdown } from "@/components/LocationsDropdown";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/driveways", label: "Driveways" },
  { href: "/patios", label: "Patios" },
  { href: "/block-paving", label: "Block Paving" },
  { href: "/garden-walls", label: "Garden Walls" },
  { href: "/artificial-grass", label: "Artificial Grass" },
];

const counties = [
  {
    name: "Dublin", slug: "dublin",
    areas: ["Swords","Malahide","Blanchardstown","Lucan","Tallaght","Dundrum",
             "Clontarf","Sandyford","Blackrock","Dún Laoghaire"]
  },
  {
    name: "Kildare", slug: "kildare",
    areas: ["Naas","Maynooth","Celbridge","Leixlip","Newbridge","Clane"]
  },
  {
    name: "Meath", slug: "meath",
    areas: ["Navan","Ashbourne","Dunboyne","Ratoath","Trim","Dunshaughlin"]
  },
];

const services = [
  { slug: "driveways", label: "Driveways" },
  { slug: "patios", label: "Patios" },
  { slug: "block-paving", label: "Block Paving" },
  { slug: "garden-walls", label: "Garden Walls" },
  { slug: "artificial-grass", label: "Artificial Grass" },
];

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [expandedCounty, setExpandedCounty] = useState<string | null>(null);
  const [expandedArea, setExpandedArea] = useState<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" data-testid="btn-mobile-menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0 overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <img src={logoImg} alt="TJ's Aside Paving" className="h-12 w-auto object-contain" />
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-md font-medium transition-colors ${location === link.href ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-gray-100'}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-200 mt-4 pt-4">
            <button
              onClick={() => setLocationsOpen(!locationsOpen)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-md font-medium text-foreground hover:bg-gray-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Locations
              </span>
              {locationsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {locationsOpen && (
              <div className="mt-2 space-y-2">
                {counties.map((county) => (
                  <div key={county.slug}>
                    <button
                      onClick={() => setExpandedCounty(expandedCounty === county.slug ? null : county.slug)}
                      className="flex items-center justify-between w-full px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    >
                      County {county.name}
                      {expandedCounty === county.slug ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {expandedCounty === county.slug && (
                      <div className="ml-4 space-y-1">
                        {county.areas.map((area) => (
                          <div key={area}>
                            <button
                              onClick={() => setExpandedArea(expandedArea === `${county.slug}-${area}` ? null : `${county.slug}-${area}`)}
                              className="flex items-center justify-between w-full px-6 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors"
                            >
                              {area}
                              {expandedArea === `${county.slug}-${area}` ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </button>

                            {expandedArea === `${county.slug}-${area}` && (
                              <div className="ml-4 space-y-0.5">
                                {services.map((service) => (
                                  <Link
                                    key={service.slug}
                                    href={`/${service.slug}?location=${slugify(area)}`}
                                    className="block px-6 py-1.5 text-xs text-gray-500 hover:text-primary transition-colors"
                                    onClick={() => setOpen(false)}
                                  >
                                    {service.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-2 mt-2">
                  <Link
                    href="/locations"
                    className="block px-6 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    View all 129 service areas →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 space-y-3">
            <a href={`tel:${CONTACT_INFO.office}`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-primary transition-colors">
              <Phone className="h-4 w-4" /> Office: {CONTACT_INFO.office}
            </a>
            <a href={`tel:${CONTACT_INFO.tj}`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-primary transition-colors">
              <Phone className="h-4 w-4" /> TJ: {CONTACT_INFO.tj}
            </a>
            <a href={`tel:${CONTACT_INFO.tim}`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-primary transition-colors">
              <Phone className="h-4 w-4" /> Tim: {CONTACT_INFO.tim}
            </a>
            <a
              href={CONTACT_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#25D366] hover:text-[#1da851] transition-colors"
            >
              <MessageSquare className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Header() {
  const [location] = useLocation();

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm font-medium">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <a href={`tel:${CONTACT_INFO.office}`} className="flex items-center gap-1 hover:text-accent transition-colors">
              <Phone className="h-3 w-3" /> Office: {CONTACT_INFO.office}
            </a>
            <a href={`tel:${CONTACT_INFO.tj}`} className="flex items-center gap-1 hover:text-accent transition-colors">
              <Phone className="h-3 w-3" /> TJ: {CONTACT_INFO.tj}
            </a>
            <a href={`tel:${CONTACT_INFO.tim}`} className="flex items-center gap-1 hover:text-accent transition-colors">
              <Phone className="h-3 w-3" /> Tim: {CONTACT_INFO.tim}
            </a>
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

      <div className="container mx-auto max-w-6xl px-4 py-4 flex justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
          <img src={logoImg} alt="TJ's Aside Paving" className="h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex flex-wrap justify-center items-center gap-4 md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium transition-colors hover:text-primary ${location === link.href ? 'text-primary border-b-2 border-primary' : 'text-foreground'}`}
              data-testid={`link-nav-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {link.label}
            </Link>
          ))}
          <LocationsDropdown />
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
