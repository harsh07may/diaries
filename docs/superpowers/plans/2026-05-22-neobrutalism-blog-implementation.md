# Neobrutalism Personal Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bold, interactive 2-page personal blog with neobrutalist styling, asymmetric grid layout, and smooth Framer Motion interactions.

**Architecture:** 
- Next.js 16 App Router with file-based routing
- Reusable React components for home grid, article cards, and post page sections
- Tailwind CSS 4 with custom neobrutalism utilities (borders, shadows, hover effects)
- Framer Motion for smooth card interactions and page transitions
- Mock article data initially (MDX integration deferred)

**Tech Stack:** 
- Next.js 16.2.6, React 19.2.4, TypeScript 5
- Tailwind CSS 4, Framer Motion, Google Fonts (Hanken Grotesk, JetBrains Mono)

---

## Phase 1: Foundation & Setup

### Task 1: Configure Google Fonts

**Files:**
- Create: `src/app/fonts.ts`

**Steps:**

- [ ] **Step 1: Create fonts configuration file**

Create `src/app/fonts.ts`:

```typescript
import { Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';

export const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk',
  weight: ['400', '500', '700', '800', '900'],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '700'],
});
```

- [ ] **Step 2: Commit**

```bash
git add src/app/fonts.ts
git commit -m "feat: add Google Fonts configuration for Hanken Grotesk and JetBrains Mono"
```

---

### Task 2: Update Global Styles & Tailwind Config

**Files:**
- Modify: `src/app/globals.css`
- Create: `tailwind.config.ts` (replace existing if present)

**Steps:**

- [ ] **Step 1: Update globals.css with Tailwind and custom utilities**

Replace entire contents of `src/app/globals.css`:

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

/* Reset */
* {
  border-radius: 0 !important;
  margin: 0;
  padding: 0;
}

html {
  font-family: 'Hanken Grotesk', sans-serif;
}

body {
  background: #ffffff;
  color: #000000;
  line-height: 1.6;
}

/* Typography scales */
h1 {
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

h2 {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 800;
  line-height: 1.2;
}

h3 {
  font-size: clamp(20px, 3vw, 24px);
  font-weight: 700;
  line-height: 1.3;
}

p, li {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
}

small, .label-mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.05em;
}

a {
  color: #0061a4;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Scrollbar styling (optional) */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #ffffff;
}

::-webkit-scrollbar-thumb {
  background: #000000;
  border: 2px solid #ffffff;
}
```

- [ ] **Step 2: Create tailwind.config.ts with neobrutalism theme**

Create `tailwind.config.ts` in project root:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#695f00',
        'primary-container': '#ffeb3b',
        'on-primary': '#ffffff',
        'on-primary-container': '#746900',
        secondary: '#b51925',
        'on-secondary': '#ffffff',
        'secondary-container': '#d8363a',
        'on-secondary-container': '#fffbff',
        tertiary: '#0061a4',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#dceaff',
        'on-tertiary-container': '#006bb4',
        surface: '#f9f9f9',
        'surface-dim': '#dadada',
        'surface-bright': '#f9f9f9',
        'on-surface': '#1a1c1c',
        'on-surface-variant': '#4a4733',
        'inverse-surface': '#2f3131',
        'inverse-on-surface': '#f0f1f1',
        outline: '#7c7760',
        'outline-variant': '#cdc7ac',
        ink: '#000000',
        canvas: '#ffffff',
        background: '#f9f9f9',
        'on-background': '#1a1c1c',
      },
      fontFamily: {
        sans: ['Hanken Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        'gap-xs': '4px',
        'gap-sm': '12px',
        'gap-md': '24px',
        'gap-lg': '48px',
      },
      boxShadow: {
        'brutal': '4px 4px 0 0 rgba(0, 0, 0, 1)',
        'brutal-lg': '5px 5px 0 0 rgba(0, 0, 0, 1)',
        'brutal-hover': '6px 6px 0 0 rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        '.brutal-border': {
          '@apply border-4 border-ink': {},
        },
        '.brutal-shadow': {
          boxShadow: '4px 4px 0 0 rgba(0, 0, 0, 1)',
        },
        '.brutal-shadow-lg': {
          boxShadow: '5px 5px 0 0 rgba(0, 0, 0, 1)',
        },
        '.brutal-hover': {
          '@apply hover:shadow-brutal-hover hover:scale-105 transition-all duration-200 cursor-pointer': {},
        },
        '.brutal-active': {
          '@apply active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-100': {},
        },
      });
    },
  ],
};

export default config;
```

