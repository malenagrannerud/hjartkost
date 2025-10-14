import { Card } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";

const Progress = () => {
  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground mb-2">Framsteg</h1>
        <p className="text-muted-foreground">Se hur dina hälsovanor utvecklas</p>
      </header>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Veckans sammanfattning</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Dagliga steg</span>
              <span className="text-sm text-muted-foreground">8,500 / 10,000</span>
            </div>
            <ProgressBar value={85} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Vattenintag</span>
              <span className="text-sm text-muted-foreground">1.8 / 2.0 L</span>
            </div>
            <ProgressBar value={90} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Träningspass</span>
              <span className="text-sm text-muted-foreground">4 / 5 dagar</span>
            </div>
            <ProgressBar value={80} className="h-2" />
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Senaste prestationer</h3>
        
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🎉</span>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">7 dagar i rad!</h4>
              <p className="text-sm text-muted-foreground">Du har uppnått ditt dagliga mål alla dagar denna vecka</p>
              <p className="text-xs text-muted-foreground mt-2">För 2 dagar sedan</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start gap-3">
            <span className="text-3xl">💪</span>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">Ny rekord!</h4>
              <p className="text-sm text-muted-foreground">12,000 steg på en dag - ditt högsta än så länge!</p>
              <p className="text-xs text-muted-foreground mt-2">För 5 dagar sedan</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🥗</span>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">Hälsosam månad</h4>
              <p className="text-sm text-muted-foreground">30 dagar med minst 5 portioner grönsaker per dag</p>
              <p className="text-xs text-muted-foreground mt-2">För 1 vecka sedan</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Progress;