import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Pill } from "lucide-react";
import { Card } from "@/components/ui/card";

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
    const saved = localStorage.getItem('healthPriorities');
    if (saved) {
      const data = JSON.parse(saved);
      setPriorities(data.priorities || []);
      setMedications(data.medications || []);
    }
  }, []);

  return (
    <div className="min-h-screen pb-16 bg-[#FCFAF7]">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10 p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app/progress')}
            className="p-3 hover:bg-accent rounded-lg transition-colors min-h-[48px] min-w-[48px]"
            aria-label="Tillbaka"
          >
            <ArrowLeft size={28} className="text-[#212658]" />
          </button>
          <h1 className="text-3xl font-bold text-[#212658]">Inställningar</h1>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Health Priorities Card */}
        <Card 
          className="p-6 border-2 shadow-sm cursor-pointer hover:bg-accent/50 transition-all active:scale-[0.98]"
          onClick={() => navigate('/app/health-priorities')}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Heart size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-[#212658] mb-2">Mina hälsomål</h3>
              {priorities.length > 0 ? (
                <div className="space-y-1">
                  {priorities.map((id) => (
                    <p key={id} className="text-[#212658]/70 text-base">
                      • {healthPriorityLabels[id]}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-[#212658]/70 text-base">Inga mål valda ännu</p>
              )}
            </div>
          </div>
        </Card>

        {/* Medications Card */}
        <Card 
          className="p-6 border-2 shadow-sm cursor-pointer hover:bg-accent/50 transition-all active:scale-[0.98]"
          onClick={() => navigate('/app/health-priorities')}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Pill size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-[#212658] mb-2">Mina läkemedel</h3>
              {medications.length > 0 ? (
                <div className="space-y-1">
                  {medications.map((id) => (
                    <p key={id} className="text-[#212658]/70 text-base">
                      • {medicationLabels[id]}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-[#212658]/70 text-base">Inga läkemedel valda ännu</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
