import { useState, useEffect } from "react";
import { Clock, Check, History } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { tips } from "@/data/tips";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { pageTitle, pageSubtitle, sectionHeading, sectionSubheading, cardTitle, cardText, cardTextSmall, standardCard, interactiveCard, pageContainer, pagePadding } from "@/lib/design-tokens";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import { markedTipsSchema, completedActivitiesSchema } from "@/lib/schemas";


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
    const savedTips = getStorageItem('markedTips', markedTipsSchema);
    if (savedTips) {
      setMarkedTips(savedTips as MarkedTip[]);
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
    const completed = getStorageItem('completedActivities', completedActivitiesSchema);
    if (completed) {
      setCompletedActivities(completed as CompletedActivity[]);
    }

    // Check for daily reset at midnight
    checkAndResetDaily();
  }, []);

  const checkAndResetDaily = () => {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem('lastResetDate');
    
    if (lastReset !== today) {
      // It's a new day - move completed activities to recent
      const completed = getStorageItem('completedActivities', completedActivitiesSchema);
      if (completed) {
        const activities = completed as CompletedActivity[];
        const recent = getStorageItem('recentActivities', completedActivitiesSchema);
        const existingRecent: CompletedActivity[] = recent ? (recent as CompletedActivity[]) : [];
        
        // Combine and keep only last 30 days
        const allRecent = [...existingRecent, ...activities];
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const filteredRecent = allRecent.filter(activity => 
          new Date(activity.completedDate) > thirtyDaysAgo
        );
        
        setStorageItem('recentActivities', filteredRecent, completedActivitiesSchema);
        setRecentActivities(filteredRecent);
        
        // Clear today's completed activities
        setStorageItem('completedActivities', [], completedActivitiesSchema);
        setCompletedActivities([]);
      }
      
      localStorage.setItem('lastResetDate', today);
    } else {
      // Load recent activities
      const recent = getStorageItem('recentActivities', completedActivitiesSchema);
      if (recent) {
        setRecentActivities(recent as CompletedActivity[]);
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
    <div className={`${pageContainer} ${pagePadding}`}>
      {/* CENTRALIZED HEADER */}
      <header>
        <div className="flex items-start justify-between mb-3">
          <h1 className={pageTitle}>Idag</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-accent"
                aria-label="Visa senaste aktiviteter"
              >
                <History size={24} className="text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md bg-background">
              <SheetHeader>
                <SheetTitle className={`${sectionHeading}`}>Senast</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {allCompletedActivities.length > 0 ? (
                  allCompletedActivities.map((activity, index) => (
                    <Card 
                      key={`${activity.id}-${index}`}
                      className={standardCard}
                    >
                      <h4 className={`${cardTitle} mb-1`}>{activity.title}</h4>
                      <p className={cardTextSmall}>
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
        <p className={pageSubtitle}>
          Uppdateras i din takt  
        </p>
      </header>

      {/* STARTA HÄR SECTION - CENTRALIZED HEADING */}
      <div className="space-y-6">
        <h3 className={sectionHeading}>Starta här</h3>
        
        {/* Vertical Progress Stepper */}
        <div className="relative">
          {/* Step 1 */}
          <div className="relative flex gap-5 mb-6 items-center">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={`w-8 h-8 rounded-full shadow-md z-10 flex items-center justify-center transition-colors ${
                tutorialCompleted 
                  ? 'bg-primary border-2 border-primary' 
                  : 'bg-background border-2 border-primary'
              }`}>
                {tutorialCompleted && <Check size={18} className="text-white" strokeWidth={3} />}
              </div>
              <div className="w-0.5 h-14 bg-primary/20 mt-1" />
            </div>
            <div 
              className={`flex-1 ${interactiveCard} rounded-lg min-h-[80px]`}
              onClick={() => navigate('/app/tutorial')}
              aria-label="Gå till tutorial"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={`${cardTitle} mb-2`}>Så fungerar appen</h4>
                  <div className={`flex items-center gap-2 ${cardText}`}>
                    <Clock size={20} strokeWidth={2.5} />
                    <span>5 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="relative flex gap-5 mb-6 items-center">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={`w-8 h-8 rounded-full shadow-md z-10 flex items-center justify-center transition-colors ${
                healthPrioritiesCompleted 
                  ? 'bg-primary border-2 border-primary' 
                  : 'bg-background border-2 border-primary'
              }`}>
                {healthPrioritiesCompleted && <Check size={18} className="text-white" strokeWidth={3} />}
              </div>
              <div className="w-0.5 h-14 bg-primary/20 mt-1" />
            </div>
            <div 
              className={`flex-1 ${interactiveCard} rounded-lg min-h-[80px]`}
              onClick={() => navigate('/app/health-priorities')}
              aria-label="Gå till mina hälsoprioriteringar"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={`${cardTitle} mb-2`}>Anpassa tips efter mina mål</h4>
                  <div className={`flex items-center gap-2 ${cardText}`}>
                    <Clock size={20} strokeWidth={2.5} />
                    <span>5 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="relative flex gap-5 items-center">
            <div className="flex items-center flex-shrink-0">
              <div className={`w-8 h-8 rounded-full shadow-md z-10 flex items-center justify-center transition-colors ${
                healthMetricsCompleted 
                  ? 'bg-primary border-2 border-primary' 
                  : 'bg-background border-2 border-primary'
              }`}>
                {healthMetricsCompleted && <Check size={18} className="text-white" strokeWidth={3} />}
              </div>
            </div>
            <div 
              className={`flex-1 ${interactiveCard} rounded-lg min-h-[80px]`}
              onClick={() => navigate('/app/health-metrics')}
              aria-label="Gå till hälsomätningar"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={cardTitle}>Vikt och blodtryck</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MINA TIPS SECTION - CENTRALIZED HEADING */}
      <div className="space-y-6">
        <h3 className={sectionHeading}>Mina tips den här veckan</h3>
        {markedTipsList.length > 0 ? (
          <div className="space-y-4">
            {markedTipsList.map((tip) => (
              <Card 
                key={tip.id} 
                className={`p-6 hover:shadow-lg transition-all cursor-pointer active:scale-[0.98] ${tip.color} relative border-0 shadow-sm min-h-[80px]`}
                onClick={() => navigate(`/app/tips/${tip.id}`)}
                aria-label={`Visa detaljer om ${tip.title}`}
              >
                <div>
                  <h3 className={`${cardTitle} ${tip.textColor} mb-2`}>{tip.title}</h3>
                  <div className={`${cardText} font-bold text-blue-900`}>
                    {tip.healthScore} poäng
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className={sectionSubheading}>Välj ett eller två tips för veckan under "Tips"</p>
        )}
      </div>
    </div>
  );
};

export default Today;
