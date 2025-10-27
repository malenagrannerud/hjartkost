import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    fruitsVegetables: "",
    wholegrains: "",
    fish: "",
    meat: "",
    dairy: "",
    sugar: "",
    exercise: "",
    legumes: ""
  });

  const handleSubmit = () => {
    localStorage.setItem('questionnaireCompleted', 'true');
    localStorage.setItem('questionnaireAnswers', JSON.stringify(answers));
    navigate('/app/today');
  };

  const allAnswered = Object.values(answers).every(answer => answer !== "");

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
          <h1 className="text-2xl font-bold text-[#212658]">Frågeformulär</h1>
        </div>
        <p className="text-[#212658]/70 text-sm ml-14">
          Svara på frågorna så att vi kan ge dig personliga tips
        </p>
      </header>

      <div className="p-6 space-y-6">
        {/* Question 1 */}
        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-[#212658] mb-3">
            Hur många portioner frukt och grönsaker äter du per dag?
          </h3>
          <div className="space-y-2">
            {["Mindre än 2", "2-3 portioner", "4-5 portioner", "Mer än 5"].map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="fruitsVegetables"
                  value={option}
                  checked={answers.fruitsVegetables === option}
                  onChange={(e) => setAnswers({...answers, fruitsVegetables: e.target.value})}
                  className="w-4 h-4"
                />
                <span className="text-[#212658]">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Question 2 */}
        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-[#212658] mb-3">
            Väljer du oftast fullkornsprodukter?
          </h3>
          <div className="space-y-2">
            {["Alltid", "Oftast", "Ibland", "Sällan"].map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="wholegrains"
                  value={option}
                  checked={answers.wholegrains === option}
                  onChange={(e) => setAnswers({...answers, wholegrains: e.target.value})}
                  className="w-4 h-4"
                />
                <span className="text-[#212658]">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Question 3 */}
        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-[#212658] mb-3">
            Hur ofta äter du fisk eller skaldjur?
          </h3>
          <div className="space-y-2">
            {["3 gånger i veckan eller mer", "2 gånger i veckan", "1 gång i veckan", "Mer sällan"].map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="fish"
                  value={option}
                  checked={answers.fish === option}
                  onChange={(e) => setAnswers({...answers, fish: e.target.value})}
                  className="w-4 h-4"
                />
                <span className="text-[#212658]">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Question 4 */}
        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-[#212658] mb-3">
            Hur mycket rött kött och charkuterier äter du per vecka?
          </h3>
          <div className="space-y-2">
            {["Mindre än 500 gram", "500-700 gram", "Mer än 700 gram", "Vet ej"].map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="meat"
                  value={option}
                  checked={answers.meat === option}
                  onChange={(e) => setAnswers({...answers, meat: e.target.value})}
                  className="w-4 h-4"
                />
                <span className="text-[#212658]">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Question 5 */}
        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-[#212658] mb-3">
            Väljer du magra mejeriprodukter?
          </h3>
          <div className="space-y-2">
            {["Alltid", "Oftast", "Ibland", "Sällan"].map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="dairy"
                  value={option}
                  checked={answers.dairy === option}
                  onChange={(e) => setAnswers({...answers, dairy: e.target.value})}
                  className="w-4 h-4"
                />
                <span className="text-[#212658]">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Question 6 */}
        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-[#212658] mb-3">
            Hur ofta äter eller dricker du sockrade produkter?
          </h3>
          <div className="space-y-2">
            {["Sällan eller aldrig", "Någon gång i veckan", "Flera gånger i veckan", "Dagligen"].map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="sugar"
                  value={option}
                  checked={answers.sugar === option}
                  onChange={(e) => setAnswers({...answers, sugar: e.target.value})}
                  className="w-4 h-4"
                />
                <span className="text-[#212658]">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Question 7 */}
        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-[#212658] mb-3">
            Hur många minuter rör du på dig per dag?
          </h3>
          <div className="space-y-2">
            {["Mer än 30 minuter", "20-30 minuter", "10-20 minuter", "Mindre än 10 minuter"].map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="exercise"
                  value={option}
                  checked={answers.exercise === option}
                  onChange={(e) => setAnswers({...answers, exercise: e.target.value})}
                  className="w-4 h-4"
                />
                <span className="text-[#212658]">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Question 8 */}
        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-[#212658] mb-3">
            Hur ofta äter du baljväxter som bönor, linser och ärtor?
          </h3>
          <div className="space-y-2">
            {["Flera gånger i veckan", "1-2 gånger i veckan", "Någon gång i månaden", "Sällan eller aldrig"].map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="legumes"
                  value={option}
                  checked={answers.legumes === option}
                  onChange={(e) => setAnswers({...answers, legumes: e.target.value})}
                  className="w-4 h-4"
                />
                <span className="text-[#212658]">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`w-full py-4 rounded-lg font-semibold transition-opacity ${
            allAnswered 
              ? 'bg-[#212658] text-white hover:opacity-90' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Klar
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
