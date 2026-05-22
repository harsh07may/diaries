'use client';

export function HeroSection() {
  return (
    <section className="w-full bg-tertiary-fixed border-[3px] border-ink brutal-shadow-lg p-gap-md relative overflow-hidden rounded-xl">
      <div className="absolute top-4 left-4 z-10 bg-white border-[3px] border-ink px-3 py-1 font-label-mono text-label-mono font-bold uppercase -rotate-2 brutal-shadow">
        My Digital Desk
      </div>

      <div className="w-full h-[400px] md:h-[500px] relative flex items-center justify-center">
        {/* Monitor */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[280px] md:w-[380px] h-[200px] md:h-[260px] bg-white border-[4px] border-ink brutal-shadow flex flex-col z-20 cursor-pointer transition-all duration-200 hover:scale-105 hover:-rotate-1">
          <div className="h-6 border-b-[4px] border-ink bg-surface-container flex items-center px-2 gap-2">
            <div className="w-3 h-3 rounded-full bg-action border-[2px] border-ink" />
            <div className="w-3 h-3 rounded-full bg-caution border-[2px] border-ink" />
            <div className="w-3 h-3 rounded-full bg-info border-[2px] border-ink" />
          </div>
          <div className="flex-1 bg-[#1e1e1e] p-4 font-label-mono text-label-mono overflow-hidden">
            <p className="text-action animate-pulse">&gt; _hello world</p>
            <p className="text-tertiary-fixed-dim">&gt; loading posts...</p>
            <p className="text-primary-fixed">&gt; status: online</p>
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80px] h-6 bg-surface-variant border-[4px] border-ink border-t-0" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[140px] h-4 bg-surface-variant border-[4px] border-ink rounded-b-lg" />
        </div>

        {/* Coffee Cup */}
        <div
          className="absolute bottom-[15%] left-[22%] w-16 h-20 bg-primary-container border-[4px] border-ink rounded-b-xl z-30 brutal-shadow cursor-pointer transition-all duration-200 hover:scale-110"
          title="Need More Caffeine"
        >
          <div className="absolute -right-4 top-4 w-6 h-10 border-[4px] border-ink border-l-0 rounded-r-xl" />
          <div className="w-full h-4 bg-[#4a2e15] border-b-[4px] border-ink rounded-t-sm" />
        </div>

        {/* Plant */}
        <div
          className="absolute bottom-[10%] right-[22%] z-20 cursor-pointer transition-all duration-200 hover:scale-110"
          title="Touch Grass"
        >
          <div className="w-16 h-20 bg-action border-[4px] border-ink brutal-shadow relative z-10 flex items-end justify-center">
            <div className="w-full h-4 bg-[#4a2e15] absolute top-0 border-b-[4px] border-ink" />
          </div>
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-2 h-24 bg-tertiary border-[2px] border-ink z-0" />
          <div className="absolute bottom-24 right-4 w-12 h-12 bg-green-500 border-[3px] border-ink rounded-full rounded-br-none rotate-45 z-0" />
          <div className="absolute bottom-32 left-4 w-10 h-10 bg-green-400 border-[3px] border-ink rounded-full rounded-bl-none -rotate-45 z-0" />
          <div className="absolute bottom-40 right-2 w-8 h-8 bg-green-500 border-[3px] border-ink rounded-full rounded-tr-none rotate-[120deg] z-0" />
        </div>

        {/* Notebook */}
        <div
          className="absolute bottom-[5%] right-[38%] w-24 h-32 bg-yellow-200 border-[4px] border-ink brutal-shadow rotate-12 z-30 flex flex-col justify-between p-2 cursor-pointer transition-all duration-200 hover:rotate-6 hover:scale-110"
          title="Open Notes"
        >
          <div className="w-full h-2 border-b-[2px] border-ink" />
          <div className="w-full h-2 border-b-[2px] border-ink" />
          <div className="w-full h-2 border-b-[2px] border-ink" />
          <div className="w-full h-2 border-b-[2px] border-ink" />
          <span className="absolute top-2 right-2 text-ink text-xs font-bold">✏️</span>
        </div>
      </div>
    </section>
  );
}
