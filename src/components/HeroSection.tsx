"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { NotebookModal } from "./NotebookModal";
import { motion } from "framer-motion";
import type { HeroData } from "@/lib/hero";

interface HeroSectionProps {
  heroData: HeroData;
}

export function HeroSection({ heroData }: HeroSectionProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.15 }
        }
      }}
      className="w-full flex flex-col items-center gap-16 mt-4 mb-12"
    >
      {/* Main Illustration Container */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
        }}
        className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/10] overflow-visible"
      >

        {/* === BACKGROUND LAYER === */}
        {/* Wall background is removed to let the global neo-brutalism dotted pattern show through */}

        {/* === WALL ITEMS === */}
        {/* Whiteboard with AI Image */}
        <div
          onClick={() => setActiveModal("brain-dump")}
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
          onClick={() => setActiveModal("where-i-live")}
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
        <div className="absolute bottom-[2%] left-[1%] w-[98%] h-[25%] z-10 pointer-events-none">
          <svg className="w-full h-full drop-shadow-[0_12px_0_rgba(0,0,0,1)]" preserveAspectRatio="none" viewBox="0 0 100 100">
            {/* Left Side Depth */}
            <polygon points="6,25 0,75 0,100 6,50" fill="#eab308" stroke="#000" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            {/* Right Side Depth */}
            <polygon points="94,25 100,75 100,100 94,50" fill="#eab308" stroke="#000" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />

            {/* Top Surface */}
            <polygon points="6,25 94,25 100,75 0,75" fill="#fef08a" stroke="#000" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />

            {/* Top Surface Texture (Wood Grain / Planks) */}
            <path d="
              M 12 35 L 45 35
              M 55 35 L 88 35
              M 8 45 L 25 45
              M 35 45 L 75 45
              M 85 45 L 92 45
              M 5 55 L 15 55
              M 25 55 L 85 55
              M 3 65 L 60 65
              M 70 65 L 97 65
            " stroke="#d9b876" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" opacity="0.7" />

            {/* Front Lip */}
            <polygon points="0,75 100,75 100,100 0,100" fill="#fde047" stroke="#000" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />

            {/* Front Lip Texture */}
            <path d="
              M 5 85 L 35 85
              M 45 85 L 95 85
              M 15 95 L 60 95
              M 70 95 L 90 95
            " stroke="#ca8a04" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>

        {/* === CHARACTER LAYER with AI Image === */}
        <div
          onClick={() => setActiveModal("character")}
          className="group absolute bottom-[2%] left-[52%] -translate-x-1/2 w-[55%] h-[75%] z-20 transition-transform duration-300 ease-out hover:scale-105 hover:-rotate-1 cursor-pointer flex flex-col items-center justify-end"
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
          onClick={() => setActiveModal("books")}
          className="group absolute bottom-[5%] left-[5%] w-[35%] h-[35%] z-40 transition-transform duration-300 ease-out hover:scale-105 hover:rotate-2 cursor-pointer"
        >
          {/* Tooltip */}
          <div className="absolute -top-8 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col items-center">
            <div className="bg-[#a3e635] px-3 py-1 text-ink font-bold font-mono text-sm -rotate-2 brutal-shadow-sm border-2 border-ink whitespace-nowrap">
              Books I've read
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
          onClick={() => setActiveModal("contacts")}
          className="group absolute bottom-[5%] left-[42%] w-[38%] h-[42%] z-40 transition-transform duration-300 ease-out hover:scale-[1.04] hover:-rotate-1 cursor-pointer"
        >
          {/* Tooltip */}
          <div className="absolute -top-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col items-center">
            <div className="bg-[#38bdf8] px-3 py-1 text-ink font-bold font-mono text-sm rotate-2 brutal-shadow-sm border-2 border-ink whitespace-nowrap">
              My Contacts
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
          onClick={() => setActiveModal("places-to-go")}
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
      </motion.div>

      {/* === BIO SECTION === */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
        }}
        className="flex flex-col items-center max-w-4xl px-4 relative z-10 mt-8"
      >
         <div className="bg-[#fbf8f1] border-4 border-ink brutal-shadow-lg p-8 md:p-12 -rotate-1 flex flex-col items-center text-center">
           {/* Bio Text */}
           <div>
             <p className="text-lg md:text-xl font-serif leading-relaxed text-ink/75">
               I'm <strong className="font-bold text-xl md:text-2xl text-ink">Kanaka</strong> and I'm the curator of <strong className="font-bold text-ink">kanaka.pages</strong>.<br/>
               This space is my digital garden—a chaotic but carefully curated collection<br/>
               of my ongoing drafts, Goan folklore deep-dives, and personal journal entries.<br/>
               Click around my desk above to explore the different corners of my mind!
             </p>
           </div>

           {/* Signature */}
           <div className="mt-6">
             <h2 className="text-4xl md:text-5xl text-ink rotate-2" style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive" }}>
               Kanaka
             </h2>
           </div>
         </div>
      </motion.div>

      <NotebookModal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        contentId={activeModal as any}
        heroData={heroData}
      />
    </motion.section>
  );
}
