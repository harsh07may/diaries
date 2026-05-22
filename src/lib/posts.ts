import { existsSync, readdirSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type { Post } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// ─── Sync helpers (used only at build time / generateStaticParams) ────────────

export function getPostSlugs(): string[] {
  if (!existsSync(POSTS_DIR)) return [];
  return readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

// ─── Async helpers (used in Server Components at request / SSG time) ──────────

async function readPost(slug: string): Promise<Post | undefined> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  try {
    const raw = await readFile(filePath, "utf-8");
    const { data } = matter(raw);
    const fm = data as Partial<Post>;
    return {
      id: fm.id ?? slug,
      slug,
      title: fm.title ?? "",
      date: fm.date ?? "",
      tags: fm.tags ?? [],
      image: fm.image ?? "",
      excerpt: fm.excerpt ?? "",
      author: fm.author ?? "",
      authorRole: fm.authorRole ?? "",
      authorBio: fm.authorBio ?? "",
      authorImage: fm.authorImage,
      color: fm.color ?? "yellow",
    };
  } catch {
    return undefined;
  }
}

export async function getPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map(readPost));
  return posts
    .filter((p): p is Post => p !== undefined)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return readPost(slug);
}

export async function getRelatedPosts(
  currentSlug: string,
  limit = 3,
): Promise<Post[]> {
  const all = await getPosts();
  return all.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
