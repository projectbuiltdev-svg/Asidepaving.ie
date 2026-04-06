import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import PavingServices from "@/pages/paving-services";
import PatiosDriveways from "@/pages/patios-driveways";
import WallsPillars from "@/pages/walls-pillars";
import ArtificialGrass from "@/pages/artificial-grass";

const queryClient = new QueryClient();

export function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/paving-services" component={PavingServices} />
      <Route path="/patios-driveways" component={PatiosDriveways} />
      <Route path="/walls-pillars" component={WallsPillars} />
      <Route path="/artificial-grass" component={ArtificialGrass} />
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
