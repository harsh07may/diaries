import { mdxComponents } from "@/mdx-components";
import { promises as fsp } from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/**
 * Reads an MDX file, strips the YAML frontmatter,
 * and returns a rendered <MDXRemote> element.
 *
 * - Uses async fs to avoid blocking the event loop
 * - Passes the static mdxComponents constant (no new object per render)
 * - Returns null if the file doesn't exist (caller should notFound())
 */
export async function renderPostMDX(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  try {
    const raw = await fsp.readFile(filePath, "utf-8");

    return (
      <MDXRemote
        source={raw}
        components={mdxComponents}
        options={{ parseFrontmatter: true }}
      />
    );
  } catch {
    return null;
  }
}
