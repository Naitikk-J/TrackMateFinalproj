import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TouristAuth from "./pages/TouristAuth";
import TouristDashboard from "./pages/TouristDashboard";
import TouristProfile from "./pages/TouristProfile";
import TouristItinerary from "./pages/TouristItinerary";
import PoliceDashboard from "./pages/PoliceDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tourist" element={<TouristAuth />} />
          <Route path="/tourist/dashboard" element={<TouristDashboard />} />
          <Route path="/tourist/profile" element={<TouristProfile />} />
          <Route path="/tourist/itinerary" element={<TouristItinerary />} />
          <Route path="/police" element={<PoliceDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
