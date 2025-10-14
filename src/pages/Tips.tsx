import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const tips = [
  {
    id: 1,
    title: "Ät mer grönsaker, frukt och bär",
    description: "Minst 500 gram om dagen. Välj gärna olika färger för att få i dig olika näringsämnen",
    detailedInfo: "Grönsaker, frukt och bär innehåller fibrer, vitaminer och mineraler som kroppen behöver. De mättar bra och ger skydd mot flera sjukdomar. Försök äta minst 500 gram per dag. Variationen är viktig - olika färger innehåller olika nyttigheter. Frysta och konserverade grönsaker räknas också.",
    category: "Livsmedelsverket",
    color: "bg-green-100",
    textColor: "text-blue-900"
  },
  {
    id: 2,
    title: "Välj fullkorn",
    description: "När du äter spannmålsprodukter som bröd, pasta och gryn - välj helst fullkorn",
    detailedInfo: "Fullkornsprodukter innehåller mer fibrer, vitaminer och mineraler än produkter av raffinerat mjöl. Fibrer mättar bra och är viktiga för matsmältningen. Fullkorn kan också ge skydd mot hjärt-kärlsjukdom och typ 2-diabetes. Välj gärna rågbröd, havregryn, fullkornspasta och råris.",
    category: "Livsmedelsverket",
    color: "bg-amber-50",
    textColor: "text-blue-900"
  },
  {
    id: 3,
    title: "Ät fisk och skaldjur",
    description: "2-3 gånger i veckan. Variera mellan fet fisk som lax, sill och makrill och magert som torsk",
    detailedInfo: "Fisk och skaldjur innehåller protein, D-vitamin, jod och selen. Fet fisk innehåller dessutom omega-3-fettsyror som är viktiga för hjärtat och hjärnan. Ät fisk och skaldjur 2-3 gånger i veckan och blanda mellan fet och mager fisk. Exempel på fet fisk är lax, sill, makrill och strömming.",
    category: "Livsmedelsverket",
    color: "bg-cyan-50",
    textColor: "text-blue-900"
  },
  {
    id: 4,
    title: "Välj nyttiga fetter",
    description: "Använd flytande margarin och oljor i matlagning. Begränsa smör, hårdmargarin och andra mättade fetter",
    detailedInfo: "Fettkvaliteten påverkar hälsan. Omättade fetter från växtolior, flytande margarin, nötter och fet fisk är nyttigare än mättade fetter från smör, hårdmargarin och fett kött. Byt gärna ut mättade fetter mot omättade. Använd rapsolja eller olivolja i matlagningen.",
    category: "Livsmedelsverket",
    color: "bg-yellow-50",
    textColor: "text-blue-900"
  },
  {
    id: 5,
    title: "Välj magra mejeriprodukter",
    description: "Mjölk, filmjölk och yoghurt med max 1,5% fett. Ost med max 17% fett",
    detailedInfo: "Mejeriprodukter innehåller kalcium, protein, jod och flera vitaminer. För de flesta är det bra att välja magra varianter för att minska intaget av mättat fett. Välj mjölk, fil och yoghurt med max 1,5% fett. Vid ostköp, välj ost med högst 17% fett. Laktosfria alternativ finns om du inte tål laktos.",
    category: "Livsmedelsverket",
    color: "bg-blue-50",
    textColor: "text-blue-900"
  },
  {
    id: 6,
    title: "Minska på rött och bearbetat kött",
    description: "Max 500 gram tillagat kött per vecka. Begränsa chark, korv och andra bearbetade köttprodukter",
    detailedInfo: "Kött innehåller protein, järn och B-vitaminer, men ett stort intag av rött kött och charkprodukter ökar risken för tjocktarmscancer. Begränsa till max 500 gram tillagat rött kött per vecka. Välj gärna fågel, fisk eller vegetabiliska proteinkällor som bönor och linser istället. Undvik chark och korv så ofta som möjligt.",
    category: "Livsmedelsverket",
    color: "bg-rose-50",
    textColor: "text-blue-900"
  },
  {
    id: 7,
    title: "Begränsa socker och salt",
    description: "Undvik läsk, godis och bakverk. Max 6 gram salt per dag. Använd joderat salt",
    detailedInfo: "Högt sockerintag ökar risken för karies, övervikt och typ 2-diabetes. Begränsa sötsaker, läsk och godis. För mycket salt ökar risken för högt blodtryck. Ät max 6 gram salt per dag - det motsvarar en tesked. Använd joderat salt och undvik att salta för mycket. Färdiglagad mat innehåller ofta mycket salt.",
    category: "Livsmedelsverket",
    color: "bg-orange-50",
    textColor: "text-blue-900"
  },
  {
    id: 8,
    title: "Ät lagom mycket",
    description: "Anpassa mängden mat efter ditt energibehov. Lyssna på din kropp och ät när du är hungrig",
    detailedInfo: "Energibehovet varierar mellan personer beroende på ålder, kön och hur mycket du rör dig. Ät lagom mycket för att hålla en hälsosam vikt. Lyssna på kroppens signaler - ät när du är hungrig och sluta när du är mätt. Regelbundna måltider och mellanmål hjälper till att hålla blodsockret stabilt.",
    category: "Livsmedelsverket",
    color: "bg-purple-50",
    textColor: "text-blue-900"
  },
  {
    id: 9,
    title: "Rör på dig",
    description: "Minst 30 minuter om dagen. Fysisk aktivitet är viktig för hälsan tillsammans med bra matvanor",
    detailedInfo: "Fysisk aktivitet är en viktig del av en hälsosam livsstil. Rör på dig minst 30 minuter om dagen med måttlig intensitet. Det kan vara promenader, cykling, trädgårdsarbete eller annan vardagsmotion. Motion i kombination med bra matvanor minskar risken för övervikt, hjärt-kärlsjukdom, diabetes och cancer.",
    category: "Livsmedelsverket",
    color: "bg-teal-50",
    textColor: "text-blue-900"
  },
  {
    id: 10,
    title: "Ät mer baljväxter",
    description: "Bönor, linser och ärtor är bra proteinkällor och innehåller fibrer. Klimatsmart alternativ till kött",
    detailedInfo: "Baljväxter som bönor, linser, ärtor och kikärtor innehåller protein, fibrer, vitaminer och mineraler. De är klimatsmarta alternativ till kött och fungerar utmärkt i grytor, soppor, sallader och köttfärsblandningar. Baljväxter mättar bra och är dessutom prisvärda. Både torkade och konserverade varianter är bra.",
    category: "Livsmedelsverket",
    color: "bg-green-50",
    textColor: "text-blue-900"
  }
];

