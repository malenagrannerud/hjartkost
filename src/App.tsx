import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Onboarding from "./pages/Onboarding";
import MainApp from "./pages/MainApp";
import NotFound from "./pages/NotFound";
import { getStorageItem, setStorageItem, removeStorageItem } from "@/lib/storage";

const App = () => {
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(() => {
    const completed = getStorageItem("onboardingCompleted");
    return completed === true || completed === "true";
  });

  useEffect(() => {
    // Migration: check old key first
    const oldKey = getStorageItem("hasSeenOnboarding");
    if (oldKey === true || oldKey === "true") {
      setStorageItem("onboardingCompleted", true);
      removeStorageItem("hasSeenOnboarding");
    }
    
    const completed = getStorageItem("onboardingCompleted");
    setOnboardingCompleted(completed === true || completed === "true");
  }, []);

  const completeOnboarding = () => {
    setStorageItem("onboardingCompleted", true);
    setOnboardingCompleted(true);
  };

  return (
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
  );
};

export default App;