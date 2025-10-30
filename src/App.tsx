import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Onboarding from "./pages/Onboarding";
import MainApp from "./pages/MainApp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(() => {
    const seen = localStorage.getItem("hasSeenOnboarding");
    return seen === "true";
  });

  useEffect(() => {
    const seen = localStorage.getItem("hasSeenOnboarding");
    setHasSeenOnboarding(seen === "true");
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setHasSeenOnboarding(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                hasSeenOnboarding ? <Navigate to="/app" replace /> : <Navigate to="/welcome" replace />
              } 
            />
            <Route 
              path="/welcome" 
              element={<Onboarding onComplete={completeOnboarding} />} 
            />
            <Route path="/app/*" element={<MainApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;