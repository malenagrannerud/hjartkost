import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import fruitsIllustration from "@/assets/fruits-illustration.jpg";

const Today = () => {
  return (
    <div className="p-6 pb-24 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-primary mb-2">Idag</h1>
        <p className="text-primary/70">Uppdateras i din egen takt</p>
      </header>

      <Card className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/20">
        <h2 className="text-xl font-semibold mb-3 text-primary">Dagens fokus</h2>
        <p className="text-primary/80 mb-4">
          Kom ihåg att äta minst 5 portioner frukt och grönsaker idag! 🥗
        </p>
        <div className="rounded-xl overflow-hidden">
          <img 
            src={fruitsIllustration} 
            alt="Färska frukter och grönsaker" 
            className="w-full h-48 object-cover"
          />
        </div>
      </Card>

      <div className="space-y-4">
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