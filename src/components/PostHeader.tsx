import { Camera } from "lucide-react";
import type { Post } from "@/lib/types";

const tagBgs = ["bg-primary-container", "bg-tertiary-fixed", "bg-surface"];

export function PostHeader({ post }: { post: Post }) {
  return (
    <header className="flex flex-col gap-gap-md">
      {/* Tags + date row */}
      <div className="flex gap-gap-sm font-mono text-label-mono flex-wrap">
        {post.tags.map((tag, i) => (
          <span
            key={tag}
            className={`${tagBgs[i % tagBgs.length]} px-2 py-1 border-[3px] border-ink uppercase`}
          >
            {tag}
          </span>
        ))}
        <span className="bg-surface px-2 py-1 border-[3px] border-ink">
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-sans text-hero font-black leading-none">
        {post.title}
      </h1>

      {/* Excerpt */}
      <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl">
        {post.excerpt}
      </p>

      {/* Hero image placeholder — dot-grid + centred icon */}
      <div className="w-full h-100 border-[3px] border-ink shadow-brutal-lg overflow-hidden relative mt-gap-sm bg-surface-container">
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Coloured diagonal stripe */}
        <div className="absolute inset-0 bg-linear-to-br from-primary-container/40 via-transparent to-tertiary-fixed/40" />
        {/* Camera icon centred */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <Camera size={64} strokeWidth={1} className="text-ink opacity-30" />
          <span className="font-mono text-label-mono text-on-surface-variant uppercase tracking-widest">
            No image yet
          </span>
        </div>
      </div>
    </header>
  );
}
