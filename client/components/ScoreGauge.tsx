import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useLowBandwidth } from "@/context/LowBandwidthContext";

export function ScoreGauge({
  score = 78,
  trend = 6,
}: {
  score?: number;
  trend?: number;
}) {
  const { lowBandwidth } = useLowBandwidth();
  const size = 180;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, score)) / 100;
  const offset = circumference * (1 - progress);

  const [display, setDisplay] = useState(lowBandwidth ? score : 0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (lowBandwidth) {
      setDisplay(score);
      return;
    }
    const start = performance.now();
    const duration = 900;
    const initial = display;
    const delta = score - initial;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setDisplay(Math.round(initial + delta * p));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, lowBandwidth]);

  const gradientId = useMemo(
    () => `g-${Math.random().toString(36).slice(2)}`,
    [score],
  );

  return (
    <div className="relative grid place-items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9B5FFF" />
            <stop offset="100%" stopColor="#4DD0FF" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="drop-shadow-[0_0_20px_rgba(77,208,255,0.35)]"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-5xl font-extrabold text-white tabular-nums">
          {display}
        </div>
        <div className="mt-1 flex items-center text-sm text-white/70">
          {trend >= 0 ? (
            <ArrowUpRight className="h-4 w-4 text-[#4DD0FF]" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-rose-400" />
          )}
          <span className={trend >= 0 ? "text-[#4DD0FF]" : "text-rose-400"}>
            {trend >= 0 ? "+" : ""}
            {Math.abs(trend)}%
          </span>
          <span className="ml-1 text-white/50">this week</span>
        </div>
      </div>
    </div>
  );
}
