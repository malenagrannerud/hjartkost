import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { format, startOfMonth, endOfMonth, isSameDay, addDays, isWithinInterval } from "date-fns";
import { sv } from "date-fns/locale";
import { Trophy, Flame } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface MarkedTip {
  id: number;
  markedDate: string;
  color: string;
}

interface DayLog {
  date: string;
  fruitGrams: number;
}

const Progress = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [achievementDays, setAchievementDays] = useState<Date[]>([]);
  const [markedTips, setMarkedTips] = useState<MarkedTip[]>([]);
  const [dayLogs, setDayLogs] = useState<DayLog[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fruitInput, setFruitInput] = useState("");
  
  // Load day logs and marked tips from localStorage
  useEffect(() => {
    const savedLogs = localStorage.getItem('dayLogs');
    if (savedLogs) {
      setDayLogs(JSON.parse(savedLogs));
    }

    const savedTips = localStorage.getItem('markedTips');
    if (savedTips) {
      setMarkedTips(JSON.parse(savedTips));
    }
  }, []);

  // Update achievement days based on day logs (500g+ threshold)
  useEffect(() => {
    const achievedDays = dayLogs
      .filter(log => log.fruitGrams >= 500)
      .map(log => new Date(log.date));
    setAchievementDays(achievedDays);
  }, [dayLogs]);

  // Convert Tailwind color classes to HSL values
  const colorToHsl = (colorClass: string): string => {
    const colorMap: { [key: string]: string } = {
      'bg-green-200': '142 76% 76%',
      'bg-amber-100': '48 96% 89%',
      'bg-cyan-100': '185 96% 90%',
      'bg-yellow-100': '55 92% 88%',
      'bg-blue-100': '214 95% 93%',
      'bg-rose-100': '356 100% 94%',
      'bg-orange-100': '43 100% 90%',
      'bg-purple-100': '270 100% 95%',
      'bg-teal-100': '166 76% 87%',
      'bg-green-100': '138 76% 87%'
    };
    return colorMap[colorClass] || '142 76% 76%';
  };

  // Create modifiers for each marked tip's week
  const getWeekModifiers = () => {
    const modifiers: { [key: string]: Date[] } = {};
    markedTips.forEach((tip, index) => {
      const dates: Date[] = [];
      const startDate = new Date(tip.markedDate);
      for (let i = 0; i < 7; i++) {
        dates.push(addDays(startDate, i));
      }
      modifiers[`tip${tip.id}`] = dates;
    });
    return modifiers;
  };

  const getWeekModifierClassNames = () => {
    const classNames: { [key: string]: string } = {};
    markedTips.forEach((tip) => {
      classNames[`tip${tip.id}`] = `relative after:content-['🍏'] after:absolute after:top-0 after:right-0 after:text-[10px] after:leading-none`;
    });
    return classNames;
  };

  const weekModifiers = getWeekModifiers();
  const weekModifierClassNames = getWeekModifierClassNames();

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

  const handleDayClick = (clickedDate: Date | undefined) => {
    if (!clickedDate) return;
    setSelectedDate(clickedDate);
    
    // Find existing log for this date
    const dateStr = format(clickedDate, 'yyyy-MM-dd');
    const existingLog = dayLogs.find(log => log.date === dateStr);
    setFruitInput(existingLog?.fruitGrams.toString() || "");
    
    setDialogOpen(true);
  };

  const handleSaveFruitLog = () => {
    if (!selectedDate) return;
    
    const grams = parseInt(fruitInput) || 0;
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    
    const updatedLogs = dayLogs.filter(log => log.date !== dateStr);
    if (grams > 0) {
      updatedLogs.push({ date: dateStr, fruitGrams: grams });
    }
    
    setDayLogs(updatedLogs);
    localStorage.setItem('dayLogs', JSON.stringify(updatedLogs));
    
    setDialogOpen(false);
    setFruitInput("");
  };

  return (
    <div className="p-6 pb-24 space-y-6 min-h-screen">
      <header>
        <h1 className="text-3xl font-bold text-blue-900 mb-1">Framsteg</h1>
        <p className="text-blue-900/90 text-base font-normal">Följ dina framsteg, lägg till vikt eller blodtryck, eller redigera loggar</p>
      </header>

      <div className="pt-6 pb-0 flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDayClick}
          locale={sv}
          className="rounded-md border-0 [&_.rdp-caption_label]:font-bold [&_.rdp-caption_label]:capitalize [&_.rdp-head_cell]:capitalize mx-auto text-sm [&_button]:cursor-pointer"
          modifiers={{
            achievement: achievementDays,
            ...weekModifiers
          }}
          modifiersClassNames={{
            ...weekModifierClassNames,
            achievement: "bg-emerald-500 text-white font-bold rounded-full"
          }}
          modifiersStyles={{
            achievement: {
              fontWeight: 'bold'
            }
          }}
        />
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedDate && format(selectedDate, 'd MMMM yyyy', { locale: sv })}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="fruit-grams" className="text-base mb-2 block">
              Hur många gram frukt och grönt?
            </Label>
            <Input
              id="fruit-grams"
              type="number"
              value={fruitInput}
              onChange={(e) => setFruitInput(e.target.value)}
              placeholder="Ange gram"
              className="w-full"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Minst 500g för att markera dagen som klarad
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Avbryt
            </Button>
            <Button onClick={handleSaveFruitLog}>
              Spara
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-2 gap-0 -mt-8 pt-0">
        <div className="py-6 pr-6 pl-0 border-r border-t">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <div className="text-base font-bold text-foreground">
                Klarade dagar
              </div>
              <div className="text-sm text-muted-foreground font-normal">
                Antal dagar du följt dina Tips
              </div>
            </div>
            <div className="flex items-center justify-end">
              <div className="w-16 h-16 rounded-lg bg-emerald-500 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-900">{daysThisMonth}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 pr-0 pl-6 border-t">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <div className="text-base font-bold text-foreground">
                Klarade dagar i rad
              </div>
              <div className="text-sm text-muted-foreground font-normal">
                Antal dagar i rad du följt dina Tips
              </div>
            </div>
            <div className="flex items-center justify-end">
              <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-900">{currentStreak}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;