'use client';

import type { Post } from '@/lib/types';
import { ArticleCard } from './ArticleCard';

export function ArticleGrid({ posts }: { posts: Post[] }) {
  return (
    <section className="w-full flex flex-col gap-gap-md">
      <div className="flex items-end justify-between border-b-[4px] border-ink pb-4">
        <h2 className="font-hero text-hero font-black uppercase tracking-tighter">The Feed</h2>
        <span className="font-label-mono text-label-mono font-bold bg-primary-container px-3 py-1 border-[3px] border-ink brutal-shadow hidden md:block">
          Latest Updates
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gap-md">
        {posts[0] && (
          <div className="md:col-span-8">
            <ArticleCard post={posts[0]} variant="feature" index={0} />
          </div>
        )}
        {posts[1] && (
          <div className="md:col-span-4">
            <ArticleCard post={posts[1]} variant="side" index={1} />
          </div>
        )}
        {posts[2] && (
          <div className="md:col-span-4">
            <ArticleCard post={posts[2]} variant="side" index={2} />
          </div>
        )}
        {posts[3] && (
          <div className="md:col-span-8">
            <ArticleCard post={posts[3]} variant="wide" index={3} />
          </div>
        )}
        {posts[4] && (
          <div className="md:col-span-12">
            <ArticleCard post={posts[4]} variant="side" index={4} />
          </div>
        )}
      </div>

      <div className="w-full flex justify-center mt-gap-md">
        <button className="bg-surface border-4 border-ink px-8 py-3 font-headline-md text-headline-md font-bold brutal-shadow brutal-hover brutal-active transition-all">
          LOAD MORE SH*T
        </button>
      </div>
    </section>
  );
}
