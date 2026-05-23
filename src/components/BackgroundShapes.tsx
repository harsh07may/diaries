"use client";

import { motion } from "framer-motion";

export const BackgroundShapes = () => {
  return (
    <div className="hidden md:block fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Pink Triangle */}
      <motion.svg
        animate={{ y: [0, -20, 0], rotate: [-12, -10, -12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] -left-[5%] w-64 h-64 -rotate-12"
        viewBox="0 0 100 100"
        overflow="visible"
      >
        <polygon points="50,5 95,95 5,95" fill="#ff90e8" stroke="#000" strokeWidth="4" className="drop-shadow-[8px_8px_0_rgba(0,0,0,1)]" />
      </motion.svg>
      
      {/* Yellow Star */}
      <motion.svg
        animate={{ y: [0, 15, 0], rotate: [12, 15, 12] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[20%] right-[5%] w-32 h-32 rotate-12"
        viewBox="0 0 100 100"
        overflow="visible"
      >
        <polygon points="50,5 61,35 93,35 68,54 77,84 50,65 23,84 32,54 7,35 39,35" fill="#fef08a" stroke="#000" strokeWidth="4" className="drop-shadow-[6px_6px_0_rgba(0,0,0,1)]" />
      </motion.svg>

      {/* Green Ring */}
      <motion.svg
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-[10%] left-[8%] w-40 h-40"
        viewBox="0 0 100 100"
        overflow="visible"
      >
        <path d="M50 10 A 40 40 0 1 1 49.9 10" fill="none" stroke="#a3e635" strokeWidth="16" className="drop-shadow-[6px_6px_0_rgba(0,0,0,1)]" />
        <path d="M50 2 A 48 48 0 1 1 49.9 2" fill="none" stroke="#000" strokeWidth="4" />
        <path d="M50 18 A 32 32 0 1 1 49.9 18" fill="none" stroke="#000" strokeWidth="4" />
      </motion.svg>
      
      {/* Pink Spark */}
      <motion.svg
        animate={{ y: [0, 20, 0], rotate: [-12, -8, -12], scale: [1, 1.05, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[60%] right-[12%] w-24 h-24 -rotate-12"
        viewBox="0 0 100 100"
        overflow="visible"
      >
         <path d="M50,0 Q50,50 100,50 Q50,50 50,100 Q50,50 0,50 Q50,50 50,0" fill="#f472b6" stroke="#000" strokeWidth="4" className="drop-shadow-[6px_6px_0_rgba(0,0,0,1)]" />
      </motion.svg>
    </div>
  );
};
