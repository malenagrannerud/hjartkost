import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Help = () => {
  return (
    <div className="p-6 pb-24 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-primary mb-1">Hjälp</h1>
        <p className="text-primary/90 text-base font-normal">Vanliga frågor och svar</p>
      </header>

      <Card className="p-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-foreground font-semibold">
              Vad är Hjärtkost?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Hjärtkost är ett individanpassat program för en hjärtvänlig kosthållning. 
              Vi hjälper dig att implementera evidensbaserade tips för ett starkare hjärta.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-foreground font-semibold">
              Hur ofta ska jag använda appen?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Vi rekommenderar att du använder appen dagligen för att få bästa resultat. 
              Checka in varje dag för att se dina tips och följa dina framsteg.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-foreground font-semibold">
              Kan jag anpassa mina mål?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Ja! Du kan välja vilka tips du vill implementera varje vecka. 
              Om något tips är svårt att implementera hjälper vi dig att anpassa stegen.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-foreground font-semibold">
              Ersätter appen läkarvård?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Nej, denna app är ett komplement till professionell vård. 
              Rådfråga alltid din läkare vid medicinska frågor eller innan du gör större ändringar i din livsstil.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-foreground font-semibold">
              Hur följer jag mina framsteg?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Gå till fliken "Framsteg" för att se hur dina hälsovanor utvecklas. 
              Där kan du följa dina dagliga mål och se dina prestationer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <h2 className="text-xl font-semibold mb-3 text-foreground">Kontakta oss</h2>
        <p className="text-foreground/80 mb-4">
          Har du frågor som inte besvaras här? Tveka inte att höra av dig!
        </p>
        <p className="text-sm text-muted-foreground">
          📧 support@hjartkost.se
        </p>
      </Card>
    </div>
  );
};

export default Help;
