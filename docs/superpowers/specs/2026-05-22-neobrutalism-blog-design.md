# Neobrutalism Personal Blog Design Spec

**Date:** May 22, 2026  
**Project:** Neobrutalism Personal Blog (Next.js)  
**Scope:** 2-page blog (Home + Post View)  
**Approach:** Approach A - Simple & Focused

---

## Overview

A bold, interactive personal blog built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, and **Framer Motion**. The design follows a **Neobrutalist** aesthetic with thick black borders, hard offset shadows, and high-contrast color accents (yellow #ffeb3b, red #b51925, blue #0061a4).

**Pages:**
1. **Home** — Asymmetric bento grid of article cards with interactive 3D placeholder hero
2. **Post View** — Full article with hero image, content, sidebar (author + related posts)

**Core Technologies:**
- MDX for article content (eventually; starting with mock data)
- Framer Motion for smooth transitions and hover effects
- Tailwind CSS with custom neobrutalism utilities
- Next.js App Router with dynamic routes

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              // Root layout with metadata & navigation
│   ├── page.tsx                // Home page
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx        // Post view page (dynamic)
│   ├── globals.css             // Tailwind + neobrutalism utilities
│   └── fonts.ts                // Font imports
├── components/
│   ├── ArticleCard.tsx         // Individual article card
│   ├── ArticleGrid.tsx         // Asymmetric grid layout
│   ├── PostContent.tsx         // MDX content renderer
│   ├── PostHeader.tsx          // Hero image + metadata
│   ├── AuthorCard.tsx          // Author bio sidebar
│   ├── RelatedPosts.tsx        // Recent posts sidebar
│   ├── Navigation.tsx          // Header navigation
│   └── HeroSection.tsx         // Home page 3D placeholder hero
├── lib/
│   ├── mdx.ts                  // MDX loading & compilation
│   ├── posts.ts                // Post data helpers
│   └── types.ts                // TypeScript types
└── content/
    └── posts/
        ├── post-1.mdx
        ├── post-2.mdx
        └── ...
```

### Design Rationale

- **`app/` structure:** Leverages Next.js 16 App Router for file-based routing and server components
- **`components/`:** Encapsulates UI logic, promotes reusability across pages
- **`lib/`:** Centralizes data fetching, parsing, and type definitions
- **`content/posts/`:** MDX files live in repo; parsed at build time for static generation

---

## Component Architecture

### Home Page Components

#### **1. Navigation**
- **Props:** None (can be memoized)
- **Renders:** Header with yellow accent bar, logo/title, nav links
- **Styling:** `brutal-border` (3px top border), `brutal-shadow` (4px offset)
- **Responsive:** Logo centered on mobile, left-aligned on desktop

#### **2. HeroSection**
- **Props:** None
- **Renders:** 3D placeholder for now (could be interactive canvas or SVG)
- **Content:** "My Digital Desk" title + placeholder objects
- **Interaction:** Hover effects on objects (scale, rotate)
- **Note:** Placeholder implementation; can upgrade to threejs/babylon later

#### **3. ArticleGrid**
- **Props:** `articles: Post[]`
- **Renders:** Asymmetric CSS Grid containing `ArticleCard` components
- **Grid Logic:**
  - Mobile: 1 column
  - Tablet: 6 columns with mixed spans
  - Desktop: 12 columns with rich asymmetry (1x1, 2x1, 1x2, 2x2 cards)
- **Spacing:** `gap-md` (24px) between cards
- **Colors:** Cards rotate through yellow, red, blue accents

#### **4. ArticleCard**
- **Props:** `{ title: string; image: string; date: string; tags: string[]; slug: string }`
- **Renders:** Individual card with image, title, date, tags
- **Styling:**
  - `brutal-border` (4px black border)
  - `brutal-shadow` (4px/4px offset)
  - Color-coded background (one of primary/secondary/tertiary)
- **Interactions:**
  - **Hover:** Shadow → 6px offset, scale 1.02x, smooth 0.2s transition
  - **Click:** Navigate to `/posts/[slug]` with fade transition
- **Responsive:** Image aspect ratio maintained, text scales with viewport

### Post View Components

#### **5. PostHeader**
- **Props:** `{ title: string; image: string; date: string; tags: string[]; author: string }`
- **Renders:** Hero image (750px height desktop) + metadata
- **Layout:** Full-width image, title/metadata below
- **Styling:** `brutal-border` on image, spacing above/below
- **Responsive:** Image height scales on mobile (400px), metadata text scales

#### **6. PostContent**
- **Props:** `{ content: React.ReactNode; slug: string }`
- **Renders:** MDX-compiled article body with custom components
- **Custom MDX Components:**
  - `<h1>`, `<h2>`, `<h3>` — Hanken Grotesk, bold weights, tight line-height
  - `<blockquote>` — Yellow left border (4px), gray background
  - `<code>` — Monospace, gray background, `brutal-border`
  - `<a>` — Blue, underline on hover
  - `<img>` — Full-width, `brutal-border`, 4px offset shadow
- **Spacing:** Generous margins between sections (48px vertical gaps)

#### **7. AuthorCard**
- **Props:** `{ name: string; bio: string; image: string; cta?: string }`
- **Renders:** Author avatar, name, short bio, CTA button
- **Styling:** `brutal-border`, `brutal-shadow-lg`, yellow accent
- **Interaction:** CTA button has `brutal-active` (press effect)
- **Responsive:** Full-width on mobile, fixed width on desktop

#### **8. RelatedPosts**
- **Props:** `{ posts: Post[] }`
- **Renders:** 3 most recent posts (excluding current)
- **Layout:** Stacked list with small card previews
- **Interaction:** Hover effects on each card (same as home cards)
- **Responsive:** Sidebar below article on mobile, beside on desktop

---

## Data Flow & MDX Structure

### Article Frontmatter Format

```yaml
---
title: "Building Brutalist UIs in a Flat World"
date: "2024-07-24"
tags: ["design", "neobrutalism", "ui"]
image: "/images/post-1.jpg"
excerpt: "A deep dive into harsh borders and hard shadows..."
author: "Your Name"
---

# Article content starts here...
```

### Data Fetching

**`lib/posts.ts`:**
- `getPosts()` — Reads all MDX files, parses frontmatter, returns sorted array
- `getPost(slug)` — Fetches specific post, compiles MDX to React
- `getRelatedPosts(slug, limit=3)` — Returns N most recent posts excluding current

**Execution:**
- Home page: `getPosts()` at build time (SSG)
- Post page: `getPost(slug)` at build time for all slugs, fallback to ISR
- Related posts: Computed on post page load from sorted post list

### No Database

All data lives as MDX files in the repo. No external DB needed for this scope.

---

## Styling System

### Tailwind Configuration Extensions

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: '#695f00',
        'primary-container': '#ffeb3b',  // Yellow
        secondary: '#b51925',              // Red
        tertiary: '#0061a4',               // Blue
        ink: '#000000',
        canvas: '#ffffff',
        // ... (all colors from DESIGN.md)
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
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        '.brutal-border': {
          '@apply border-4 border-ink': {},
        },
        '.brutal-shadow': {
          'box-shadow': '4px 4px 0 0 rgba(0,0,0,1)',
        },
        '.brutal-shadow-lg': {
          'box-shadow': '5px 5px 0 0 rgba(0,0,0,1)',
        },
        '.brutal-hover': {
          '@apply hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:scale-105 transition-all duration-200': {},
        },
        '.brutal-active': {
          '@apply active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-100': {},
        },
      });
    },
  ],
};
```

### Global Styles (`globals.css`)

```css
@import "tailwindcss";

/* Font imports */
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

/* Reset defaults */
* {
  border-radius: 0; /* Sharp corners only */
}

/* Base typography */
html {
  font-family: 'Hanken Grotesk', sans-serif;
  line-height: 1.6;
}

body {
  background: #ffffff;
  color: #000000;
}

/* Typography scales */
h1 { font-size: 64px; font-weight: 800; line-height: 1.1; letter-spacing: -0.03em; }
h2 { font-size: 36px; font-weight: 800; line-height: 1.2; }
h3 { font-size: 24px; font-weight: 700; line-height: 1.3; }
p { font-size: 16px; font-weight: 400; line-height: 1.6; }
small { font-family: 'JetBrains Mono'; font-size: 14px; font-weight: 500; }
```

### Color Application

- **Cards:** Rotate through `primary-container` (yellow), `secondary` (red), `tertiary` (blue)
- **Borders:** Always `ink` (#000000), 3-4px thickness
- **Shadows:** Hard offset, no blur radius
- **Text:** `ink` on light backgrounds for maximum contrast
- **Accents:** Yellow for hover states, red for secondary actions, blue for tertiary

---

## Interaction Patterns

### Card Hover & Click (Home Page & Related Posts)

**Hover State:**
- Shadow deepens: 4px → 6px offset
- Scale: 1.0 → 1.02x
- Transition: 200ms ease-out
- Cursor: pointer

**Click Transition:**
- Current card fades out (200ms)
- Route change to `/posts/[slug]`
- New post fades in (200ms)
- Total duration: ~400ms

**Implementation:** Framer Motion `motion.div` with `whileHover` and `whileTap`

### Button Press Effect (Active/Click)

**Press State:**
- Shadow disappears: `shadow-none`
- Translate: 4px down, 4px right
- Transition: 100ms snap

**Release State:**
- Shadow returns
- Translate resets
- Simulates physical button push into surface

**Implementation:** `@apply active:shadow-none active:translate-x-1 active:translate-y-1`

### Page Transitions

**Route Change:**
- Fade out current page (200ms)
- Fade in new page (200ms)
- Scroll to top on post page load

**Implementation:** Next.js `useTransition` + Framer Motion page wrappers

### Sidebar Hover (Related Posts)

- Same card hover effects as home page
- Staggered animation if showing multiple cards
- 50ms stagger between items

---

## Responsive Design

### Breakpoints & Grid Behavior

| Breakpoint | Screen Size | Columns | Layout | Card Sizing |
|---|---|---|---|---|
| **Mobile** | < 768px | 1 | Single column stack | Full-width - 48px margins |
| **Tablet** | 768px - 1024px | 6 | Mixed 1-2 col spans | Variable (1/2/3 col) |
| **Desktop** | ≥ 1024px | 12 | Rich asymmetry | 1x1, 2x1, 1x2, 2x2 |

### Mobile (< 768px)

- **Home Grid:** All cards stack in 1 column
- **Card Images:** Full-width with 1:1 aspect ratio
- **Typography:** Reduced font sizes (h1: 40px → hero-mobile)
- **Spacing:** 24px page margins maintained
- **Post Page:** Full-width content, sidebar stacked below
- **Navigation:** Simplified, no secondary items

### Tablet (768px - 1024px)

- **Home Grid:** 6-column grid with some mixed spans (cards can be 1 or 2 cols)
- **Start introducing asymmetry:** Taller cards, wider cards
- **Post Page:** 2-column layout (main + sidebar side-by-side)
- **Spacing:** Tighter gutters (16px between cards)
- **Typography:** Medium font sizes, intermediate scales

### Desktop (≥ 1024px)

- **Home Grid:** Full 12-column grid with rich asymmetry
- **Asymmetry Examples:**
  - Featured card: 6 cols × 2 rows
  - Regular cards: 3 cols × 1 row or 2 cols × 2 rows
  - Visual variety without grid gaps
- **Post Page:** 8-column main + 4-column sidebar, 24px gutter
- **Max-width:** 1280px content, centered
- **Spacing:** Full `gap-md` (24px) between all elements
- **Typography:** Large, bold headlines

### Responsive Implementation

- **CSS Grid:** Use Tailwind `col-span-*` and `row-span-*` with `md:` and `lg:` prefixes
- **Typography:** `clamp()` for fluid scaling between breakpoints (where needed)
- **Images:** Responsive aspect ratios with `aspect-[ratio]`
- **Margins:** Use Tailwind responsive classes (`px-6 md:px-8 lg:px-12`)

---

## MDX & Content Integration

### Future Implementation (Next.js MDX Guide)

Reference: https://nextjs.org/docs/app/guides/mdx

**Setup Steps:**
1. Install `@next/mdx` and related packages
2. Configure `next.config.js` to process `.mdx` files
3. Place MDX files in `/content/posts/`
4. Create `lib/mdx.ts` to load and compile MDX
5. Define custom MDX components in `lib/mdx-components.tsx`

**For Now:** Start with mock data (JavaScript objects), swap to MDX later

---

## Testing & Validation

### Manual Testing Checklist

- [ ] Home page loads with 4-5 sample articles in asymmetric grid
- [ ] Hover effects work on cards (shadow, scale)
- [ ] Click navigates to post with fade transition
- [ ] Post page renders correctly with hero image, content, sidebars
- [ ] Related posts show 3 most recent (excluding current)
- [ ] Author card displays correctly
- [ ] Mobile layout stacks to single column
- [ ] Tablet layout shows 6-column grid
- [ ] Desktop layout shows 12-column asymmetric grid
- [ ] All text remains readable at different breakpoints
- [ ] Framer Motion transitions are smooth (<300ms)
- [ ] Buttons respond to click with press effect
- [ ] Page transitions are smooth (no flash)
- [ ] Navigation works across all pages

### Browser Testing

- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## File Naming & Conventions

### Components
- PascalCase: `ArticleCard.tsx`, `PostHeader.tsx`
- One component per file
- Related utilities in same folder

### MDX Articles
- kebab-case: `building-brutalist-uis.mdx`, `roundness-in-design.mdx`
- Slugs derived from filename (minus `.mdx` extension)

### CSS Classes
- Lowercase with hyphens: `.brutal-border`, `.gap-md`
- Prefix custom utilities: `.brutal-*` for neobrutalism-specific

---

## Success Criteria

✅ **Home page** loads with at least 4 articles in an asymmetric grid  
✅ **Post page** renders article content with hero image, author card, and related posts  
✅ **Interactions** are smooth: hover effects, click animations, page transitions  
✅ **Responsive** at all breakpoints: mobile (1 col) → tablet (6 col) → desktop (12 col)  
✅ **Styling** matches neobrutalism design system: thick borders, hard shadows, bold colors  
✅ **Typography** uses Hanken Grotesk & JetBrains Mono as defined  
✅ **Framer Motion** provides smooth transitions (<300ms)  
✅ **No TypeScript errors** during build  

---

## Next Steps

1. ✅ Design approved
2. → Write implementation plan
3. → Set up project structure
4. → Build components
5. → Integrate sample data (mock articles)
6. → Test responsive design
7. → Optimize and ship
