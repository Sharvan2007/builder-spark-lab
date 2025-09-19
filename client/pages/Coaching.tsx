import { useState } from "react";
import { useLowBandwidth } from "@/context/LowBandwidthContext";
import NeonButton from "@/components/NeonButton";
import { Award, Mail, MapPin, Phone, Star } from "lucide-react";

type Stars = 3 | 4 | 5;

function assignCoach(stars: Stars) {
  if (stars === 3) return { tier: "Rising Coach", exp: "3+ yrs" } as const;
  if (stars === 4) return { tier: "Seasoned Coach", exp: "8+ yrs" } as const;
  return { tier: "Premium Coach", exp: "15+ yrs" } as const;
}

export default function Coaching() {
  const { lowBandwidth } = useLowBandwidth();

  // Example athlete rating driving assignment logic
  const athleteStars: Stars = 4;
  const assignment = assignCoach(athleteStars);

  const coach = {
    name: "Anirudh Mehta",
    rating: 4.8,
    location: "Pune, IN",
    langs: ["EN", "HI"],
  };

  const [messages, setMessages] = useState<{ from: "coach" | "you"; text: string }[]>([
    { from: "coach", text: "Great job on the sprint drill! Focus on core stability this week." },
    { from: "you", text: "Thanks! Any drill you recommend?" },
    { from: "coach", text: "Try ladder drills (10 mins) + single-leg balance (3x30s)." },
  ]);
  const [input, setInput] = useState("");

  const onSend = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: "you", text: input.trim() }]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Coaching</h1>
        <NeonButton className="px-3 py-2 text-sm">Share Portfolio</NeonButton>
      </div>

      {/* Top grid: Coach profile + analysis */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-2xl bg-[#0E0E0E] p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/70">Assigned Coach</h2>
            <span className="text-xs text-white/50">Based on {athleteStars}★ rating</span>
          </div>
          {lowBandwidth ? (
            <div className="space-y-1 text-sm text-white/80">
              <div>{coach.name} — {assignment.tier} ({assignment.exp})</div>
              <div>Rating: {coach.rating} • Location: {coach.location}</div>
              <div>Languages: {coach.langs.join(", ")}</div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#9B5FFF] to-[#4DD0FF] p-[2px]">
                  <img src="/placeholder.svg" alt="coach" className="h-full w-full rounded-full object-cover" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-2 py-0.5 text-[10px]">{assignment.tier}</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">{coach.name}</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-xs"><Star className="h-3 w-3 text-yellow-400" /> {coach.rating}</span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-white/70">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{coach.location}</span>
                  <span className="inline-flex items-center gap-1"><Award className="h-4 w-4" />{assignment.exp}</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{coach.langs.join(" • ")}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <NeonButton className="px-3 py-1.5 text-sm">Message</NeonButton>
                  <button className="rounded-xl border border-white/20 px-3 py-1.5 text-sm"><Phone className="mr-1 inline h-4 w-4" />Call</button>
                  <button className="rounded-xl border border-white/20 px-3 py-1.5 text-sm"><Mail className="mr-1 inline h-4 w-4" />Email</button>
                </div>
              </div>
            </div>
          )}

          {/* Assignment logic hint */}
          <div className="mt-4 rounded-xl bg-white/5 p-3 text-xs text-white/70">
            <span className="font-semibold">Assignment logic:</span> 3★ → Rising Coach (3+ yrs), 4★ → Seasoned Coach (8+ yrs), 5★ → Premium Coach (15+ yrs)
          </div>
        </section>

        <section className="rounded-2xl bg-[#0E0E0E] p-4">
          <h2 className="mb-3 text-sm font-semibold text-white/70">AI Analysis</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-white/80">
            <li>Technique: Stable knee drive</li>
            <li>Balance: Slight right tilt on turns</li>
            <li>Stamina: Maintain cadence in final 20%</li>
            <li>Recovery: Foam roll calves & quads post-session</li>
          </ul>
        </section>
        <section className="rounded-2xl bg-[#0E0E0E] p-4">
          <h2 className="mb-3 text-sm font-semibold text-white/70">Coach Feedback</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-white/80">
            <li>Strengths: Powerful start and focus</li>
            <li>Weaknesses: Core stability on lateral moves</li>
            <li>Motivation: “You’re close to the elite tier—stay consistent!”</li>
          </ul>
        </section>
      </div>

      {!lowBandwidth && (
        <section className="rounded-2xl bg-[#0E0E0E] p-4">
          <h2 className="mb-3 text-sm font-semibold text-white/70">Quick Session Scheduler</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {["Mon 7am","Wed 6pm","Sat 8am"].map((s)=> (
              <button key={s} className="rounded-xl bg-white/5 p-3 text-sm">{s}</button>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl bg-[#0E0E0E] p-4">
        <h2 className="mb-3 text-sm font-semibold text-white/70">Chat with Coach</h2>
        {lowBandwidth ? (
          <div className="space-y-2 text-sm text-white/80">
            {messages.map((m, i) => (
              <div key={i}>{m.from === 'coach' ? 'Coach: ' : 'You: '}{m.text}</div>
            ))}
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto rounded-xl bg-white/5 p-3">
            {messages.map((m, i) => (
              <div key={i} className={`mb-2 flex ${m.from === 'you' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-xl px-3 py-2 text-sm ${m.from === 'you' ? 'bg-gradient-to-r from-[#9B5FFF] to-[#4DD0FF] text-black' : 'bg-white/10'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 flex gap-2">
          <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type a message" className="flex-1 rounded-xl bg-white/5 px-3 py-2 text-sm outline-none" />
          <NeonButton className="px-4 py-2 text-sm" onClick={onSend}>Send</NeonButton>
        </div>
      </section>
    </div>
  );
}
