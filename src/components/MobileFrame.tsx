import { ReactNode } from "react";

interface MobileFrameProps {
  children: ReactNode;
}

export const MobileFrame = ({ children }: MobileFrameProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background flex items-center justify-center p-4">
      {/* Phone frame */}
      <div className="w-full max-w-md min-h-[90vh] bg-card rounded-[3rem] shadow-2xl border-8 border-border overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default MobileFrame;
