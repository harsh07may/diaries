import { AuthorCard } from "@/components/AuthorCard";
import { Navigation } from "@/components/Navigation";
import { PostHeader } from "@/components/PostHeader";
import { RelatedPosts } from "@/components/RelatedPosts";
import { renderPostMDX } from "@/lib/mdx-loader";
import { getPost, getPostSlugs, getRelatedPosts } from "@/lib/posts";
import { useMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — K-DIARY`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);
  const components = useMDXComponents({});

  const postBody = await renderPostMDX(slug, components);
  if (!postBody) notFound();

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans text-body-md">
      <Navigation />

      <main className="grow w-full max-w-max-width mx-auto px-margin-page py-gap-lg flex flex-col md:flex-row gap-gap-lg">
        {/* ── Main Article ── */}
        <article className="w-full md:w-8/12 flex flex-col gap-gap-lg">
          <PostHeader post={post} />

          {/* MDX body — all element styling comes from mdx-components.tsx */}
          <div className="flex flex-col gap-1">
            {postBody}
          </div>

          {/* Share bar */}
          <div className="flex items-center gap-gap-sm pt-gap-md border-t-[3px] border-ink">
            <span className="font-mono text-label-mono font-bold mr-gap-sm">
              SHARE:
            </span>
            <button
              type="button"
              aria-label="Share"
              className="w-10 h-10 border-[3px] border-ink bg-surface flex items-center justify-center shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              ↗
            </button>
            <button
              type="button"
              aria-label="Share on X"
              className="w-10 h-10 border-[3px] border-ink bg-info text-white flex items-center justify-center shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              𝕏
            </button>
            <button
              type="button"
              aria-label="Copy link"
              className="w-10 h-10 border-[3px] border-ink bg-surface flex items-center justify-center shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              🔗
            </button>
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside className="w-full md:w-4/12 flex flex-col gap-gap-lg">
          <AuthorCard
            author={post.author}
            authorRole={post.authorRole}
            authorBio={post.authorBio}
            authorImage={post.authorImage}
          />
          <RelatedPosts posts={relatedPosts} />
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest w-full border-t-[3px] border-ink mt-gap-lg flex flex-col md:flex-row justify-between items-center px-margin-page py-gap-md gap-gap-md">
        <div className="font-sans text-headline-md font-black text-on-surface">
          NEOBLOG
        </div>
        <div className="flex flex-wrap gap-gap-md font-mono text-label-mono uppercase">
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
            Terms of Service
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
        <div className="font-mono text-label-mono uppercase text-secondary">
          © 2025 NEOBLOG. BUILT FOR THE BOLD.
        </div>
      </footer>
    </div>
  );
}
