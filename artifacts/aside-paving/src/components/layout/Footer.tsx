import { useState } from "react";
import { Link } from "wouter";
import { Phone, Mail, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp, SiGoogle } from "react-icons/si";
import { CONTACT_INFO } from "@/lib/constants";
import logoImg from "@assets/logo.png";

const socialLinks = [
  { icon: SiGoogle, href: "https://www.google.com/maps/search/Aside+Paving", label: "Google" },
  { icon: SiFacebook, href: "#", label: "Facebook" },
  { icon: SiInstagram, href: "#", label: "Instagram" },
  { icon: SiWhatsapp, href: CONTACT_INFO.whatsappLink, label: "WhatsApp" },
];

const services = [
  { label: "Driveways", slug: "driveways" },
  { label: "Patios", slug: "patios" },
  { label: "Block Paving", slug: "block-paving" },
  { label: "Garden Walls", slug: "garden-walls" },
  { label: "Artificial Grass", slug: "artificial-grass" },
];

const locations = {
  dublin: {
    county: "Dublin",
    towns: [
      "Swords","Malahide","Howth","Portmarnock","Donabate","Rush","Lusk","Skerries","Balbriggan",
      "Blanchardstown","Castleknock","Lucan","Palmerstown","Clondalkin","Tallaght","Dundrum",
      "Blackrock","Dún Laoghaire","Dalkey","Killiney","Shankill","Stillorgan","Sandyford","Foxrock",
      "Cabinteely","Rathfarnham","Templeogue","Terenure","Harold's Cross","Ranelagh","Rathgar",
      "Sandymount","Clontarf","Raheny","Baldoyle","Sutton","Crumlin","Walkinstown","Mulhuddart",
      "Ongar","Clonsilla","Rathcoole","Saggart","Monkstown","Ringsend","Ballsbridge","Drumcondra",
      "Glasnevin","Finglas","Santry","Artane","Coolock","Beaumont","Kilbarrack","Ballymun","Cabra",
      "Phibsborough","Stoneybatter","Inchicore","Kilmainham","Drimnagh","Ballyfermot","Chapelizod",
      "Adamstown","Citywest","Knocklyon","Firhouse","Ballyboden","Churchtown","Goatstown",
      "Mount Merrion","Booterstown","Sandycove","Donnybrook","Milltown","Rathmines","Portobello",
      "Dolphin's Barn","Marino","Fairview","Harmonstown","Killester","Tyrrelstown","Hartstown",
      "Belmayne","Clongriffin","Kinsealy","Ayrfield","East Wall","Smithfield"
    ]
  },
  kildare: {
    county: "Kildare",
    towns: [
      "Naas","Newbridge","Maynooth","Celbridge","Leixlip","Clane","Kilcock","Kildare Town",
      "Sallins","Athy","Monasterevin","Rathangan","Kilcullen","Prosperous","Kill","Allenwood",
      "Ballymore Eustace","Johnstown Bridge"
    ]
  },
  meath: {
    county: "Meath",
    towns: [
      "Navan","Ashbourne","Dunshaughlin","Ratoath","Trim","Kells","Laytown","Bettystown",
      "Enfield","Drogheda","Slane","Duleek","Dunboyne","Clonee","Stamullen","Gormanston",
      "Athboy","Oldcastle","Nobber","Ballivor"
    ]
  }
};

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [expandedCounty, setExpandedCounty] = useState<string | null>(null);

  const toggleCounty = (county: string) => {
    setExpandedCounty(expandedCounty === county ? null : county);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="bg-gray-800 py-4 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <span className="text-gray-400 font-medium">Quick Links:</span>
            {services.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="text-gray-300 hover:text-green-400 transition-colors font-medium">
                {s.label}
              </Link>
            ))}
            <Link href="/locations" className="text-gray-300 hover:text-green-400 transition-colors font-medium">
              All Areas
            </Link>
            <Link href="/contact" className="text-amber-400 hover:text-amber-300 transition-colors font-semibold">
              Free Quote
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <img src={logoImg} alt="Aside Paving" className="h-32 w-auto object-contain" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 text-justify">
              Professional{" "}
              <Link href="/driveways" className="text-green-400 hover:underline">driveways Dublin</Link>,{" "}
              <Link href="/patios" className="text-green-400 hover:underline">patios</Link>,{" "}
              <Link href="/block-paving" className="text-green-400 hover:underline">block paving</Link>,{" "}
              <Link href="/garden-walls" className="text-green-400 hover:underline">garden walls</Link> and{" "}
              <Link href="/artificial-grass" className="text-green-400 hover:underline">artificial grass</Link>{" "}
              since 1985. Serving{" "}
              <Link href="/locations" className="text-green-400 hover:underline">Dublin, Kildare & Meath</Link>.
            </p>
            <p className="text-sm text-gray-400">
              Est. 1985 | Fully Insured | Free Quotation
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/${service.slug}`} className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Service Areas</h4>
            <ul className="space-y-3">
              {Object.entries(locations).map(([key, loc]) => (
                <li key={key}>
                  <span className="text-gray-300 text-sm font-medium">County {loc.county}</span>
                  <span className="text-gray-500 text-xs ml-2">({loc.towns.length} areas)</span>
                </li>
              ))}
            </ul>
            <Link href="/locations" className="inline-block mt-4 text-green-400 hover:text-green-300 text-sm font-medium">
              View All 129 Locations →
            </Link>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a href={`tel:${CONTACT_INFO.office}`} className="text-sm hover:text-green-400 transition-colors block py-1">
                    {CONTACT_INFO.office}
                  </a>
                  <a
                    href={CONTACT_INFO.whatsappLink}
                    target="_blank" rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-green-500 transition-colors flex items-center gap-1 py-1"
                  >
                    <SiWhatsapp className="w-3 h-3" />
                    WhatsApp
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm hover:text-green-400 transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  <span className="block">{CONTACT_INFO.address}</span>
                  <span className="block text-gray-400 mt-1">Serving Dublin, Kildare & Meath</span>
                </div>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-700 transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-10">
          <h4 className="font-bold text-lg mb-6 text-center">
            <MapPin className="w-5 h-5 inline-block mr-2 text-green-400" />
            Paving Services By Location
          </h4>

          <div className="space-y-4">
            {Object.entries(locations).map(([key, loc]) => (
              <div key={key} className="border border-gray-800 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleCounty(key)}
                  className="w-full flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800 transition-colors text-left"
                >
                  <span className="font-semibold text-white">
                    County {loc.county}{" "}
                    <span className="text-gray-400 font-normal text-sm">({loc.towns.length} areas)</span>
                  </span>
                  {expandedCounty === key ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                <div className={`transition-all duration-300 ${expandedCounty === key ? 'max-h-[6000px]' : 'max-h-0'} overflow-hidden`}>
                  <div className="p-4 bg-gray-800/30">
                    {loc.towns.map((town) => (
                      <div key={town} className="mb-4 last:mb-0">
                        <h5 className="text-sm font-semibold text-amber-400 mb-2">{town}</h5>
                        <div className="flex flex-wrap gap-2">
                          {services.map((service) => (
                            <Link
                              key={`${service.slug}-${slugify(town)}`}
                              href={`/${service.slug}?location=${slugify(town)}`}
                              className="text-xs text-gray-400 hover:text-green-400 transition-colors bg-gray-800 px-2 py-1 rounded"
                            >
                              {service.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <noscript>
                  <div className="p-4 bg-gray-800/30">
                    {loc.towns.map((town) => (
                      <div key={`noscript-${town}`} className="mb-2">
                        <span className="text-amber-400 text-sm">{town}: </span>
                        {services.map((service, idx) => (
                          <span key={`noscript-${service.slug}-${slugify(town)}`}>
                            <a href={`/${service.slug}?location=${slugify(town)}`} className="text-gray-400 text-xs hover:text-green-400">
                              {service.label}
                            </a>
                            {idx < services.length - 1 && <span className="text-gray-600"> | </span>}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </noscript>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-center text-green-400 text-lg font-bold mb-6">Popular Service Areas</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-8">
              {["Swords","Malahide","Lucan","Naas","Dundrum","Blanchardstown",
                "Navan","Tallaght","Blackrock","Maynooth","Sandyford","Ashbourne"].map((town) => (
                <Link
                  key={`popular-${slugify(town)}`}
                  href={`/driveways?location=${slugify(town)}`}
                  className="text-sm text-green-400 hover:text-green-300 transition-colors text-center py-2 px-1 bg-gray-800/50 rounded hover:bg-gray-800"
                >
                  {town}
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {[
                { label: "Driveways Swords", slug: "driveways", town: "swords" },
                { label: "Driveways Tallaght", slug: "driveways", town: "tallaght" },
                { label: "Driveways Naas", slug: "driveways", town: "naas" },
                { label: "Driveways Navan", slug: "driveways", town: "navan" },
                { label: "Driveways Dundrum", slug: "driveways", town: "dundrum" },
                { label: "Driveways Lucan", slug: "driveways", town: "lucan" },
                { label: "Patios Swords", slug: "patios", town: "swords" },
                { label: "Patios Tallaght", slug: "patios", town: "tallaght" },
                { label: "Patios Naas", slug: "patios", town: "naas" },
                { label: "Patios Navan", slug: "patios", town: "navan" },
                { label: "Patios Dundrum", slug: "patios", town: "dundrum" },
                { label: "Patios Lucan", slug: "patios", town: "lucan" },
                { label: "Block Paving Swords", slug: "block-paving", town: "swords" },
                { label: "Block Paving Tallaght", slug: "block-paving", town: "tallaght" },
                { label: "Block Paving Naas", slug: "block-paving", town: "naas" },
                { label: "Block Paving Navan", slug: "block-paving", town: "navan" },
                { label: "Block Paving Dundrum", slug: "block-paving", town: "dundrum" },
                { label: "Block Paving Lucan", slug: "block-paving", town: "lucan" },
                { label: "Garden Walls Swords", slug: "garden-walls", town: "swords" },
                { label: "Garden Walls Tallaght", slug: "garden-walls", town: "tallaght" },
                { label: "Garden Walls Naas", slug: "garden-walls", town: "naas" },
                { label: "Garden Walls Navan", slug: "garden-walls", town: "navan" },
                { label: "Garden Walls Dundrum", slug: "garden-walls", town: "dundrum" },
                { label: "Garden Walls Lucan", slug: "garden-walls", town: "lucan" },
                { label: "Artificial Grass Swords", slug: "artificial-grass", town: "swords" },
                { label: "Artificial Grass Tallaght", slug: "artificial-grass", town: "tallaght" },
                { label: "Artificial Grass Naas", slug: "artificial-grass", town: "naas" },
                { label: "Artificial Grass Navan", slug: "artificial-grass", town: "navan" },
                { label: "Artificial Grass Dundrum", slug: "artificial-grass", town: "dundrum" },
                { label: "Artificial Grass Lucan", slug: "artificial-grass", town: "lucan" },
              ].map((item) => (
                <Link
                  key={`seo-${item.slug}-${item.town}`}
                  href={`/${item.slug}?location=${item.town}`}
                  className="text-xs text-white hover:text-green-400 transition-colors text-center py-2 px-1 bg-gray-800/50 rounded hover:bg-gray-800"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>© {currentYear} Aside Paving. All rights reserved.</p>
            <p>
              Powered by{" "}
              <a
                href="https://projectbuilt.dev"
                target="_blank" rel="noopener noreferrer"
                className="hover:underline" style={{ color: 'rgb(180, 140, 50)' }}
              >
                projectbuilt.dev
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
