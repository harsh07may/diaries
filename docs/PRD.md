# Project Brief & PRD: kanaka.pages

## 1. Project Overview
**kanaka.pages** is a high-fidelity, neubrutalist-styled blog web application designed for a Gen Z audience. It prioritizes raw aesthetics, high contrast, and playful interactivity to differentiate itself from sterile, corporate design trends.

## 2. Target Audience
- **Primary:** Gen Z and digital natives who appreciate "ugly-cute" aesthetics and bold visual expressions.
- **Secondary:** Creative professionals and developers looking for a unique platform to showcase their thoughts and projects.

## 3. Design System: "Raw Impact"
The project is built on the **Raw Impact** design system, characterized by:
- **Style:** Neubrutalism (Bold, Colorful, Raw, Playful).
- **Core Palette:** #FFEB3B (Yellow), #FF5252 (Red), #2196F3 (Blue) with hard #000000 accents.
- **Visual Rules:** 3px+ solid black borders, 4px+ hard offset shadows (no blur), 0px or slight (0.5rem) corner rounding.
- **Typography:** Bold sans-serif for impact (Hanken Grotesk) and JetBrains Mono for metadata.

## 4. Key Features & User Flows
### Page 1: Home & Introduction (The Index)
- **Interactive Hero "Cozy Scene":** 
    - Desktop illustration with hover-reactive objects (glow/jiggle).
    - Tooltips on hover; spiral-bound notebook modals on click.
- **Bento-Style Blog Feed:** 
    - Dynamic grid of cards with randomized pastel backgrounds.
    - Post metadata: title, date (handwritten style), tag chips, and SVG icons.
    - "Lift-and-drop" hover interactions.

### Page 2: Individual Post View
- **High-Impact Header:** Large display type with vibrant tags and 5px offset-shadowed hero images.
- **Rich Content Area:** 
    - Blockquotes styled as "sticky notes" with 45° shadows.
    - Inline images with 3px black borders.
    - Hyperlinks with thick background highlights on hover.
- **Author & Social Box:** High-contrast card with bio and tactile share buttons.
- **"Read Next" Mini-Bento:** A smaller version of the main feed for content discovery.

## 5. Technical Requirements
- **Frontend:** HTML5, Tailwind CSS (for layout/utility), and Vanilla JavaScript (for view toggling and animations).
- **Interactivity:** Custom CSS keyframe animations for jiggle/glow effects; smooth box-shadow transitions for tactile feel.
- **Responsiveness:** Full desktop-to-mobile adaptation (vertical stacking on mobile).
- **SEO & Meta:** Inclusion of Open Graph tags and viewport optimization.

## 6. Project Roadmap
- **Phase 1:** Core Design System & Identity (Completed).
- **Phase 2:** Home & Post View Prototyping (Completed).
- **Phase 3:** Additional views (Category pages, About, Newsletter flow).
- **Phase 4:** Content Management System (CMS) integration and final SEO audit.
x