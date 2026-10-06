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
import Locations from "@/pages/Locations";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import LocationService from "@/pages/LocationService";

const queryClient = new QueryClient();

export function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/paving-services" component={PavingServices} />
      <Route path="/patios-driveways" component={PatiosDriveways} />
      <Route path="/walls-pillars" component={WallsPillars} />
      <Route path="/artificial-grass/:location">{(params) => <LocationService service="artificial-grass" location={params.location ?? ""} />}</Route>
      <Route path="/artificial-grass" component={ArtificialGrassPage} />
      <Route path="/driveways/:location">{(params) => <LocationService service="driveways" location={params.location ?? ""} />}</Route>
      <Route path="/driveways" component={PavingServices} />
      <Route path="/patios/:location">{(params) => <LocationService service="patios" location={params.location ?? ""} />}</Route>
      <Route path="/patios" component={PatiosDriveways} />
      <Route path="/block-paving/:location">{(params) => <LocationService service="block-paving" location={params.location ?? ""} />}</Route>
      <Route path="/block-paving" component={PavingServices} />
      <Route path="/garden-walls/:location">{(params) => <LocationService service="garden-walls" location={params.location ?? ""} />}</Route>
      <Route path="/garden-walls" component={WallsPillars} />
      <Route path="/locations" component={Locations} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/blog" component={Blog} />
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
