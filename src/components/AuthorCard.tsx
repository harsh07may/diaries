"use client";

import { motion } from "framer-motion";
import { UserRound } from "lucide-react";

export function AuthorCard({ author }: { author: string }) {
  return (
    <div className="bg-action border-[3px] border-ink shadow-brutal-lg p-gap-md flex flex-col gap-gap-md text-white">
      <div className="flex items-center gap-gap-md">
        <div className="w-16 h-16 rounded-full border-[3px] border-ink overflow-hidden bg-surface flex items-center justify-center">
          <UserRound
            size={32}
            strokeWidth={1.5}
            className="text-on-surface-variant"
          />
        </div>
        <div>
          <h3 className="font-sans text-headline-md text-white font-black">
            {author}
          </h3>
          <p className="font-mono text-label-mono opacity-80">
            Senior Designer
          </p>
        </div>
      </div>

      <p className="font-sans text-white leading-relaxed">
        Exploring the intersection of brutalist architecture and digital product
        design. Always advocating for structural honesty.
      </p>

      <motion.button
        type="button"
        className="w-full py-3 bg-surface text-on-surface border-[3px] border-ink font-mono text-label-mono uppercase tracking-widest font-bold shadow-brutal cursor-pointer"
        whileHover={{ x: 2, y: 2, boxShadow: "none" }}
        whileTap={{ x: 4, y: 4, boxShadow: "none" }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        Follow {author}
      </motion.button>
    </div>
  );
}
