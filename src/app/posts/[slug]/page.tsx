'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { PostHeader } from '@/components/PostHeader';
import { PostContent } from '@/components/PostContent';
import { AuthorCard } from '@/components/AuthorCard';
import { RelatedPosts } from '@/components/RelatedPosts';
import { getPost, getRelatedPosts } from '@/lib/posts';

export default function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getPost(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <motion.div
      className="bg-background min-h-screen flex flex-col font-body-md text-body-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Navigation />

      <main className="flex-grow w-full max-w-max-width mx-auto px-margin-page py-gap-lg flex flex-col md:flex-row gap-gap-lg">
        <article className="w-full md:w-8/12 flex flex-col gap-gap-lg">
          <PostHeader post={post} />

          <div className="flex flex-col gap-gap-md font-body-md text-body-md">
            <PostContent content={post.content} />
          </div>

          <div className="flex items-center gap-gap-sm pt-gap-md border-t-[3px] border-black">
            <span className="font-label-mono text-label-mono font-bold mr-gap-sm">SHARE:</span>
            <button className="w-10 h-10 border-[3px] border-black bg-surface flex items-center justify-center shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
              ↗
            </button>
            <button className="w-10 h-10 border-[3px] border-black bg-info text-white flex items-center justify-center shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
              𝕏
            </button>
          </div>
        </article>

        <aside className="w-full md:w-4/12 flex flex-col gap-gap-lg">
          <AuthorCard author={post.author} />
          <RelatedPosts posts={relatedPosts} />
        </aside>
      </main>

      <footer className="bg-surface-container-highest w-full border-t-[3px] border-black mt-gap-lg flex flex-col md:flex-row justify-between items-center px-margin-page py-gap-md gap-gap-md">
        <div className="font-headline-md text-headline-md font-black text-on-surface">NEOBLOG</div>
        <div className="flex flex-wrap gap-gap-md font-label-mono text-label-mono uppercase">
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">Privacy Policy</a>
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">RSS Feed</a>
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">Contact</a>
        </div>
        <div className="font-label-mono text-label-mono uppercase text-secondary">
          © 2025 NEOBLOG. BUILT FOR THE BOLD.
        </div>
      </footer>
    </motion.div>
  );
}
