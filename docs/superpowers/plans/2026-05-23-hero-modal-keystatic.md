# Hero Modal Keystatic CMS Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace hardcoded content in the six NotebookModal panels with data read from Keystatic CMS singletons, keeping all visual layout and styling identical.

**Architecture:** Six Keystatic singletons store each panel's content as JSON. `getHeroData()` reads all six on the server and returns a typed `HeroData` object. `page.tsx` passes `heroData` as a prop through `HeroSection` to `NotebookModal`, which renders from the data.

**Tech Stack:** Next.js 15 App Router, Keystatic 0.5.x (`@keystatic/core/reader`), TypeScript, Tailwind CSS v4.

> **Note:** No test suite is configured in this project. Verification steps use `pnpm dev` and manual browser checks instead of automated tests.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `keystatic.config.tsx` | Modify | Add 6 singletons |
| `src/lib/hero.ts` | Create | `HeroData` type + `getHeroData()` |
| `content/hero/character.json` | Create | Seed character panel content |
| `content/hero/where-i-live/index.json` | Create | Seed where-i-live panel content |
| `content/hero/places-to-go.json` | Create | Seed places-to-go panel content |
| `content/hero/brain-dump.json` | Create | Seed brain-dump panel content |
| `content/hero/books.json` | Create | Seed books panel content |
| `content/hero/contacts.json` | Create | Seed contacts panel content |
| `src/app/page.tsx` | Modify | Fetch heroData, pass to HeroSection |
| `src/components/HeroSection.tsx` | Modify | Accept + forward heroData prop |
| `src/components/NotebookModal.tsx` | Modify | Render from heroData instead of hardcoded JSX |

---

## Task 1: Add 6 Keystatic singletons to `keystatic.config.tsx`

