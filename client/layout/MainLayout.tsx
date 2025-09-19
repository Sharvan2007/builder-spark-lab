import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLowBandwidth } from "@/context/LowBandwidthContext";

const nav = [
  { to: "/", label: "Dashboard" },
  { to: "/profile", label: "Profile" },
  { to: "/upload", label: "Upload" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/coaching", label: "Coaching Hub" },
];

export default function MainLayout({ children }: { children: ReactNode }) {
  const { lowBandwidth, setLowBandwidth } = useLowBandwidth();

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-[#9B5FFF] to-[#4DD0FF]" />
            <div className="bg-gradient-to-r from-[#9B5FFF] to-[#4DD0FF] bg-clip-text text-lg font-extrabold text-transparent">TalentScout</div>
          </div>
          <nav className="hidden gap-6 md:flex">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium text-white/70 hover:text-white",
                    isActive && "text-white"
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <select aria-label="Language" className="rounded-lg bg-white/5 px-2 py-1.5 text-xs text-white">
              <option>EN</option>
              <option>HI</option>
              <option>BN</option>
              <option>MR</option>
              <option>TA</option>
            </select>
            <label className="flex items-center gap-2 text-xs text-white/70">
              <input type="checkbox" checked={lowBandwidth} onChange={(e) => setLowBandwidth(e.target.checked)} />
              Low-bandwidth
            </label>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
      <footer className="border-t border-white/10 py-6 text-center text-xs text-white/50">© {new Date().getFullYear()} TalentScout</footer>
    </div>
  );
}
