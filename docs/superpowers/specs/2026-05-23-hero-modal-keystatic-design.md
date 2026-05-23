# Hero Modal Keystatic CMS Integration

**Date:** 2026-05-23  
**Status:** Approved

## Overview

Make the six NotebookModal panels on the Hero section editable via Keystatic CMS. All content is currently hardcoded in the `renderContent()` switch inside `NotebookModal.tsx`. After this change, content is read from Keystatic singletons and passed as props — the visual layout and styling remain unchanged.

---

## Keystatic Config

Add 6 singletons to `keystatic.config.tsx`. Each singleton stored at `content/hero/<panel-id>/index.json`.

### Singleton: `character`
```
name (text)
bio  (text, multiline)
```

### Singleton: `whereILive`
```
location    (text)
description (text, multiline)
image       (image, directory: public/hero, publicPath: /hero/)
```

### Singleton: `placesToGo`
```
places[] →
  name    (text)
  visited (checkbox)
```

### Singleton: `brainDump`
```
items[] →
  text (text)
```

### Singleton: `books`
```
books[] →
  title  (text)
  author (text)
  color  (select: yellow | pink | green | blue)
```

### Singleton: `contacts`
```
contacts[] →
  icon    (text)       — short glyph e.g. "𝕏", "Ig", "In", "@"
  handle  (text)       — display label e.g. "@kanaka_pages"
  url     (text)       — href value
  bgColor (select: black | pink | blue | yellow)
```

---

## Data Layer

**New file: `src/lib/hero.ts`**

- Imports `createReader` from `@keystatic/core/reader` and the Keystatic config.
- Exports a `getHeroData()` async function that reads all 6 singletons and returns a typed `HeroData` object.
- Exports the `HeroData` TypeScript type (used by `HeroSection` and `NotebookModal` props).

Color values from `books` and `contacts` singletons are mapped to full Tailwind class strings inside this layer (e.g. `"yellow"` → `"bg-yellow-200"`) so no dynamic class construction happens in components.

---

## Data Flow

```
page.tsx  (Server Component)
  └─ await getHeroData()
       └─ heroData prop ──→ HeroSection  (Client Component)
                                └─ heroData[contentId] ──→ NotebookModal  (Client Component)
                                                               └─ renders from data
```

`page.tsx` is already a Server Component. No new files needed for routing or API.

---

## Component Changes

### `src/app/page.tsx`
- Call `getHeroData()` and pass the result as `heroData` prop to `<HeroSection />`.

### `src/components/HeroSection.tsx`
- Accept `heroData: HeroData` prop.
- Pass `heroData` down to `<NotebookModal />`.

### `src/components/NotebookModal.tsx`
- Accept `heroData: HeroData` prop alongside existing `isOpen`, `onClose`, `contentId`.
- `renderContent()` switch reads from `heroData[contentId]` instead of hardcoded values.
- All existing Tailwind classes, layout structure, and styling are preserved exactly — only string/array values become dynamic.

---

## Content Files

On first Keystatic save, files are written at:
```
content/hero/character/index.json
content/hero/where-i-live/index.json
content/hero/places-to-go/index.json
content/hero/brain-dump/index.json
content/hero/books/index.json
content/hero/contacts/index.json
```

These are committed to git in local mode and pushed via GitHub in production (matching the existing `posts` collection behaviour).

---

## Out of Scope

- No changes to the Hero illustration, tooltips, or click targets in `HeroSection.tsx`.
- No changes to the modal open/close animation or overlay.
- No rich text / MDX editor for any panel — plain text and structured arrays are sufficient given the modal's own styling handles all visual treatment.
- No new API routes.