**Files:**
- Modify: `keystatic.config.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
import { collection, config, fields, singleton } from "@keystatic/core";
import { wrapper } from "@keystatic/core/content-components";

export default config({
  storage:
    process.env.NODE_ENV === "production"
      ? {
          kind: "github",
          repo: { owner: "harsh07may", name: "diaries" },
        }
      : { kind: "local" },

  singletons: {
    character: singleton({
      label: "About Me",
      path: "content/hero/character",
      schema: {
        name: fields.text({ label: "Name" }),
        bio: fields.text({ label: "Bio", multiline: true }),
      },
    }),

    whereILive: singleton({
      label: "Where I Live",
      path: "content/hero/where-i-live/",
      schema: {
        location: fields.text({ label: "Location" }),
        description: fields.text({ label: "Description", multiline: true }),
        image: fields.image({
          label: "Scenery Image",
          directory: "public/hero",
          publicPath: "/hero/",
        }),
      },
    }),

    placesToGo: singleton({
      label: "Places to Go",
      path: "content/hero/places-to-go",
      schema: {
        places: fields.array(
          fields.object({
            name: fields.text({ label: "Place Name" }),
            visited: fields.checkbox({ label: "Visited", defaultValue: false }),
          }),
          {
            label: "Places",
            itemLabel: (props) => props.fields.name.value ?? "Place",
          }
        ),
      },
    }),

    brainDump: singleton({
      label: "Brain Dump",
      path: "content/hero/brain-dump",
      schema: {
        items: fields.array(
          fields.object({
            text: fields.text({ label: "Note" }),
          }),
          {
            label: "Notes",
            itemLabel: (props) => props.fields.text.value ?? "Note",
          }
        ),
      },
    }),

    books: singleton({
      label: "Books",
      path: "content/hero/books",
      schema: {
        books: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            author: fields.text({ label: "Author" }),
            color: fields.select({
              label: "Card Color",
              options: [
                { label: "Yellow", value: "yellow" },
                { label: "Pink", value: "pink" },
                { label: "Green", value: "green" },
                { label: "Blue", value: "blue" },
              ],
              defaultValue: "yellow",
            }),
          }),
          {
            label: "Books",
            itemLabel: (props) => props.fields.title.value ?? "Book",
          }
        ),
      },
    }),

    contacts: singleton({
      label: "Contacts",
      path: "content/hero/contacts",
      schema: {
        contacts: fields.array(
          fields.object({
            icon: fields.text({
              label: "Icon Glyph",
              description: 'Short text shown in the icon circle, e.g. "𝕏", "Ig", "In", "@"',
            }),
            handle: fields.text({
              label: "Display Handle",
              description: 'Shown next to the icon, e.g. "@kanaka_pages"',
            }),
            url: fields.text({ label: "URL" }),
            bgColor: fields.select({
              label: "Icon Background",
              options: [
                { label: "Black", value: "black" },
                { label: "Pink", value: "pink" },
                { label: "Blue", value: "blue" },
                { label: "Yellow", value: "yellow" },
              ],
              defaultValue: "black",
            }),
          }),
          {
            label: "Contacts",
            itemLabel: (props) => props.fields.handle.value ?? "Contact",
          }
        ),
      },
    }),
  },

  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      schema: {
        id: fields.ignored(),
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({ label: "Date" }),
        excerpt: fields.text({ label: "Excerpt", multiline: true }),
        color: fields.select({
          label: "Card Color",
          description: "Controls the highlight color on the blog index card.",
          options: [
            { label: "Yellow", value: "yellow" },
            { label: "Red", value: "red" },
            { label: "Blue", value: "blue" },
          ],
          defaultValue: "yellow",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value ?? "Tag",
        }),
        image: fields.image({
          label: "Cover Image",
          directory: "public/images",
          publicPath: "/images/",
        }),
        author: fields.text({ label: "Author Name" }),
        authorRole: fields.text({ label: "Author Role" }),
        authorBio: fields.text({ label: "Author Bio", multiline: true }),
        authorImage: fields.text({
          label: "Author Image Path",
          description: "Optional. Leave blank if not needed.",
        }),
        content: fields.mdx({
          label: "Content",
          options: {
            bold: true,
            italic: true,
            strikethrough: true,
            code: true,
            heading: [2, 3, 4],
            blockquote: true,
            orderedList: true,
            unorderedList: true,
            link: true,
            image: true,
            divider: true,
            codeBlock: true,
          },
          components: {
            Callout: wrapper({
              label: "Callout",
              schema: {
                variant: fields.select({
                  label: "Variant",
                  options: [
                    { label: "Note", value: "note" },
                    { label: "Tip", value: "tip" },
                    { label: "Warning", value: "warning" },
                    { label: "Caution", value: "caution" },
                  ],
                  defaultValue: "note",
                }),
              },
            }),
            ImageGrid: wrapper({
              label: "Image Grid",
              schema: {
                src: fields.text({
                  label: "Image Path",
                  description: "e.g. /images/example.jpg",
                }),
                alt: fields.text({ label: "Alt Text" }),
                title: fields.text({ label: "Title (optional)" }),
              },
            }),
          },
        }),
      },
    }),
  },
});
```

- [ ] **Step 2: Verify the dev server still starts**

```bash
pnpm dev
```

Expected: Server starts at `http://localhost:3000` with no TypeScript or build errors. Open `http://localhost:3000/keystatic` — the sidebar should show **About Me**, **Where I Live**, **Places to Go**, **Brain Dump**, **Books**, and **Contacts** under a Singletons section.

- [ ] **Step 3: Commit**

```bash
git add keystatic.config.tsx
git commit -m "feat: add 6 Keystatic singletons for hero modal panels"
```

---

## Task 2: Create `src/lib/hero.ts`

**Files:**
- Create: `src/lib/hero.ts`

- [ ] **Step 1: Create the file**

