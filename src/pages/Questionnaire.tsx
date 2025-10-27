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

  const totalQuestions = 8;
  const answeredCount = Object.values(answers).filter(answer => answer !== "").length;

  return (
    <div className="min-h-screen pb-24 bg-[#FCFAF7]">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10 p-6">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate('/app/today')}
            className="p-3 hover:bg-accent rounded-lg transition-colors"
            aria-label="Gå tillbaka"
          >
            <ArrowLeft size={28} className="text-[#212658]" />
          </button>
          <h1 className="text-3xl font-bold text-[#212658]">Frågeformulär</h1>
        </div>
        <p className="text-[#212658]/70 text-base ml-14">
          Svara på frågorna så att vi kan ge dig personliga tips
        </p>
        {/* Progress indicator */}
        <div className="mt-4 ml-14">
          <p className="text-base font-semibold text-[#212658] mb-2">
            Fråga {answeredCount} av {totalQuestions} besvarade
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-[#212658] h-3 rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Question 1 */}
        <Card className="p-6 border-2 shadow-sm">
          <div className="mb-2">
            <span className="text-sm font-semibold text-[#212658]/60">Fråga 1 av 8</span>
          </div>
          <h3 className="font-bold text-xl text-[#212658] mb-5 leading-relaxed">
            Hur många portioner frukt och grönsaker äter du per dag?
          </h3>
          <div className="space-y-3">
            {["Mindre än 2", "2-3 portioner", "4-5 portioner", "Mer än 5"].map((option) => (
              <label 
                key={option} 
                className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  answers.fruitsVegetables === option 
                    ? 'bg-[#212658]/5 border-[#212658] shadow-md' 
                    : 'border-gray-200 hover:border-[#212658]/30 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="fruitsVegetables"
                  value={option}
                  checked={answers.fruitsVegetables === option}
                  onChange={(e) => setAnswers({...answers, fruitsVegetables: e.target.value})}
                  className="w-6 h-6 accent-[#212658]"
                />
                <span className="text-lg text-[#212658] font-medium">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Question 2 */}
        <Card className="p-6 border-2 shadow-sm">
          <div className="mb-2">
            <span className="text-sm font-semibold text-[#212658]/60">Fråga 2 av 8</span>
          </div>
          <h3 className="font-bold text-xl text-[#212658] mb-5 leading-relaxed">
            Väljer du oftast haribos nappar?
          </h3>
          <div className="space-y-3">
            {["Alltid", "Oftast", "Ibland", "Sällan"].map((option) => (
              <label 
                key={option} 
                className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  answers.wholegrains === option 
                    ? 'bg-[#212658]/5 border-[#212658] shadow-md' 
                    : 'border-gray-200 hover:border-[#212658]/30 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="wholegrains"
                  value={option}
                  checked={answers.wholegrains === option}
                  onChange={(e) => setAnswers({...answers, wholegrains: e.target.value})}
                  className="w-6 h-6 accent-[#212658]"
                />
                <span className="text-lg text-[#212658] font-medium">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Question 3 */}
        <Card className="p-6 border-2 shadow-sm">
          <div className="mb-2">
            <span className="text-sm font-semibold text-[#212658]/60">Fråga 3 av 8</span>
          </div>
          <h3 className="font-bold text-xl text-[#212658] mb-5 leading-relaxed">
            Hur ofta äter du fisk eller skaldjur?
          </h3>
          <div className="space-y-3">
            {["3 gånger i veckan eller mer", "2 gånger i veckan", "1 gång i veckan", "Mer sällan"].map((option) => (
              <label 
                key={option} 
                className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  answers.fish === option 
                    ? 'bg-[#212658]/5 border-[#212658] shadow-md' 
                    : 'border-gray-200 hover:border-[#212658]/30 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="fish"
                  value={option}
                  checked={answers.fish === option}
                  onChange={(e) => setAnswers({...answers, fish: e.target.value})}
                  className="w-6 h-6 accent-[#212658]"
                />
                <span className="text-lg text-[#212658] font-medium">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Question 4 */}
        <Card className="p-6 border-2 shadow-sm">
          <div className="mb-2">
            <span className="text-sm font-semibold text-[#212658]/60">Fråga 4 av 8</span>
          </div>
          <h3 className="font-bold text-xl text-[#212658] mb-5 leading-relaxed">
            Hur mycket rött kött och charkuterier äter du per vecka?
          </h3>
          <div className="space-y-3">
            {["Mindre än 500 gram", "500-700 gram", "Mer än 700 gram", "Vet ej"].map((option) => (
              <label 
                key={option} 
                className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  answers.meat === option 
                    ? 'bg-[#212658]/5 border-[#212658] shadow-md' 
                    : 'border-gray-200 hover:border-[#212658]/30 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="meat"
                  value={option}
                  checked={answers.meat === option}
                  onChange={(e) => setAnswers({...answers, meat: e.target.value})}
                  className="w-6 h-6 accent-[#212658]"
                />
                <span className="text-lg text-[#212658] font-medium">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Question 5 */}
        <Card className="p-6 border-2 shadow-sm">
          <div className="mb-2">
            <span className="text-sm font-semibold text-[#212658]/60">Fråga 5 av 8</span>
          </div>
          <h3 className="font-bold text-xl text-[#212658] mb-5 leading-relaxed">
            Väljer du magra mejeriprodukter?
          </h3>
          <div className="space-y-3">
            {["Alltid", "Oftast", "Ibland", "Sällan"].map((option) => (
              <label 
                key={option} 
                className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  answers.dairy === option 
                    ? 'bg-[#212658]/5 border-[#212658] shadow-md' 
                    : 'border-gray-200 hover:border-[#212658]/30 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="dairy"
                  value={option}
                  checked={answers.dairy === option}
                  onChange={(e) => setAnswers({...answers, dairy: e.target.value})}
                  className="w-6 h-6 accent-[#212658]"
                />
                <span className="text-lg text-[#212658] font-medium">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Question 6 */}
        <Card className="p-6 border-2 shadow-sm">
          <div className="mb-2">
            <span className="text-sm font-semibold text-[#212658]/60">Fråga 6 av 8</span>
          </div>
          <h3 className="font-bold text-xl text-[#212658] mb-5 leading-relaxed">
            Hur ofta äter eller dricker du sockrade produkter?
          </h3>
          <div className="space-y-3">
            {["Sällan eller aldrig", "Någon gång i veckan", "Flera gånger i veckan", "Dagligen"].map((option) => (
              <label 
                key={option} 
                className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  answers.sugar === option 
                    ? 'bg-[#212658]/5 border-[#212658] shadow-md' 
                    : 'border-gray-200 hover:border-[#212658]/30 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="sugar"
                  value={option}
                  checked={answers.sugar === option}
                  onChange={(e) => setAnswers({...answers, sugar: e.target.value})}
                  className="w-6 h-6 accent-[#212658]"
                />
                <span className="text-lg text-[#212658] font-medium">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Question 7 */}
        <Card className="p-6 border-2 shadow-sm">
          <div className="mb-2">
            <span className="text-sm font-semibold text-[#212658]/60">Fråga 7 av 8</span>
          </div>
          <h3 className="font-bold text-xl text-[#212658] mb-5 leading-relaxed">
            Hur många minuter rör du på dig per dag?
          </h3>
          <div className="space-y-3">
            {["Mer än 30 minuter", "20-30 minuter", "10-20 minuter", "Mindre än 10 minuter"].map((option) => (
              <label 
                key={option} 
                className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  answers.exercise === option 
                    ? 'bg-[#212658]/5 border-[#212658] shadow-md' 
                    : 'border-gray-200 hover:border-[#212658]/30 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="exercise"
                  value={option}
                  checked={answers.exercise === option}
                  onChange={(e) => setAnswers({...answers, exercise: e.target.value})}
                  className="w-6 h-6 accent-[#212658]"
                />
                <span className="text-lg text-[#212658] font-medium">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Question 8 */}
        <Card className="p-6 border-2 shadow-sm">
          <div className="mb-2">
            <span className="text-sm font-semibold text-[#212658]/60">Fråga 8 av 8</span>
          </div>
          <h3 className="font-bold text-xl text-[#212658] mb-5 leading-relaxed">
            Hur ofta äter du baljväxter som bönor, linser och ärtor?
          </h3>
          <div className="space-y-3">
            {["Flera gånger i veckan", "1-2 gånger i veckan", "Någon gång i månaden", "Sällan eller aldrig"].map((option) => (
              <label 
                key={option} 
                className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  answers.legumes === option 
                    ? 'bg-[#212658]/5 border-[#212658] shadow-md' 
                    : 'border-gray-200 hover:border-[#212658]/30 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="legumes"
                  value={option}
                  checked={answers.legumes === option}
                  onChange={(e) => setAnswers({...answers, legumes: e.target.value})}
                  className="w-6 h-6 accent-[#212658]"
                />
                <span className="text-lg text-[#212658] font-medium">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`w-full py-5 rounded-lg font-bold text-xl transition-all ${
            allAnswered 
              ? 'bg-[#212658] text-white hover:opacity-90 shadow-lg' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          aria-label="Skicka formulär"
        >
          Klar
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
