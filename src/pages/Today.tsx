import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

const Today = () => {
  return (
    <div className="p-6 pb-24 space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Idag</h1>
        <p className="text-primary/90 text-base font-semibold">Uppdateras i din egen takt</p>
      </header>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary">Starta här</h3>
        
        {/* Vertical Progress Stepper */}
        <div className="relative pl-8">
          {/* Vertical Line */}
          <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-primary/20" />
          
          {/* Step 1 */}
          <div className="relative mb-4">
            <div className="absolute left-[-32px] top-2 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-md" />
            <Card
              className="p-5 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] transition-transform"
              onClick={() => {/* Navigate to tutorial */}}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-primary mb-1">Lär dej om hur appen fungerar</h4>
                  <div className="flex items-center gap-1 text-xs text-primary/70 font-semibold">
                    <Clock size={16} strokeWidth={2.5} />
                    <span>5 min</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Step 2 */}
          <div className="relative mb-4">
            <div className="absolute left-[-32px] top-2 w-6 h-6 rounded-full bg-primary/30 border-4 border-background shadow-md" />
            <Card
              className="p-5 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] transition-transform"
              onClick={() => {/* Navigate to questionnaire */}}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-primary mb-1">Frågeformulär</h4>
                  <div className="flex items-center gap-1 text-xs text-primary/70 font-semibold">
                    <Clock size={16} strokeWidth={2.5} />
                    <span>8 min</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Step 3 */}
          <div className="relative">
            <div className="absolute left-[-32px] top-2 w-6 h-6 rounded-full bg-primary/30 border-4 border-background shadow-md" />
            <Card
              className="p-5 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] transition-transform"
              onClick={() => {/* Navigate to health metrics */}}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-primary">BMI, blodfetter och blodtryck</h4>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;