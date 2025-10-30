import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { tips } from "@/data/tips";

const TipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tip = tips.find((t) => t.id === Number(id));

  if (!tip) {
    return <div>Tip not found</div>;
  }

  return (
    <div className="min-h-screen pb-16 bg-background">
      {/* Color Header */}
      <div className={`w-full h-[200px] ${tip.color}`}></div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg transition-colors min-h-[48px]"
        >
          <ArrowLeft size={28} className="text-foreground" />
          <span className="text-lg font-semibold text-foreground">Tillbaka</span>
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground leading-tight">{tip.title}</h1>

        {/* Description */}
        <p className="text-foreground leading-relaxed text-lg">{tip.detailedInfo}</p>

        {/* Steps */}
        <div className="space-y-4 pt-4">
          {tip.steps.map((step, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-bold text-foreground text-xl">
                Steg {index + 1}
              </h3>
              <p className="text-foreground text-base leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TipDetail;
