import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, BookOpen, TrendingUp, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import fruitsImage from "@/assets/fruits-illustration.jpg";

const Tutorial = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 bg-[#FCFAF7]">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-6">
          <button
            onClick={() => navigate('/app/today')}
            className="flex items-center gap-3 text-[#212658] hover:opacity-70 transition-opacity mb-4 p-3 rounded-lg hover:bg-accent min-h-[48px]"
            aria-label="Gå tillbaka"
          >
            <ArrowLeft size={28} />
            <span className="text-lg font-semibold">Tillbaka</span>
          </button>
          <h1 className="text-4xl font-bold text-[#212658]">Så fungerar appen</h1>
          <p className="text-[#212658]/70 mt-3 text-lg">En enkel guide för dig</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-10">
        {/* Introduction */}
        <div className="space-y-6">
          <p className="text-[#212658] leading-relaxed text-lg">
            Välkommen! Den här appen är skapad för att hjälpa dig ta hand om din hälsa på ett enkelt sätt. 
            Du bestämmer själv tempot - allt går att göra i din egen takt.
          </p>
          <img 
            src={fruitsImage} 
            alt="Färgglada frukter och grönsaker" 
            className="w-full rounded-lg shadow-sm"
          />
        </div>

        {/* Section 1: Today */}
        <Card className="p-8 bg-white border-2 border-border">
          <div className="flex items-start gap-5">
            <div className="bg-green-100 p-4 rounded-full flex-shrink-0">
              <Home className="w-8 h-8 text-green-700" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#212658]">Idag-sidan</h2>
              <p className="text-[#212658] leading-relaxed text-lg">
                När du öppnar appen hamnar du på "Idag"-sidan. Här ser du dina valda hälsotips och kan 
                följa stegen i din egen takt. Du behöver inte göra allt på en gång - ta det lugnt och 
                börja med det som känns rätt för dig.
              </p>
              <div className="bg-[#FCFAF7] p-5 rounded-lg border-2 border-border">
                <p className="text-base text-[#212658] font-medium leading-relaxed">
                  💡 Tips: Börja med att välja ett eller två tips att fokusera på denna vecka.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Section 2: Tips */}
        <Card className="p-8 bg-white border-2 border-border">
          <div className="flex items-start gap-5">
            <div className="bg-blue-100 p-4 rounded-full flex-shrink-0">
              <BookOpen className="w-8 h-8 text-blue-700" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#212658]">Tips-sidan</h2>
              <p className="text-[#212658] leading-relaxed text-lg">
                Under "Tips" hittar du alla hälsoråd. Klicka på ett tips för att läsa mer. 
                När du hittar något som passar dig, tryck på bocken så hamnar tipset under 
                "Mina valda tips" på Idag-sidan.
              </p>
              <p className="text-[#212658] leading-relaxed text-lg">
                Du kan välja så många eller så få tips du vill. Det viktiga är att du väljer 
                sådant som känns hanterbart för just dig.
              </p>
            </div>
          </div>
        </Card>

        {/* Section 3: Progress */}
        <Card className="p-8 bg-white border-2 border-border">
          <div className="flex items-start gap-5">
            <div className="bg-purple-100 p-4 rounded-full flex-shrink-0">
              <TrendingUp className="w-8 h-8 text-purple-700" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#212658]">Framsteg-sidan</h2>
              <p className="text-[#212658] leading-relaxed text-lg">
                Här kan du följa din utveckling över tid. Du ser en kalender där du kan 
                klicka på ett datum för att registrera blodtryck och vikt. 
              </p>
              <p className="text-[#212658] leading-relaxed text-lg">
                Små färgade rutor visar vilka tips du har följt. Ett litet hjärta ♥ betyder 
                att du har registrerat blodtryck, och en vågsymbol ⚖ betyder att du har registrerat din vikt.
              </p>
              <div className="bg-[#FCFAF7] p-5 rounded-lg border-2 border-border">
                <p className="text-base text-[#212658] font-medium leading-relaxed">
                  💡 Tips: Du behöver inte fylla i något varje dag. Gör det när det passar dig.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Section 4: Help */}
        <Card className="p-8 bg-white border-2 border-border">
          <div className="flex items-start gap-5">
            <div className="bg-orange-100 p-4 rounded-full flex-shrink-0">
              <HelpCircle className="w-8 h-8 text-orange-700" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#212658]">Hjälp-sidan</h2>
              <p className="text-[#212658] leading-relaxed text-lg">
                Om du någonsin undrar över något, finns det en hjälp-sida längst ner i menyn. 
                Där hittar du svar på vanliga frågor.
              </p>
            </div>
          </div>
        </Card>

        {/* Encouragement */}
        <div className="bg-green-50 p-8 rounded-lg border-2 border-green-200">
          <h3 className="text-2xl font-bold text-[#212658] mb-4">Du klarar det här!</h3>
          <p className="text-[#212658] leading-relaxed mb-4 text-lg">
            Kom ihåg att varje litet steg räknas. Det spelar ingen roll hur långsamt du går, 
            det viktiga är att du har börjat. Ta dig tid, var snäll mot dig själv, och gör 
            så gott du kan.
          </p>
          <p className="text-[#212658] leading-relaxed text-lg">
            Appen finns här när du behöver den, och allt du gör är i din egen takt.
          </p>
        </div>

        {/* Navigation buttons at bottom */}
        <div className="flex gap-3 pt-6">
          <button
            onClick={() => {
              localStorage.setItem('tutorialCompleted', 'true');
              navigate('/app/today');
            }}
            className="flex-1 bg-[#212658] text-white py-6 rounded-lg font-bold text-xl hover:opacity-90 transition-opacity min-h-[64px]"
            aria-label="Kom igång med appen"
          >
            Kom igång
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
