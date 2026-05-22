import { Coffee, Leaf, Monitor, Pencil } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full bg-tertiary-fixed border-[3px] border-ink brutal-shadow-lg p-gap-md relative overflow-hidden rounded-xl">
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Label badge */}
      <div className="absolute top-4 left-4 z-10 bg-white border-[3px] border-ink px-3 py-1 font-mono text-label-mono font-bold uppercase -rotate-2 brutal-shadow">
        My Digital Desk
      </div>

      <div className="w-full h-100 md:h-125 relative flex items-center justify-center">
        {/* Monitor */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-70 md:w-95 h-50 md:h-65 bg-white border-4 border-ink brutal-shadow flex flex-col z-20 cursor-pointer transition-all duration-200 hover:scale-105 hover:-rotate-1">
          {/* Title bar */}
          <div className="h-7 border-b-4 border-ink bg-surface-container flex items-center px-3 gap-2 shrink-0">
            <div className="w-3 h-3 rounded-full bg-action border-2 border-ink" />
            <div className="w-3 h-3 rounded-full bg-caution border-2 border-ink" />
            <div className="w-3 h-3 rounded-full bg-info border-2 border-ink" />
            <span className="ml-2 font-mono text-[11px] text-on-surface-variant">
              kanaka.pages — bash
            </span>
          </div>
          {/* Terminal body */}
          <div className="flex-1 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-hidden flex flex-col gap-1">
            <p className="text-action animate-pulse">&gt; _hello world</p>
            <p className="text-tertiary-fixed-dim">&gt; loading posts...</p>
            <p className="text-primary-fixed">&gt; status: online ✓</p>
            <p className="text-on-surface-variant opacity-50 mt-2">█</p>
          </div>
          {/* Monitor stand */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-20 h-6 bg-surface-variant border-4 border-ink border-t-0" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-36 h-4 bg-surface-variant border-4 border-ink rounded-b-lg" />
        </div>

        {/* Coffee cup */}
        <div
          className="absolute bottom-[15%] left-[22%] z-30 cursor-pointer transition-all duration-200 hover:scale-110 hover:-rotate-6"
          title="Need More Caffeine"
        >
          <div className="w-14 h-16 bg-primary-container border-4 border-ink rounded-b-xl brutal-shadow relative">
            <div className="absolute -right-4 top-3 w-5 h-8 border-4 border-ink border-l-0 rounded-r-xl" />
            <div className="w-full h-3 bg-[#4a2e15] border-b-4 border-ink rounded-t-sm" />
            <div className="absolute inset-0 flex items-center justify-center pt-3">
              <Coffee
                size={20}
                strokeWidth={1.5}
                className="text-ink opacity-50"
              />
            </div>
          </div>
          {/* Steam */}
          <div className="absolute -top-4 left-3 w-1 h-4 bg-white/60 rounded-full blur-[1px] animate-bounce" />
          <div className="absolute -top-5 left-6 w-1 h-4 bg-white/60 rounded-full blur-[1px] animate-bounce [animation-delay:0.3s]" />
        </div>

        {/* Plant */}
        <div
          className="absolute bottom-[10%] right-[22%] z-20 cursor-pointer transition-all duration-200 hover:scale-110"
          title="Touch Grass"
        >
          <div className="w-14 h-16 bg-action border-4 border-ink brutal-shadow relative">
            <div className="w-full h-3 bg-[#4a2e15] absolute top-0 border-b-4 border-ink" />
            <div className="absolute inset-0 flex items-center justify-center pt-3">
              <Leaf
                size={20}
                strokeWidth={1.5}
                className="text-white opacity-70"
              />
            </div>
          </div>
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-2 h-20 bg-tertiary border-2 border-ink z-0" />
          <div className="absolute bottom-22 right-3 w-10 h-10 bg-green-500 border-[3px] border-ink rounded-full rounded-br-none rotate-45 z-0" />
          <div className="absolute bottom-28 left-2 w-8 h-8 bg-green-400 border-[3px] border-ink rounded-full rounded-bl-none -rotate-45 z-0" />
        </div>

        {/* Notebook */}
        <div
          className="absolute bottom-[5%] right-[38%] w-24 h-32 bg-yellow-200 border-4 border-ink brutal-shadow rotate-12 z-30 flex flex-col justify-between p-2 cursor-pointer transition-all duration-200 hover:rotate-6 hover:scale-110"
          title="Open Notes"
        >
          <div className="w-full h-2 border-b-2 border-ink opacity-40" />
          <div className="w-full h-2 border-b-2 border-ink opacity-40" />
          <div className="w-full h-2 border-b-2 border-ink opacity-40" />
          <div className="w-full h-2 border-b-2 border-ink opacity-40" />
          <div className="w-full h-2 border-b-2 border-ink opacity-40" />
          <Pencil
            size={16}
            strokeWidth={1.5}
            className="absolute top-2 right-2 text-ink opacity-60"
          />
        </div>
      </div>

      {/* Bottom label */}
      <div className="relative z-10 mt-2 flex items-center justify-center">
        <p className="font-mono text-label-mono text-on-surface-variant">
          Hover the objects ↑
        </p>
      </div>
    </section>
  );
}
