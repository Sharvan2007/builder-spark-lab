import { useMemo } from "react";
import { useLowBandwidth } from "@/context/LowBandwidthContext";
import NeonButton from "@/components/NeonButton";
import { ScoreGauge } from "@/components/ScoreGauge";
import { Bell, Bolt, Flame, PlayCircle, Shield, Star, Zap } from "lucide-react";

export default function Index() {
  const { lowBandwidth } = useLowBandwidth();

  const leaderboard = useMemo(
    () =>
      [
        { name: "Aarav P.", score: 92 },
        { name: "Ishaan V.", score: 90 },
        { name: "Diya K.", score: 89 },
        { name: "Kabir R.", score: 88 },
        { name: "Anaya S.", score: 86 },
        { name: "Rohit G.", score: 85 },
        { name: "Meera T.", score: 84 },
        { name: "Vihaan L.", score: 83 },
        { name: "Aanya M.", score: 82 },
        { name: "Advait D.", score: 81 },
      ],
    []
  );

  const notifications = useMemo(
    () =>
      [
        { id: 1, text: "Weekly challenge starts now!", priority: 1 },
        { id: 2, text: "Coach feedback available for Sprint Drill.", priority: 2 },
        { id: 3, text: "AI flagged inconsistencies in a recent upload.", priority: 0 },
      ].sort((a, b) => b.priority - a.priority),
    []
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="rounded-2xl bg-[#0E0E0E] p-5">
          <h2 className="mb-3 text-sm font-semibold text-white/70">Hero Scorecard</h2>
          <ScoreGauge score={78} trend={6} />
        </section>

        <section className="rounded-2xl bg-[#0E0E0E] p-5">
          <h2 className="mb-4 text-sm font-semibold text-white/70">Current Score & Progress</h2>
          {lowBandwidth ? (
            <div className="space-y-1 text-white/80">
              <p>Score: 78</p>
              <p>Trend: +6% this week</p>
              <p>Streak: 5 days</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[78%] bg-gradient-to-r from-[#9B5FFF] to-[#4DD0FF]" />
              </div>
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>Weekly Progress</span>
                <span className="text-white">78%</span>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-2xl bg-[#0E0E0E] p-5">
          <h2 className="mb-4 text-sm font-semibold text-white/70">Weekly Challenge</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">Sprint Endurance</p>
              <p className="text-sm text-white/60">Complete 5 sets x 200m</p>
            </div>
            <NeonButton>Join Challenge</NeonButton>
          </div>
        </section>

        <section className="rounded-2xl bg-[#0E0E0E] p-5 md:col-span-2 lg:col-span-1">
          <h2 className="mb-4 text-sm font-semibold text-white/70">Leaderboard Snapshot</h2>
          {lowBandwidth ? (
            <table className="w-full text-left text-sm">
              <thead className="text-white/50"><tr><th>Rank</th><th>Name</th><th>Score</th></tr></thead>
              <tbody>
                {leaderboard.map((r, i) => (
                  <tr key={r.name} className="border-t border-white/10">
                    <td className="py-1">{i + 1}</td>
                    <td className="py-1">{r.name}</td>
                    <td className="py-1">{r.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <ul className="space-y-2">
              {leaderboard.map((r, i) => (
                <li key={r.name} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm">
                  <span className="text-white/70">#{i + 1}</span>
                  <span className="flex-1 px-3">{r.name}</span>
                  <span className="font-semibold text-white">{r.score}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl bg-white p-5 text-black">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Notifications</h2>
            <span className="text-xs text-black/60">Priority Sorted</span>
          </div>
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li key={n.id} className="flex items-center gap-2 rounded-lg bg-black/5 px-3 py-2">
                <Bell className="h-4 w-4 text-black/60" />
                <span className="text-sm">{n.text}</span>
                {n.priority === 2 && (
                  <span className="ml-auto rounded-full bg-black/10 px-2 py-0.5 text-xs">High</span>
                )}
                {n.priority === 1 && (
                  <span className="ml-auto rounded-full bg-black/10 px-2 py-0.5 text-xs">Medium</span>
                )}
                {n.priority === 0 && (
                  <span className="ml-auto rounded-full bg-black/10 px-2 py-0.5 text-xs">Alert</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-5 text-black">
          <h2 className="mb-4 text-sm font-semibold">Micro-drills</h2>
          <div className="grid grid-cols-3 gap-3">
            {[{icon:PlayCircle,label:"Sprint"},{icon:Bolt,label:"Agility"},{icon:Flame,label:"Endurance"},{icon:Shield,label:"Balance"},{icon:Star,label:"Technique"},{icon:Zap,label:"Power"}].map((d) => (
              <div key={d.label} className="flex flex-col items-center justify-center gap-2 rounded-xl bg-black/5 p-3">
                <d.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{d.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
