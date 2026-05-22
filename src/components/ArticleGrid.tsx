'use client';

import { motion } from 'framer-motion';
import type { Post } from '@/lib/types';
import { ArticleCard } from './ArticleCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export function ArticleGrid({ posts }: { posts: Post[] }) {
  return (
    <section className="w-full flex flex-col gap-gap-md">
      <div className="flex items-end justify-between border-b-4 border-ink pb-4">
        <h2 className="font-sans text-hero font-black uppercase tracking-tighter">The Feed</h2>
        <span className="font-mono text-label-mono font-bold bg-primary-container px-3 py-1 border-[3px] border-ink brutal-shadow hidden md:block">
          Latest Updates
        </span>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-12 gap-gap-md"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {posts[0] && (
          <motion.div className="md:col-span-8" variants={item}>
            <ArticleCard post={posts[0]} variant="feature" index={0} />
          </motion.div>
        )}
        {posts[1] && (
          <motion.div className="md:col-span-4" variants={item}>
            <ArticleCard post={posts[1]} variant="side" index={1} />
          </motion.div>
        )}
        {posts[2] && (
          <motion.div className="md:col-span-4" variants={item}>
            <ArticleCard post={posts[2]} variant="side" index={2} />
          </motion.div>
        )}
        {posts[3] && (
          <motion.div className="md:col-span-8" variants={item}>
            <ArticleCard post={posts[3]} variant="wide" index={3} />
          </motion.div>
        )}
        {posts[4] && (
          <motion.div className="md:col-span-12" variants={item}>
            <ArticleCard post={posts[4]} variant="wide" index={4} />
          </motion.div>
        )}
      </motion.div>

      <div className="w-full flex justify-center mt-gap-md">
        <button
          type="button"
          className="bg-surface border-4 border-ink px-8 py-3 font-sans text-headline-md font-bold brutal-shadow brutal-hover brutal-active transition-all cursor-pointer"
        >
          LOAD MORE SH*T
        </button>
      </div>
    </section>
  );
}
