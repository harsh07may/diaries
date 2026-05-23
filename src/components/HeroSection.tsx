import { MapPin } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center gap-16 mt-4 mb-12">
      {/* Main Illustration Container */}
      <div className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/10] overflow-visible">
        
        {/* === BACKGROUND LAYER === */}
        {/* Wall background is removed to let the global neo-brutalism dotted pattern show through */}

        {/* === WALL ITEMS === */}
        {/* Whiteboard with AI Image */}
        <div 
          className="group absolute top-[4%] left-[2%] w-[48%] h-[46%] z-10 transition-transform duration-300 ease-out hover:scale-[1.03] hover:-rotate-1 cursor-pointer"
        >
          {/* Tooltip */}
          <div className="absolute -top-10 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col items-center">
            <div className="bg-[#ff90e8] px-3 py-1 text-ink font-bold font-mono text-sm -rotate-3 brutal-shadow-sm border-2 border-ink whitespace-nowrap">
              My Brain Dump
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff90e8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
              <path d="M12 2v16M7 13l5 5 5-5"/>
            </svg>
          </div>

          <div className="relative w-full h-full">
            <Image 
              src="/hero/kanaka-whiteboard.png" 
              alt="Whiteboard" 
              fill
              className="object-contain drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"
            />
          </div>
        </div>

        {/* Window/Painting with AI Image */}
        <div 
          className="group absolute top-[8%] right-[5%] w-[42%] h-[45%] z-10 transition-transform duration-300 ease-out hover:scale-[1.03] hover:rotate-1 cursor-pointer"
        >
          {/* Tooltip */}
          <div className="absolute -top-6 -left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex items-start gap-1">
            <div className="bg-yellow-300 px-3 py-1 text-ink font-bold font-mono text-sm rotate-2 brutal-shadow-sm border-2 border-ink whitespace-nowrap mt-4">
              Where I've lived
            </div>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="mt-6 -ml-1">
               <path d="M35 5 Q 20 5 5 25 M5 25 L5 15 M5 25 L15 25" />
            </svg>
          </div>

          <div className="w-full h-full border-[8px] border-[#2d3748] brutal-shadow overflow-hidden flex flex-col bg-white">
            <div className="relative w-full h-full">
              <Image 
                src="/hero/kanaka-goa-scenery.png" 
                alt="Goa Scenery" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* === DESK LAYER === */}
        <div className="absolute bottom-[20%] -left-[2%] w-[104%] h-3 bg-[#1e4658] border-y-4 border-ink z-10" />
        <div className="absolute bottom-0 -left-[2%] w-[104%] h-[20%] bg-[#22576b] border-t-2 border-ink z-20" />

        {/* === CHARACTER LAYER with AI Image === */}
        <div 
          className="group absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[40%] h-[60%] z-20 transition-transform duration-300 ease-out hover:scale-105 hover:-rotate-1 cursor-pointer flex flex-col items-center justify-end"
        >
          {/* Tooltip */}
          <div className="absolute top-[10%] -right-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex items-center">
            <svg width="30" height="20" viewBox="0 0 30 20" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M25 10 L5 10 M5 10 L12 3 M5 10 L12 17"/>
            </svg>
            <div className="bg-red-400 text-white px-3 py-1 font-bold font-mono text-sm rotate-3 brutal-shadow-sm border-2 border-ink whitespace-nowrap ml-1">
              Hi, it's me!
            </div>
          </div>

          <div className="relative w-full h-full">
            <Image 
              src="/hero/kanaka-character.png" 
              alt="Kanaka Character" 
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* === FOREGROUND / DESK ITEMS === */}
        
        {/* Desk Items (Books, Camera, Ink, Coffee) with AI Image */}
        <div 
          className="group absolute bottom-[5%] left-[5%] w-[35%] h-[35%] z-40 transition-transform duration-300 ease-out hover:scale-105 hover:rotate-2 cursor-pointer"
        >
          {/* Tooltip */}
          <div className="absolute -top-8 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col items-center">
            <div className="bg-[#a3e635] px-3 py-1 text-ink font-bold font-mono text-sm -rotate-2 brutal-shadow-sm border-2 border-ink whitespace-nowrap">
              Inspirations
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a3e635" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
              <path d="M12 2v16M7 13l5 5 5-5"/>
            </svg>
          </div>

           <div className="relative w-full h-full">
            <Image 
              src="/hero/kanaka-desk-items.png" 
              alt="Desk Items" 
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* Laptop with AI Image */}
        <div 
          className="group absolute bottom-[5%] left-[42%] w-[38%] h-[42%] z-40 transition-transform duration-300 ease-out hover:scale-[1.04] hover:-rotate-1 cursor-pointer"
        >
          {/* Tooltip */}
          <div className="absolute -top-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col items-center">
            <div className="bg-[#38bdf8] px-3 py-1 text-ink font-bold font-mono text-sm rotate-2 brutal-shadow-sm border-2 border-ink whitespace-nowrap">
              My Code Space
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
              <path d="M12 2v16M7 13l5 5 5-5"/>
            </svg>
          </div>

          <div className="relative w-full h-full">
            <Image 
              src="/hero/kanaka-laptop.png" 
              alt="Laptop" 
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* Map */}
        <div 
          className="group absolute -bottom-[6%] right-[4%] w-[22%] h-[20%] z-50 transition-transform duration-300 ease-out hover:scale-105 hover:-rotate-2 cursor-pointer rotate-12"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col items-center -rotate-12">
            <div className="bg-orange-300 px-3 py-1 text-ink font-bold font-mono text-sm rotate-2 brutal-shadow-sm border-2 border-ink whitespace-nowrap">
              Places to go!
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fdba74" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
              <path d="M12 2v16M7 13l5 5 5-5"/>
            </svg>
          </div>

          <div className="w-full h-full bg-[#fffde7] border-[3px] border-ink brutal-shadow flex relative overflow-hidden">
            {/* Map details */}
            <div className="w-1/3 border-r-[2px] border-ink/30 h-full bg-[#ffecb3]" />
            <div className="w-1/3 border-r-[2px] border-ink/30 h-full flex items-center justify-center">
               {/* Sea / Land curve */}
               <div className="w-full h-full bg-[#b2ebf2] rounded-tl-full border-t-2 border-ink/30" />
            </div>
            <div className="w-1/3 h-full bg-[#b2ebf2]" />

            <MapPin className="absolute top-2 right-4 text-red-500 fill-red-500" size={20} />
            
            <div className="absolute top-4 left-2 w-6 h-1 border-b-2 border-dashed border-ink rotate-45" />
            <div className="absolute top-6 left-5 w-4 h-1 border-b-2 border-dashed border-ink -rotate-12" />
          </div>
        </div>
      </div>

      {/* === BIO SECTION === */}
      <div className="flex flex-col items-center max-w-4xl px-4 relative z-10 mt-8">
         <div className="bg-[#fbf8f1] border-4 border-ink brutal-shadow-lg p-8 md:p-12 -rotate-1 flex flex-col items-center text-center">
           {/* Bio Text */}
           <div>
             <p className="text-lg md:text-xl font-serif leading-relaxed text-ink/75">
               I'm <strong className="font-bold text-xl md:text-2xl text-ink">Kanaka</strong> and I'm the curator of <strong className="font-bold text-ink">kanaka.pages</strong>.<br/>
               I'm a writer and observer who loves building worlds<br/>
               and telling stories, both Goan and universal!<br/>
               I'm a devoted friend (often over-analyzing everything), and almost<br/>
               everything I own is stained with ink or sand.
             </p>
           </div>

           {/* Signature */}
           <div className="mt-6">
             <h2 className="text-4xl md:text-5xl text-ink rotate-2" style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive" }}>
               Kanaka
             </h2>
           </div>
         </div>
      </div>

    </section>
  );
}
