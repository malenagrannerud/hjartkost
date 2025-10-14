import { Routes, Route, Navigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { MobileFrame } from "@/components/MobileFrame";
import Today from "./Today";
import Tips from "./Tips";
import Progress from "./Progress";
import Help from "./Help";

const MainApp = () => {
  return (
    <MobileFrame>
      <div className="flex-1 bg-background overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/app/today" replace />} />
          <Route path="/today" element={<Today />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
      <BottomNav />
    </MobileFrame>
  );
};

export default MainApp;