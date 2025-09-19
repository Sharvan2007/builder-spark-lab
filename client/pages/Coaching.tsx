import { useState } from "react";
import { useLowBandwidth } from "@/context/LowBandwidthContext";
import NeonButton from "@/components/NeonButton";

export default function Coaching() {
  const { lowBandwidth } = useLowBandwidth();
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

        {!lowBandwidth && (
          <section className="md:col-span-2 rounded-2xl bg-[#0E0E0E] p-4">
            <h2 className="mb-3 text-sm font-semibold text-white/70">Quick Session Scheduler</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {["Mon 7am","Wed 6pm","Sat 8am"].map((s)=> (
                <button key={s} className="rounded-xl bg-white/5 p-3 text-sm">{s}</button>
              ))}
            </div>
          </section>
        )}

        <section className="md:col-span-2 rounded-2xl bg-[#0E0E0E] p-4">
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
    </div>
  );
}
