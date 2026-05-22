import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readPost(slug: string): Post | undefined {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  const fm = data as Post;

  return {
    id: fm.id ?? slug,
    slug,
    title: fm.title,
    date: fm.date,
    tags: fm.tags ?? [],
    image: fm.image ?? "",
    excerpt: fm.excerpt ?? "",
    author: fm.author ?? "",
    authorRole: fm.authorRole ?? "",
    authorBio: fm.authorBio ?? "",
    authorImage: fm.authorImage,
    color: fm.color ?? "yellow",
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => readPost(slug))
    .filter((p): p is Post => p !== undefined)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | undefined {
  return readPost(slug);
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3,
): Post[] {
  return getPosts()
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit);
}
