'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Post } from '@/lib/types';

export type CardVariant = 'feature' | 'side' | 'wide';

const cardColors = [
  'bg-error-container',
  'bg-tertiary-fixed',
  'bg-primary-fixed',
  'bg-surface-container-highest',
  'bg-secondary-fixed',
];

const tagColors = [
  'bg-primary text-on-primary',
  'bg-info text-white',
  'bg-caution text-ink',
  'bg-surface text-ink',
  'bg-secondary text-on-secondary',
];

const cardIcons: Record<string, string> = {
  design: '🚀',
  neobrutalism: '⚡',
  ui: '🎨',
  music: '🎧',
  productivity: '💡',
  culture: '🌍',
  rant: '📢',
  ux: '🖱️',
  css: '💻',
  tailwind: '🎯',
  tutorial: '📚',
  react: '⚛️',
  animation: '✨',
  'framer-motion': '🎬',
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function ArticleCard({
  post,
  variant = 'side',
  index = 0,
}: {
  post: Post;
  variant?: CardVariant;
  index?: number;
}) {
  const bg = cardColors[index % cardColors.length];
  const tagBg = tagColors[index % tagColors.length];
  const icon = cardIcons[post.tags[0]] ?? '📝';

  if (variant === 'feature') {
    return (
      <Link href={`/posts/${post.slug}`} className="block h-full">
        <motion.article
          className={`${bg} border-[3px] border-ink brutal-shadow brutal-hover rounded-xl p-gap-md flex flex-col justify-between min-h-[400px] relative overflow-hidden group cursor-pointer h-full`}
          whileTap={{ x: 2, y: 2, boxShadow: 'none' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="absolute top-4 right-4 bg-white border-[3px] border-ink px-3 py-1 font-label-mono text-label-mono font-bold brutal-shadow rotate-3 group-hover:rotate-6 transition-transform z-10">
            Feature
          </div>

          <div className="flex flex-wrap gap-2 mb-4 z-10">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`${tagBg} border-[2px] border-ink px-2 py-1 font-label-mono text-[12px] uppercase font-bold`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex-1 flex items-center justify-center text-[120px] opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
            {icon}
          </div>

          <div className="z-10 mt-auto bg-white/90 p-4 border-[3px] border-ink brutal-shadow">
            <h3 className="font-headline-lg text-headline-lg font-black leading-tight mb-2">
              {post.title}
            </h3>
            <p className="font-label-mono text-label-mono text-on-surface-variant italic">
              {formatDate(post.date)}
            </p>
          </div>
        </motion.article>
      </Link>
    );
  }

  if (variant === 'wide') {
    return (
      <Link href={`/posts/${post.slug}`} className="block h-full">
        <motion.article
          className={`${bg} border-[3px] border-ink brutal-shadow brutal-hover rounded-xl p-gap-md flex flex-col md:flex-row gap-gap-md cursor-pointer items-center h-full`}
          whileTap={{ x: 2, y: 2, boxShadow: 'none' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="w-full md:w-1/3 aspect-square bg-inverse-primary border-[3px] border-ink flex items-center justify-center brutal-shadow -rotate-2 text-[80px]">
            {icon}
          </div>
          <div className="w-full md:w-2/3 flex flex-col justify-center">
            <div className="flex gap-2 mb-2">
              <span className="bg-surface text-ink border-[2px] border-ink px-2 py-1 font-label-mono text-[12px] uppercase font-bold">
                {post.tags[0]}
              </span>
            </div>
            <h3 className="font-headline-lg text-headline-lg font-black leading-tight mb-2">
              {post.title}
            </h3>
            <p className="font-body-md text-body-md mb-4 line-clamp-2">{post.excerpt}</p>
            <p className="font-label-mono text-label-mono text-on-surface-variant italic">
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
        className={`${bg} border-[3px] border-ink brutal-shadow brutal-hover rounded-xl p-gap-md flex flex-col justify-between min-h-[250px] cursor-pointer h-full`}
        whileTap={{ x: 2, y: 2, boxShadow: 'none' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="flex justify-between items-start mb-4">
          <span
            className={`${tagBg} border-[2px] border-ink px-2 py-1 font-label-mono text-[12px] uppercase font-bold`}
          >
            {post.tags[0]}
          </span>
          <span className="text-4xl">{icon}</span>
        </div>
        <div>
          <h3 className="font-headline-md text-headline-md font-bold mb-2">{post.title}</h3>
          <p className="font-label-mono text-label-mono text-on-surface-variant italic">
            {formatDate(post.date)}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
