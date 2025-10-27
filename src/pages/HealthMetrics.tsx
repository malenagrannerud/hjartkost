import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HealthMetrics = () => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('healthMetrics');
    if (saved) {
      const metrics = JSON.parse(saved);
      setWeight(metrics.weight || "");
      setSystolic(metrics.systolic || "");
      setDiastolic(metrics.diastolic || "");
    }
  }, []);

  const handleSubmit = () => {
    const metrics = {
      weight,
      systolic,
      diastolic,
      date: new Date().toISOString()
    };
    localStorage.setItem('healthMetrics', JSON.stringify(metrics));
    localStorage.setItem('healthMetricsCompleted', 'true');
    navigate('/app/today');
  };

  const isValid = weight !== "" && systolic !== "" && diastolic !== "";

  return (
    <div className="min-h-screen pb-24 bg-[#FCFAF7]">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10 p-6">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate('/app/today')}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-[#212658]" />
          </button>
          <h1 className="text-2xl font-bold text-[#212658]">Vikt och blodtryck</h1>
        </div>
        <p className="text-[#212658]/70 text-sm ml-14">
          Fyll i dina startvärden
        </p>
      </header>

      <div className="p-6 space-y-6">
        {/* Weight */}
        <Card className="p-5 border-0 shadow-sm">
          <div className="space-y-3">
            <Label htmlFor="weight" className="text-[#212658] font-semibold">
              Vikt (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="T.ex. 75"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="text-lg"
              step="0.1"
              min="0"
            />
            <p className="text-sm text-[#212658]/70">
              Ange din nuvarande vikt i kilogram
            </p>
          </div>
        </Card>

        {/* Blood Pressure */}
        <Card className="p-5 border-0 shadow-sm">
          <div className="space-y-4">
            <h3 className="text-[#212658] font-semibold">Blodtryck</h3>
            
            <div className="space-y-3">
              <Label htmlFor="systolic" className="text-[#212658]">
                Övertryck (systoliskt)
              </Label>
              <Input
                id="systolic"
                type="number"
                placeholder="T.ex. 120"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                className="text-lg"
                min="0"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="diastolic" className="text-[#212658]">
                Undertryck (diastoliskt)
              </Label>
              <Input
                id="diastolic"
                type="number"
                placeholder="T.ex. 80"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                className="text-lg"
                min="0"
              />
            </div>

            <p className="text-sm text-[#212658]/70">
              Blodtryck mäts i mmHg och anges som övertryck/undertryck
            </p>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-4 border-0 shadow-sm bg-blue-50">
          <p className="text-sm text-[#212658]">
            <strong>Tips:</strong> Mät ditt blodtryck samma tid varje dag för mest tillförlitliga resultat. 
            Vila några minuter innan mätning.
          </p>
        </Card>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full py-4 rounded-lg font-semibold transition-opacity ${
            isValid 
              ? 'bg-[#212658] text-white hover:opacity-90' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Spara
        </button>
      </div>
    </div>
  );
};

export default HealthMetrics;
