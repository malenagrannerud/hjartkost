import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tips = [
  {
    id: 1,
    title: "Ät mer grönsaker, frukt och bär",
    description: "Minst 500 gram om dagen. Välj gärna olika färger för att få i dig olika näringsämnen",
    category: "Livsmedelsverket",
    color: "bg-secondary",
    textColor: "text-secondary-foreground"
  },
  {
    id: 2,
    title: "Välj fullkorn",
    description: "När du äter spannmålsprodukter som bröd, pasta och gryn - välj helst fullkorn",
    category: "Livsmedelsverket",
    color: "bg-secondary",
    textColor: "text-secondary-foreground"
  },
  {
    id: 3,
    title: "Ät fisk och skaldjur",
    description: "2-3 gånger i veckan. Variera mellan fet fisk som lax, sill och makrill och magert som torsk",
    category: "Livsmedelsverket",
    color: "bg-info",
    textColor: "text-info-foreground"
  },
  {
    id: 4,
    title: "Välj nyttiga fetter",
    description: "Använd flytande margarin och oljor i matlagning. Begränsa smör, hårdmargarin och andra mättade fetter",
    category: "Livsmedelsverket",
    color: "bg-primary",
    textColor: "text-primary-foreground"
  },
  {
    id: 5,
    title: "Välj magra mejeriprodukter",
    description: "Mjölk, filmjölk och yoghurt med max 1,5% fett. Ost med max 17% fett",
    category: "Livsmedelsverket",
    color: "bg-success",
    textColor: "text-success-foreground"
  },
  {
    id: 6,
    title: "Minska på rött och bearbetat kött",
    description: "Max 500 gram tillagat kött per vecka. Begränsa chark, korv och andra bearbetade köttprodukter",
    category: "Livsmedelsverket",
    color: "bg-warning",
    textColor: "text-warning-foreground"
  },
  {
    id: 7,
    title: "Begränsa socker och salt",
    description: "Undvik läsk, godis och bakverk. Max 6 gram salt per dag. Använd joderat salt",
    category: "Livsmedelsverket",
    color: "bg-warning",
    textColor: "text-warning-foreground"
  },
  {
    id: 8,
    title: "Ät lagom mycket",
    description: "Anpassa mängden mat efter ditt energibehov. Lyssna på din kropp och ät när du är hungrig",
    category: "Livsmedelsverket",
    color: "bg-primary",
    textColor: "text-primary-foreground"
  },
  {
    id: 9,
    title: "Rör på dig",
    description: "Minst 30 minuter om dagen. Fysisk aktivitet är viktig för hälsan tillsammans med bra matvanor",
    category: "Livsmedelsverket",
    color: "bg-success",
    textColor: "text-success-foreground"
  },
  {
    id: 10,
    title: "Ät mer baljväxter",
    description: "Bönor, linser och ärtor är bra proteinkällor och innehåller fibrer. Klimatsmart alternativ till kött",
    category: "Livsmedelsverket",
    color: "bg-secondary",
    textColor: "text-secondary-foreground"
  }
];

const Tips = () => {
  return (
    <div className="p-6 pb-24 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mina tips</h1>
        <p className="text-muted-foreground">Användbara råd för en hälsosam livsstil</p>
      </header>

      <div className="space-y-4">
        {tips.map((tip) => (
          <Card key={tip.id} className="p-5 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-foreground flex-1">{tip.title}</h3>
                <Badge className={`${tip.color} ${tip.textColor} text-xs`}>
                  {tip.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tips;