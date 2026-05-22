import { Post } from "./types";

const mockPosts: Post[] = [
  {
    id: "1",
    slug: "building-brutalist-uis",
    title: "Building Brutalist UIs in a Flat World",
    date: "2024-07-24",
    tags: ["design", "neobrutalism", "ui"],
    image: "/images/post-1.jpg",
    excerpt: "A deep dive into harsh borders and hard shadows.",
    author: "Your Name",
    content: `# Building Brutalist UIs in a Flat World

Neobrutalism is more than just a design trend—it's a reaction against the sterile perfection of modern minimalism.

## Why Brutalism?

The movement embraces:
- **Structural honesty** — what you see is what you get
- **Intentional friction** — heavy borders demand attention
- **Raw materials** — no gradients, no blurs, just pure digital honesty

## Getting Started

Start by establishing your constraints:
1. Pure black borders (no anti-aliasing)
2. Hard offset shadows (4-5px)
3. High contrast colors

The rest follows naturally.`,
    color: "yellow",
  },
  {
    id: "2",
    slug: "lo-fi-beats-to-code",
    title: "Lo-Fi Beats to Code to: A History",
    date: "2024-07-20",
    tags: ["music", "productivity", "culture"],
    image: "/images/post-2.jpg",
    excerpt: "From YouTube uploads to a billion-dollar industry.",
    author: "Your Name",
    content: `# Lo-Fi Beats to Code to: A History

Lo-fi hip-hop has become the unofficial soundtrack of the modern developer.

## The Origins

What started as a niche genre in the mid-2010s has exploded into a cultural phenomenon.

## Why It Works

1. **Repetitive rhythm** — doesn't distract your conscious mind
2. **Warm, analog sound** — feels comforting
3. **No lyrics** — perfect for concentration

Lo-fi beats are here to stay.`,
    color: "blue",
  },
  {
    id: "3",
    slug: "rounded-corners-destroying-web",
    title: "Why Rounded Corners Are Destroying the Web",
    date: "2024-07-18",
    tags: ["design", "rant", "ux"],
    image: "/images/post-3.jpg",
    excerpt: "A polemic against the tyranny of border-radius.",
    author: "Your Name",
    content: `# Why Rounded Corners Are Destroying the Web

Rounded corners have become the default. It's time to push back.

## The Problem

- Reduces visual clarity
- Wastes screen space
- Creates false hierarchy
- Makes designs look dated in 5 years

## The Solution

Sharp corners are **honest**. They're **clear**. They're **permanent**.

Embrace them.`,
    color: "red",
  },
  {
    id: "4",
    slug: "mastering-tailwind-grid",
    title: "Mastering Tailwind CSS Grid Layouts",
    date: "2024-07-15",
    tags: ["css", "tailwind", "tutorial"],
    image: "/images/post-4.jpg",
    excerpt: "A practical guide to asymmetric layouts.",
    author: "Your Name",
    content: `# Mastering Tailwind CSS Grid Layouts

Tailwind makes complex grids achievable without custom CSS.

## The Basics

\`\`\`html
<div class="grid grid-cols-12 gap-6">
  <div class="col-span-6">Half width</div>
  <div class="col-span-6">Half width</div>
</div>
\`\`\`

## Asymmetric Layouts

\`\`\`html
<div class="grid grid-cols-12 gap-6">
  <div class="col-span-8 row-span-2">Featured</div>
  <div class="col-span-4">Card 1</div>
  <div class="col-span-4">Card 2</div>
</div>
\`\`\`

That's all you need.`,
    color: "yellow",
  },
  {
    id: "5",
    slug: "framer-motion-fundamentals",
    title: "Framer Motion: Animations That Feel Good",
    date: "2024-07-10",
    tags: ["react", "animation", "framer-motion"],
    image: "/images/post-5.jpg",
    excerpt: "Smooth, delightful interactions with Framer Motion.",
    author: "Your Name",
    content: `# Framer Motion: Animations That Feel Good

Animation is not decoration—it's communication.

## Core Concepts

1. **Motion components** — replace DOM elements with motion-enabled versions
2. **Variants** — reusable animation groups
3. **Gestures** — hover, tap, and drag handlers

## Example

\`\`\`jsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 300 }}
>
  Click me
</motion.div>
\`\`\`

Keep animations under 300ms for snappy feel.`,
    color: "blue",
  },
];

export function getPosts(): Post[] {
  return mockPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPost(slug: string): Post | undefined {
  return mockPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3,
): Post[] {
  return mockPosts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
