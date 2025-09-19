import { useMemo, useState } from "react";
import { useLowBandwidth } from "@/context/LowBandwidthContext";
import NeonButton from "@/components/NeonButton";
import { useToast } from "@/hooks/use-toast";

function assignCoach(stars: 3 | 4 | 5) {
  if (stars === 3) return { tier: "Rising Coach", exp: "3+ yrs" };
  if (stars === 4) return { tier: "Seasoned Coach", exp: "8+ yrs" };
  return { tier: "Premium Coach", exp: "15+ yrs" };
}

export default function Coaching() {
  const { toast } = useToast();
  const { lowBandwidth } = useLowBandwidth();
  const [tab, setTab] = useState<"dashboard" | "feedback" | "athlete">("dashboard");

  const pending = useMemo(() => (
    [
      { name: "Aarav P.", stars: 3, drill: "Sprint Drill", ai: "Great acceleration; slight imbalance on turns" },
      { name: "Diya K.", stars: 4, drill: "Agility Ladder", ai: "Quick feet; improve core stability" },
      { name: "Kabir R.", stars: 5, drill: "Endurance Run", ai: "Strong pacing; hydration reminders" },
    ]
  ), []);

  const [form, setForm] = useState({ strengths: "", weaknesses: "", tip: "" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Coaching Hub</h1>
        <div className="inline-flex overflow-hidden rounded-xl bg-white/10 p-1 text-sm">
          <button onClick={() => setTab("dashboard")} className={`px-3 py-1.5 ${tab==='dashboard'?'bg-white text-black rounded-lg':'text-white/80'}`}>Dashboard</button>
          <button onClick={() => setTab("feedback")} className={`px-3 py-1.5 ${tab==='feedback'?'bg-white text-black rounded-lg':'text-white/80'}`}>Feedback Form</button>
          <button onClick={() => setTab("athlete")} className={`px-3 py-1.5 ${tab==='athlete'?'bg-white text-black rounded-lg':'text-white/80'}`}>Athlete View</button>
        </div>
      </div>

      {tab === 'dashboard' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="rounded-2xl bg-[#0E0E0E] p-4">
            <h2 className="mb-3 text-sm font-semibold text-white/70">Coach Assignment Logic</h2>
            <ul className="space-y-2 text-sm">
              <li>3★ athlete → <span className="font-semibold">{assignCoach(3).tier}</span> ({assignCoach(3).exp})</li>
              <li>4★ athlete → <span className="font-semibold">{assignCoach(4).tier}</span> ({assignCoach(4).exp})</li>
              <li>5★ athlete → <span className="font-semibold">{assignCoach(5).tier}</span> ({assignCoach(5).exp})</li>
            </ul>
          </section>
          <section className="lg:col-span-2 rounded-2xl bg-[#0E0E0E] p-4">
            <h2 className="mb-3 text-sm font-semibold text-white/70">Pending Reviews</h2>
            <ul className="space-y-3">
              {pending.map((p) => (
                <li key={p.name} className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <div>
                    <p className="font-semibold">{p.name} • {p.stars}★ • {assignCoach(p.stars as 3|4|5).tier}</p>
                    <p className="text-sm text-white/60">{p.drill} – AI: {p.ai}</p>
                  </div>
                  <NeonButton className="px-3 py-1.5 text-sm" onClick={() => { setTab('feedback'); setForm({ strengths: '', weaknesses: '', tip: '' }); }}>Review</NeonButton>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {tab === 'feedback' && (
        <div className="rounded-2xl bg-[#0E0E0E] p-4">
          <h2 className="mb-3 text-sm font-semibold text-white/70">Structured Feedback Form</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="md:col-span-1">
              <label className="text-xs text-white/60">Strengths</label>
              <textarea value={form.strengths} onChange={(e)=>setForm({...form, strengths:e.target.value})} className="mt-1 h-32 w-full rounded-xl bg-white/5 p-3 text-sm outline-none" />
            </div>
            <div className="md:col-span-1">
              <label className="text-xs text-white/60">Weaknesses</label>
              <textarea value={form.weaknesses} onChange={(e)=>setForm({...form, weaknesses:e.target.value})} className="mt-1 h-32 w-full rounded-xl bg-white/5 p-3 text-sm outline-none" />
            </div>
            <div className="md:col-span-1">
              <label className="text-xs text-white/60">Motivation Tip</label>
              <textarea value={form.tip} onChange={(e)=>setForm({...form, tip:e.target.value})} className="mt-1 h-32 w-full rounded-xl bg-white/5 p-3 text-sm outline-none" />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <NeonButton onClick={()=>toast({ title: "Feedback saved", description: "Shared with athlete." })}>Submit</NeonButton>
            <button className="rounded-xl border border-white/20 px-4 py-2 text-sm" onClick={()=>setForm({ strengths: '', weaknesses: '', tip: '' })}>Reset</button>
          </div>
        </div>
      )}

      {tab === 'athlete' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <section className="rounded-2xl bg-[#0E0E0E] p-4">
            <h2 className="mb-3 text-sm font-semibold text-white/70">AI Analysis</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-white/80">
              <li>Technique: Stable knee drive</li>
              <li>Balance: Slight right tilt on turns</li>
              <li>Stamina: Maintain cadence in final 20%</li>
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
          {!lowBandwidth && (
            <section className="md:col-span-2 rounded-2xl bg-[#0E0E0E] p-4">
              <h2 className="mb-3 text-sm font-semibold text-white/70">Session Scheduler (optional)</h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {["Mon 7am","Wed 6pm","Sat 8am"].map((s)=> (
                  <button key={s} className="rounded-xl bg-white/5 p-3 text-sm">{s}</button>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
