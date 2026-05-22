'use client';

import { motion } from 'framer-motion';

export function AuthorCard({ author }: { author: string }) {
  return (
    <div className="bg-action border-[3px] border-black shadow-[5px_5px_0px_0px_#000000] p-gap-md flex flex-col gap-gap-md text-white">
      <div className="flex items-center gap-gap-md">
        <div className="w-16 h-16 rounded-full border-[3px] border-black overflow-hidden bg-surface flex items-center justify-center text-3xl">
          👤
        </div>
        <div>
          <h3 className="font-headline-md text-headline-md text-white">{author}</h3>
          <p className="font-label-mono text-label-mono">Senior Designer</p>
        </div>
      </div>

      <p className="font-body-md text-white">
        Exploring the intersection of brutalist architecture and digital product design. Always
        advocating for structural honesty.
      </p>

      <motion.button
        className="w-full py-2 bg-surface text-on-surface border-[3px] border-black font-label-mono text-label-mono uppercase shadow-[4px_4px_0px_0px_#000000] transition-all duration-100 cursor-pointer"
        whileHover={{ x: 2, y: 2, boxShadow: 'none' }}
        whileTap={{ x: 4, y: 4, boxShadow: 'none' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        Follow {author}
      </motion.button>
    </div>
  );
}
