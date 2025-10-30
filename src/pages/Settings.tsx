import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Pill } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pageTitle, cardTitle, cardText, interactiveCard, headerContainer, backButton, pageContainer, pagePadding } from "@/lib/design-tokens";
import { getStorageItem } from "@/lib/storage";
import { healthPrioritiesSchema } from "@/lib/schemas";

interface HealthPriority {
  id: string;
  label: string;
}

const healthPriorityLabels: Record<string, string> = {
  cholesterol: "Sänk mitt kolesterol",
  bloodPressure: "Sänk mitt blodtryck",
  diabetes: "Minska risken för diabetes typ 2",
  weight: "Viktbalans",
  general: "Förebygga hjärt- och kärlsjukdom"
};

const medicationLabels: Record<string, string> = {
  warfarin: "Waran (Warfarin)",
  doac: "DOAC (blodförtunnande)",
  bloodPressureMeds: "Blodtrycksmedicin",
  ace: "ACE-hämmare",
  diuretics: "Vattenburna tabletter",
  statins: "Kolesterolmedicin",
  metformin: "Metformin"
};

const Settings = () => {
  const navigate = useNavigate();
  const [priorities, setPriorities] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);

  useEffect(() => {
    const data = getStorageItem('healthPriorities', healthPrioritiesSchema);
    if (data) {
      setPriorities(data.priorities || []);
      setMedications(data.medications || []);
    }
  }, []);

  return (
    <div className={`${pageContainer} pb-16`}>
      {/* Header - CENTRALIZED */}
      <header className={headerContainer}>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate('/app/progress')}
            className={backButton}
            aria-label="Tillbaka"
          >
            <ArrowLeft size={28} className="text-foreground" />
          </Button>
          <h1 className={`${pageTitle} text-3xl`}>Inställningar</h1>
        </div>
      </header>

      <div className={`${pagePadding} space-y-6`}>
        {/* Health Priorities Card - CENTRALIZED & FIXED NAVIGATION */}
        <Card 
          className={interactiveCard}
          onClick={() => navigate('/app/health-priorities')}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Heart size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className={`${cardTitle} mb-2`}>Mina hälsomål</h3>
              {priorities.length > 0 ? (
                <div className="space-y-1">
                  {priorities.map((id) => (
                    <p key={id} className={cardText}>
                      • {healthPriorityLabels[id]}
                    </p>
                  ))}
                </div>
              ) : (
                <p className={cardText}>Inga mål valda ännu</p>
              )}
            </div>
          </div>
        </Card>

        {/* Medications Card - CENTRALIZED & SAME NAVIGATION AS HEALTH PRIORITIES */}
        <Card 
          className={interactiveCard}
          onClick={() => navigate('/app/health-priorities')}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Pill size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className={`${cardTitle} mb-2`}>Mina läkemedel</h3>
              {medications.length > 0 ? (
                <div className="space-y-1">
                  {medications.map((id) => (
                    <p key={id} className={cardText}>
                      • {medicationLabels[id]}
                    </p>
                  ))}
                </div>
              ) : (
                <p className={cardText}>Inga läkemedel valda ännu</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
