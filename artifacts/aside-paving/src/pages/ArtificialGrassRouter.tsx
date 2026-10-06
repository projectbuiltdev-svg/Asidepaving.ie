import { useSearch } from "wouter";
import ArtificialGrassPage from "@/pages/artificial-grass";
import LocationService from "@/pages/LocationService";

export function ArtificialGrassRouter() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const hasLocation = params.has("location") && params.get("location") !== "";

  if (hasLocation) {
    return <LocationService service="artificial-grass" location={params.get("location") || ""} />;
  }

  return <ArtificialGrassPage />;
}
