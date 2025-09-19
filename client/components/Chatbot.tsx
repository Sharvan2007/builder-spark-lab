import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLowBandwidth } from "@/context/LowBandwidthContext";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const { lowBandwidth } = useLowBandwidth();

  return (
    <div>
      <button
        aria-label="Open AI Assistant"
        className={cn(
          "fixed bottom-5 right-5 z-50 rounded-full p-4 text-black",
          "bg-gradient-to-r from-[#9B5FFF] to-[#4DD0FF] shadow-[0_0_25px_rgba(155,95,255,0.6)]",
          "transition-transform hover:scale-105",
        )}
        onClick={() => setOpen((v) => !v)}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[min(90vw,380px)] overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E0E]">
          <div className="bg-gradient-to-r from-[#9B5FFF] to-[#4DD0FF] p-3 text-sm font-semibold text-black">
            TalentScout Assistant
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto p-3 text-sm">
            {lowBandwidth ? (
              <>
                <p className="text-white/80">
                  Text-only mode enabled. Ask anything about training, drills,
                  or diet.
                </p>
                <p className="rounded-md bg-white/5 p-2 text-white/80">
                  Try: "Show me today's drills"
                </p>
              </>
            ) : (
              <>
                <div className="rounded-lg bg-white/5 p-2 text-white/80">
                  Hi! I can help with personalized drills, recovery tips, and
                  weekly summaries.
                </div>
                <div className="rounded-lg bg-white/5 p-2 text-white/80">
                  Quick prompts: "Improve stamina", "Core drills", "Recovery
                  plan"
                </div>
              </>
            )}
          </div>
          <div className="flex gap-2 border-t border-white/10 p-2">
            <input
              placeholder={
                lowBandwidth
                  ? "Type message (text-only)"
                  : "Ask about training..."
              }
              className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button className="rounded-lg bg-gradient-to-r from-[#9B5FFF] to-[#4DD0FF] px-3 py-2 text-sm font-semibold text-black">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
