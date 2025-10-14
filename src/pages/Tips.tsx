import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tips = [
  {
    id: 1,
    title: "Börja dagen rätt",
    description: "Ät en näringsrik frukost inom en timme efter att du vaknat",
    category: "Mat",
    color: "bg-secondary",
    textColor: "text-secondary-foreground"
  },
  {
    id: 2,
    title: "Planera dina måltider",
    description: "Förbered din veckomeny på söndagar för att undvika impulsköp",
    category: "Mat",
    color: "bg-secondary",
    textColor: "text-secondary-foreground"
  },
  {
    id: 3,
    title: "Variera träningen",
    description: "Blanda styrketräning, kondition och stretching",
    category: "Träning",
    color: "bg-info",
    textColor: "text-info-foreground"
  },
  {
    id: 4,
    title: "Sov tillräckligt",
    description: "Sikta på 7-9 timmar sömn per natt för optimal återhämtning",
    category: "Sömn",
    color: "bg-primary",
    textColor: "text-primary-foreground"
  },
  {
    id: 5,
    title: "Minska stressen",
    description: "Prova meditation eller yoga för att hantera vardagsstress",
    category: "Mental hälsa",
    color: "bg-success",
    textColor: "text-success-foreground"
  },
  {
    id: 6,
    title: "Välj fullkorn",
    description: "Byt ut vitt bröd och pasta mot fullkornsalternativ",
    category: "Mat",
    color: "bg-secondary",
    textColor: "text-secondary-foreground"
  },
  {
    id: 7,
    title: "Sociala kontakter",
    description: "Träffa vänner och familj regelbundet - det är bra för hjärtat!",
    category: "Mental hälsa",
    color: "bg-success",
    textColor: "text-success-foreground"
  },
  {
    id: 8,
    title: "Mät blodtrycket",
    description: "Kontrollera ditt blodtryck regelbundet, särskilt efter 40 års ålder",
    category: "Hälsa",
    color: "bg-warning",
    textColor: "text-warning-foreground"
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