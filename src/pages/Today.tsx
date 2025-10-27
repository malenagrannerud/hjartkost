import { useState, useEffect } from "react";
import { Clock, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const tips = [
  {
    id: 1,
    title: "Fem nävar frukt och grönt",
    description: "Minst 500 gram om dagen. Välj gärna olika färger för att få i dig olika näringsämnen",
    color: "bg-green-200",
    textColor: "text-blue-900",
    healthScore: 4
  },
  {
    id: 2,
    title: "Välj fullkorn",
    description: "När du äter spannmålsprodukter som bröd, pasta och gryn - välj helst fullkorn",
    color: "bg-amber-100",
    textColor: "text-blue-900",
    healthScore: 3
  },
  {
    id: 3,
    title: "Ät fisk och skaldjur",
    description: "2-3 gånger i veckan. Variera mellan fet fisk som lax, sill och makrill och magert som torsk",
    color: "bg-cyan-100",
    textColor: "text-blue-900",
    healthScore: 3
  },
  {
    id: 4,
    title: "Välj nyttiga fetter",
    description: "Använd flytande margarin och oljor i matlagning. Begränsa smör, hårdmargarin och andra mättade fetter",
    color: "bg-yellow-100",
    textColor: "text-blue-900",
    healthScore: 3
  },
  {
    id: 5,
    title: "Välj magra mejeriprodukter",
    description: "Mjölk, filmjölk och yoghurt med max 1,5% fett. Ost med max 17% fett",
    color: "bg-blue-100",
    textColor: "text-blue-900",
    healthScore: 3
  },
  {
    id: 6,
    title: "Minska på rött och bearbetat kött",
    description: "Max 500 gram tillagat kött per vecka. Begränsa chark, korv och andra bearbetade köttprodukter",
    color: "bg-rose-100",
    textColor: "text-blue-900",
    healthScore: 3
  },
  {
    id: 7,
    title: "Begränsa socker och salt",
    description: "Undvik läsk, godis och bakverk. Max 6 gram salt per dag. Använd joderat salt",
    color: "bg-orange-100",
    textColor: "text-blue-900",
    healthScore: 4
  },
  {
    id: 8,
    title: "Ät lagom mycket",
    description: "Anpassa mängden mat efter ditt energibehov. Lyssna på din kropp och ät när du är hungrig",
    color: "bg-purple-100",
    textColor: "text-blue-900",
    healthScore: 4
  },
  {
    id: 9,
    title: "Rör på dig",
    description: "Minst 30 minuter om dagen. Fysisk aktivitet är viktig för hälsan tillsammans med bra matvanor",
    color: "bg-teal-100",
    textColor: "text-blue-900",
    healthScore: 5
  },
  {
    id: 10,
    title: "Ät mer baljväxter",
    description: "Bönor, linser och ärtor är bra proteinkällor och innehåller fibrer. Klimatsmart alternativ till kött",
    color: "bg-green-100",
    textColor: "text-blue-900",
    healthScore: 3
  }
];

interface MarkedTip {
  id: number;
  markedDate: string;
  color: string;
}

const Today = () => {
  const navigate = useNavigate();
  const [markedTips, setMarkedTips] = useState<MarkedTip[]>([]);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
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

    const questionnaireDone = localStorage.getItem('questionnaireCompleted');
    if (questionnaireDone === 'true') {
      setQuestionnaireCompleted(true);
    }

    const healthMetricsDone = localStorage.getItem('healthMetricsCompleted');
    if (healthMetricsDone === 'true') {
      setHealthMetricsCompleted(true);
    }
  }, []);

  const markedTipsList = tips.filter(tip => markedTips.some(mt => mt.id === tip.id));

  return (
    <div className="p-6 pb-24 space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary mb-2">Idag</h1>
        <p className="text-primary/90 text-lg font-normal">Uppdateras i din egen takt</p>
      </header>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-primary">Starta här</h3>
        
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
                  <h4 className="font-bold text-primary mb-2 text-lg">Lär dej om hur appen fungerar</h4>
                  <div className="flex items-center gap-2 text-base text-primary/70 font-semibold">
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
                questionnaireCompleted 
                  ? 'bg-primary border-2 border-primary' 
                  : 'bg-background border-2 border-primary'
              }`}>
                {questionnaireCompleted && <Check size={18} className="text-white" strokeWidth={3} />}
              </div>
              <div className="w-0.5 h-14 bg-primary/20 mt-1" />
            </div>
            <div 
              className="flex-1 p-6 hover:bg-accent/50 rounded-lg transition-all cursor-pointer active:scale-[0.98] border-2 border-border bg-card min-h-[80px]"
              onClick={() => navigate('/app/questionnaire')}
              aria-label="Gå till frågeformulär"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-primary mb-2 text-lg">Frågeformulär</h4>
                  <div className="flex items-center gap-2 text-base text-primary/70 font-semibold">
                    <Clock size={20} strokeWidth={2.5} />
                    <span>8 min</span>
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
                  <h4 className="font-bold text-primary text-lg">Vikt och blodtryck</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 mt-10">
        <h3 className="text-2xl font-bold text-primary">Mina valda tips</h3>
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
          <p className="text-primary/70 text-lg leading-relaxed">Välj ett eller två tips för veckan under "Tips"</p>
        )}
      </div>
    </div>
  );
};

export default Today;