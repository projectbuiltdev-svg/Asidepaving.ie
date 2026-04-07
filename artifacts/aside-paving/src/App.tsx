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
import { ArtificialGrassRouter } from "@/pages/ArtificialGrassRouter";
import ServiceRouter from "@/pages/ServiceRouter";

const queryClient = new QueryClient();

export function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/paving-services" component={PavingServices} />
      <Route path="/patios-driveways" component={PatiosDriveways} />
      <Route path="/walls-pillars" component={WallsPillars} />
      <Route path="/artificial-grass" component={ArtificialGrassRouter} />
      <Route path="/driveways">{() => <ServiceRouter service="driveways" />}</Route>
      <Route path="/patios">{() => <ServiceRouter service="patios" />}</Route>
      <Route path="/block-paving">{() => <ServiceRouter service="block-paving" />}</Route>
      <Route path="/garden-walls">{() => <ServiceRouter service="garden-walls" />}</Route>
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
