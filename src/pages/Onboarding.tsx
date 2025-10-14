import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import welcomeIllustration from "@/assets/welcome-illustration.jpg";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onComplete();
      navigate("/app");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-6 max-w-md mx-auto">
      {step === 1 ? (
        <>
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Hjärtkost</h1>
            <p className="text-muted-foreground max-w-sm">
              Din personliga guide till en hjärtvänlig livsstil
            </p>
            <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={welcomeIllustration} 
                alt="Welcome illustration" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleNext}
            className="w-full h-12 text-base bg-primary hover:bg-primary/90 mb-4"
            size="lg"
          >
            Kom igång
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </>
      ) : (
        <>
          <div className="flex-1 flex flex-col justify-center text-center space-y-8">
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

          <Button 
            onClick={handleNext}
            className="w-full h-12 text-base bg-primary hover:bg-primary/90 mb-4"
            size="lg"
          >
            Börja nu
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </>
      )}
    </div>
  );
};

export default Onboarding;