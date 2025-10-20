import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format, startOfMonth, endOfMonth, isSameDay } from "date-fns";
import { Trophy, Flame } from "lucide-react";

const Progress = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [achievementDays, setAchievementDays] = useState<Date[]>([]);
  
  // Load achievement days from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('achievementDays');
    if (saved) {
      const parsedDays = JSON.parse(saved).map((d: string) => new Date(d));
      setAchievementDays(parsedDays);
    }
  }, []);

  // Calculate days in current month with 10+ points
  const getDaysWithGoalThisMonth = () => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    
    return achievementDays.filter(day => {
      const dayDate = new Date(day);
      return dayDate >= monthStart && dayDate <= monthEnd;
    }).length;
  };

  // Calculate current streak
  const getCurrentStreak = () => {
    if (achievementDays.length === 0) return 0;
    
    const sortedDays = [...achievementDays].sort((a, b) => 
      new Date(b).getTime() - new Date(a).getTime()
    );
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < sortedDays.length; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      
      const hasDay = sortedDays.some(day => {
        const d = new Date(day);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === checkDate.getTime();
      });
      
      if (hasDay) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const daysThisMonth = getDaysWithGoalThisMonth();
  const currentStreak = getCurrentStreak();

  return (
    <div className="p-6 pb-24 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground mb-2">Framsteg</h1>
        <p className="text-muted-foreground">Följ dina framsteg i kalendern</p>
      </header>

      <Card className="p-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          className="rounded-md border-0 w-full"
          modifiers={{
            achievement: achievementDays
          }}
          modifiersStyles={{
            achievement: {
              backgroundColor: 'hsl(var(--primary))',
              color: 'white',
              fontWeight: 'bold'
            }
          }}
        />
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary">{daysThisMonth}</div>
            <div className="text-sm text-muted-foreground font-medium">
              Dagar med 10+ poäng denna månad
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-100/50 to-orange-50/30 border-orange-200">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-orange-200/50 flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-600">{currentStreak}</div>
            <div className="text-sm text-muted-foreground font-medium">
              Dagar i rad
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Progress;