```typescript
import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

const BOOK_COLOR_MAP: Record<string, string> = {
  yellow: "bg-yellow-200",
  pink: "bg-pink-200",
  green: "bg-green-200",
  blue: "bg-blue-200",
};

const CONTACT_BG_MAP: Record<string, string> = {
  black: "bg-black",
  pink: "bg-pink-500",
  blue: "bg-blue-600",
  yellow: "bg-yellow-400",
};

const CONTACT_TEXT_MAP: Record<string, string> = {
  black: "text-white",
  pink: "text-white",
  blue: "text-white",
  yellow: "text-ink",
};

export interface CharacterData {
  name: string;
  bio: string;
}

export interface WhereILiveData {
  location: string;
  description: string;
  image: string;
}

export interface PlaceItem {
  name: string;
  visited: boolean;
}

export interface PlacesToGoData {
  places: PlaceItem[];
}

export interface BrainDumpData {
  items: { text: string }[];
}

export interface BookItem {
  title: string;
  author: string;
  colorClass: string;
}

export interface BooksData {
  books: BookItem[];
}

export interface ContactItem {
  icon: string;
  handle: string;
  url: string;
  bgColorClass: string;
  textColorClass: string;
}

export interface ContactsData {
  contacts: ContactItem[];
}

export interface HeroData {
  character: CharacterData;
  "where-i-live": WhereILiveData;
  "places-to-go": PlacesToGoData;
  "brain-dump": BrainDumpData;
  books: BooksData;
  contacts: ContactsData;
}

export async function getHeroData(): Promise<HeroData> {
  const reader = createReader(process.cwd(), config);

  const [character, whereILive, placesToGo, brainDump, books, contacts] =
    await Promise.all([
      reader.singletons.character.read(),
      reader.singletons.whereILive.read(),
      reader.singletons.placesToGo.read(),
      reader.singletons.brainDump.read(),
      reader.singletons.books.read(),
      reader.singletons.contacts.read(),
    ]);

  return {
    character: {
      name: character?.name ?? "Kanaka",
      bio:
        character?.bio ??
        "I'm a writer and observer who loves building worlds and telling stories, both Goan and universal!",
    },
    "where-i-live": {
      location: whereILive?.location ?? "Goa",
      description:
        whereILive?.description ??
        "A place where the sea breeze meets deep-rooted history, inspiring every word I write.",
      image: whereILive?.image ?? "/hero/kanaka-goa-scenery.png",
    },
    "places-to-go": {
      places: (placesToGo?.places ?? []).map((p) => ({
        name: p.name,
        visited: p.visited,
      })),
    },
    "brain-dump": {
      items: (brainDump?.items ?? []).map((i) => ({ text: i.text })),
    },
    books: {
      books: (books?.books ?? []).map((b) => ({
        title: b.title,
        author: b.author,
        colorClass: BOOK_COLOR_MAP[b.color] ?? "bg-yellow-200",
      })),
    },
    contacts: {
      contacts: (contacts?.contacts ?? []).map((c) => ({
        icon: c.icon,
        handle: c.handle,
        url: c.url,
        bgColorClass: CONTACT_BG_MAP[c.bgColor] ?? "bg-black",
        textColorClass: CONTACT_TEXT_MAP[c.bgColor] ?? "text-white",
      })),
    },
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/hero.ts
git commit -m "feat: add getHeroData() and HeroData types for hero modal panels"
```

---

## Task 3: Seed initial content JSON files

**Files:**
- Create: `content/hero/character.json`
- Create: `content/hero/where-i-live/index.json`
- Create: `content/hero/places-to-go.json`
- Create: `content/hero/brain-dump.json`
- Create: `content/hero/books.json`
- Create: `content/hero/contacts.json`

These files pre-populate the CMS with the content currently hardcoded in `NotebookModal.tsx`. Without them, `getHeroData()` returns the fallback defaults and the modals still render — but editing via the Keystatic UI will be empty until content is saved.

- [ ] **Step 1: Create `content/hero/character.json`**

```json
{
  "name": "Kanaka",
  "bio": "I'm a writer and observer who loves building worlds and telling stories, both Goan and universal!"
}
```

- [ ] **Step 2: Create directory and `content/hero/where-i-live/index.json`**

First create the directory:
```bash
mkdir -p "content/hero/where-i-live"
```

Then create `content/hero/where-i-live/index.json`:
```json
{
  "location": "Goa",
  "description": "I'm based in sunny Goa! A place where the sea breeze meets deep-rooted history, inspiring every word I write.",
  "image": "kanaka-goa-scenery.png"
}
```

> **Note:** Keystatic's image field stores only the filename relative to its `directory` (`public/hero`). The reader prepends `publicPath` (`/hero/`) when returning the value, giving `"/hero/kanaka-goa-scenery.png"`. The actual image file already exists at `public/hero/kanaka-goa-scenery.png` — do not move it.

- [ ] **Step 3: Create `content/hero/places-to-go.json`**

