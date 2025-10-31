import { useState, useEffect } from "react";
import { Clock, History } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { tips } from "@/data/tips";
import TipCard from "@/components/TipCard";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { pageTitle, pageSubtitle, sectionHeading, sectionSubheading, cardTitle, cardText, cardTextSmall, standardCard, interactiveCard, pageContainer, pagePadding, iconButton, headerContainer } from "@/lib/design-tokens";
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
  const [completedActivities, setCompletedActivities] = useState<CompletedActivity[]>([]);
  const [recentActivities, setRecentActivities] = useState<CompletedActivity[]>([]);

  useEffect(() => {
    const savedTips = getStorageItem('markedTips', markedTipsSchema);
    if (savedTips) {
      setMarkedTips(savedTips as MarkedTip[]);
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
   <header className={headerContainer}>
  <div className="flex items-start justify-between">
    {/* 1. Page Title */}
    <div>
      <h1 className={pageTitle}>Idag</h1>
    </div>
    
    {/* 2. History Icon Button */}
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={iconButton}
          aria-label="Visa senaste aktiviteter"
        >
          <History size={24} className="text-foreground" />
        </Button>
      </SheetTrigger>
      {/* The SheetContent with activity history stays here too */}
      <SheetContent side="right" className="w-full sm:max-w-md bg-background">
        {/* ... activity history content ... */}
      </SheetContent>
    </Sheet>
  </div>
</header>
  );
};

export default Today;
