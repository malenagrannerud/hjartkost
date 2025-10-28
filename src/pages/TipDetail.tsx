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
    <div className="min-h-screen pb-24 bg-white">
      {/* Color Header */}
      <div className={`w-full h-[200px] ${tip.color}`}></div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-900 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-semibold">Tillbaka</span>
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-blue-900 leading-tight">{tip.title}</h1>

        {/* Description */}
        <p className="text-blue-900 leading-relaxed">{tip.detailedInfo}</p>

        {/* Steps */}
        <div className="space-y-4 pt-4">
          {tip.steps.map((step, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-bold text-blue-900">
                Steg {index + 1}
              </h3>
              <p className="text-blue-900 text-sm leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TipDetail;
