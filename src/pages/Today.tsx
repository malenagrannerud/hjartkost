import { useState, useEffect } from "react";
import { Clock, Check, History } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { tips } from "@/data/tips";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface MarkedTip {
  id: number;
  markedDate: string;
  color: string;
}

interface CompletedActivity {
  id: string;
  title: string;
  completedDate: string;
  type: 'tutorial' | 'health-priorities' | 'health-metrics';
}

const Today = () => {
  const navigate = useNavigate();
  const [markedTips, setMarkedTips] = useState<MarkedTip[]>([]);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [healthPrioritiesCompleted, setHealthPrioritiesCompleted] = useState(false);
  const [healthMetricsCompleted, setHealthMetricsCompleted] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<CompletedActivity[]>([]);
  const [recentActivities, setRecentActivities] = useState<CompletedActivity[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('markedTips');
    if (saved) {
      setMarkedTips(JSON.parse(saved));
    }
    
    const tutorialDone = localStorage.getItem('tutorialCompleted');
    if (tutorialDone === 'true') {
      setTutorialCompleted(true);
    }

    const healthPrioritiesDone = localStorage.getItem('healthPrioritiesCompleted');
    if (healthPrioritiesDone === 'true') {
      setHealthPrioritiesCompleted(true);
    }

    const healthMetricsDone = localStorage.getItem('healthMetricsCompleted');
    if (healthMetricsDone === 'true') {
      setHealthMetricsCompleted(true);
    }

    // Load completed activities
    const completed = localStorage.getItem('completedActivities');
    if (completed) {
      setCompletedActivities(JSON.parse(completed));
    }

    // Check for daily reset at midnight
    checkAndResetDaily();
  }, []);

  const checkAndResetDaily = () => {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem('lastResetDate');
    
    if (lastReset !== today) {
      // It's a new day - move completed activities to recent
      const completed = localStorage.getItem('completedActivities');
      if (completed) {
        const activities: CompletedActivity[] = JSON.parse(completed);
        const recent = localStorage.getItem('recentActivities');
        const existingRecent: CompletedActivity[] = recent ? JSON.parse(recent) : [];
        
        // Combine and keep only last 30 days
        const allRecent = [...existingRecent, ...activities];
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const filteredRecent = allRecent.filter(activity => 
          new Date(activity.completedDate) > thirtyDaysAgo
        );
        
        localStorage.setItem('recentActivities', JSON.stringify(filteredRecent));
        setRecentActivities(filteredRecent);
        
        // Clear today's completed activities
        localStorage.setItem('completedActivities', JSON.stringify([]));
        setCompletedActivities([]);
      }
      
      localStorage.setItem('lastResetDate', today);
    } else {
      // Load recent activities
      const recent = localStorage.getItem('recentActivities');
      if (recent) {
        setRecentActivities(JSON.parse(recent));
      }
    }
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} min sedan`;
    if (diffHours < 24) return `${diffHours} timmar sedan`;
    if (diffDays === 1) return 'Igår';
    return `${diffDays} dagar sedan`;
  };

  const markedTipsList = tips.filter(tip => markedTips.some(mt => mt.id === tip.id));

  const allCompletedActivities = [...completedActivities, ...recentActivities].sort(
    (a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
  );

  return (
    <div className="min-h-screen p-6 pb-24 bg-background">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-4xl font-bold text-foreground">Idag</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-accent"
                aria-label="Visa senaste aktiviteter"
              >
                <History size={20} className="text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md bg-background">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl font-bold text-foreground">Senast</SheetTitle>
              </SheetHeader>
              <div className="space-y-4">
                {allCompletedActivities.length > 0 ? (
                  allCompletedActivities.map((activity, index) => (
                    <Card 
                      key={`${activity.id}-${index}`}
                      className="p-4 bg-card border-border"
                    >
                      <h4 className="font-semibold text-card-foreground mb-1">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {getRelativeTime(activity.completedDate)}
                      </p>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Inga genomförda aktiviteter än
                  </p>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Uppdateras i din takt  
        </p>
      </header>

      {/* Starta här Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">Starta här</h2>
        
        {/* Vertical Progress Stepper */}
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="progress-item">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={`progress-dot ${
                tutorialCompleted 
                  ? 'bg-primary border-primary' 
                  : 'bg-background border-primary'
              }`}>
                {tutorialCompleted && <Check size={14} className="text-primary-foreground" strokeWidth={3} />}
              </div>
              <div className="progress-line" />
            </div>
            <Card 
              className="flex-1 p-5 hover:bg-accent/50 transition-all cursor-pointer active:scale-[0.98] min-h-[80px] card-hover"
              onClick={() => navigate('/app/tutorial')}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-card-foreground mb-2">Så fungerar appen</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <Clock size={16} />
                    <span>5 min</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Step 2 */}
          <div className="progress-item">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={`progress-dot ${
                healthPrioritiesCompleted 
                  ? 'bg-primary border-primary' 
                  : 'bg-background border-primary'
              }`}>
                {healthPrioritiesCompleted && <Check size={14} className="text-primary-foreground" strokeWidth={3} />}
              </div>
              <div className="progress-line" />
            </div>
            <Card 
              className="flex-1 p-5 hover:bg-accent/50 transition-all cursor-pointer active:scale-[0.98] min-h-[80px] card-hover"
              onClick={() => navigate('/app/health-priorities')}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-card-foreground mb-2">Anpassa tips efter mina mål</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <Clock size={16} />
                    <span>5 min</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Step 3 */}
          <div className="progress-item">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={`progress-dot ${
                healthMetricsCompleted 
                  ? 'bg-primary border-primary' 
                  : 'bg-background border-primary'
              }`}>
                {healthMetricsCompleted && <Check size={14} className="text-primary-foreground" strokeWidth={3} />}
              </div>
            </div>
            <Card 
              className="flex-1 p-5 hover:bg-accent/50 transition-all cursor-pointer active:scale-[0.98] min-h-[80px] card-hover"
              onClick={() => navigate('/app/health-metrics')}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-card-foreground">Vikt och blodtryck</h3>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Mina tips den här veckan</h2>
        {markedTipsList.length > 0 ? (
          <div className="space-y-4">
            {markedTipsList.map((tip) => (
              <Card 
                key={tip.id} 
                className={`p-5 hover:shadow-lg transition-all cursor-pointer active:scale-[0.98] border-0 min-h-[80px] card-hover ${tip.color}`}
                onClick={() => navigate(`/app/tips/${tip.id}`)}
              >
                <div>
                  <h3 className={`font-bold ${tip.textColor} mb-2`}>{tip.title}</h3>
                  <div className="text-blue-900 text-sm font-bold">
                    {tip.healthScore} poäng
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 bg-accent/30 border-accent">
            <p className="text-muted-foreground text-center leading-relaxed">
              Välj ett eller två tips för veckan under "Tips"
            </p>
          </Card>
        )}
      </section>
    </div>
  );
};

export default Today;