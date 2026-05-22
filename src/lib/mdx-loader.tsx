import fs from "fs";
import matter from "gray-matter";
import type { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";
import type { JSX } from "react";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/**
 * Reads an MDX file, strips the YAML frontmatter with gray-matter,
 * and returns a rendered React element via next-mdx-remote/rsc.
 *
 * This approach:
 *  - Works with Turbopack (no remark plugin serialization issues)
 *  - Keeps frontmatter as a single source of truth inside .mdx files
 *  - Strips the YAML block before rendering so it never leaks into output
 */
export async function renderPostMDX(
  slug: string,
  components: MDXComponents,
): Promise<JSX.Element | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  // gray-matter extracts frontmatter and returns the clean body
  const { content } = matter(raw);

  return (
    <MDXRemote
      source={content}
      components={components}
      options={{
        parseFrontmatter: false, // already stripped by gray-matter above
      }}
    />
  );
}
