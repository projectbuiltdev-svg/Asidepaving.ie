import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import PavingServices from "@/pages/paving-services";
import PatiosDriveways from "@/pages/patios-driveways";
import WallsPillars from "@/pages/walls-pillars";
import ArtificialGrassPage from "@/pages/artificial-grass";
import LocationService from "@/pages/LocationService";
import Locations from "@/pages/Locations";
import { ArtificialGrassRouter } from "@/pages/ArtificialGrassRouter";

const queryClient = new QueryClient();

export function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/paving-services" component={PavingServices} />
      <Route path="/patios-driveways" component={PatiosDriveways} />
      <Route path="/walls-pillars" component={WallsPillars} />
      <Route path="/artificial-grass" component={ArtificialGrassRouter} />
      <Route path="/driveways">{() => <LocationService service="driveways" />}</Route>
      <Route path="/patios">{() => <LocationService service="patios" />}</Route>
      <Route path="/block-paving">{() => <LocationService service="block-paving" />}</Route>
      <Route path="/garden-walls">{() => <LocationService service="garden-walls" />}</Route>
      <Route path="/locations" component={Locations} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppRoutes />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
