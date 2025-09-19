import { useMemo, useState } from "react";
import { useLowBandwidth } from "@/context/LowBandwidthContext";
import NeonButton from "@/components/NeonButton";

interface Athlete {
  rank: number;
  name: string;
  score: number;
  tags: string[];
}

function makeAthletes(seed = 1): Athlete[] {
  const first = [
    "Aarav",
    "Ishaan",
    "Diya",
    "Kabir",
    "Anaya",
    "Rohit",
    "Meera",
    "Vihaan",
    "Aanya",
    "Advait",
    "Reyansh",
    "Sara",
    "Arjun",
    "Kiara",
    "Tanvi",
    "Rhea",
    "Dhruv",
    "Aditi",
    "Ansh",
    "Kritika",
  ];
  const last = [
    " P.",
    " V.",
    " K.",
    " R.",
    " S.",
    " G.",
    " T.",
    " L.",
    " M.",
    " D.",
  ];
  const out: Athlete[] = [];
  let s = seed;
  for (let i = 0; i < 50; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = Math.floor((s / 233280) * 100);
    const name = `${first[i % first.length]}${last[i % last.length]}`;
    const score = 100 - Math.floor(i / 1.2) - (r % 3);
    const tags = [
      i % 2 === 0 ? "Consistent" : "",
      i % 3 === 0 ? "Rapid Climber" : "",
      i % 5 === 0 ? "Iron Streak" : "",
    ].filter(Boolean);
    out.push({ rank: i + 1, name, score: Math.max(60, score), tags });
  }
  return out;
}

export default function Leaderboard() {
  const { lowBandwidth } = useLowBandwidth();
  const [tab, setTab] = useState<"regional" | "national">("regional");
  const regional = useMemo(() => makeAthletes(7), []);
  const national = useMemo(() => makeAthletes(19), []);
  const data = tab === "regional" ? regional : national;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leaderboard & Challenges</h1>
        <div className="inline-flex overflow-hidden rounded-xl bg-white/10 p-1 text-sm">
          <button
            onClick={() => setTab("regional")}
            className={`px-3 py-1.5 ${tab === "regional" ? "bg-white text-black rounded-lg" : "text-white/80"}`}
          >
            Regional
          </button>
          <button
            onClick={() => setTab("national")}
            className={`px-3 py-1.5 ${tab === "national" ? "bg-white text-black rounded-lg" : "text-white/80"}`}
          >
            National
          </button>
        </div>
      </div>

      {lowBandwidth ? (
        <div className="rounded-2xl bg-[#0E0E0E] p-4">
          <table className="w-full text-left text-sm">
            <thead className="text-white/60">
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 50).map((a) => (
                <tr key={a.rank} className="border-t border-white/10">
                  <td className="py-1">{a.rank}</td>
                  <td className="py-1">{a.name}</td>
                  <td className="py-1">{a.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="rounded-2xl bg-[#0E0E0E] p-4 lg:col-span-2">
            <h2 className="mb-3 text-sm font-semibold text-white/70">
              Top 50 {tab === "regional" ? "in your region" : "across India"}
            </h2>
            <ul className="space-y-2">
              {data.map((a) => (
                <li
                  key={a.rank}
                  className="flex items-center justify-between rounded-xl bg-white/5 p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white/60">#{a.rank}</span>
                    <span className="font-medium">{a.name}</span>
                    <div className="flex flex-wrap gap-1">
                      {a.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold">{a.score}</span>
                    <NeonButton className="px-3 py-1.5 text-sm">
                      Join Challenge
                    </NeonButton>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl bg-[#0E0E0E] p-4">
            <h2 className="mb-3 text-sm font-semibold text-white/70">
              Featured Challenges
            </h2>
            <div className="space-y-3">
              {[
                { title: "Endurance Dash", desc: "800m x 4 sets", cta: "Join" },
                {
                  title: "Agility Ladder",
                  desc: "Footwork x 10 rounds",
                  cta: "Join",
                },
                {
                  title: "Core Blast",
                  desc: "Plank + Mountain Climbers",
                  cta: "Join",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="flex items-center justify-between rounded-xl bg-white/5 p-3"
                >
                  <div>
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-sm text-white/60">{c.desc}</p>
                  </div>
                  <NeonButton className="px-3 py-1.5 text-sm">
                    {c.cta}
                  </NeonButton>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
