import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import welcomeIllustration from "@/assets/welcome-illustration.png";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
      navigate("/app");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background flex items-center justify-center p-4">
      {/* Phone frame */}
      <div className="w-full max-w-md min-h-[90vh] bg-white rounded-[3rem] shadow-2xl border-8 border-foreground/10 overflow-hidden flex flex-col">
        <div className="flex-1 flex flex-col items-start justify-between p-8">
          {step === 1 && (
            <>
              <div className="flex-1 flex flex-col justify-center space-y-6 w-full">
                <h1 className="text-5xl font-bold text-primary">Hjärtkost</h1>
                <p className="text-primary font-bold text-lg leading-relaxed">
                  Ditt individanpassade program för en hjärt-vänlig kosthållning
                </p>
                <div className="w-full mt-4">
                  <img 
                    src={welcomeIllustration} 
                    alt="Welcome illustration" 
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex-1 flex flex-col justify-center space-y-6 w-full bg-blue-100/80 rounded-3xl p-8">
                <h1 className="text-5xl font-bold text-primary text-left">Hjärtkost</h1>
                
                <ul className="space-y-4 text-left">
                  <li className="flex gap-3">
                    <span className="text-primary mt-1 font-bold">•</span>
                    <span className="font-semibold text-foreground">Tio evidensbaserade tips för ett starkare hjärta</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1 font-bold">•</span>
                    <span className="font-semibold text-foreground">Välj vilka tips du vill implementera varje vecka</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1 font-bold">•</span>
                    <span className="font-semibold text-foreground">Upplev effekterna av en näringsriktig diet utan orimliga tvång</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1 font-bold">•</span>
                    <span className="font-semibold text-foreground">Få stöd under resan. Om något tips är svårt att implementera hjälper vi dej att anpassa stegen</span>
                  </li>
                </ul>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex-1 flex flex-col justify-center space-y-8 w-full">
                <h2 className="text-2xl font-bold text-foreground">Redo att börja?</h2>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 text-center">
                    <div className="text-6xl mb-4">❤️</div>
                    <h3 className="font-semibold text-xl mb-3 text-foreground">
                      Ta hand om ditt hjärta
                    </h3>
                    <p className="text-muted-foreground">
                      Små förändringar i vardagen kan göra stor skillnad för din hälsa
                    </p>
                  </div>

                  <div className="bg-card rounded-2xl p-6">
                    <p className="text-sm text-muted-foreground">
                      Kom ihåg att alltid rådfråga din läkare vid medicinska frågor. 
                      Denna app är ett komplement till professionell vård.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Navigation dots */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3].map((dot) => (
              <button
                key={dot}
                onClick={() => setStep(dot)}
                className={`h-2 rounded-full transition-all ${
                  step === dot ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
                aria-label={`Go to step ${dot}`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          {step === 1 ? (
            <div className="w-full flex justify-center">
              <Button 
                onClick={handleNext}
                className="w-2/3 h-12 text-base bg-primary hover:bg-primary/90"
                size="lg"
              >
                Nästa
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="w-full flex gap-3">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12"
                size="lg"
              >
                <ChevronLeft className="mr-2 h-5 w-5" />
                Tillbaka
              </Button>
              
              <Button 
                onClick={handleNext}
                className="flex-1 h-12 text-base bg-primary hover:bg-primary/90"
                size="lg"
              >
                {step === 3 ? "Börja nu" : "Nästa"}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;