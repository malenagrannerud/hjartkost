import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

const Today = () => {
  return (
    <div className="p-6 pb-24 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-primary mb-2">Idag</h1>
        <p className="text-primary/90 text-base font-medium">Uppdateras i din egen takt</p>
      </header>

      <div className="space-y-2">
        <Progress value={33} className="h-2" />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Starta här</h3>

        <Card
          className="p-5 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] transition-transform"
          onClick={() => {/* Navigate to tutorial */}}
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-primary mb-1">Lär dej om hur appen fungerar</h4>
              <div className="flex items-center gap-1 text-xs text-primary/70">
                <Clock size={14} />
                <span>5 min</span>
              </div>
            </div>
          </div>
        </Card>

        <Card 
          className="p-5 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] transition-transform"
          onClick={() => {/* Navigate to questionnaire */}}
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-primary mb-1">Frågeformulär</h4>
              <div className="flex items-center gap-1 text-xs text-primary/70">
                <Clock size={14} />
                <span>8 min</span>
              </div>
            </div>
          </div>
        </Card>

        <Card 
          className="p-5 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] transition-transform"
          onClick={() => {/* Navigate to health metrics */}}
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-primary">BMI, blodfetter och blodtryck</h4>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Today;