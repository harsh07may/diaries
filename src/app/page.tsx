import { ArticleGrid } from "@/components/ArticleGrid";
import { HeroSection } from "@/components/HeroSection";
import { Navigation } from "@/components/Navigation";
import { getPosts } from "@/lib/posts";
import Link from "next/link";

const BackgroundShapes = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {/* Pink Triangle */}
    <svg className="absolute top-[5%] -left-[5%] w-64 h-64 -rotate-12" viewBox="0 0 100 100" overflow="visible">
      <polygon points="50,5 95,95 5,95" fill="#ff90e8" stroke="#000" strokeWidth="4" className="drop-shadow-[8px_8px_0_rgba(0,0,0,1)]" />
    </svg>
    
    {/* Yellow Star */}
    <svg className="absolute top-[20%] right-[5%] w-32 h-32 rotate-12" viewBox="0 0 100 100" overflow="visible">
      <polygon points="50,5 61,35 93,35 68,54 77,84 50,65 23,84 32,54 7,35 39,35" fill="#fef08a" stroke="#000" strokeWidth="4" className="drop-shadow-[6px_6px_0_rgba(0,0,0,1)]" />
    </svg>

    {/* Green Ring */}
    <svg className="absolute bottom-[10%] left-[8%] w-40 h-40" viewBox="0 0 100 100" overflow="visible">
      <path d="M50 10 A 40 40 0 1 1 49.9 10" fill="none" stroke="#a3e635" strokeWidth="16" className="drop-shadow-[6px_6px_0_rgba(0,0,0,1)]" />
      <path d="M50 2 A 48 48 0 1 1 49.9 2" fill="none" stroke="#000" strokeWidth="4" />
      <path d="M50 18 A 32 32 0 1 1 49.9 18" fill="none" stroke="#000" strokeWidth="4" />
    </svg>
    
    {/* Pink Spark */}
    <svg className="absolute top-[60%] right-[12%] w-24 h-24 -rotate-12" viewBox="0 0 100 100" overflow="visible">
       <path d="M50,0 Q50,50 100,50 Q50,50 50,100 Q50,50 0,50 Q50,50 50,0" fill="#f472b6" stroke="#000" strokeWidth="4" className="drop-shadow-[6px_6px_0_rgba(0,0,0,1)]" />
    </svg>
  </div>
);

export default async function Home() {
  const posts = await getPosts();

  return (
    <div 
      className="min-h-screen bg-[#bbf7d0] text-on-surface font-sans text-body-md overflow-x-hidden relative z-0"
      style={{
        backgroundImage: "radial-gradient(circle, #000 2px, transparent 2px)",
        backgroundSize: "48px 48px"
      }}
    >
      <BackgroundShapes />
      <Navigation />

      <main className="w-full max-w-max-width mx-auto px-margin-page py-gap-lg flex flex-col gap-y-20 relative z-10">
        <HeroSection />
        <ArticleGrid posts={posts} />
      </main>

      <footer className="bg-surface-container-highest w-full border-t-[3px] border-ink mt-gap-lg flex flex-col md:flex-row justify-between items-center px-margin-page py-gap-md gap-gap-md">
        <div className="font-sans text-headline-md font-black text-on-surface text-center md:text-left">
          © 2026 kanaka.pages. BUILT FOR THE BOLD.
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