```json
{
  "places": [
    { "name": "Hampi Ruins", "visited": true },
    { "name": "Gokarna Beaches", "visited": false },
    { "name": "Jaipur Palaces", "visited": false },
    { "name": "Pondicherry Cafes", "visited": false },
    { "name": "Himalayan Trek", "visited": false }
  ]
}
```

- [ ] **Step 4: Create `content/hero/brain-dump.json`**

```json
{
  "items": [
    { "text": "Drafting the \"Coastal Legends\" chapter. Need more research on local folklore." },
    { "text": "Idea: A short story about a writer whose pen brings drawings to life." },
    { "text": "Remember to pick up more ink cartridges from the stationery shop!" },
    { "text": "Blog post: \"Why I wear too many floral prints.\"" }
  ]
}
```

- [ ] **Step 5: Create `content/hero/books.json`**

```json
{
  "books": [
    { "title": "The God of Small Things", "author": "Arundhati Roy", "color": "yellow" },
    { "title": "Midnight's Children", "author": "Salman Rushdie", "color": "pink" },
    { "title": "Sea of Poppies", "author": "Amitav Ghosh", "color": "green" },
    { "title": "Interpreter of Maladies", "author": "Jhumpa Lahiri", "color": "blue" }
  ]
}
```

- [ ] **Step 6: Create `content/hero/contacts.json`**

```json
{
  "contacts": [
    { "icon": "𝕏", "handle": "@kanaka_pages", "url": "#", "bgColor": "black" },
    { "icon": "Ig", "handle": "@kanaka.writes", "url": "#", "bgColor": "pink" },
    { "icon": "In", "handle": "Kanaka Prabhu", "url": "#", "bgColor": "blue" },
    { "icon": "@", "handle": "hello@kanaka.pages", "url": "#", "bgColor": "yellow" }
  ]
}
```

- [ ] **Step 7: Commit**

```bash
git add content/hero/
git commit -m "feat: seed initial hero modal content for Keystatic singletons"
```

---

## Task 4: Update `src/app/page.tsx`

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
import { ArticleGrid } from "@/components/ArticleGrid";
import { HeroSection } from "@/components/HeroSection";
import { Navigation } from "@/components/Navigation";
import { getPosts } from "@/lib/posts";
import { getHeroData } from "@/lib/hero";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { BackgroundShapes } from "@/components/BackgroundShapes";

