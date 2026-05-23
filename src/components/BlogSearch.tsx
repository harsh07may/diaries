"use client";

import { useState, useEffect, useRef } from "react";
import type { Post } from "@/lib/types";
import { ArticleCard } from "./ArticleCard";
import { Search } from "lucide-react";

export function BlogSearch({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const observerTarget = useRef<HTMLDivElement>(null);

  const filteredPosts = posts.filter((post) => {
    const searchString = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase();
    return searchString.includes(query.toLowerCase());
  });

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 5, filteredPosts.length));
        }
      },
      { threshold: 0.1 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => observer.disconnect();
  }, [filteredPosts.length]);

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Search Bar */}
      <div className="w-full relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
          <Search size={24} className="text-ink" strokeWidth={3} />
        </div>
        <input
          type="text"
          placeholder="Search diaries, tags, or folklore..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisibleCount(5); // Reset infinite scroll on new search
          }}
          className="w-full bg-[#fbf8f1] border-[6px] border-ink pl-14 pr-6 py-4 font-mono text-xl text-ink placeholder:text-ink/50 brutal-shadow focus:outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-none transition-all"
        />
      </div>

      {/* Results Grid - Wide Cards */}
      {filteredPosts.length > 0 ? (
        <div className="flex flex-col gap-8">
          {visiblePosts.map((post, index) => (
            <div key={post.slug} className="w-full">
              <ArticleCard post={post} index={index} variant="wide" />
            </div>
          ))}
          
          {/* Intersection Observer Target */}
          {visibleCount < filteredPosts.length && (
            <div ref={observerTarget} className="h-10 w-full flex justify-center items-center">
               <span className="font-mono text-ink/50 font-bold uppercase animate-pulse">Loading more drafts...</span>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full bg-[#ff90e8] border-[6px] border-ink p-12 text-center brutal-shadow -rotate-1">
          <h3 className="font-mono font-black text-2xl uppercase">No drafts found.</h3>
          <p className="font-serif text-xl mt-4">Try searching for something else, like "Goa" or "CSS"!</p>
        </div>
      )}
    </div>
  );
}
