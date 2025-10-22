import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { format, startOfMonth, endOfMonth, isSameDay, addDays, isWithinInterval } from "date-fns";
import { sv } from "date-fns/locale";
import { Trophy, Flame, Weight, Activity, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface MarkedTip {
  id: number;
  markedDate: string;
  color: string;
}

interface DayLog {
  date: string;
  entries: {
    type: 'weight' | 'bloodPressure' | 'tip';
    value: number; // grams for tips, kg for weight, systolic for blood pressure
    value2?: number; // diastolic for blood pressure
    tipId?: number; // which tip category
  }[];
}

const tips = [
  { id: 1, title: "Fem nävar frukt och grönt" },
  { id: 2, title: "Välj fullkorn" },
  { id: 3, title: "Ät fisk och skaldjur" },
  { id: 4, title: "Välj nyttiga fetter" },
  { id: 5, title: "Välj magra mejeriprodukter" },
  { id: 6, title: "Minska på rött och bearbetat kött" },
  { id: 7, title: "Begränsa socker och salt" },
  { id: 8, title: "Ät lagom mycket" },
  { id: 9, title: "Rör på dig" },
  { id: 10, title: "Ät mer baljväxter" }
];

const Progress = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [achievementDays, setAchievementDays] = useState<Date[]>([]);
  const [weightDays, setWeightDays] = useState<Date[]>([]);
  const [bloodPressureDays, setBloodPressureDays] = useState<Date[]>([]);
  const [markedTips, setMarkedTips] = useState<MarkedTip[]>([]);
  const [dayLogs, setDayLogs] = useState<DayLog[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [entryType, setEntryType] = useState<'weight' | 'bloodPressure' | 'tip'>('tip');
  const [selectedTipId, setSelectedTipId] = useState<number>(1);
  const [gramsInput, setGramsInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [systolicInput, setSystolicInput] = useState("");
  const [diastolicInput, setDiastolicInput] = useState("");
  
  // Load day logs and marked tips from localStorage
  useEffect(() => {
    const savedLogs = localStorage.getItem('dayLogs');
    if (savedLogs) {
      const parsed = JSON.parse(savedLogs);
      // Migrate old data format to new format
      const migratedLogs = parsed.map((log: any) => {
        if (log.entries) {
          return log; // Already in new format
        } else if (log.fruitGrams !== undefined) {
          // Old format - migrate to new
          return {
            date: log.date,
            entries: [{ type: 'tip' as const, value: log.fruitGrams, tipId: 1 }]
          };
        }
        return log;
      });
      setDayLogs(migratedLogs);
      localStorage.setItem('dayLogs', JSON.stringify(migratedLogs)); // Save migrated data
    }

    const savedTips = localStorage.getItem('markedTips');
    if (savedTips) {
      setMarkedTips(JSON.parse(savedTips));
    }
  }, []);

  // Update achievement days based on day logs (500g+ threshold for tips)
  useEffect(() => {
    const achievedDays = dayLogs
      .filter(log => {
        // A day is achieved if any tip entry has 500g or more
        return log.entries && log.entries.some(entry => 
          entry.type === 'tip' && entry.value >= 500
        );
      })
      .map(log => new Date(log.date));
    setAchievementDays(achievedDays);

    // Track weight days
    const weightLogDays = dayLogs
      .filter(log => log.entries && log.entries.some(entry => entry.type === 'weight'))
      .map(log => new Date(log.date));
    setWeightDays(weightLogDays);

    // Track blood pressure days
    const bpLogDays = dayLogs
      .filter(log => log.entries && log.entries.some(entry => entry.type === 'bloodPressure'))
      .map(log => new Date(log.date));
    setBloodPressureDays(bpLogDays);
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
    
    // Don't allow entries for future dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const clicked = new Date(clickedDate);
    clicked.setHours(0, 0, 0, 0);
    
    if (clicked > today) return;
    
    setSelectedDate(clickedDate);
    
    // Reset inputs
    setEntryType('tip');
    setSelectedTipId(1);
    setGramsInput("");
    setWeightInput("");
    setSystolicInput("");
    setDiastolicInput("");
    
    setDialogOpen(true);
  };

  const handleSaveEntry = () => {
    if (!selectedDate) return;
    
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    let existingLog = dayLogs.find(log => log.date === dateStr);
    
    if (!existingLog) {
      existingLog = { date: dateStr, entries: [] };
    }
    
    // Create new entry based on type
    let newEntry;
    if (entryType === 'tip') {
      const grams = parseInt(gramsInput) || 0;
      if (grams > 0) {
        newEntry = { type: 'tip' as const, value: grams, tipId: selectedTipId };
      }
    } else if (entryType === 'weight') {
      const kg = parseFloat(weightInput) || 0;
      if (kg > 0) {
        newEntry = { type: 'weight' as const, value: kg };
      }
    } else if (entryType === 'bloodPressure') {
      const systolic = parseInt(systolicInput) || 0;
      const diastolic = parseInt(diastolicInput) || 0;
      if (systolic > 0 && diastolic > 0) {
        newEntry = { type: 'bloodPressure' as const, value: systolic, value2: diastolic };
      }
    }
    
    if (newEntry) {
      const updatedEntries = [...existingLog.entries, newEntry];
      const updatedLogs = dayLogs.filter(log => log.date !== dateStr);
      updatedLogs.push({ date: dateStr, entries: updatedEntries });
      
      setDayLogs(updatedLogs);
      localStorage.setItem('dayLogs', JSON.stringify(updatedLogs));
    }
    
    setDialogOpen(false);
  };

  const handleDeleteEntry = (entryIndex: number) => {
    if (!selectedDate) return;
    
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const existingLog = dayLogs.find(log => log.date === dateStr);
    
    if (existingLog) {
      const updatedEntries = existingLog.entries.filter((_, index) => index !== entryIndex);
      const updatedLogs = dayLogs.filter(log => log.date !== dateStr);
      
      if (updatedEntries.length > 0) {
        updatedLogs.push({ date: dateStr, entries: updatedEntries });
      }
      
      setDayLogs(updatedLogs);
      localStorage.setItem('dayLogs', JSON.stringify(updatedLogs));
    }
  };

  const getExistingEntries = () => {
    if (!selectedDate) return [];
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const log = dayLogs.find(l => l.date === dateStr);
    return log?.entries || [];
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
            weight: weightDays,
            bloodPressure: bloodPressureDays,
            ...weekModifiers
          }}
          modifiersClassNames={{
            ...weekModifierClassNames,
            achievement: "relative before:content-[''] before:absolute before:inset-[8px] before:bg-emerald-500 before:rounded-full before:-z-10 !text-blue-900 font-bold [&>*]:relative [&>*]:z-10",
            weight: "relative after:content-['⚖'] after:absolute after:top-[2px] after:left-[2px] after:text-[14px] after:leading-none after:text-blue-700",
            bloodPressure: "relative after:content-['♥'] after:absolute after:top-[16px] after:left-[2px] after:text-[14px] after:leading-none after:text-rose-600"
          }}
          modifiersStyles={{
            achievement: {
              fontWeight: 'bold'
            }
          }}
        />
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedDate && format(selectedDate, 'd MMMM yyyy', { locale: sv })}
            </DialogTitle>
          </DialogHeader>
          
          {/* Existing Entries */}
          {getExistingEntries().length > 0 && (
            <div className="space-y-2 pb-4 border-b">
              <Label className="text-sm font-semibold">Befintliga inlägg</Label>
              {getExistingEntries().map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div className="text-sm">
                    {entry.type === 'tip' && (
                      <span>
                        {tips.find(t => t.id === entry.tipId)?.title}: {entry.value}g
                      </span>
                    )}
                    {entry.type === 'weight' && <span>Vikt: {entry.value} kg</span>}
                    {entry.type === 'bloodPressure' && (
                      <span>Blodtryck: {entry.value}/{entry.value2} mmHg</span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteEntry(index)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 size={16} className="text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4 py-4">
            <div>
              <Label className="text-base mb-3 block">Vad vill du logga?</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={entryType === 'tip' ? 'default' : 'outline'}
                  onClick={() => setEntryType('tip')}
                  className="w-full"
                >
                  Tips
                </Button>
                <Button
                  variant={entryType === 'weight' ? 'default' : 'outline'}
                  onClick={() => setEntryType('weight')}
                  className="w-full"
                >
                  Vikt
                </Button>
                <Button
                  variant={entryType === 'bloodPressure' ? 'default' : 'outline'}
                  onClick={() => setEntryType('bloodPressure')}
                  className="w-full"
                >
                  Blodtryck
                </Button>
              </div>
            </div>

            {entryType === 'tip' && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="tip-select" className="text-base mb-2 block">
                    Välj tips-kategori
                  </Label>
                  <select
                    id="tip-select"
                    value={selectedTipId}
                    onChange={(e) => setSelectedTipId(parseInt(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  >
                    {tips.map(tip => (
                      <option key={tip.id} value={tip.id}>{tip.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="grams-input" className="text-base mb-2 block">
                    Hur många gram?
                  </Label>
                  <Input
                    id="grams-input"
                    type="number"
                    value={gramsInput}
                    onChange={(e) => setGramsInput(e.target.value)}
                    placeholder="Ange gram"
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Minst 500g för att markera dagen som klarad
                  </p>
                </div>
              </div>
            )}

            {entryType === 'weight' && (
              <div>
                <Label htmlFor="weight-input" className="text-base mb-2 block">
                  Vikt (kg)
                </Label>
                <Input
                  id="weight-input"
                  type="number"
                  step="0.1"
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  placeholder="Ange vikt i kg"
                  className="w-full"
                />
              </div>
            )}

            {entryType === 'bloodPressure' && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="systolic-input" className="text-base mb-2 block">
                    Systoliskt (övre värde)
                  </Label>
                  <Input
                    id="systolic-input"
                    type="number"
                    value={systolicInput}
                    onChange={(e) => setSystolicInput(e.target.value)}
                    placeholder="T.ex. 120"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="diastolic-input" className="text-base mb-2 block">
                    Diastoliskt (nedre värde)
                  </Label>
                  <Input
                    id="diastolic-input"
                    type="number"
                    value={diastolicInput}
                    onChange={(e) => setDiastolicInput(e.target.value)}
                    placeholder="T.ex. 80"
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Avbryt
            </Button>
            <Button onClick={handleSaveEntry}>
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

      {/* Weight and Blood Pressure Charts */}
      <div className="grid grid-cols-2 gap-0 pt-0">
        <div className="py-6 pr-6 pl-0 border-r border-t">
          <div className="flex flex-col h-full">
            <div className="flex-1 mb-4">
              <div className="text-base font-bold text-foreground">
                Vikt
              </div>
              <div className="text-sm text-muted-foreground font-normal">
                Loggade vikter (kg)
              </div>
            </div>
            <ChartContainer 
              config={{ 
                weight: { 
                  label: "Vikt", 
                  color: "hsl(217, 91%, 60%)" 
                } 
              }} 
              className="h-48 w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={dayLogs
                    .flatMap(log => 
                      log.entries
                        .filter(e => e.type === 'weight')
                        .map(e => ({ 
                          date: format(new Date(log.date), 'd MMM', { locale: sv }),
                          weight: e.value,
                          fullDate: log.date
                        }))
                    )
                    .slice(-10)} 
                  margin={{ top: 20, bottom: 20 }}
                >
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis hide />
                  <Bar 
                    dataKey="weight" 
                    fill="hsl(217, 91%, 60%)" 
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  >
                    <LabelList 
                      dataKey="weight" 
                      position="top" 
                      style={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                      formatter={(value: number) => `${value} kg`}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>

        <div className="py-6 pr-0 pl-6 border-t">
          <div className="flex flex-col h-full">
            <div className="flex-1 mb-4">
              <div className="text-base font-bold text-foreground">
                Blodtryck
              </div>
              <div className="text-sm text-muted-foreground font-normal">
                Loggade blodtryck (mmHg)
              </div>
            </div>
            <ChartContainer 
              config={{ 
                systolic: { 
                  label: "Systoliskt", 
                  color: "hsl(350, 89%, 60%)" 
                } 
              }} 
              className="h-48 w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={dayLogs
                    .flatMap(log => 
                      log.entries
                        .filter(e => e.type === 'bloodPressure')
                        .map(e => ({ 
                          date: format(new Date(log.date), 'd MMM', { locale: sv }),
                          systolic: e.value,
                          diastolic: e.value2,
                          fullDate: log.date
                        }))
                    )
                    .slice(-10)} 
                  margin={{ top: 20, bottom: 20 }}
                >
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis hide />
                  <Bar 
                    dataKey="systolic" 
                    fill="hsl(350, 89%, 60%)" 
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  >
                    <LabelList 
                      dataKey="systolic" 
                      position="top" 
                      style={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                      formatter={(value: number) => `${value}`}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;