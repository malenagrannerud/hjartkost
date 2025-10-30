import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tips } from "@/data/tips";
import TipCard from "@/components/TipCard";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import { markedTipsSchema } from "@/lib/schemas";

interface MarkedTip {
  id: number;
  markedDate: string;
  color: string;
}

const Tips = () => {
  const navigate = useNavigate();
  const [markedTips, setMarkedTips] = useState<MarkedTip[]>(() => {
    const saved = getStorageItem("markedTips", markedTipsSchema);
    return saved ? (saved as MarkedTip[]) : [];
  });

  useEffect(() => {
    setStorageItem("markedTips", markedTips);
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
    <div className="min-h-screen p-6 pb-24 space-y-6 bg-background">
      <header>
        <h1 className="text-4xl font-bold text-foreground mb-1">Mina tips</h1>
        <p className="text-muted-foreground text-lg font-normal">Välj ett eller två tips per vecka</p>
      </header>

      <div className="space-y-4">
        {tips.map((tip) => (
          <TipCard
            key={tip.id}
            tip={tip}
            isMarked={isMarked(tip.id)}
            onToggleMark={(e) => toggleMark(e, tip.id)}
            onClick={() => navigate(`/app/tips/${tip.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Tips;
