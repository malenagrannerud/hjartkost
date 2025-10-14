import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import welcomeIllustration from "@/assets/welcome-illustration.jpg";

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
      <div className="w-full max-w-md min-h-[90vh] bg-background rounded-[3rem] shadow-2xl border-8 border-foreground/10 overflow-hidden flex flex-col">
        <div className="flex-1 flex flex-col items-start justify-between p-8">
          {step === 1 && (
            <>
              <div className="flex-1 flex flex-col justify-center space-y-6 w-full">
                <h1 className="text-5xl font-bold text-primary">Hjärtkost</h1>
                <p className="text-primary font-bold text-lg leading-relaxed">
                  Ditt individanpassade program för en hjärt-vänlig kosthållning
                </p>
                <div className="w-full rounded-2xl overflow-hidden shadow-lg mt-4">
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
              <div className="flex-1 flex flex-col justify-center space-y-8 w-full">
                <h2 className="text-2xl font-bold text-foreground">Vad ingår?</h2>
                
                <div className="space-y-6">
                  <div className="bg-card rounded-2xl p-6 text-left shadow-sm">
                    <h3 className="font-semibold text-lg mb-2 text-foreground">📊 Personliga tips</h3>
                    <p className="text-muted-foreground">
                      Få skräddarsydda råd baserat på dina behov och mål
                    </p>
                  </div>

                  <div className="bg-card rounded-2xl p-6 text-left shadow-sm">
                    <h3 className="font-semibold text-lg mb-2 text-foreground">🥗 Mat och recept</h3>
                    <p className="text-muted-foreground">
                      Upptäck hälsosamma och läckra recept för varje dag
                    </p>
                  </div>

                  <div className="bg-card rounded-2xl p-6 text-left shadow-sm">
                    <h3 className="font-semibold text-lg mb-2 text-foreground">📈 Följ din progress</h3>
                    <p className="text-muted-foreground">
                      Se hur dina hälsovanor utvecklas över tid
                    </p>
                  </div>
                </div>
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
          <div className="w-full flex gap-3">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
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
        </div>
      </div>
    </div>
  );
};

export default Onboarding;