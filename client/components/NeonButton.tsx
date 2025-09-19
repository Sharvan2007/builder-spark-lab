import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function NeonButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "relative inline-flex items-center justify-center rounded-2xl px-5 py-2.5 font-semibold tracking-wide text-black",
        "bg-gradient-to-r from-[#9B5FFF] to-[#4DD0FF] shadow-[0_0_20px_rgba(155,95,255,0.35)]",
        "transition-transform duration-200 hover:scale-[1.02] focus:outline-none",
        "after:absolute after:inset-0 after:-z-10 after:rounded-2xl after:bg-gradient-to-r after:from-[#9B5FFF] after:to-[#4DD0FF] after:blur-xl after:opacity-50 hover:after:opacity-70",
        className,
      )}
    >
      {children}
    </button>
  );
}
