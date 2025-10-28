import { useState, useEffect } from "react";
import { Clock, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { tips } from "@/data/tips";

interface MarkedTip {
  id: number;
  markedDate: string;
  color: string;
}

const Today = () => {
  const navigate = useNavigate();
  const [markedTips, setMarkedTips] = useState<MarkedTip[]>([]);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [healthPrioritiesCompleted, setHealthPrioritiesCompleted] = useState(false);
  const [healthMetricsCompleted, setHealthMetricsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('markedTips');
    if (saved) {
      setMarkedTips(JSON.parse(saved));
    }
    
    const tutorialDone = localStorage.getItem('tutorialCompleted');
    if (tutorialDone === 'true') {
      setTutorialCompleted(true);
    }

    const healthPrioritiesDone = localStorage.getItem('healthPrioritiesCompleted');
    if (healthPrioritiesDone === 'true') {
      setHealthPrioritiesCompleted(true);
    }

    const healthMetricsDone = localStorage.getItem('healthMetricsCompleted');
    if (healthMetricsDone === 'true') {
      setHealthMetricsCompleted(true);
    }
  }, []);

  const markedTipsList = tips.filter(tip => markedTips.some(mt => mt.id === tip.id));

  return (
    <div className="min-h-screen p-6 pb-24 space-y-8 bg-[#FCFAF7]">
      <header>
        <h1 className="text-4xl font-bold text-[#212658] mb-3">Idag</h1>
        <p className="text-[#212658]/70 text-lg font-normal leading-relaxed">
          Uppdateras i din takt  
        </p>
      </header>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-[#212658]">Starta här</h3>
        
        {/* Vertical Progress Stepper */}
        <div className="relative">
          {/* Step 1 */}
          <div className="relative flex gap-5 mb-6 items-center">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={`w-8 h-8 rounded-full shadow-md z-10 flex items-center justify-center transition-colors ${
                tutorialCompleted 
                  ? 'bg-primary border-2 border-primary' 
                  : 'bg-background border-2 border-primary'
              }`}>
                {tutorialCompleted && <Check size={18} className="text-white" strokeWidth={3} />}
              </div>
              <div className="w-0.5 h-14 bg-primary/20 mt-1" />
            </div>
            <div 
              className="flex-1 p-6 hover:bg-accent/50 rounded-lg transition-all cursor-pointer active:scale-[0.98] border-2 border-border bg-card min-h-[80px]"
              onClick={() => navigate('/app/tutorial')}
              aria-label="Gå till tutorial"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-[#212658] mb-2 text-lg">Så fungerar appen</h4>
                  <div className="flex items-center gap-2 text-base text-[#212658]/70 font-semibold">
                    <Clock size={20} strokeWidth={2.5} />
                    <span>5 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="relative flex gap-5 mb-6 items-center">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={`w-8 h-8 rounded-full shadow-md z-10 flex items-center justify-center transition-colors ${
                healthPrioritiesCompleted 
                  ? 'bg-primary border-2 border-primary' 
                  : 'bg-background border-2 border-primary'
              }`}>
                {healthPrioritiesCompleted && <Check size={18} className="text-white" strokeWidth={3} />}
              </div>
              <div className="w-0.5 h-14 bg-primary/20 mt-1" />
            </div>
            <div 
              className="flex-1 p-6 hover:bg-accent/50 rounded-lg transition-all cursor-pointer active:scale-[0.98] border-2 border-border bg-card min-h-[80px]"
              onClick={() => navigate('/app/health-priorities')}
              aria-label="Gå till mina hälsoprioriteringar"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-[#212658] mb-2 text-lg">Anpassa mina tips</h4>
                  <div className="flex items-center gap-2 text-base text-[#212658]/70 font-semibold">
                    <Clock size={20} strokeWidth={2.5} />
                    <span>5 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="relative flex gap-5 items-center">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={`w-8 h-8 rounded-full shadow-md z-10 flex items-center justify-center transition-colors ${
                healthMetricsCompleted 
                  ? 'bg-primary border-2 border-primary' 
                  : 'bg-background border-2 border-primary'
              }`}>
                {healthMetricsCompleted && <Check size={18} className="text-white" strokeWidth={3} />}
              </div>
            </div>
            <div 
              className="flex-1 p-6 hover:bg-accent/50 rounded-lg transition-all cursor-pointer active:scale-[0.98] border-2 border-border bg-card min-h-[80px]"
              onClick={() => navigate('/app/health-metrics')}
              aria-label="Gå till hälsomätningar"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-[#212658] text-lg">Vikt och blodtryck</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 mt-10">
        <h3 className="text-2xl font-bold text-[#212658]">Mina tips den här veckan</h3>
        {markedTipsList.length > 0 ? (
          <div className="space-y-4">
            {markedTipsList.map((tip) => (
              <Card 
                key={tip.id} 
                className={`p-6 hover:shadow-lg transition-all cursor-pointer active:scale-[0.98] ${tip.color} relative border-0 shadow-sm min-h-[80px]`}
                onClick={() => navigate(`/app/tips/${tip.id}`)}
                aria-label={`Visa detaljer om ${tip.title}`}
              >
                <div>
                  <h3 className={`font-bold text-lg ${tip.textColor} mb-2`}>{tip.title}</h3>
                  <div className="text-blue-900 text-base font-bold">
                    {tip.healthScore} poäng
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-[#212658]/70 text-lg leading-relaxed">Välj ett eller två tips för veckan under "Tips"</p>
        )}
      </div>
    </div>
  );
};

export default Today;