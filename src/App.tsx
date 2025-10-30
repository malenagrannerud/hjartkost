import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import { onboardingCompletedSchema } from "@/lib/schemas";
import Onboarding from "./pages/Onboarding";
import MainApp from "./pages/MainApp";
import NotFound from "./pages/NotFound";

// Keep QueryClient for dependency compatibility
const queryClient = new QueryClient();

const App = () => {
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(() => {
    // Migrate old key if exists
    const oldKey = localStorage.getItem("hasSeenOnboarding");
    if (oldKey === "true") {
      setStorageItem("onboardingCompleted", true, onboardingCompletedSchema);
      localStorage.removeItem("hasSeenOnboarding");
      return true;
    }
    return getStorageItem("onboardingCompleted", onboardingCompletedSchema) ?? false;
  });

  useEffect(() => {
    const completed = getStorageItem("onboardingCompleted", onboardingCompletedSchema) ?? false;
    setOnboardingCompleted(completed);
  }, []);

  const completeOnboarding = () => {
    setStorageItem("onboardingCompleted", true, onboardingCompletedSchema);
    setOnboardingCompleted(true);
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
                onboardingCompleted ? <Navigate to="/app" replace /> : <Navigate to="/welcome" replace />
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