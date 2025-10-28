import { useState, useEffect } from "react"; // state - track and update marked Tips
import { useNavigate } from "react-router-dom"; // navigate to TipDeital when cards are clicked
import { Card } from "@/components/ui/card"; // Reusable component from components/ui/card. @ point
import { Check } from "lucide-react";        // checkmark icon

export const tips = [    // array of 11 tips
  {
    id: 1,
    title: "Fem nävar frukt och grönt",
    color: "bg-[#C8E6A1]",
    textColor: "text-blue-900",
    healthScore: 4,
  },
  {
    id: 2,
    title: "Fyll på med fullkorn",
    color: "bg-amber-100",
    textColor: "text-blue-900",
    healthScore: 3,
  },
  {
    id: 3,
    title: "Fisk och skaldjur 2-3 gånger i veckan",
    color: "bg-cyan-100",
    textColor: "text-blue-900",
    healthScore: 3,
  },
  {
    id: 4,
    title: "Rätt fett!",
    color: "bg-yellow-100",
    textColor: "text-blue-900",
    healthScore: 3,
  },
  {
    id: 5,
    title: "Mera magra mejerier",
    color: "bg-blue-100",
    textColor: "text-blue-900",
    healthScore: 3,
  },
  {
    id: 6,
    title: "Minska på rött och bearbetat kött",
    color: "bg-rose-100",
    textColor: "text-blue-900",
    healthScore: 3,
  },
  {
    id: 7,
    title: "Salt-halt!",
    color: "bg-orange-100",
    textColor: "text-blue-900",
    healthScore: 4,
  },
  {
    id: 8,
    title: "Ät lagom mycket",
    color: "bg-purple-100",
    textColor: "text-blue-900",
    healthScore: 4,
  },
  {
    id: 9,
    title: "Rör på dig minst 30 min om dagen",
    color: "bg-teal-100",
    textColor: "text-blue-900",
    healthScore: 5,
  },
  {
    id: 10,
    title: "Ät mer baljväxter",
    color: "bg-green-100",
    textColor: "text-blue-900",
    healthScore: 3,
  },
  {
    id: 11,
    title: "Minska på sockret",
    color: "bg-green-100",
    textColor: "text-blue-900",
    healthScore: 3,
  },
];

interface MarkedTip {
  id: number;
  markedDate: string;
  color: string;
}

const Tips = () => {
  const navigate = useNavigate();
  const [markedTips, setMarkedTips] = useState<MarkedTip[]>(() => {
    const saved = localStorage.getItem("markedTips");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("markedTips", JSON.stringify(markedTips));
  }, [markedTips]);

  const toggleMark = (e: React.MouseEvent, tipId: number) => {
    e.stopPropagation();
    setMarkedTips((prev) => {
      const isMarked = prev.some((tip) => tip.id === tipId);
      if (isMarked) {
        return prev.filter((tip) => tip.id !== tipId);
      } else {
        const tip = tips.find((t) => t.id === tipId);
        return [
          ...prev,
          {
            id: tipId,
            markedDate: new Date().toISOString(),
            color: tip?.color || "bg-green-200",
          },
        ];
      }
    });
  };

  const isMarked = (tipId: number) => markedTips.some((tip) => tip.id === tipId);

  return (
    <div className="p-6 pb-24 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-blue-900 mb-1">Mina tips</h1>
        <p className="text-blue-900/90 text-base font-normal">Välj ett eller två tips per vecka</p>
      </header>

      <div className="space-y-4">
        {tips.map((tip) => (
          <Card
            key={tip.id}
            className={`p-5 hover:shadow-md transition-all cursor-pointer active:scale-[0.98] ${tip.color} relative border-0 shadow-none`}
            onClick={() => navigate(`/app/tips/${tip.id}`)}
          >
            <div
              className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                isMarked(tip.id) ? "bg-blue-900 border-blue-900" : "bg-white/50 border-blue-900/30"
              }`}
              onClick={(e) => toggleMark(e, tip.id)}
            >
              {isMarked(tip.id) && <Check size={16} className="text-white" strokeWidth={3} />}
            </div>
            <div className="space-y-3 pr-8">
              <div>
                <h3 className={`font-semibold ${tip.textColor}`}>{tip.title}</h3>
                <div className="text-blue-900 text-xs font-bold">
                  {tip.healthScore} {tip.healthScore === 1 ? "poäng" : "poäng"}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tips;
