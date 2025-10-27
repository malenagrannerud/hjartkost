import { Routes, Route, Navigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import Today from "./Today";
import Tips from "./Tips";
import TipDetail from "./TipDetail";
import Progress from "./Progress";
import Help from "./Help";
import Tutorial from "./Tutorial";
import Questionnaire from "./Questionnaire";
import HealthMetrics from "./HealthMetrics";

const MainApp = () => {
  return (
    <>
      <div className="flex-1 bg-background overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/app/today" replace />} />
          <Route path="/today" element={<Today />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/tips/:id" element={<TipDetail />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/help" element={<Help />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/health-metrics" element={<HealthMetrics />} />
        </Routes>
      </div>
      <BottomNav />
    </>
  );
};

export default MainApp;