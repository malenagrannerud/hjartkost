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

interface ItemState {
  opened: boolean;
  openedDate?: string;
  completed: boolean;
  completedDate?: string;
}

interface ProgressItem {
  id: string;
  title: string;
  type: 'onboarding' | 'tip';
  route: string;
  duration?: string;
  color?: string;
  textColor?: string;
  healthScore?: number;
  tipData?: any;
}

const Today = () => {
  const navigate = useNavigate();
  const [markedTips, setMarkedTips] = useState<MarkedTip[]>([]);
  const [itemStates, setItemStates] = useState<Record<string, ItemState>>({});
  const [completedActivities, setCompletedActivities] = useState<CompletedActivity[]>([]);
  const [recentActivities, setRecentActivities] = useState<CompletedActivity[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('markedTips');
    if (saved) {
      setMarkedTips(JSON.parse(saved));
    }
    
    // Load item states
    const states = localStorage.getItem('itemStates');
    if (states) {
      setItemStates(JSON.parse(states));
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

  // Create unified progress items array
  const allProgressItems: ProgressItem[] = [
    {
      id: 'tutorial',
      title: 'Så fungerar appen',
      type: 'onboarding',
      route: '/app/tutorial',
      duration: '5 min'
    },
    {
      id: 'health-priorities',
      title: 'Anpassa tips efter mina mål',
      type: 'onboarding',
      route: '/app/health-priorities',
      duration: '5 min'
    },
    {
      id: 'health-metrics',
      title: 'Vikt och blodtryck',
      type: 'onboarding',
      route: '/app/health-metrics'
    },
    ...markedTipsList.map(tip => ({
      id: `tip-${tip.id}`,
      title: tip.title,
      type: 'tip' as const,
      route: `/app/tips/${tip.id}`,
      color: tip.color,
      textColor: tip.textColor,
      healthScore: tip.healthScore,
      tipData: tip
    }))
  ];

  // Function to determine circle color based on state
  const getCircleColor = (itemId: string) => {
    const state = itemStates[itemId];
    
    if (state?.completed) {
      return 'bg-green-500 border-green-500'; // Green
    } else if (state?.opened) {
      return 'bg-orange-400 border-orange-400'; // Orange
    } else {
      return 'bg-gray-300 border-gray-300'; // Gray
    }
  };

  return (
    <div className="min-h-screen p-6 pb-32 space-y-8 bg-[#FCFAF7]">
      <header>
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-4xl font-bold text-[#212658]">Idag</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-accent"
                aria-label="Visa senaste aktiviteter"
              >
                <History size={24} className="text-[#212658]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md bg-[#FCFAF7]">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-[#212658]">Senast</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {allCompletedActivities.length > 0 ? (
                  allCompletedActivities.map((activity, index) => (
                    <Card 
                      key={`${activity.id}-${index}`}
                      className="p-4 bg-card border-2 border-border"
                    >
                      <h4 className="font-semibold text-[#212658] mb-1">{activity.title}</h4>
                      <p className="text-sm text-[#212658]/60">
                        {getRelativeTime(activity.completedDate)}
                      </p>
                    </Card>
                  ))
                ) : (
                  <p className="text-[#212658]/70 text-center py-8">
                    Inga genomförda aktiviteter än
                  </p>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <p className="text-[#212658]/70 text-lg font-normal leading-relaxed">
          Uppdateras i din takt  
        </p>
      </header>

      {/* Unified Progress Flow */}
      <div className="space-y-4 relative z-10">
        {/* Starta här section */}
        <h2 className="text-base font-bold text-[#212658] ml-9 mb-2">Starta här</h2>

        {/* Onboarding items (first 3) */}
        {allProgressItems.slice(0, 3).map((item, index, onboardingItems) => {
          const state = itemStates[item.id];
          const isCompleted = state?.completed || false;
          const isLastOnboarding = index === onboardingItems.length - 1 && markedTipsList.length === 0;

          return (
            <div key={item.id} className="relative flex items-start gap-4">
              {/* Checkpoint Circle with Dotted Line */}
              <div className="flex flex-col items-center flex-shrink-0 pt-5">
                <div 
                  className={`w-5 h-5 rounded-full shadow-sm z-10 flex items-center justify-center transition-colors ${getCircleColor(item.id)}`}
                >
                  {isCompleted && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                {/* Dotted line - show unless last onboarding AND no tips */}
                {!isLastOnboarding && (
                  <div className="border-l-2 border-dotted border-primary/30 h-16 mt-1" />
                )}
              </div>
              
              {/* Card Content */}
              <div 
                className={`flex-1 p-5 hover:bg-accent/50 rounded-lg transition-all cursor-pointer active:scale-[0.98] min-h-[72px] mb-4 ${
                  item.type === 'tip' 
                    ? `${item.color} border-0 shadow-sm` 
                    : 'bg-card border-2 border-border'
                }`}
                onClick={() => navigate(item.route)}
                aria-label={`Gå till ${item.title}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-[#212658] mb-1 text-base">{item.title}</h4>
                    {item.duration && (
                      <div className="flex items-center gap-2 text-sm text-[#212658]/70 font-semibold">
                        <Clock size={16} strokeWidth={2.5} />
                        <span>{item.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Veckans tips section - only if tips exist */}
        {markedTipsList.length > 0 && (
          <>
            <h2 className="text-base font-bold text-[#212658] ml-9 mb-2">Veckans tips</h2>

            {/* Tips items (from index 3 onwards) */}
            {allProgressItems.slice(3).map((item, index, tipsArray) => {
              const state = itemStates[item.id];
              const isCompleted = state?.completed || false;
              const isLast = index === tipsArray.length - 1;

              return (
                <div key={item.id} className="relative flex items-start gap-4">
                  {/* Checkpoint Circle with Dotted Line */}
                  <div className="flex flex-col items-center flex-shrink-0 pt-5">
                    <div 
                      className={`w-5 h-5 rounded-full shadow-sm z-10 flex items-center justify-center transition-colors ${getCircleColor(item.id)}`}
                    >
                      {isCompleted && <Check size={12} className="text-white" strokeWidth={3} />}
                    </div>
                    {/* Dotted line - only if not last tip */}
                    {!isLast && (
                      <div className="border-l-2 border-dotted border-primary/30 h-16 mt-1" />
                    )}
                  </div>
                  
                  {/* Card Content */}
                  <div 
                    className={`flex-1 p-5 hover:bg-accent/50 rounded-lg transition-all cursor-pointer active:scale-[0.98] min-h-[72px] mb-4 ${
                      item.type === 'tip' 
                        ? `${item.color} border-0 shadow-sm` 
                        : 'bg-card border-2 border-border'
                    }`}
                    onClick={() => navigate(item.route)}
                    aria-label={`Gå till ${item.title}`}
                  >
                    <div>
                      <h3 className={`font-bold text-base ${item.textColor} mb-1`}>{item.title}</h3>
                      <div className="text-blue-900 text-sm font-bold">
                        {item.healthScore} poäng
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* Empty state if no tips marked */}
        {markedTipsList.length === 0 && (
          <div className="mt-6 p-4 bg-accent/30 rounded-lg">
            <p className="text-[#212658]/70 text-base leading-relaxed">
              Välj ett eller två tips för veckan under "Tips"
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar - Moved to front */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 py-3 px-6">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => navigate('/app/today')}
          >
            <div className="w-2 h-2 bg-[#212658] rounded-full"></div>
            <span className="text-xs font-medium text-[#212658]">Idag</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => navigate('/app/tips')}
          >
            <div className="w-2 h-2 bg-[#212658]/30 rounded-full"></div>
            <span className="text-xs font-medium text-[#212658]/70">Tips</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => navigate('/app/profile')}
          >
            <div className="w-2 h-2 bg-[#212658]/30 rounded-full"></div>
            <span className="text-xs font-medium text-[#212658]/70">Profil</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Today;