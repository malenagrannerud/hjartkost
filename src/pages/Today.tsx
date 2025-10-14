import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const tips = [
  {
    id: 1,
    title: "Ät mer grönsaker, frukt och bär",
    description: "Minst 500 gram om dagen. Välj gärna olika färger för att få i dig olika näringsämnen",
    color: "bg-green-100",
    textColor: "text-blue-900"
  },
  {
    id: 2,
    title: "Välj fullkorn",
    description: "När du äter spannmålsprodukter som bröd, pasta och gryn - välj helst fullkorn",
    color: "bg-amber-50",
    textColor: "text-blue-900"
  },
  {
    id: 3,
    title: "Ät fisk och skaldjur",
    description: "2-3 gånger i veckan. Variera mellan fet fisk som lax, sill och makrill och magert som torsk",
    color: "bg-cyan-50",
    textColor: "text-blue-900"
  },
  {
    id: 4,
    title: "Välj nyttiga fetter",
    description: "Använd flytande margarin och oljor i matlagning. Begränsa smör, hårdmargarin och andra mättade fetter",
    color: "bg-yellow-50",
    textColor: "text-blue-900"
  },
  {
    id: 5,
    title: "Välj magra mejeriprodukter",
    description: "Mjölk, filmjölk och yoghurt med max 1,5% fett. Ost med max 17% fett",
    color: "bg-blue-50",
    textColor: "text-blue-900"
  },
  {
    id: 6,
    title: "Minska på rött och bearbetat kött",
    description: "Max 500 gram tillagat kött per vecka. Begränsa chark, korv och andra bearbetade köttprodukter",
    color: "bg-rose-50",
    textColor: "text-blue-900"
  },
  {
    id: 7,
    title: "Begränsa socker och salt",
    description: "Undvik läsk, godis och bakverk. Max 6 gram salt per dag. Använd joderat salt",
    color: "bg-orange-50",
    textColor: "text-blue-900"
  },
  {
    id: 8,
    title: "Ät lagom mycket",
    description: "Anpassa mängden mat efter ditt energibehov. Lyssna på din kropp och ät när du är hungrig",
    color: "bg-purple-50",
    textColor: "text-blue-900"
  },
  {
    id: 9,
    title: "Rör på dig",
    description: "Minst 30 minuter om dagen. Fysisk aktivitet är viktig för hälsan tillsammans med bra matvanor",
    color: "bg-teal-50",
    textColor: "text-blue-900"
  },
  {
    id: 10,
    title: "Ät mer baljväxter",
    description: "Bönor, linser och ärtor är bra proteinkällor och innehåller fibrer. Klimatsmart alternativ till kött",
    color: "bg-green-50",
    textColor: "text-blue-900"
  }
];

const Today = () => {
  const [markedTips, setMarkedTips] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('markedTips');
    if (saved) {
      setMarkedTips(JSON.parse(saved));
    }
  }, []);

  const markedTipsList = tips.filter(tip => markedTips.includes(tip.id));

  return (
    <div className="p-6 pb-24 space-y-6 pt-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Idag</h1>
        <p className="text-primary/90 text-base font-semibold">Uppdateras i din egen takt</p>
      </header>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary">Starta här</h3>
        
        {/* Vertical Progress Stepper */}
        <div className="relative">
          {/* Step 1 */}
          <div className="relative flex gap-4 mb-4 items-center">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-background border-2 border-primary shadow-md z-10" />
              <div className="w-0.5 h-12 bg-primary/20 mt-1" />
            </div>
            <div 
              className="flex-1 p-5 hover:bg-accent/50 rounded-lg transition-all cursor-pointer active:scale-[0.98]"
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
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="relative flex gap-4 mb-4 items-center">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-background border-2 border-primary shadow-md z-10" />
              <div className="w-0.5 h-12 bg-primary/20 mt-1" />
            </div>
            <div 
              className="flex-1 p-5 hover:bg-accent/50 rounded-lg transition-all cursor-pointer active:scale-[0.98]"
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
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="relative flex gap-4 items-center">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-background border-2 border-primary shadow-md z-10" />
            </div>
            <div 
              className="flex-1 p-5 hover:bg-accent/50 rounded-lg transition-all cursor-pointer active:scale-[0.98]"
              onClick={() => {/* Navigate to health metrics */}}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-primary">BMI, blodfetter och blodtryck</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {markedTipsList.length > 0 && (
        <div className="space-y-4 mt-8">
          <h3 className="text-lg font-bold text-primary">Mina valda tips</h3>
          <div className="space-y-3">
            {markedTipsList.map((tip) => (
              <Card key={tip.id} className={`p-4 ${tip.color} border-0 shadow-none`}>
                <h4 className={`font-semibold text-sm ${tip.textColor} mb-1`}>{tip.title}</h4>
                <p className={`text-xs ${tip.textColor} opacity-80`}>{tip.description}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Today;