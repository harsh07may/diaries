'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ArticleGrid } from '@/components/ArticleGrid';
import { getPosts } from '@/lib/posts';

export default function Home() {
  const posts = getPosts();

  return (
    <motion.div
      className="min-h-screen bg-surface text-on-surface font-body-md text-body-md overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Navigation />

      <main className="w-full max-w-max-width mx-auto px-margin-page py-gap-lg flex flex-col gap-y-[80px]">
        <HeroSection />
        <ArticleGrid posts={posts} />
      </main>

      <footer className="bg-surface-container-highest w-full border-t-[3px] border-black mt-gap-lg flex flex-col md:flex-row justify-between items-center px-margin-page py-gap-md gap-gap-md">
        <div className="font-headline-md text-headline-md font-black text-on-surface text-center md:text-left">
          © 2025 NEOBLOG. BUILT FOR THE BOLD.
        </div>
        <div className="flex flex-wrap justify-center md:justify-end gap-gap-md font-label-mono text-label-mono uppercase">
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">Privacy Policy</a>
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">RSS Feed</a>
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">Contact</a>
        </div>
      </footer>
    </motion.div>
  );
}
