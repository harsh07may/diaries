# Neobrutalism Personal Blog - Development Handoff

**Project Status:** Phase 1 Complete (Foundation & Setup)  
**Last Updated:** May 22, 2026  
**Next Phase:** Phase 2 (Component Development)

---

## ✅ Completed Tasks (Phase 1)

### Task 1: Google Fonts Configuration
- **Commit:** `a2c9cdf`
- **What:** Created `src/app/fonts.ts` with Hanken Grotesk and JetBrains Mono font configurations
- **Status:** ✅ Complete
- **Files Created:**
  - `src/app/fonts.ts` - Exports `hankenGrotesk` and `jetbrainsMono` instances

### Task 2: Tailwind CSS Configuration & Global Styles
- **Commit:** `81158cb` (includes critical fixes)
- **What:** Set up Tailwind CSS 4 with neobrutalism design tokens, custom utilities, and global CSS
- **Status:** ✅ Complete (with fixes applied)
- **Files Modified:**
  - `src/app/globals.css` - Global styles, typography scales, scrollbar styling
  - `tailwind.config.ts` - Design tokens, color palette, custom utilities (.brutal-border, .brutal-shadow, .brutal-hover, .brutal-active)
- **Critical Fixes Applied:**
  - ✅ Changed `@import "tailwindcss"` to proper Tailwind v4 syntax
  - ✅ Removed `border-radius: 0 !important` that conflicted with Tailwind utilities
  - ✅ Removed Google Fonts `@import url()` (using next/font instead)
  - ✅ Added TypeScript types to Tailwind plugin function

### Task 3: Root Layout with Fonts
- **Commit:** `1b1b870`
- **What:** Updated root layout to import and apply font variables from Task 1
- **Status:** ✅ Complete
- **Files Modified:**
  - `src/app/layout.tsx` - Imports fonts, applies CSS variables, sets metadata

### Task 4: TypeScript Type Definitions
- **Commit:** `2f8a5b2`
- **What:** Created type definitions for Post and FrontMatter
- **Status:** ✅ Complete
- **Files Created:**
  - `src/lib/types.ts` - Exports `Post` and `FrontMatter` interfaces

### Task 5: Mock Article Data
- **Commit:** `8550c8b`
- **What:** Created mock data with 5 sample articles and helper functions
- **Status:** ✅ Complete
- **Files Created:**
  - `src/lib/posts.ts` - 5 sample posts + `getPosts()`, `getPost(slug)`, `getRelatedPosts(slug, limit)` functions

---

## ⚠️ Things to Be Wary Of

### 1. **Font Configuration (Task 1 & 2 Integration)**
- ✅ **Status:** RESOLVED
- **What:** Initially had Google Fonts loading both via `next/font` (Task 1) and `@import url()` (Task 2)
- **Fix Applied:** Removed `@import url()` from globals.css; using only `next/font` for optimal Next.js performance
- **Lesson:** Always use `next/font` in Next.js 16+ instead of Google Fonts `@import url()` for better performance and Cumulative Layout Shift (CLS)

### 2. **Tailwind v4 Syntax**
- ✅ **Status:** RESOLVED
- **What:** Initial config used deprecated `@import "tailwindcss"` (v2 syntax)
- **Fix Applied:** Changed to proper `@tailwind base`, `@tailwind components`, `@tailwind utilities` directives
- **Lesson:** Always verify Tailwind version and use correct syntax; outdated syntax can cause performance issues

### 3. **Border-Radius Reset Conflict**
- ✅ **Status:** RESOLVED
- **What:** Had `border-radius: 0 !important` on `*` selector, preventing Tailwind's rounded utilities from working
- **Fix Applied:** Removed the overly aggressive reset
- **Lesson:** Neobrutalism uses sharp corners by default; don't need a global reset with `!important`. Use Tailwind utilities for styling instead.

