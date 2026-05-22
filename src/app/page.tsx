import { ArticleGrid } from "@/components/ArticleGrid";
import { HeroSection } from "@/components/HeroSection";
import { Navigation } from "@/components/Navigation";
import { getPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getPosts();

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans text-body-md overflow-x-hidden">
      <Navigation />

      <main className="w-full max-w-max-width mx-auto px-margin-page py-gap-lg flex flex-col gap-y-20">
        <HeroSection />
        <ArticleGrid posts={posts} />
      </main>

      <footer className="bg-surface-container-highest w-full border-t-[3px] border-ink mt-gap-lg flex flex-col md:flex-row justify-between items-center px-margin-page py-gap-md gap-gap-md">
        <div className="font-sans text-headline-md font-black text-on-surface text-center md:text-left">
          © 2025 NEOBLOG. BUILT FOR THE BOLD.
        </div>
        <div className="flex flex-wrap justify-center md:justify-end gap-gap-md font-mono text-label-mono uppercase">
          <Link
            href="#"
            className="text-on-surface-variant hover:text-secondary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-on-surface-variant hover:text-secondary transition-colors"
          >
            RSS Feed
          </Link>
          <Link
            href="#"
            className="text-on-surface-variant hover:text-secondary transition-colors"
          >
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
}