export default async function Home() {
  const [posts, heroData] = await Promise.all([getPosts(), getHeroData()]);

  return (
    <div
      className="min-h-screen bg-[#bbf7d0] text-on-surface font-sans text-body-md overflow-x-hidden relative z-0"
      style={{
        backgroundImage: "radial-gradient(circle, #000 2px, transparent 2px)",
        backgroundSize: "48px 48px",
      }}
    >
      <BackgroundShapes />
      <Navigation />

      <main className="w-full max-w-max-width mx-auto px-margin-page py-gap-lg flex flex-col gap-y-20 relative z-10">
        <HeroSection heroData={heroData} />
        <ArticleGrid posts={posts} />
      </main>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: fetch heroData in page.tsx and pass to HeroSection"
```

---

## Task 5: Update `src/components/HeroSection.tsx`

**Files:**
- Modify: `src/components/HeroSection.tsx`

- [ ] **Step 1: Add `heroData` prop and forward to `NotebookModal`**

Change the component signature and the `NotebookModal` usage. Replace the top of the file and the `NotebookModal` call:

At the top, update imports and add the prop type:
```tsx
"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { NotebookModal } from "./NotebookModal";
import { motion } from "framer-motion";
import type { HeroData } from "@/lib/hero";

interface HeroSectionProps {
  heroData: HeroData;
}

export function HeroSection({ heroData }: HeroSectionProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  // ... rest of the component is unchanged until the NotebookModal call
```

At the bottom of the component, change the `NotebookModal` usage from:
```tsx
      <NotebookModal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        contentId={activeModal as any} 
      />
```

to:
```tsx
      <NotebookModal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        contentId={activeModal as any}
        heroData={heroData}
      />
```

- [ ] **Step 2: Full file after changes**

The complete file (all click targets, tooltips, and layout are unchanged):

```tsx
"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { NotebookModal } from "./NotebookModal";
import { motion } from "framer-motion";
import type { HeroData } from "@/lib/hero";

interface HeroSectionProps {
  heroData: HeroData;
}

export function HeroSection({ heroData }: HeroSectionProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
      className="w-full flex flex-col items-center gap-16 mt-4 mb-12"
    >
      {/* Main Illustration Container */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
        }}
        className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/10] overflow-visible"
      >
        {/* === WALL ITEMS === */}
        {/* Whiteboard with AI Image */}
        <div
          onClick={() => setActiveModal("brain-dump")}
          className="group absolute top-[4%] left-[2%] w-[48%] h-[46%] z-10 transition-transform duration-300 ease-out hover:scale-[1.03] hover:-rotate-1 cursor-pointer"
        >
          <div className="absolute -top-10 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col items-center">
            <div className="bg-[#ff90e8] px-3 py-1 text-ink font-bold font-mono text-sm -rotate-3 brutal-shadow-sm border-2 border-ink whitespace-nowrap">
              My Brain Dump
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff90e8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
              <path d="M12 2v16M7 13l5 5 5-5" />
            </svg>
          </div>
          <div className="relative w-full h-full">
            <Image
              src="/hero/kanaka-whiteboard.png"
              alt="Whiteboard"
              fill
              className="object-contain drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"
            />
          </div>
        </div>

        {/* Window/Painting with AI Image */}
        <div
          onClick={() => setActiveModal("where-i-live")}
          className="group absolute top-[8%] right-[5%] w-[42%] h-[45%] z-10 transition-transform duration-300 ease-out hover:scale-[1.03] hover:rotate-1 cursor-pointer"
        >
          <div className="absolute -top-6 -left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex items-start gap-1">
            <div className="bg-yellow-300 px-3 py-1 text-ink font-bold font-mono text-sm rotate-2 brutal-shadow-sm border-2 border-ink whitespace-nowrap mt-4">
              Where I've lived
            </div>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="mt-6 -ml-1">
              <path d="M35 5 Q 20 5 5 25 M5 25 L5 15 M5 25 L15 25" />
            </svg>
          </div>
          <div className="w-full h-full border-[8px] border-[#2d3748] brutal-shadow overflow-hidden flex flex-col bg-white">
            <div className="relative w-full h-full">
              <Image
                src="/hero/kanaka-goa-scenery.png"
                alt="Goa Scenery"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* === DESK LAYER === */}
        <div className="absolute bottom-[2%] left-[1%] w-[98%] h-[25%] z-10 pointer-events-none">
          <svg className="w-full h-full drop-shadow-[0_12px_0_rgba(0,0,0,1)]" preserveAspectRatio="none" viewBox="0 0 100 100">
            <polygon points="6,25 0,75 0,100 6,50" fill="#eab308" stroke="#000" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            <polygon points="94,25 100,75 100,100 94,50" fill="#eab308" stroke="#000" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            <polygon points="6,25 94,25 100,75 0,75" fill="#fef08a" stroke="#000" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            <path d="M 12 35 L 45 35 M 55 35 L 88 35 M 8 45 L 25 45 M 35 45 L 75 45 M 85 45 L 92 45 M 5 55 L 15 55 M 25 55 L 85 55 M 3 65 L 60 65 M 70 65 L 97 65" stroke="#d9b876" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" opacity="0.7" />
            <polygon points="0,75 100,75 100,100 0,100" fill="#fde047" stroke="#000" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            <path d="M 5 85 L 35 85 M 45 85 L 95 85 M 15 95 L 60 95 M 70 95 L 90 95" stroke="#ca8a04" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>

        {/* === CHARACTER LAYER === */}
        <div
          onClick={() => setActiveModal("character")}
          className="group absolute bottom-[2%] left-[52%] -translate-x-1/2 w-[55%] h-[75%] z-20 transition-transform duration-300 ease-out hover:scale-105 hover:-rotate-1 cursor-pointer flex flex-col items-center justify-end"
        >
          <div className="absolute top-[10%] -right-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex items-center">
            <svg width="30" height="20" viewBox="0 0 30 20" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M25 10 L5 10 M5 10 L12 3 M5 10 L12 17" />
            </svg>
            <div className="bg-red-400 text-white px-3 py-1 font-bold font-mono text-sm rotate-3 brutal-shadow-sm border-2 border-ink whitespace-nowrap ml-1">
              Hi, it's me!
            </div>
          </div>
          <div className="relative w-full h-full">
            <Image
              src="/hero/kanaka-character.png"
              alt="Kanaka Character"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* === FOREGROUND / DESK ITEMS === */}
        <div
          onClick={() => setActiveModal("books")}
          className="group absolute bottom-[5%] left-[5%] w-[35%] h-[35%] z-40 transition-transform duration-300 ease-out hover:scale-105 hover:rotate-2 cursor-pointer"
        >
          <div className="absolute -top-8 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col items-center">
            <div className="bg-[#a3e635] px-3 py-1 text-ink font-bold font-mono text-sm -rotate-2 brutal-shadow-sm border-2 border-ink whitespace-nowrap">
              Books I've read
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a3e635" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
              <path d="M12 2v16M7 13l5 5 5-5" />
            </svg>
          </div>
          <div className="relative w-full h-full">
            <Image
              src="/hero/kanaka-desk-items.png"
              alt="Desk Items"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* Laptop */}
        <div
          onClick={() => setActiveModal("contacts")}
          className="group absolute bottom-[5%] left-[42%] w-[38%] h-[42%] z-40 transition-transform duration-300 ease-out hover:scale-[1.04] hover:-rotate-1 cursor-pointer"
        >
          <div className="absolute -top-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col items-center">
            <div className="bg-[#38bdf8] px-3 py-1 text-ink font-bold font-mono text-sm rotate-2 brutal-shadow-sm border-2 border-ink whitespace-nowrap">
              My Contacts
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
              <path d="M12 2v16M7 13l5 5 5-5" />
            </svg>
          </div>
          <div className="relative w-full h-full">
            <Image
              src="/hero/kanaka-laptop.png"
              alt="Laptop"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* Map */}
        <div
          onClick={() => setActiveModal("places-to-go")}
          className="group absolute -bottom-[6%] right-[4%] w-[22%] h-[20%] z-50 transition-transform duration-300 ease-out hover:scale-105 hover:-rotate-2 cursor-pointer rotate-12"
        >
          <div className="absolute -top-12 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col items-center -rotate-12">
            <div className="bg-orange-300 px-3 py-1 text-ink font-bold font-mono text-sm rotate-2 brutal-shadow-sm border-2 border-ink whitespace-nowrap">
              Places to go!
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fdba74" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
              <path d="M12 2v16M7 13l5 5 5-5" />
            </svg>
          </div>
          <div className="w-full h-full bg-[#fffde7] border-[3px] border-ink brutal-shadow flex relative overflow-hidden">
            <div className="w-1/3 border-r-[2px] border-ink/30 h-full bg-[#ffecb3]" />
            <div className="w-1/3 border-r-[2px] border-ink/30 h-full flex items-center justify-center">
              <div className="w-full h-full bg-[#b2ebf2] rounded-tl-full border-t-2 border-ink/30" />
            </div>
            <div className="w-1/3 h-full bg-[#b2ebf2]" />
            <MapPin className="absolute top-2 right-4 text-red-500 fill-red-500" size={20} />
            <div className="absolute top-4 left-2 w-6 h-1 border-b-2 border-dashed border-ink rotate-45" />
            <div className="absolute top-6 left-5 w-4 h-1 border-b-2 border-dashed border-ink -rotate-12" />
          </div>
        </div>
      </motion.div>

      {/* === BIO SECTION === */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
        }}
        className="flex flex-col items-center max-w-4xl px-4 relative z-10 mt-8"
      >
        <div className="bg-[#fbf8f1] border-4 border-ink brutal-shadow-lg p-8 md:p-12 -rotate-1 flex flex-col items-center text-center">
          <div>
            <p className="text-lg md:text-xl font-serif leading-relaxed text-ink/75">
              I'm <strong className="font-bold text-xl md:text-2xl text-ink">Kanaka</strong> and I'm the curator of <strong className="font-bold text-ink">kanaka.pages</strong>.<br />
              This space is my digital garden—a chaotic but carefully curated collection<br />
              of my ongoing drafts, Goan folklore deep-dives, and personal journal entries.<br />
              Click around my desk above to explore the different corners of my mind!
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-4xl md:text-5xl text-ink rotate-2" style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive" }}>
              Kanaka
            </h2>
          </div>
        </div>
      </motion.div>

      <NotebookModal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        contentId={activeModal as any}
        heroData={heroData}
      />
    </motion.section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: pass heroData prop through HeroSection to NotebookModal"
