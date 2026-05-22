import Link from "next/link";
import type { Post } from "@/lib/types";

const cardBgs = ["bg-tertiary-fixed", "bg-primary-container", "bg-surface"];
const tagBgs = ["bg-surface", "bg-primary-container", "bg-tertiary-fixed"];

export function RelatedPosts({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col gap-gap-md">
      <h3 className="font-sans text-headline-md border-b-[3px] border-ink pb-2">
        Read Next
      </h3>

      {posts.map((post, i) => (
        <Link key={post.slug} href={`/posts/${post.slug}`} className="block">
          <div
            className={`${cardBgs[i % cardBgs.length]} border-[3px] border-ink shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-100`}
          >
            <div className="p-gap-sm flex flex-col gap-2">
              <span
                className={`${tagBgs[i % tagBgs.length]} font-mono text-label-mono w-max px-1 border-ink border-2 uppercase`}
              >
                {post.tags[0]}
              </span>
              <h4 className="font-sans text-headline-md">{post.title}</h4>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
