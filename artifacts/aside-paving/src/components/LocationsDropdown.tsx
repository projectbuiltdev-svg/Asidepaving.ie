import { Link } from "wouter";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MapPin } from "lucide-react";

const services = [
  { href: "/driveways", label: "Driveways", slug: "driveways" },
  { href: "/patios", label: "Patios", slug: "patios" },
  { href: "/block-paving", label: "Block Paving", slug: "block-paving" },
  { href: "/garden-walls", label: "Garden Walls", slug: "garden-walls" },
  { href: "/artificial-grass", label: "Artificial Grass", slug: "artificial-grass" },
];

const counties = [
  {
    name: "Dublin", slug: "dublin",
    areas: ["Swords","Malahide","Blanchardstown","Lucan","Tallaght","Dundrum",
             "Clontarf","Sandyford","Blackrock","Dún Laoghaire","Castleknock","Raheny"]
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

export function LocationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1 text-sm font-medium text-gray-200 hover:text-amber-400 transition-colors outline-none"
        data-testid="dropdown-locations"
      >
        <MapPin className="w-4 h-4" />
        Locations
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Services</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {services.map((service) => (
          <DropdownMenuItem key={service.slug} asChild>
            <Link href={service.href} className="cursor-pointer">
              {service.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Service Areas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {counties.map((county) => (
          <DropdownMenuSub key={county.slug}>
            <DropdownMenuSubTrigger className="font-medium">
              County {county.name}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-56">
              <DropdownMenuLabel className="text-xs text-gray-500">Popular Areas</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {county.areas.map((area) => (
                <DropdownMenuSub key={area}>
                  <DropdownMenuSubTrigger className="text-sm">
                    {area}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="w-48">
                    {services.map((service) => (
                      <DropdownMenuItem key={service.slug} asChild>
                        <Link
                          href={`/${service.slug}?location=${area.toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]/g,'')}`}
                          className="cursor-pointer text-sm"
                        >
                          {service.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/locations"
                  className="cursor-pointer text-sm font-medium text-primary"
                >
                  All {county.name} areas →
                </Link>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/locations" className="cursor-pointer font-medium text-primary">
            View all 129 service areas →
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