```

---

## Task 6: Update `src/components/NotebookModal.tsx`

**Files:**
- Modify: `src/components/NotebookModal.tsx`

- [ ] **Step 1: Replace the file contents**

The `renderContent()` switch now reads from `heroData[contentId]`. Layout, classes, and animation are identical to the original. Book rotation is applied by index position (presentation concern, not data).

```tsx
import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import type { HeroData } from "@/lib/hero";

type ModalContentId =
  | "character"
  | "where-i-live"
  | "places-to-go"
  | "brain-dump"
  | "books"
  | "contacts"
  | null;

interface NotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: ModalContentId;
  heroData: HeroData;
}

const BOOK_ROTATIONS = ["rotate-1", "-rotate-2", "rotate-2", "-rotate-1"];

export function NotebookModal({ isOpen, onClose, contentId, heroData }: NotebookModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !contentId) return null;

  const renderContent = () => {
    switch (contentId) {
      case "character": {
        const data = heroData.character;
        return (
          <div className="flex flex-col h-full font-serif text-ink">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono border-b-4 border-ink pb-2 inline-block self-start">
              About Me
            </h2>
            <p className="text-lg md:text-2xl leading-loose mb-6">
              I'm <strong className="font-bold">{data.name}</strong> and I'm the curator of{" "}
              <strong className="font-bold">kanaka.pages</strong>.{" "}
              {data.bio}
            </p>
            <div className="mt-auto pt-8">
              <h2
                className="text-5xl text-ink -rotate-2"
                style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive" }}
              >
                {data.name}
              </h2>
            </div>
          </div>
        );
      }

      case "where-i-live": {
        const data = heroData["where-i-live"];
        return (
          <div className="flex flex-col h-full text-ink font-serif">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono border-b-4 border-ink pb-2 inline-block self-start">
              Where I Live
            </h2>
            <div className="w-full h-48 md:h-64 relative border-4 border-ink brutal-shadow mb-6 bg-white overflow-hidden -rotate-1">
              <Image
                src={data.image}
                alt={data.location}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-lg md:text-2xl leading-loose">
              I'm based in sunny <strong className="font-bold">{data.location}</strong>!{" "}
              {data.description}
            </p>
          </div>
        );
      }

      case "places-to-go": {
        const data = heroData["places-to-go"];
        return (
          <div className="flex flex-col h-full text-ink font-mono">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 border-b-4 border-ink pb-2 inline-block self-start">
              Travel Checklist
            </h2>
            <div className="flex flex-col gap-4 text-xl md:text-2xl">
              {data.places.map((place) => (
                <label key={place.name} className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={place.visited}
                    className="w-6 h-6 border-4 border-ink accent-ink"
                  />
                  <span className={place.visited ? "line-through decoration-4 decoration-red-500" : ""}>
                    {place.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );
      }

      case "brain-dump": {
        const data = heroData["brain-dump"];
        return (
          <div className="flex flex-col h-full text-ink">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono border-b-4 border-ink pb-2 inline-block self-start">
              Brain Dump
            </h2>
            <ul className="list-disc pl-8 flex flex-col gap-4 text-xl md:text-2xl font-serif leading-loose">
              {data.items.map((item, i) => (
                <li key={i}>{item.text}</li>
              ))}
            </ul>
          </div>
        );
      }

      case "books": {
        const data = heroData.books;
        return (
          <div className="flex flex-col h-full text-ink">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono border-b-4 border-ink pb-2 inline-block self-start">
              Books I've Read
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {data.books.map((book, i) => (
                <div
                  key={book.title}
                  className={`${book.colorClass} border-4 border-ink p-4 brutal-shadow-sm ${BOOK_ROTATIONS[i % BOOK_ROTATIONS.length]}`}
                >
                  <h3 className="font-bold text-xl font-mono">{book.title}</h3>
                  <p className="text-sm font-serif mt-1">{book.author}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case "contacts": {
        const data = heroData.contacts;
        return (
          <div className="flex flex-col h-full text-ink font-mono">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 border-b-4 border-ink pb-2 inline-block self-start">
              My Contacts
            </h2>
            <div className="flex flex-col gap-6 text-xl md:text-2xl">
              {data.contacts.map((contact) => (
                <a
                  key={contact.handle}
                  href={contact.url}
                  className="flex items-center gap-4 hover:translate-x-2 transition-transform"
                >
                  <div
                    className={`w-12 h-12 ${contact.bgColorClass} ${contact.textColorClass} flex items-center justify-center border-2 border-ink brutal-shadow-sm rounded-full`}
                  >
                    {contact.icon}
                  </div>
                  <span>{contact.handle}</span>
                </a>
              ))}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 md:pt-24">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Notebook Container */}
      <div className="relative w-full max-w-3xl h-[75vh] md:h-[80vh] mt-8 md:mt-12 bg-[#fbf8f1] border-[6px] border-ink brutal-shadow-lg flex flex-col md:flex-row z-10 rotate-1 animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 border-4 border-ink brutal-shadow-sm flex items-center justify-center hover:scale-110 hover:rotate-12 transition-transform z-20"
        >
          <X size={24} strokeWidth={4} className="text-white" />
        </button>

        {/* Notebook Spine (Spiral Binding) */}
        <div className="hidden md:flex flex-col justify-evenly h-full w-12 bg-ink/5 border-r-4 border-ink z-10 absolute left-0">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="w-16 h-4 bg-ink/80 rounded-full border-2 border-ink brutal-shadow-sm -ml-2" />
          ))}
        </div>

        {/* Mobile Binding (Top) */}
        <div className="md:hidden flex flex-row justify-evenly w-full h-10 bg-ink/5 border-b-4 border-ink z-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-4 h-12 bg-ink/80 rounded-full border-2 border-ink brutal-shadow-sm -mt-2" />
          ))}
        </div>

        {/* Page Content area with ruled lines */}
        <div className="flex-1 h-full relative overflow-y-auto overflow-x-hidden md:ml-12 custom-scrollbar">
          <div
            className="absolute inset-0 pointer-events-none opacity-40 z-0"
            style={{
              backgroundImage: "repeating-linear-gradient(transparent, transparent 39px, #94a3b8 39px, #94a3b8 40px)",
              backgroundSize: "100% 40px",
              backgroundPosition: "0 0",
            }}
          />
          <div className="absolute left-10 md:left-12 top-0 bottom-0 w-1 bg-red-400/50 pointer-events-none z-0" />
          <div className="relative z-10 p-8 md:p-12 md:pl-20 min-h-full">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NotebookModal.tsx
git commit -m "feat: render NotebookModal content from Keystatic heroData props"
```

---

## Task 7: Verify and final commit

- [ ] **Step 1: Start the dev server**

```bash
pnpm dev
```

Expected: No TypeScript errors, no build warnings, server starts at `http://localhost:3000`.

- [ ] **Step 2: Verify each modal in the browser**

Open `http://localhost:3000`. Click each interactive item on the hero desk and confirm:

| Click target | Modal title | Content check |
|---|---|---|
| Whiteboard | Brain Dump | 4 bullet items from seed data |
| Window/scenery | Where I Live | "Goa" + description + image |
| Character | About Me | "Kanaka" name + bio + cursive signature |
| Desk items (books/camera) | Books I've Read | 4 book cards with correct colors |
| Laptop | My Contacts | 4 contacts with correct icons + colors |
| Map | Travel Checklist | 5 places, Hampi struck through |

- [ ] **Step 3: Verify Keystatic admin**

Open `http://localhost:3000/keystatic`. Click each singleton in the sidebar. Confirm fields are populated with the seeded content. Edit one field (e.g. change a book title), save, reload `http://localhost:3000`, open the modal — confirm the change is reflected.

- [ ] **Step 4: Final commit if any loose files**

```bash
git status
# If clean, nothing to do. If any files modified during verification:
git add -A
git commit -m "fix: address any issues found during hero modal verification"
```
