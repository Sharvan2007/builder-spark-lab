import { useEffect, useMemo, useRef, useState } from "react";
import { useLowBandwidth } from "@/context/LowBandwidthContext";
import NeonButton from "@/components/NeonButton";

export default function Upload() {
  const { lowBandwidth } = useLowBandwidth();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => () => { if (videoUrl) URL.revokeObjectURL(videoUrl); }, [videoUrl]);

  const onFile = (f?: File) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    setVideoUrl(url);
    setProcessing(true);
    setTimeout(() => setProcessing(false), 1400);
  };

  const metrics = useMemo(() => ([
    { label: "Overall Score", value: 78 },
    { label: "Speed", value: 82 },
    { label: "Balance", value: 75 },
    { label: "Stamina", value: 80 },
    { label: "Technique", value: 77 },
  ]), []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Video Upload & AI Analysis</h1>
        <div className="text-xs text-white/60">{lowBandwidth ? "Auto-compression to 480p enabled (text-only analysis)." : "Client-side preview with lightweight analysis."}</div>
      </div>

      {!videoUrl ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; onFile(f); }}
          className="grid place-items-center rounded-2xl border-2 border-dashed border-white/20 bg-[#0E0E0E] p-10 text-center"
        >
          <p className="mb-3 text-lg font-semibold">Drag & drop video here</p>
          <p className="mb-5 text-white/60">or</p>
          <div className="flex gap-3">
            <NeonButton onClick={() => inputRef.current?.click()}>Choose File</NeonButton>
            <label className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">Camera Capture
              <input type="file" accept="video/*" capture="environment" className="hidden" onChange={(e)=>onFile(e.target.files?.[0]||undefined)} />
            </label>
          </div>
          <input ref={inputRef} type="file" accept="video/*" className="hidden" onChange={(e)=>onFile(e.target.files?.[0]||undefined)} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="relative rounded-2xl bg-[#0E0E0E] p-4">
            <h2 className="mb-3 text-sm font-semibold text-white/70">Video</h2>
            {lowBandwidth ? (
              <div className="rounded-xl bg-white/5 p-4 text-sm text-white/80">Video playback disabled. Analysis below is text-only.</div>
            ) : (
              <video src={videoUrl} controls className="aspect-video w-full rounded-xl bg-black" />
            )}
            {processing && (
              <div className="absolute inset-0 grid place-items-center rounded-2xl bg-black/60">
                <div className="h-24 w-24 animate-spin rounded-full border-4 border-white/20 border-t-white" />
                <span className="mt-4 text-sm text-white/80">Processing...</span>
              </div>
            )}
          </section>

          <section className="rounded-2xl bg-[#0E0E0E] p-4">
            <h2 className="mb-3 text-sm font-semibold text-white/70">Metrics</h2>
            {lowBandwidth ? (
              <ul className="space-y-1 text-white/80">
                {metrics.map((m) => (<li key={m.label}>{m.label}: {m.value}</li>))}
              </ul>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {metrics.map((m) => (
                  <div key={m.label} className="rounded-xl bg-white/5 p-3">
                    <p className="text-xs text-white/60">{m.label}</p>
                    <p className="mt-1 text-2xl font-bold">{m.value}</p>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full bg-gradient-to-r from-[#9B5FFF] to-[#4DD0FF]" style={{ width: `${m.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="lg:col-span-2 rounded-2xl bg-[#0E0E0E] p-4">
            <h2 className="mb-3 text-sm font-semibold text-white/70">Comprehensive AI Report</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <ReportBlock title="Strengths" items={["Explosive start","Efficient stride length","Strong finish"]} />
              <ReportBlock title="Weaknesses" items={["Lateral stability dips on turns","Minor heel strike on sprints"]} />
              <ReportBlock title="Dietary recommendations" items={["Add 1g/kg protein daily","Hydrate with electrolytes post-session","Include leafy greens and nuts"]} />
              <ReportBlock title="Suggested drills & recovery tips" items={["Ladder drills 10 mins","Single-leg balance 3x30s","Foam roll calves & quads"]} />
              <ReportBlock title="Motivational nudges" items={["Great streak! Keep the momentum","You’re 2 points from the next tier"]} />
            </div>
            <div className="mt-4 flex gap-3">
              <NeonButton onClick={()=>{ setVideoUrl(null); setProcessing(false); }}>Analyze Another</NeonButton>
              {!lowBandwidth && <button className="rounded-xl border border-white/20 px-4 py-2 text-sm">Export Highlight Reel</button>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function ReportBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl bg-white/5 p-3">
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      <ul className="list-disc space-y-1 pl-5 text-sm text-white/80">
        {items.map((i) => (<li key={i}>{i}</li>))}
      </ul>
    </div>
  );
}
