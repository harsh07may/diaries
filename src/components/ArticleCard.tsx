"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Rocket,
  Headphones,
  Lightbulb,
  Megaphone,
  MousePointer2,
  Code2,
  BookOpen,
  Atom,
  Sparkles,
  Clapperboard,
  Palette,
  Target,
  FileText,
} from "lucide-react";
import type { Post } from "@/lib/types";

export type CardVariant = "feature" | "side" | "wide";

const cardColors = [
  "bg-error-container",
  "bg-tertiary-fixed",
  "bg-primary-fixed",
  "bg-surface-container-highest",
  "bg-secondary-fixed",
];

const tagColors = [
  "bg-primary text-on-primary",
  "bg-info text-white",
  "bg-caution text-ink",
  "bg-surface text-ink",
  "bg-secondary text-on-secondary",
];

const tagIcons: Record<string, React.ElementType> = {
  design: Palette,
  neobrutalism: Rocket,
  ui: Palette,
  music: Headphones,
  productivity: Lightbulb,
  culture: Headphones,
  rant: Megaphone,
  ux: MousePointer2,
  css: Code2,
  tailwind: Target,
  tutorial: BookOpen,
  react: Atom,
  animation: Sparkles,
  "framer-motion": Clapperboard,
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ArticleCard({
  post,
  variant = "side",
  index = 0,
}: {
  post: Post;
  variant?: CardVariant;
  index?: number;
}) {
  const bg = cardColors[index % cardColors.length];
  const tagBg = tagColors[index % tagColors.length];
  const Icon = tagIcons[post.tags[0]] ?? FileText;

  if (variant === "feature") {
    return (
      <Link href={`/posts/${post.slug}`} className="block h-full">
        <motion.article
          className={`${bg} border-[3px] border-ink brutal-shadow brutal-hover rounded-xl p-gap-md flex flex-col justify-between min-h-100 relative overflow-hidden group cursor-pointer h-full`}
          whileTap={{ x: 4, y: 4, boxShadow: "none" }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Feature badge */}
          <div className="absolute top-4 right-4 bg-white border-[3px] border-ink px-3 py-1 font-mono text-label-mono font-bold brutal-shadow rotate-3 group-hover:rotate-6 transition-transform z-10">
            Feature
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 z-10">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`${tagBg} border-2 border-ink px-2 py-1 font-mono text-[12px] uppercase font-bold`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Large icon — fades in on hover */}
          <div className="flex-1 flex items-center justify-center opacity-10 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
            <Icon size={140} strokeWidth={1} className="text-ink" />
          </div>

          {/* Content overlay */}
          <div className="z-10 mt-auto bg-white/90 backdrop-blur-sm p-4 border-[3px] border-ink brutal-shadow">
            <h3 className="font-sans text-headline-lg font-black leading-tight mb-2">
              {post.title}
            </h3>
            <p className="font-mono text-label-mono text-on-surface-variant italic">
              {formatDate(post.date)}
            </p>
          </div>
        </motion.article>
      </Link>
    );
  }

  if (variant === "wide") {
    return (
      <Link href={`/posts/${post.slug}`} className="block h-full">
        <motion.article
          className={`${bg} border-[3px] border-ink brutal-shadow brutal-hover rounded-xl p-gap-md flex flex-col md:flex-row gap-gap-md cursor-pointer items-center h-full`}
          whileTap={{ x: 4, y: 4, boxShadow: "none" }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Tilted icon block */}
          <div className="w-full md:w-1/3 aspect-square bg-inverse-primary border-[3px] border-ink flex items-center justify-center brutal-shadow -rotate-2 group-hover:rotate-0 transition-transform duration-300">
            <Icon size={80} strokeWidth={1.5} className="text-ink" />
          </div>

          <div className="w-full md:w-2/3 flex flex-col justify-center">
            <div className="flex gap-2 mb-2">
              <span className="bg-surface text-ink border-2 border-ink px-2 py-1 font-mono text-[12px] uppercase font-bold">
                {post.tags[0]}
              </span>
            </div>
            <h3 className="font-sans text-headline-lg font-black leading-tight mb-2">
              {post.title}
            </h3>
            <p className="font-sans text-body-md mb-4 line-clamp-2 text-on-surface-variant">
              {post.excerpt}
            </p>
            <p className="font-mono text-label-mono text-on-surface-variant italic">
              {formatDate(post.date)}
            </p>
          </div>
        </motion.article>
      </Link>
    );
  }

  return (
    <Link href={`/posts/${post.slug}`} className="block h-full">
      <motion.article
        className={`${bg} border-[3px] border-ink brutal-shadow brutal-hover rounded-xl p-gap-md flex flex-col justify-between min-h-62.5 cursor-pointer h-full`}
        whileTap={{ x: 4, y: 4, boxShadow: "none" }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="flex justify-between items-start mb-4">
          <span
            className={`${tagBg} border-2 border-ink px-2 py-1 font-mono text-[12px] uppercase font-bold`}
          >
            {post.tags[0]}
          </span>
          <Icon size={32} strokeWidth={1.5} className="text-ink opacity-70" />
        </div>
        <div>
          <h3 className="font-sans text-headline-md font-bold mb-2 leading-tight">
            {post.title}
          </h3>
          <p className="font-mono text-label-mono text-on-surface-variant italic">
            {formatDate(post.date)}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
