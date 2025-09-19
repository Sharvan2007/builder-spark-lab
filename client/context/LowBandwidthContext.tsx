import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type LowBandwidthContextType = {
  lowBandwidth: boolean;
  setLowBandwidth: (v: boolean) => void;
};

const LowBandwidthContext = createContext<LowBandwidthContextType | undefined>(undefined);

export function LowBandwidthProvider({ children }: { children: ReactNode }) {
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const value = useMemo(() => ({ lowBandwidth, setLowBandwidth }), [lowBandwidth]);
  return (
    <LowBandwidthContext.Provider value={value}>{children}</LowBandwidthContext.Provider>
  );
}

export function useLowBandwidth() {
  const ctx = useContext(LowBandwidthContext);
  if (!ctx) throw new Error("useLowBandwidth must be used within LowBandwidthProvider");
  return ctx;
}
