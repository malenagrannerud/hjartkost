import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tips } from "@/data/tips";
import TipCard from "@/components/TipCard";
import { pageTitle, pageSubtitle, pageContainer, pagePadding } from "@/lib/design-tokens";
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
    const result = getStorageItem("markedTips", markedTipsSchema);
    return (result as MarkedTip[]) ?? [];
  });

  useEffect(() => {
    setStorageItem("markedTips", markedTips, markedTipsSchema);
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
    /* STANDARDIZATION: space-y-4 for card lists (tipCards maintain p-5, text-xl, min-h-80px) */
    <div className={`${pageContainer} ${pagePadding}`}>
      <header>
        <h1 className={pageTitle}>Mina tips</h1>
        <p className={pageSubtitle}>Välj ett eller två tips per vecka</p>
      </header>

      {/* STANDARDIZATION: space-y-4 for consistent card list spacing */}
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