### 4. **TypeScript Plugin Types**
- ✅ **Status:** RESOLVED
- **What:** Tailwind plugin function was missing TypeScript types
- **Fix Applied:** Added proper type annotation: `function ({ addComponents }: { addComponents: any; [key: string]: any })`
- **Lesson:** Always type plugin functions in TypeScript for better IDE support and type safety

### 5. **Mock Data Color Values**
- **What:** Articles alternate between 'yellow' | 'red' | 'blue' color values
- **Important:** These map to Tailwind classes in components:
  - `yellow` → `bg-primary-container` (#ffeb3b)
  - `red` → `bg-secondary` (#b51925)
  - `blue` → `bg-tertiary-container` (#dceaff)
- **When building components:** Use the color map from the plan (Task 8, ArticleCard component)

### 6. **Missing Images**
- **What:** Mock posts reference images at `/images/post-1.jpg`, `/images/post-2.jpg`, etc.
- **Current State:** No actual images in project
- **Next Steps:** Either add images to `public/images/` or update mock data with placeholder images
- **Workaround:** Components will display image placeholders (emoji) until real images are added

### 7. **Sample Author Name**
- **Current:** All articles use `author: 'Your Name'`
- **When deploying:** Update to actual author name in `src/lib/posts.ts`

---

## 📋 Things To Do Next

### Phase 2: Component Development (Tasks 6-13)

These tasks build the 8 React components that power the blog. Should be executed after Phase 1.

**Task 6: Navigation Component**
- Create: `src/components/Navigation.tsx`
- Features: Sticky header with yellow accent bar, logo, nav links
- Styling: `.brutal-border`, `.brutal-shadow`
- Status: Pending

**Task 7: Hero Section Component**
- Create: `src/components/HeroSection.tsx`
- Features: "My Digital Desk" title + emoji placeholders for 3D objects (monitor, coffee cup, plant, notebook)
- Note: Placeholder implementation; can upgrade to threejs/babylon.js later
- Status: Pending

**Task 8: Article Card Component**
- Create: `src/components/ArticleCard.tsx`
- Features: Individual card with image, title, date, tags; Framer Motion hover/tap effects
- Dependencies: Framer Motion (already installed in package.json)
- Important: Use color map for yellow/red/blue backgrounds
- Status: Pending

**Task 9: Article Grid Component**
- Create: `src/components/ArticleGrid.tsx`
- Features: Asymmetric responsive grid (1 col mobile → 6 col tablet → 12 col desktop)
- Grid logic: Varied col-span values for visual variety
- Status: Pending

**Task 10: Post Header Component**
- Create: `src/components/PostHeader.tsx`
- Features: Hero image (750px height desktop), title, metadata, tags
- Status: Pending

**Task 11: Post Content Component**
- Create: `src/components/PostContent.tsx`
- Features: MDX content renderer with markdown-like rendering for now
- Note: Proper MDX integration deferred; using basic markdown parsing for Phase 2
- Status: Pending

**Task 12: Author Card Component**
- Create: `src/components/AuthorCard.tsx`
- Features: Author avatar placeholder, name, bio, CTA button with press effect
- Interactions: Hover and tap effects using Framer Motion
- Status: Pending

**Task 13: Related Posts Component**
- Create: `src/components/RelatedPosts.tsx`
- Features: Sidebar showing 3 most recent posts with hover effects
- Status: Pending

### Phase 3: Pages & Routing (Tasks 14-15)

**Task 14: Home Page**
- Modify: `src/app/page.tsx`
- Assemble: Navigation + HeroSection + ArticleGrid + Footer
- Add Framer Motion page transitions
- Status: Pending

**Task 15: Post Page (Dynamic Route)**
- Create: `src/app/posts/[slug]/page.tsx`
- Layout: 2-column (8 col main + 4 col sidebar on desktop)
- Assemble: PostHeader + PostContent + AuthorCard + RelatedPosts
- Status: Pending

### Phase 4: Testing & Polish (Tasks 16-20)

**Task 16:** Page transition wrapper with Framer Motion  
**Task 17:** Responsive design testing (mobile/tablet/desktop)  
**Task 18:** Interaction & animation testing  
**Task 19:** Visual QA (typography, colors, spacing, shadows)  
**Task 20:** Final build verification and Lighthouse checks  

---

## 🚀 Development Workflow

### Current State
- ✅ Dev server ready: `npm run dev`
- ✅ TypeScript: `tsc --noEmit`
- ✅ Build: `npm run build`
- ✅ Git initialized with 5 commits

### Next Steps
1. Run `npm run dev` to start dev server
2. Execute Phase 2 tasks (8 components)
3. Use TodoWrite to track progress
4. Commit after each logical chunk
5. Run `npm run build` before Phase 4 testing

### Key Dependencies Installed
- ✅ next 16.2.6
- ✅ react 19.2.4
- ✅ tailwindcss 4
- ✅ typescript 5
- ✅ framer-motion (for animations)
- ⏳ @next/mdx (not yet installed; needed for real MDX integration)

---

## 📚 Design System Reference

### Colors
- **Primary/Yellow:** `#ffeb3b` (`.bg-primary-container`)
- **Secondary/Red:** `#b51925` (`.bg-secondary`)
- **Tertiary/Blue:** `#0061a4` (`.bg-tertiary`)
- **Ink/Black:** `#000000` (`.text-ink`)
- **Canvas/White:** `#ffffff` (`.bg-canvas`)

### Typography
- **Headlines:** Hanken Grotesk, weights 700-900, tight line-height (1.1-1.3)
- **Body:** Hanken Grotesk, weight 400-500, line-height 1.6
- **Labels/Mono:** JetBrains Mono, weight 500, letter-spacing 0.05em

### Spacing
- `gap-xs`: 4px
- `gap-sm`: 12px
- `gap-md`: 24px
- `gap-lg`: 48px

### Neobrutalism Utilities
- `.brutal-border`: 4px black border
- `.brutal-shadow`: 4px offset shadow
- `.brutal-shadow-lg`: 5px offset shadow
- `.brutal-hover`: Hover effect (shadow deepens, scale 1.02)
- `.brutal-active`: Press effect (shadow disappears, translates 4px)

---

## 📖 Useful Files & Docs

- **Design Spec:** `docs/superpowers/specs/2026-05-22-neobrutalism-blog-design.md`
- **Implementation Plan:** `docs/superpowers/plans/2026-05-22-neobrutalism-blog-implementation.md`
- **This File:** `HANDOFF.md` (you are here)
- **Tailwind Config:** `tailwind.config.ts` (all design tokens)
- **Global Styles:** `src/app/globals.css` (typography scales, defaults)
- **Type Definitions:** `src/lib/types.ts` (Post, FrontMatter interfaces)
- **Mock Data:** `src/lib/posts.ts` (5 sample articles, helper functions)

---

## 🔗 Quick Links

- **Stitch Design Files:** `stitch_neobrutalism_design_system/`
  - Home mockup: `neoblog_home/screen.png` + `code.html`
  - Post mockup: `neoblog_post_view/screen.png` + `code.html`
  - Design tokens: `raw_impact/DESIGN.md`

---

## 💡 Tips for Phase 2

1. **Component Structure:** Each component receives props matching the design spec. Start with props interface.
2. **Framer Motion:** Keep animations under 300ms for snappy feel. Use `.brutal-hover` and `.brutal-active` classes.
3. **Responsive Grid:** Use Tailwind's `col-span-*` and `md:`, `lg:` prefixes. Test at 375px, 800px, 1440px viewports.
4. **Images:** Use emoji placeholders for now; swap for real images later.
5. **Git Commits:** Commit after each component (e.g., "feat: add ArticleCard component with Framer Motion effects").
6. **TypeScript:** Enable strict mode if not already; use the Post interface everywhere.

---

**Last Updated:** 2026-05-22  
**Next Review:** After Phase 2 completion  
**Handoff Owner:** Claude Code  
**Status:** Ready for Phase 2 Implementation