- [ ] **Step 3: Verify Tailwind processes correctly**

Run: `npm run dev`

Expected: Dev server starts without Tailwind config errors

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css tailwind.config.ts
git commit -m "feat: configure Tailwind CSS 4 with neobrutalism design tokens and custom utilities"
```

---

### Task 3: Update Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

**Steps:**

- [ ] **Step 1: Replace layout.tsx with metadata and font variables**

Replace entire contents of `src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next';
import { hankenGrotesk, jetbrainsMono } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'kanaka.pages - My Digital Desk',
  description: 'A bold, interactive personal blog built with neobrutalism.',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${hankenGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify layout loads**

Run: `npm run dev` and open http://localhost:3000

Expected: Page loads without errors, fonts are applied

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: update root layout with font variables and metadata"
```

---

### Task 4: Create TypeScript Type Definitions

**Files:**
- Create: `src/lib/types.ts`

**Steps:**

- [ ] **Step 1: Create types.ts with Post interface**

Create `src/lib/types.ts`:

```typescript
export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  image: string;
  excerpt: string;
  author: string;
  content: string;
  color: 'yellow' | 'red' | 'blue';
}

export interface FrontMatter {
  title: string;
  date: string;
  tags: string[];
  image: string;
  excerpt: string;
  author: string;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: add TypeScript type definitions for Post and FrontMatter"
```

---

### Task 5: Create Mock Article Data

**Files:**
- Create: `src/lib/posts.ts`

**Steps:**

- [ ] **Step 1: Create mock data and helper functions**

Create `src/lib/posts.ts`:

```typescript
import { Post } from './types';

const mockPosts: Post[] = [
  {
    id: '1',
    slug: 'building-brutalist-uis',
    title: 'Building Brutalist UIs in a Flat World',
    date: '2024-07-24',
    tags: ['design', 'neobrutalism', 'ui'],
    image: '/images/post-1.jpg',
    excerpt: 'A deep dive into harsh borders and hard shadows.',
    author: 'Your Name',
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
    color: 'yellow',
  },
  {
    id: '2',
    slug: 'lo-fi-beats-to-code',
    title: 'Lo-Fi Beats to Code to: A History',
    date: '2024-07-20',
    tags: ['music', 'productivity', 'culture'],
    image: '/images/post-2.jpg',
    excerpt: 'From YouTube uploads to a billion-dollar industry.',
    author: 'Your Name',
    content: `# Lo-Fi Beats to Code to: A History

Lo-fi hip-hop has become the unofficial soundtrack of the modern developer.

## The Origins

What started as a niche genre in the mid-2010s has exploded into a cultural phenomenon.

## Why It Works

1. **Repetitive rhythm** — doesn't distract your conscious mind
2. **Warm, analog sound** — feels comforting
3. **No lyrics** — perfect for concentration

Lo-fi beats are here to stay.`,
    color: 'blue',
  },
  {
    id: '3',
    slug: 'rounded-corners-destroying-web',
    title: 'Why Rounded Corners Are Destroying the Web',
    date: '2024-07-18',
    tags: ['design', 'rant', 'ux'],
    image: '/images/post-3.jpg',
    excerpt: 'A polemic against the tyranny of border-radius.',
    author: 'Your Name',
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
    color: 'red',
  },
  {
    id: '4',
    slug: 'mastering-tailwind-grid',
    title: 'Mastering Tailwind CSS Grid Layouts',
    date: '2024-07-15',
    tags: ['css', 'tailwind', 'tutorial'],
    image: '/images/post-4.jpg',
    excerpt: 'A practical guide to asymmetric layouts.',
    author: 'Your Name',
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
    color: 'yellow',
  },
  {
    id: '5',
    slug: 'framer-motion-fundamentals',
    title: 'Framer Motion: Animations That Feel Good',
    date: '2024-07-10',
    tags: ['react', 'animation', 'framer-motion'],
    image: '/images/post-5.jpg',
    excerpt: 'Smooth, delightful interactions with Framer Motion.',
    author: 'Your Name',
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
    color: 'blue',
  },
];

export function getPosts(): Post[] {
  return mockPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPost(slug: string): Post | undefined {
  return mockPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): Post[] {
  return mockPosts
    .filter((post) => post.slug !== currentSlug)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, limit);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/posts.ts
git commit -m "feat: add mock article data and post helper functions"
```

---

## Phase 2: Components

### Task 6: Build Navigation Component

**Files:**
- Create: `src/components/Navigation.tsx`

**Steps:**

- [ ] **Step 1: Create Navigation component**

Create `src/components/Navigation.tsx`:

```typescript
import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="w-full bg-primary-container brutal-border brutal-shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl text-ink hover:no-underline">
          kanaka.pages
        </Link>
        
        <div className="flex gap-gap-lg items-center">
          <Link href="/" className="font-semibold text-ink hover:underline">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navigation.tsx
git commit -m "feat: add Navigation component with sticky header"
```

---

### Task 7: Build Hero Section Component

**Files:**
- Create: `src/components/HeroSection.tsx`

**Steps:**

- [ ] **Step 1: Create HeroSection placeholder component**

Create `src/components/HeroSection.tsx`:

```typescript
import React from 'react';

export function HeroSection() {
  return (
    <div className="w-full bg-surface border-4 border-ink brutal-shadow-lg my-gap-lg mx-auto max-w-7xl px-6">
      <div className="py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-ink mb-6">
          My Digital Desk
        </h1>
        
        <div className="flex justify-center items-end gap-12 mb-8">
          {/* Monitor placeholder */}
          <div className="w-32 h-24 bg-primary-container border-4 border-ink brutal-shadow flex items-center justify-center">
            <div className="text-2xl">🖥️</div>
          </div>

          {/* Coffee cup placeholder */}
          <div className="w-16 h-20 bg-secondary border-4 border-ink brutal-shadow flex items-center justify-center">
            <div className="text-2xl">☕</div>
          </div>

          {/* Plant placeholder */}
          <div className="w-16 h-24 bg-tertiary border-4 border-ink brutal-shadow flex items-center justify-center">
            <div className="text-2xl">🌿</div>
          </div>

          {/* Notebook placeholder */}
          <div className="w-20 h-24 bg-primary-container border-4 border-ink brutal-shadow flex items-center justify-center">
            <div className="text-2xl">📓</div>
          </div>
        </div>

        <p className="text-lg text-ink max-w-xl mx-auto">
          Explore bold ideas about design, code, and culture through a neobrutalist lens.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: add HeroSection component with emoji placeholders"
```

---

### Task 8: Build ArticleCard Component with Framer Motion

**Files:**
- Create: `src/components/ArticleCard.tsx`

**Steps:**

- [ ] **Step 1: Install Framer Motion**

Run: `npm install framer-motion`

Expected: framer-motion added to package.json

- [ ] **Step 2: Create ArticleCard component**

Create `src/components/ArticleCard.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Post } from '@/lib/types';

const colorMap = {
  yellow: 'bg-primary-container',
  red: 'bg-secondary',
  blue: 'bg-tertiary-container',
};

const tagColorMap: Record<string, string> = {
  design: 'bg-primary-container text-on-primary-container',
  neobrutalism: 'bg-secondary text-on-secondary',
  ui: 'bg-tertiary text-on-tertiary',
  music: 'bg-primary-container text-on-primary-container',
  productivity: 'bg-secondary text-on-secondary',
  culture: 'bg-tertiary text-on-tertiary',
  rant: 'bg-secondary text-on-secondary',
  ux: 'bg-tertiary text-on-tertiary',
  css: 'bg-primary-container text-on-primary-container',
  tailwind: 'bg-secondary text-on-secondary',
  tutorial: 'bg-tertiary text-on-tertiary',
  react: 'bg-primary-container text-on-primary-container',
  animation: 'bg-secondary text-on-secondary',
  'framer-motion': 'bg-tertiary text-on-tertiary',
};

export function ArticleCard({ post }: { post: Post }) {
  const bgColor = colorMap[post.color];

  return (
    <Link href={`/posts/${post.slug}`}>
      <motion.div
        className={`${bgColor} border-4 border-ink brutal-shadow p-6 h-full flex flex-col cursor-pointer`}
        whileHover={{
          boxShadow: '6px 6px 0 0 rgba(0, 0, 0, 1)',
          scale: 1.02,
        }}
        whileTap={{
          boxShadow: 'none',
          x: 4,
          y: 4,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Image placeholder */}
        <div className="bg-ink/10 w-full h-32 border-4 border-ink mb-4 flex items-center justify-center">
          <span className="text-2xl">📸</span>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`text-xs font-bold px-2 py-1 border-2 border-ink ${
                tagColorMap[tag] || 'bg-surface text-ink'
              }`}
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-ink mb-2 flex-grow">
          {post.title}
        </h3>

        {/* Date */}
        <p className="text-sm font-mono text-ink/70">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </motion.div>
    </Link>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ArticleCard.tsx package.json package-lock.json
git commit -m "feat: add ArticleCard component with Framer Motion hover and tap effects"
```

---

### Task 9: Build ArticleGrid Component

**Files:**
- Create: `src/components/ArticleGrid.tsx`

**Steps:**

- [ ] **Step 1: Create ArticleGrid component with asymmetric layout**

Create `src/components/ArticleGrid.tsx`:

```typescript
'use client';

import { Post } from '@/lib/types';
import { ArticleCard } from './ArticleCard';

export function ArticleGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-black text-ink mb-gap-lg">
        THE FEED
      </h2>

      {/* Mobile: 1 column, Tablet: 6 columns, Desktop: 12 columns */}
      <div
        className={`
          grid gap-gap-md
          grid-cols-1
          md:grid-cols-6
          lg:grid-cols-12
          auto-rows-max
        `}
      >
        {/* Featured card (desktop: 6x2, tablet: 6x1, mobile: 1x1) */}
        {posts[0] && (
          <div className="col-span-1 md:col-span-6 lg:col-span-6 lg:row-span-2">
            <ArticleCard post={posts[0]} />
          </div>
        )}

        {/* Card 2 (desktop: 3x1, tablet: 3x1, mobile: 1x1) */}
        {posts[1] && (
          <div className="col-span-1 md:col-span-3 lg:col-span-3">
            <ArticleCard post={posts[1]} />
          </div>
        )}

        {/* Card 3 (desktop: 3x1, tablet: 3x1, mobile: 1x1) */}
        {posts[2] && (
          <div className="col-span-1 md:col-span-3 lg:col-span-3">
            <ArticleCard post={posts[2]} />
          </div>
        )}

        {/* Card 4 (desktop: 4x1, tablet: 6x1, mobile: 1x1) */}
        {posts[3] && (
          <div className="col-span-1 md:col-span-6 lg:col-span-4">
            <ArticleCard post={posts[3]} />
          </div>
        )}

        {/* Card 5 (desktop: 2x1, tablet: hidden, mobile: 1x1) */}
        {posts[4] && (
          <div className="col-span-1 md:col-span-6 lg:col-span-2">
            <ArticleCard post={posts[4]} />
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ArticleGrid.tsx
git commit -m "feat: add ArticleGrid with asymmetric responsive layout"
```

---

### Task 10: Build PostHeader Component

**Files:**
- Create: `src/components/PostHeader.tsx`

**Steps:**

- [ ] **Step 1: Create PostHeader component**

Create `src/components/PostHeader.tsx`:

```typescript
import { Post } from '@/lib/types';

const tagColorMap: Record<string, string> = {
  design: 'bg-primary-container text-on-primary-container',
  neobrutalism: 'bg-secondary text-on-secondary',
  ui: 'bg-tertiary text-on-tertiary',
  music: 'bg-primary-container text-on-primary-container',
  productivity: 'bg-secondary text-on-secondary',
  culture: 'bg-tertiary text-on-tertiary',
  rant: 'bg-secondary text-on-secondary',
  ux: 'bg-tertiary text-on-tertiary',
  css: 'bg-primary-container text-on-primary-container',
  tailwind: 'bg-secondary text-on-secondary',
  tutorial: 'bg-tertiary text-on-tertiary',
  react: 'bg-primary-container text-on-primary-container',
  animation: 'bg-secondary text-on-secondary',
  'framer-motion': 'bg-tertiary text-on-tertiary',
};

export function PostHeader({ post }: { post: Post }) {
  return (
    <div className="w-full bg-surface">
      {/* Hero image placeholder */}
      <div className="bg-ink/10 w-full h-64 md:h-96 border-4 border-ink brutal-shadow-lg flex items-center justify-center">
        <span className="text-5xl">📸</span>
      </div>

      {/* Metadata */}
      <div className="max-w-3xl mx-auto px-6 py-gap-lg">
        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs font-bold px-3 py-1 border-2 border-ink ${
                tagColorMap[tag] || 'bg-surface text-ink'
              }`}
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-ink mb-4">
          {post.title}
        </h1>

        {/* Meta info */}
        <div className="flex gap-4 text-sm font-mono text-ink/70">
          <span>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span>by {post.author}</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PostHeader.tsx
git commit -m "feat: add PostHeader component with hero image and metadata"
```

---

### Task 11: Build PostContent Component

**Files:**
- Create: `src/components/PostContent.tsx`

**Steps:**

- [ ] **Step 1: Create PostContent component with markdown rendering**

Create `src/components/PostContent.tsx`:

```typescript
'use client';

import React from 'react';

export function PostContent({ content }: { content: string }) {
  // Simple markdown-like rendering (will be replaced with proper MDX later)
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={idx} className="text-4xl font-black text-ink mt-gap-lg mb-4">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={idx} className="text-2xl font-bold text-ink mt-gap-lg mb-3">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className="text-xl font-bold text-ink mt-6 mb-2">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={idx} className="ml-6 text-ink">
            {line.replace('- ', '')}
          </li>
        );
      } else if (line.startsWith('1. ')) {
        elements.push(
          <li key={idx} className="ml-6 text-ink list-decimal">
            {line.replace(/\d+\. /, '')}
          </li>
        );
      } else if (line.startsWith('```')) {
        // Skip code fence markers
      } else if (line.trim()) {
        elements.push(
          <p key={idx} className="text-ink mb-4 leading-relaxed">
            {line}
          </p>
        );
      } else {
        elements.push(<div key={idx} className="mb-4" />);
      }
    });

    return elements;
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-gap-lg">
      <article className="prose prose-sm text-ink">
        {renderContent(content)}
      </article>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PostContent.tsx
git commit -m "feat: add PostContent component with basic markdown rendering"
```

---

### Task 12: Build AuthorCard Component

**Files:**
- Create: `src/components/AuthorCard.tsx`

**Steps:**

- [ ] **Step 1: Create AuthorCard component**

Create `src/components/AuthorCard.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';

export function AuthorCard({ author }: { author: string }) {
  return (
    <motion.div
      className="bg-primary-container border-4 border-ink brutal-shadow-lg p-6"
      whileHover={{
        boxShadow: '5px 5px 0 0 rgba(0, 0, 0, 1)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Author avatar placeholder */}
      <div className="bg-ink/10 w-full h-32 border-4 border-ink mb-4 flex items-center justify-center">
        <span className="text-3xl">👤</span>
      </div>

      <h3 className="text-xl font-bold text-ink mb-2">{author}</h3>

      <p className="text-sm text-ink/80 mb-4 leading-relaxed">
        A designer and developer passionate about bold, unapologetic digital experiences.
      </p>

      <motion.button
        className="w-full bg-secondary text-white font-bold py-3 px-4 border-3 border-ink brutal-shadow cursor-pointer"
        whileHover={{
          boxShadow: '5px 5px 0 0 rgba(0, 0, 0, 1)',
        }}
        whileTap={{
          boxShadow: 'none',
          x: 2,
          y: 2,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        FOLLOW
      </motion.button>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AuthorCard.tsx
git commit -m "feat: add AuthorCard component with hover effects"
```

---

### Task 13: Build RelatedPosts Component

**Files:**
- Create: `src/components/RelatedPosts.tsx`

**Steps:**

- [ ] **Step 1: Create RelatedPosts component**

Create `src/components/RelatedPosts.tsx`:

```typescript
import Link from 'next/link';
import { Post } from '@/lib/types';

const colorMap = {
  yellow: 'bg-primary-container',
  red: 'bg-secondary',
  blue: 'bg-tertiary-container',
};

export function RelatedPosts({ posts }: { posts: Post[] }) {
  return (
    <div className="bg-surface border-4 border-ink brutal-shadow-lg p-6">
      <h3 className="text-xl font-bold text-ink mb-4">READ NEXT</h3>

      <div className="space-y-4">
        {posts.map((post) => {
          const bgColor = colorMap[post.color];

          return (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <div className={`${bgColor} border-3 border-ink brutal-shadow p-4 cursor-pointer hover:shadow-brutal-hover hover:scale-105 transition-all`}>
                <h4 className="font-bold text-ink text-sm mb-2 line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs font-mono text-ink/70">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/RelatedPosts.tsx
git commit -m "feat: add RelatedPosts sidebar component"
```

---

## Phase 3: Pages & Routing

### Task 14: Build Home Page

**Files:**
- Modify: `src/app/page.tsx`

**Steps:**

- [ ] **Step 1: Replace home page with full layout**

Replace entire contents of `src/app/page.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ArticleGrid } from '@/components/ArticleGrid';
import { getPosts } from '@/lib/posts';

export default function Home() {
  const posts = getPosts();

  return (
    <motion.div
      className="min-h-screen bg-canvas"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Navigation />

      <main className="pt-gap-lg pb-gap-lg">
        <HeroSection />

        <div className="my-gap-lg">
          <ArticleGrid posts={posts} />
        </div>
      </main>

      <footer className="bg-ink text-canvas py-gap-md text-center text-sm font-mono border-t-4 border-ink">
        <p>Built with Next.js, Tailwind, and pure neobrutalist vibes.</p>
      </footer>
    </motion.div>
  );
}
```

- [ ] **Step 2: Test home page**

Run: `npm run dev` and open http://localhost:3000

Expected: 
- Navigation bar at top (yellow background)
- Hero section with emoji placeholders
- Grid of 5 article cards in asymmetric layout
- Footer at bottom
- No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: build home page with hero section and article grid"
```

---

### Task 15: Create Post Page Route

**Files:**
- Create: `src/app/posts/[slug]/page.tsx`

**Steps:**

- [ ] **Step 1: Create posts directory and dynamic route**

Run: `mkdir -p src/app/posts/[slug]`

- [ ] **Step 2: Create dynamic post page component**

Create `src/app/posts/[slug]/page.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { PostHeader } from '@/components/PostHeader';
import { PostContent } from '@/components/PostContent';
import { AuthorCard } from '@/components/AuthorCard';
import { RelatedPosts } from '@/components/RelatedPosts';
import { getPost, getRelatedPosts } from '@/lib/posts';

export default function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(params.slug, 3);

  return (
    <motion.div
      className="min-h-screen bg-canvas"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Navigation />

      <PostHeader post={post} />

      <div className="py-gap-lg">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-gap-lg">
          {/* Main content: 2/3 width on desktop */}
          <div className="lg:col-span-2">
            <PostContent content={post.content} />
          </div>

          {/* Sidebar: 1/3 width on desktop */}
          <aside className="lg:col-span-1 space-y-gap-lg">
            <AuthorCard author={post.author} />
            <RelatedPosts posts={relatedPosts} />
          </aside>
        </div>
      </div>

      <footer className="bg-ink text-canvas py-gap-md text-center text-sm font-mono border-t-4 border-ink">
        <p>Built with Next.js, Tailwind, and pure neobrutalist vibes.</p>
      </footer>
    </motion.div>
  );
}
```

- [ ] **Step 3: Test post page**

Run: `npm run dev` and navigate to http://localhost:3000/posts/building-brutalist-uis

Expected:
- Navigation bar
- Hero image area
- Post title, tags, date, and author
- Article content in main area
- Author card and related posts in sidebar
- Mobile: sidebar stacks below content
- Desktop: sidebar beside content

- [ ] **Step 4: Commit**

```bash
git add src/app/posts/[slug]/page.tsx
git commit -m "feat: add dynamic post page route with layout and sidebars"
```

---

## Phase 4: Polish & Testing

### Task 16: Add Page Transition Wrapper

**Files:**
- Create: `src/components/PageTransition.tsx`

**Steps:**

- [ ] **Step 1: Create wrapper for page transitions**

Create `src/components/PageTransition.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PageTransition.tsx
git commit -m "feat: add page transition wrapper for smooth route changes"
```

---

### Task 17: Test Responsive Design

**Files:**
- No files to create

**Steps:**

- [ ] **Step 1: Test mobile layout (< 768px)**

Open DevTools on http://localhost:3000 and set viewport to 375px width

Verify:
- Grid shows 1 column
- Cards stack vertically
- Text is readable
- Images scale proportionally
- Navigation is functional
- No horizontal scroll

- [ ] **Step 2: Test tablet layout (768px - 1024px)**

Set viewport to 800px width

Verify:
- Grid shows mixed columns (some cards span multiple)
- Sidebar begins to show beside content on post page
- Spacing is appropriate
- Text scales nicely

- [ ] **Step 3: Test desktop layout (≥ 1024px)**

Set viewport to 1440px width

Verify:
- Full asymmetric grid with varied card sizes
- Hero section displays prominently
- Post page has proper 2-column layout (main + sidebar)
- All spacing and shadows render correctly

- [ ] **Step 4: Test on actual devices**

Test on:
- iPhone 12/13/14 (375px)
- iPad (768px)
- Desktop monitor (1440px+)

Verify visual consistency

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "test: verify responsive layout across all breakpoints"
```

---

### Task 18: Test Interactions & Animations

**Files:**
- No files to create

**Steps:**

- [ ] **Step 1: Test card hover effects**

On home page, hover over article cards

Verify:
- Shadow deepens (4px → 6px)
- Card scales slightly (1.0 → 1.02x)
- Transition is smooth (~200ms)
- Cursor changes to pointer

- [ ] **Step 2: Test card click/tap animation**

Click/tap on a card

Verify:
- Card briefly shows press effect (shadow disappears, translates 4px)
- Route changes smoothly with fade transition
- Post page loads and fades in
- No jarring layout shift

- [ ] **Step 3: Test sidebar interactions**

On post page, hover over related post cards

Verify:
- Same hover effect as home cards
- Author card responds to hover
- Follow button shows press effect on click

- [ ] **Step 4: Test page transitions**

Navigate between home and multiple posts

Verify:
- Fade out → fade in transitions are smooth
- No flickering or layout flash
- Scroll automatically goes to top on post page
- Back button returns to home with transition

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "test: verify all Framer Motion interactions and transitions"
```

---

### Task 19: Visual QA & Polish

**Files:**
- No files to create

**Steps:**

- [ ] **Step 1: Check typography rendering**

Open home page and verify:
- All fonts render correctly (Hanken Grotesk body, JetBrains Mono labels)
- Line heights are readable
- Font weights are bold where expected
- No missing characters

- [ ] **Step 2: Check color contrast**

Verify all text-on-color combinations:
- Yellow cards: text remains readable
- Red cards: white text is high contrast
- Blue cards: white text is high contrast
- All borders and shadows are visible

- [ ] **Step 3: Check spacing & alignment**

Verify:
- Cards align properly in grid (no misalignment)
- Margins and padding are consistent
- No awkward whitespace
- Max-width constraint (1280px) is respected on desktop

- [ ] **Step 4: Check shadow & border rendering**

Verify on all components:
- All borders are crisp, exactly 3-4px
- Shadows are hard offset (no blur), perfectly aligned
- No anti-aliasing artifacts
- Consistency across cards and buttons

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "test: complete visual QA for typography, colors, spacing, and shadows"
```

---

### Task 20: Final Testing Checklist

**Files:**
- No files to create

**Steps:**

- [ ] **Step 1: Build the project**

Run: `npm run build`

Expected: Build completes with zero errors or warnings

- [ ] **Step 2: Test build output**

Run: `npm run start` to serve the production build

Expected: App runs without errors

- [ ] **Step 3: Check browser console**

Open DevTools console on all pages

Expected: Zero console errors or warnings

- [ ] **Step 4: Performance check**

On home page, open Lighthouse (DevTools → Lighthouse)

Target:
- Performance: > 80
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

If below targets, note issues for future optimization

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "test: final build verification and lighthouse performance check"
```

---

## Success Criteria

✅ Home page loads with 5 article cards in asymmetric grid  
✅ Post page displays article content with sidebars  
✅ All Framer Motion interactions work smoothly (<300ms)  
✅ Responsive design: mobile (1 col) → tablet (6 col) → desktop (12 col)  
✅ Typography uses correct fonts (Hanken Grotesk, JetBrains Mono)  
✅ Neobrutalism styling: 3-4px borders, hard shadows, bold colors  
✅ No TypeScript errors during build  
✅ Build completes successfully (`npm run build`)  
✅ Zero console errors in browser  

---

## Next Steps

1. Execute Phase 1-4 tasks in order
2. Run `npm run build` to verify production build
3. Deploy to Vercel or preferred hosting
4. Future: Integrate actual MDX files with `@next/mdx`
5. Future: Add image optimization with next/image
6. Future: Add dynamic OG images for social sharing
