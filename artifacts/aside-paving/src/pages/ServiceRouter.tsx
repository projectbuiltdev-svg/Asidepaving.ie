import { useSearch } from "wouter";
import LocationService from "@/pages/LocationService";
import PavingServices from "@/pages/paving-services";
import PatiosDriveways from "@/pages/patios-driveways";
import WallsPillars from "@/pages/walls-pillars";

const serviceLandingPages: Record<string, React.ComponentType> = {
  "driveways": PavingServices,
  "patios": PatiosDriveways,
  "block-paving": PavingServices,
  "garden-walls": WallsPillars,
};

export default function ServiceRouter({ service }: { service: string }) {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const hasLocation = params.has("location") && params.get("location") !== "";

  if (hasLocation) {
    return <LocationService service={service} />;
  }

  const LandingPage = serviceLandingPages[service];
  if (LandingPage) {
    return <LandingPage />;
  }

  return <LocationService service={service} />;
}
