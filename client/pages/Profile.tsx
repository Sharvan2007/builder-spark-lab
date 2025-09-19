import { useLowBandwidth } from "@/context/LowBandwidthContext";
import NeonButton from "@/components/NeonButton";
import { Star } from "lucide-react";

export default function Profile() {
  const { lowBandwidth } = useLowBandwidth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Athlete Profile</h1>
        <NeonButton>Share Portfolio</NeonButton>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="rounded-2xl bg-[#0E0E0E] p-4">
          <h2 className="mb-3 text-sm font-semibold text-white/70">Star Rating</h2>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-6 w-6 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
            ))}
          </div>
          <p className="mt-3 text-xs text-white/50">Dynamic, benchmark-based growth</p>
        </section>

        <section className="rounded-2xl bg-[#0E0E0E] p-4 lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-white/70">Progress Radar</h2>
          {lowBandwidth ? (
            <p className="text-white/70">Progress summary: Balanced growth across speed, stamina, agility, balance, technique.</p>
          ) : (
            <svg viewBox="0 0 200 200" className="h-56 w-full">
              <defs>
                <linearGradient id="radar" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9B5FFF" />
                  <stop offset="100%" stopColor="#4DD0FF" />
                </linearGradient>
              </defs>
              <polygon points="100,20 180,70 150,180 50,180 20,70" fill="none" stroke="rgba(255,255,255,0.15)" />
              <polygon points="100,40 160,80 135,160 65,160 40,80" fill="none" stroke="rgba(255,255,255,0.15)" />
              <polygon points="100,60 140,90 120,140 80,140 60,90" fill="none" stroke="rgba(255,255,255,0.15)" />
              <polygon points="100,70 150,100 110,130 90,130 70,100" fill="url(#radar)" opacity="0.25" />
              <polyline points="100,30 170,75 130,150 70,150 30,75 100,30" fill="none" stroke="url(#radar)" strokeWidth="2" />
            </svg>
          )}
        </section>

        <section className="rounded-2xl bg-[#0E0E0E] p-4 lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-white/70">Video Gallery</h2>
          {lowBandwidth ? (
            <p className="text-white/70">Text-only: 12 videos uploaded. Latest: "Sprint Drill". AI report available in text.</p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="group relative aspect-video overflow-hidden rounded-xl bg-white/5">
                  <img src="/placeholder.svg" alt="video" className="h-full w-full object-cover opacity-60" />
                  <div className="absolute inset-0 grid place-items-center text-xs font-semibold tracking-wide text-black opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="rounded-md bg-gradient-to-r from-[#9B5FFF] to-[#4DD0FF] px-2 py-1">AI OVERLAY</span>
                  </div>
                </div>
              ))}
            </div>
          )}
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
              <span key={b} className="rounded-full bg-white/10 px-3 py-1 text-xs">{b}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
