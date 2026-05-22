import type { Post } from '@/lib/types';

const tagBgs = ['bg-primary-container', 'bg-tertiary-fixed', 'bg-surface'];

export function PostHeader({ post }: { post: Post }) {
  return (
    <header className="flex flex-col gap-gap-md">
      <div className="flex gap-gap-sm font-label-mono text-label-mono flex-wrap">
        {post.tags.map((tag, i) => (
          <span key={tag} className={`${tagBgs[i % tagBgs.length]} px-2 py-1 border-[3px] border-black uppercase`}>
            {tag}
          </span>
        ))}
        <span className="bg-surface px-2 py-1 border-[3px] border-black">
          {new Date(post.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>

      <h1 className="font-hero text-hero">{post.title}</h1>

      <p className="font-body-lg text-body-lg text-on-surface-variant">{post.excerpt}</p>

      <div className="w-full h-[400px] border-[3px] border-black shadow-[5px_5px_0px_0px_#000000] overflow-hidden relative mt-gap-sm bg-surface-container flex items-center justify-center">
        <span className="text-[80px]">📸</span>
      </div>
    </header>
  );
}
