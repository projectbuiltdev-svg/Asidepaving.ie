import { Link } from "wouter";

export const internalLinkSets = {
  homepage: [
    { text: "Driveways Dublin", href: "/driveways" },
    { text: "Patios Dublin", href: "/patios" },
    { text: "Block Paving Dublin", href: "/block-paving" },
    { text: "Garden Walls Dublin", href: "/garden-walls" },
    { text: "Artificial Grass Dublin", href: "/artificial-grass" },
    { text: "Paving in Swords", href: "/driveways?location=swords" },
    { text: "Paving in Lucan", href: "/driveways?location=lucan" },
    { text: "Paving in Naas", href: "/driveways?location=naas" },
    { text: "Paving in Navan", href: "/driveways?location=navan" },
    { text: "Paving in Dundrum", href: "/driveways?location=dundrum" },
    { text: "Paving in Malahide", href: "/driveways?location=malahide" },
  ],

  serviceToService: {
    "driveways": [
      { text: "Patios", href: "/patios" },
      { text: "Block Paving", href: "/block-paving" },
      { text: "Garden Walls", href: "/garden-walls" },
      { text: "Artificial Grass", href: "/artificial-grass" },
    ],
    "patios": [
      { text: "Driveways", href: "/driveways" },
      { text: "Block Paving", href: "/block-paving" },
      { text: "Garden Walls", href: "/garden-walls" },
      { text: "Artificial Grass", href: "/artificial-grass" },
    ],
    "block-paving": [
      { text: "Driveways", href: "/driveways" },
      { text: "Patios", href: "/patios" },
      { text: "Garden Walls", href: "/garden-walls" },
      { text: "Artificial Grass", href: "/artificial-grass" },
    ],
    "garden-walls": [
      { text: "Driveways", href: "/driveways" },
      { text: "Patios", href: "/patios" },
      { text: "Block Paving", href: "/block-paving" },
      { text: "Artificial Grass", href: "/artificial-grass" },
    ],
    "artificial-grass": [
      { text: "Patios", href: "/patios" },
      { text: "Garden Walls", href: "/garden-walls" },
      { text: "Driveways", href: "/driveways" },
      { text: "Block Paving", href: "/block-paving" },
    ],
  } as Record<string, { text: string; href: string }[]>,

  topDublinAreas: [
    "swords","malahide","blanchardstown","lucan","tallaght","dundrum",
    "blackrock","clontarf","sandyford","castleknock","raheny","dun-laoghaire"
  ],

  topKildareAreas: [
    "naas","maynooth","celbridge","leixlip","newbridge","clane"
  ],

  topMeathAreas: [
    "navan","ashbourne","dunboyne","ratoath","trim","dunshaughlin"
  ],
};

export function formatAreaName(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function ServiceLinksGrid({ serviceSlug, locationSlug }: { serviceSlug: string; locationSlug: string }) {
  const services = ["driveways","patios","block-paving","garden-walls","artificial-grass"];
  const serviceNames: Record<string, string> = {
    "driveways": "Driveways",
    "patios": "Patios",
    "block-paving": "Block Paving",
    "garden-walls": "Garden Walls",
    "artificial-grass": "Artificial Grass",
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
      {services.filter(s => s !== serviceSlug).map(s => (
        <a
          key={s}
          href={`/${s}?location=${locationSlug}`}
          className="text-sm text-center py-2 px-3 rounded border border-gray-200 hover:border-primary hover:text-primary transition-colors"
        >
          {serviceNames[s]} in {formatAreaName(locationSlug)}
        </a>
      ))}
    </div>
  );
}

export function NearbyAreasLinks({ serviceSlug, nearbyAreas }: { serviceSlug: string; nearbyAreas: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {nearbyAreas.map(area => (
        <a
          key={area}
          href={`/${serviceSlug}?location=${area}`}
          className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
        >
          {formatAreaName(area)}
        </a>
      ))}
    </div>
  );
}

export function CountyAreaLinks({ serviceSlug }: { serviceSlug: string }) {
  return (
    <div className="my-8 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">
        {serviceSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Across Dublin, Kildare & Meath
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-medium text-sm text-gray-600 mb-2">County Dublin</h4>
          <div className="flex flex-wrap gap-1">
            {internalLinkSets.topDublinAreas.map(area => (
              <a key={area} href={`/${serviceSlug}?location=${area}`}
                className="text-xs text-primary hover:underline px-1">
                {formatAreaName(area)}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-sm text-gray-600 mb-2">County Kildare</h4>
          <div className="flex flex-wrap gap-1">
            {internalLinkSets.topKildareAreas.map(area => (
              <a key={area} href={`/${serviceSlug}?location=${area}`}
                className="text-xs text-primary hover:underline px-1">
                {formatAreaName(area)}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-sm text-gray-600 mb-2">County Meath</h4>
          <div className="flex flex-wrap gap-1">
            {internalLinkSets.topMeathAreas.map(area => (
              <a key={area} href={`/${serviceSlug}?location=${area}`}
                className="text-xs text-primary hover:underline px-1">
                {formatAreaName(area)}
              </a>
            ))}
          </div>
        </div>
      </div>
      <Link href="/locations" className="inline-block mt-4 text-sm text-primary font-medium hover:underline">
        View all 135 service areas →
      </Link>
    </div>
  );
}

export function RelatedServicesLinks({ serviceSlug }: { serviceSlug: string }) {
  const links = internalLinkSets.serviceToService[serviceSlug] || [];
  if (!links.length) return null;
  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-4">Related Services</h3>
      <div className="flex flex-wrap gap-3">
        {links.map(link => (
          <Link key={link.href} href={link.href}
            className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors">
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
