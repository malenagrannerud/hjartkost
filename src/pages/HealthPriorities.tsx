import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface HealthPriority {
  id: string;
  label: string;
  description: string;
}

interface Medication {
  id: string;
  label: string;
  description: string;
  subOptions?: { id: string; label: string; description: string }[];
}

const healthPriorities: HealthPriority[] = [
  {
    id: "cholesterol",
    label: "Sänka mitt kolesterol",
    description: "Få tips om hälsosamma fetter och mat som sänker kolesterolet."
  },
  {
    id: "bloodPressure",
    label: "Sänka mitt blodtryck",
    description: "Få påminnelser och alternativ för att hålla koll på saltet."
  },
  {
    id: "diabetes",
    label: "Minska risker för diabetes typ 2",
    description: "Få råd om kolhydrater och socker vid typ 2-diabetes eller metabola syndromet."
  },
  {
    id: "weight",
    label: "Viktbalans",
    description: "Fokus på energibalans genom kost och motion."
  },
  {
    id: "general",
    label: "Inget ovanstående – ge mig tips för att förebygga hjärt- och kärlsjukdom",
    description: ""
  }
];

const medications: Medication[] = [
  {
    id: "warfarin",
    label: "Waran (Warfarin)",
    description: "Blodförtunnande medicin"
  },
  {
    id: "doac",
    label: "DOAC (blodförtunnande)",
    description: "Till exempel: Eliquis, Xarelto"
  },
  {
    id: "bloodPressureMeds",
    label: "Blodtrycksmedicin",
    description: "",
    subOptions: [
      {
        id: "ace",
        label: "ACE-hämmare",
        description: "Till exempel: Ramipril, Enalapril"
      },
      {
        id: "diuretics",
        label: "Vattenburna tabletter",
        description: "Till exempel: Hydroklorotiazid"
      }
    ]
  },
  {
    id: "statins",
    label: "Kolesterolmedicin",
    description: "Till exempel: Atorvastatin, Simvastatin"
  },
  {
    id: "metformin",
    label: "Metformin",
    description: "Blodsockermedicin"
  }
];

const HealthPriorities = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('healthPriorities');
    if (saved) {
      const data = JSON.parse(saved);
      setSelectedPriorities(data.priorities || []);
      setSelectedMedications(data.medications || []);
    }
  }, []);

  const handlePriorityToggle = (id: string) => {
    setSelectedPriorities(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleMedicationToggle = (id: string) => {
    setSelectedMedications(prev => 
      prev.includes(id) 
        ? prev.filter(m => m !== id)
        : [...prev, id]
    );
  };

  const handleSave = () => {
    const data = {
      priorities: selectedPriorities,
      medications: selectedMedications
    };
    localStorage.setItem('healthPriorities', JSON.stringify(data));
    localStorage.setItem('healthPrioritiesCompleted', 'true');
    
    toast({
      title: "Inställningar sparade",
      description: "Dina val har sparats och appen anpassas efter dina mål.",
    });
    
    navigate('/app/today');
  };

  return (
    <div className="min-h-screen pb-24 bg-[#FCFAF7]">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10 p-6">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate('/app/today')}
            className="p-3 hover:bg-accent rounded-lg transition-colors min-h-[48px] min-w-[48px]"
            aria-label="Tillbaka"
          >
            <ArrowLeft size={28} className="text-[#212658]" />
          </button>
          <h1 className="text-3xl font-bold text-[#212658]">Anpassa appen efter mina mål</h1>
        </div>
        <p className="text-[#212658]/70 text-base ml-14">
          Välj alla som passar dina mål. Dina tips anpassas då för att du ska nå dina mål – du kan ändra detta när som helst.
        </p>
      </header>

      <div className="p-6 space-y-8">
        {/* Health Priorities Section */}
        <section>
          <h2 className="text-2xl font-bold text-[#212658] mb-4">Hjälp mej att:</h2>
          <div className="space-y-4">
            {healthPriorities.map((priority) => (
              <Card key={priority.id} className="p-6 border-2 shadow-sm">
                <label className="flex items-start gap-4 cursor-pointer">
                  <Checkbox
                    checked={selectedPriorities.includes(priority.id)}
                    onCheckedChange={() => handlePriorityToggle(priority.id)}
                    className="mt-1 h-6 w-6 flex-shrink-0"
                    aria-label={priority.label}
                  />
                  <div className="flex-1">
                    <div className="font-bold text-lg text-[#212658] mb-1">
                      {priority.label}
                    </div>
                    {priority.description && (
                      <p className="text-[#212658]/70 text-base">
                        {priority.description}
                      </p>
                    )}
                  </div>
                </label>
              </Card>
            ))}
          </div>
        </section>

        {/* Medications Section */}
        <section>
          <h2 className="text-2xl font-bold text-[#212658] mb-2">Läkemedel</h2>
          <p className="text-[#212658]/70 text-base mb-4">
            Markera de läkemedel du tar regelbundet.
          </p>
          <div className="space-y-4">
            {medications.map((medication) => (
              <Card key={medication.id} className="p-6 border-2 shadow-sm">
                <label className="flex items-start gap-4 cursor-pointer">
                  <Checkbox
                    checked={selectedMedications.includes(medication.id)}
                    onCheckedChange={() => handleMedicationToggle(medication.id)}
                    className="mt-1 h-6 w-6 flex-shrink-0"
                    aria-label={medication.label}
                  />
                  <div className="flex-1">
                    <div className="font-bold text-lg text-[#212658] mb-1">
                      {medication.label}
                    </div>
                    {medication.description && (
                      <p className="text-[#212658]/70 text-base">
                        {medication.description}
                      </p>
                    )}
                  </div>
                </label>
                
                {/* Sub-options for blood pressure medication */}
                {medication.subOptions && selectedMedications.includes(medication.id) && (
                  <div className="ml-10 mt-4 space-y-3">
                    {medication.subOptions.map((subOption) => (
                      <label key={subOption.id} className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={selectedMedications.includes(subOption.id)}
                          onCheckedChange={() => handleMedicationToggle(subOption.id)}
                          className="mt-1 h-5 w-5 flex-shrink-0"
                          aria-label={subOption.label}
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-base text-[#212658]">
                            {subOption.label}
                          </div>
                          <p className="text-[#212658]/70 text-sm">
                            {subOption.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-6 rounded-lg font-bold text-xl transition-all bg-[#212658] text-white hover:opacity-90 shadow-lg min-h-[64px]"
          aria-label="Spara mina val"
        >
          Spara mina val
        </button>
      </div>
    </div>
  );
};

export default HealthPriorities;
