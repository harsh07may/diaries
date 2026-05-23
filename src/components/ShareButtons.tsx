"use client";

import { useState } from "react";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const shareText = `Check out this post: ${title}`;
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
  const mailShareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + "\n\n" + url)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this post: ${title}`,
          url: url,
        });
      } catch (err) {
        console.error("Failed to share", err);
      }
    } else {
      window.location.href = mailShareUrl;
    }
  };

  return (
    <div className="flex items-center gap-gap-sm pt-gap-md border-t-[3px] border-ink">
      <span className="font-mono text-label-mono font-bold mr-gap-sm">SHARE:</span>
      
      {/* Native Share Modal (Fallback to Email) */}
      <button
        type="button"
        onClick={handleNativeShare}
        aria-label="Share via OS"
        className="w-10 h-10 border-[3px] border-ink bg-[#fef08a] flex items-center justify-center shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
      >
        📤
      </button>
      
      {/* X / Twitter */}
      <a
        href={xShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="w-10 h-10 border-[3px] border-ink bg-info text-white flex items-center justify-center shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
      >
        𝕏
      </a>
      
      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className={`w-10 h-10 border-[3px] border-ink flex items-center justify-center shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${
          copied ? "bg-[#a3e635]" : "bg-surface"
        }`}
      >
        {copied ? "✓" : "🔗"}
      </button>
    </div>
  );
}
