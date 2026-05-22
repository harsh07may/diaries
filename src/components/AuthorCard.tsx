"use client";

import { motion } from "framer-motion";
import { UserRound } from "lucide-react";
import Image from "next/image";

interface AuthorCardProps {
  author: string;
  authorRole?: string;
  authorBio?: string;
  authorImage?: string;
}

export function AuthorCard({
  author,
  authorRole = "Writer",
  authorBio = "Exploring the intersection of design and technology.",
  authorImage,
}: AuthorCardProps) {
  return (
    <div className="bg-action border-[3px] border-ink shadow-brutal-lg p-gap-md flex flex-col gap-gap-md text-white">
      <div className="flex items-center gap-gap-md">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full border-[3px] border-ink overflow-hidden bg-surface shrink-0 relative">
          {authorImage ? (
            <Image
              src={authorImage}
              alt={author}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <UserRound
                size={32}
                strokeWidth={1.5}
                className="text-on-surface-variant"
              />
            </div>
          )}
        </div>

        <div>
          <h3 className="font-sans text-headline-md text-white font-black">
            {author}
          </h3>
          <p className="font-mono text-label-mono opacity-80">{authorRole}</p>
        </div>
      </div>

      <p className="font-sans text-white leading-relaxed">{authorBio}</p>

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