const Tips = () => {
  const [selectedTip, setSelectedTip] = useState<typeof tips[0] | null>(null);
  const [markedTips, setMarkedTips] = useState<number[]>(() => {
    const saved = localStorage.getItem('markedTips');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('markedTips', JSON.stringify(markedTips));
  }, [markedTips]);

  const toggleMark = (e: React.MouseEvent, tipId: number) => {
    e.stopPropagation();
    setMarkedTips(prev => 
      prev.includes(tipId) 
        ? prev.filter(id => id !== tipId)
        : [...prev, tipId]
    );
  };

  return (
    <div className="p-6 pb-24 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mina tips</h1>
        <p className="text-muted-foreground">Välj ett eller två tips åt gången</p>
      </header>

      <div className="space-y-4">
        {tips.map((tip) => (
          <Card 
            key={tip.id} 
            className={`p-5 hover:shadow-md transition-all cursor-pointer active:scale-[0.98] ${tip.color} relative`}
            onClick={() => setSelectedTip(tip)}
          >
            <div 
              className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                markedTips.includes(tip.id) 
                  ? 'bg-blue-900 border-blue-900' 
                  : 'bg-white/50 border-blue-900/30'
              }`}
              onClick={(e) => toggleMark(e, tip.id)}
            >
              {markedTips.includes(tip.id) && <Check size={16} className="text-white" strokeWidth={3} />}
            </div>
            <div className="space-y-3 pr-8">
              <h3 className={`font-semibold ${tip.textColor}`}>{tip.title}</h3>
              <p className={`text-sm ${tip.textColor} opacity-80`}>{tip.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedTip} onOpenChange={() => setSelectedTip(null)}>
        <DialogContent className={selectedTip?.color}>
          <DialogHeader>
            <DialogTitle className={selectedTip?.textColor}>{selectedTip?.title}</DialogTitle>
            <DialogDescription className={`${selectedTip?.textColor} opacity-80 pt-4`}>
              {selectedTip?.detailedInfo}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tips;