import { useMemo, useState } from "react";
import { useLowBandwidth } from "@/context/LowBandwidthContext";
import NeonButton from "@/components/NeonButton";
import { Camera, Film, Medal, Star } from "lucide-react";

function StarRating({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-6 w-6 ${i < full ? "text-yellow-400 fill-yellow-400" : i === full && half ? "text-yellow-300" : "text-white/20"}`}
        />
      ))}
      <span className="ml-2 text-sm text-white/70">{value.toFixed(1)} / 5</span>
    </div>
  );
}

export default function Profile() {
  const { lowBandwidth } = useLowBandwidth();
  const [tab, setTab] = useState<"overview" | "progress" | "gallery">(
    "overview",
  );

  const videos = useMemo(
    () => [
      { id: 1, title: "Sprint Drill", tag: "Speed" },
      { id: 2, title: "Ladder Footwork", tag: "Agility" },
      { id: 3, title: "Endurance Run", tag: "Stamina" },
      { id: 4, title: "Balance Board", tag: "Balance" },
      { id: 5, title: "Core Routine", tag: "Technique" },
      { id: 6, title: "Power Jumps", tag: "Power" },
    ],
    [],
  );

  const stats = useMemo(
    () => [
      { label: "Current Rank", value: "#12" },
      { label: "Weekly Streak", value: "7 days" },
      { label: "Best Score", value: "92" },
      { label: "Challenges Won", value: "3" },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Athlete Profile</h1>
          <p className="text-sm text-white/60">
            Lightweight, rural-friendly profile with AI insights.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTab("overview")}
            className={`rounded-xl px-3 py-2 text-sm ${tab === "overview" ? "bg-white text-black" : "bg-white/10"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setTab("progress")}
            className={`rounded-xl px-3 py-2 text-sm ${tab === "progress" ? "bg-white text-black" : "bg-white/10"}`}
          >
            Progress
          </button>
          <button
            onClick={() => setTab("gallery")}
            className={`rounded-xl px-3 py-2 text-sm ${tab === "gallery" ? "bg-white text-black" : "bg-white/10"}`}
          >
            Video Gallery
          </button>
          <NeonButton className="ml-1">Share Portfolio</NeonButton>
        </div>
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <section className="rounded-2xl bg-[#0E0E0E] p-4">
            <h2 className="mb-3 text-sm font-semibold text-white/70">
              Star Rating
            </h2>
            <StarRating value={4.3} />
            <p className="mt-3 text-xs text-white/50">
              Dynamic, benchmark-based growth
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-white/5 p-3">
                  <p className="text-white/60">{s.label}</p>
                  <p className="text-lg font-semibold">{s.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-[#0E0E0E] p-4 lg:col-span-2">
            <h2 className="mb-3 text-sm font-semibold text-white/70">About</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-xl bg-white/5 p-3 text-sm text-white/80">
                Disciplines: 100m sprint, agility drills, endurance
              </div>
              <div className="rounded-xl bg-white/5 p-3 text-sm text-white/80">
                Preferred foot: Right • Height: 170cm • Age: 17
              </div>
              <div className="rounded-xl bg-white/5 p-3 text-sm text-white/80">
                Goals: Improve stamina +2 pts and win 2 weekly challenges
              </div>
              <div className="rounded-xl bg-white/5 p-3 text-sm text-white/80">
                Coach: Anirudh Mehta (Seasoned Coach)
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-[#0E0E0E] p-4">
            <h2 className="mb-3 text-sm font-semibold text-white/70">Badges</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Consistent Performer",
                "Fast Riser",
                "All-Rounder",
                "Iron Streak",
              ].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs"
                >
                  <Medal className="h-3 w-3" />
                  {b}
                </span>
              ))}
            </div>
          </section>
        </div>
      )}

      {tab === "progress" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <section className="rounded-2xl bg-[#0E0E0E] p-4">
            <h2 className="mb-3 text-sm font-semibold text-white/70">Radar</h2>
            {lowBandwidth ? (
              <p className="text-white/70">
                Balanced growth across speed, stamina, agility, balance,
                technique.
              </p>
            ) : (
              <svg viewBox="0 0 200 200" className="h-64 w-full">
                <defs>
                  <linearGradient id="radarG" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9B5FFF" />
                    <stop offset="100%" stopColor="#4DD0FF" />
                  </linearGradient>
                </defs>
                <polygon
                  points="100,20 180,70 150,180 50,180 20,70"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                />
                <polygon
                  points="100,40 160,80 135,160 65,160 40,80"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                />
                <polygon
                  points="100,60 140,90 120,140 80,140 60,90"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                />
                <polygon
                  points="100,70 150,100 110,130 90,130 70,100"
                  fill="url(#radarG)"
                  opacity="0.25"
                />
                <polyline
                  points="100,30 170,75 130,150 70,150 30,75 100,30"
                  fill="none"
                  stroke="url(#radarG)"
                  strokeWidth="2"
                />
              </svg>
            )}
          </section>
          <section className="rounded-2xl bg-[#0E0E0E] p-4">
            <h2 className="mb-3 text-sm font-semibold text-white/70">
              Weekly Trend
            </h2>
            {lowBandwidth ? (
              <ul className="list-disc pl-5 text-sm text-white/80">
                <li>Week +6%: Strong improvement</li>
                <li>Streak 7 days</li>
              </ul>
            ) : (
              <div className="h-64 w-full">
                <svg viewBox="0 0 300 200" className="h-full w-full">
                  <defs>
                    <linearGradient
                      id="lineG"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#9B5FFF" />
                      <stop offset="100%" stopColor="#4DD0FF" />
                    </linearGradient>
                  </defs>
                  <polyline
                    points="0,160 40,150 80,140 120,120 160,110 200,95 240,90 280,80"
                    fill="none"
                    stroke="url(#lineG)"
                    strokeWidth="3"
                  />
                  <rect
                    x="0"
                    y="160"
                    width="280"
                    height="1"
                    fill="rgba(255,255,255,0.1)"
                  />
                </svg>
              </div>
            )}
            <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
              {[
                { l: "This Week", v: "+6%" },
                { l: "Avg Score", v: "84" },
                { l: "Sessions", v: "12" },
              ].map((m) => (
                <div key={m.l} className="rounded-xl bg-white/5 p-3">
                  <p className="text-white/60">{m.l}</p>
                  <p className="text-lg font-semibold">{m.v}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {tab === "gallery" && (
        <section className="rounded-2xl bg-[#0E0E0E] p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/70">
              Video Gallery
            </h2>
            <div className="flex gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1">
                <Camera className="h-3 w-3" /> Capture
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1">
                <Film className="h-3 w-3" /> Upload
              </span>
            </div>
          </div>
          {lowBandwidth ? (
            <p className="text-white/70">
              12 videos uploaded. Latest: "Sprint Drill". AI report available in
              text.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="group relative aspect-video overflow-hidden rounded-xl bg-white/5"
                >
                  <img
                    src="/placeholder.svg"
                    alt={v.title}
                    className="h-full w-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-2">
                    <span className="self-start rounded-md bg-white/10 px-2 py-1 text-[10px]">
                      {v.tag}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-black/50 px-2 py-1 text-xs">
                        {v.title}
                      </span>
                      <span className="rounded-md bg-gradient-to-r from-[#9B5FFF] to-[#4DD0FF] px-2 py-1 text-[10px] font-semibold text-black">
                        AI OVERLAY
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
