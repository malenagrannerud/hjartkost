import { Routes, Route, Navigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import Today from "./Today";
import Tips from "./Tips";
import Progress from "./Progress";

const MainApp = () => {
  return (
    <div className="min-h-screen bg-background pb-20 max-w-md mx-auto">
      <Routes>
        <Route path="/" element={<Navigate to="/app/today" replace />} />
        <Route path="/today" element={<Today />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
      <BottomNav />
    </div>
  );
};

export default MainApp;