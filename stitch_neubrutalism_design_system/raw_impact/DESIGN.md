---
name: Raw Impact
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4a4733'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#7c7760'
  outline-variant: '#cdc7ac'
  surface-tint: '#695f00'
  primary: '#695f00'
  on-primary: '#ffffff'
  primary-container: '#ffeb3b'
  on-primary-container: '#746900'
  inverse-primary: '#dbc90a'
  secondary: '#b51925'
  on-secondary: '#ffffff'
  secondary-container: '#d8363a'
  on-secondary-container: '#fffbff'
  tertiary: '#0061a4'
  on-tertiary: '#ffffff'
  tertiary-container: '#dceaff'
  on-tertiary-container: '#006bb4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f9e534'
  primary-fixed-dim: '#dbc90a'
  on-primary-fixed: '#201c00'
  on-primary-fixed-variant: '#4f4800'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ae'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#930015'
  tertiary-fixed: '#d1e4ff'
  tertiary-fixed-dim: '#9ecaff'
  on-tertiary-fixed: '#001d36'
  on-tertiary-fixed-variant: '#00497d'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  ink: '#000000'
  canvas: '#FFFFFF'
  caution: '#FFEB3B'
  action: '#FF5252'
  info: '#2196F3'
typography:
  hero:
    fontFamily: Hanken Grotesk
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  hero-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.1'
spacing:
  base: 8px
  gap-xs: 4px
  gap-sm: 12px
  gap-md: 24px
  gap-lg: 48px
  margin-page: 24px
  max-width: 1280px
---

## Brand & Style

The design system adopts a **Neubrutalist** aesthetic—a high-energy, "ugly-cute" style that rejects the polish of modern minimalism in favor of raw, structural honesty. It is designed for Gen Z audiences, startups, and creative SaaS platforms that want to project a bold, anti-establishment, and highly functional personality.

The style is characterized by:
- **Structural Brutalism:** Every element is defined by thick, black strokes and hard-edged shadows that mimic physical stacking.
- **Intentional Friction:** High contrast and heavy borders create a UI that demands attention rather than receding into the background.
- **Flat Visuals:** A strict ban on gradients, blurs, and organic shadows ensures the interface feels digital, honest, and unapologetically flat.

## Colors

The palette is rooted in a "CMYK-adjacent" primary logic, using high-saturation, high-vibrancy hues. 

- **Primary Canvas:** Use pure `#FFFFFF` for the background to maximize the impact of the black borders and primary fills.
- **Ink:** Pure `#000000` is used for all borders, shadows, and text to maintain maximum contrast.
- **Accent Logic:** Use the primary yellow (`#FFEB3B`), red (`#FF5252`), and blue (`#2196F3`) as "fill" colors for cards, buttons, and interactive states. 
- **Application:** Colors should never be blended or used as gradients. Use solid blocks of color to differentiate sections or functional areas.

## Typography

Typography in this design system is loud and functional. We use **Hanken Grotesk** for its sharp, contemporary geometry which complements the heavy strokes of the UI.

- **Headlines:** Use Bold or ExtraBold weights with tight line heights. Headlines should feel "heavy" and occupy significant visual real estate.
- **Body:** Maintain a generous line height (1.6) to ensure readability against high-contrast backgrounds.
- **Technical/Metadata:** **JetBrains Mono** is utilized for labels, tags, and small metadata to reinforce the raw, technical aesthetic of the system.
- **Formatting:** Headlines should be sentence-cased. Avoid all-caps for long strings of text.

## Layout & Spacing

This design system uses a **Fluid Grid** approach with strict adherence to a 8px spacing rhythm. 

- **Grid:** Use a 12-column grid for desktop. Avoid symmetrical 3-column layouts; favor asymmetric pairings (e.g., a 4-column sidebar and 8-column main area) to enhance the "brutalist" feel.
- **Gaps:** Maintain consistent 24px (gap-md) gutters between cards and primary elements.
- **Vertical Rhythm:** Sections should be separated by large, distinct vertical gaps (up to 80px on desktop) to allow the bold elements room to breathe.
- **Mobile:** On screens below 768px, all columns collapse to a single stack. Page margins should remain at 24px for visual weight.

## Elevation & Depth

Depth in this system is created through **Hard Offset Shadows** rather than light and shadow physics.

- **The Shadow Rule:** Use a hard `4px 4px` offset (or `5px 5px` for larger cards) with `#000000` at 100% opacity. No blur radius (`0px`) is allowed.
- **The Stroke Rule:** Every elevated container must have a `3px` solid black border.
- **Tactile Interaction:** When a component is "pressed" or "active," the shadow disappears and the element translates exactly 4px down and 4px right, simulating a physical button being pushed into the surface.

## Shapes

The design system utilizes **Sharp (0px)** corners for the majority of structural elements to reinforce the "Raw" and "Brutal" themes.

- **Primary Shapes:** All cards, input fields, and layout containers must have 90-degree corners.
- **Exceptions:** Softening is permitted only for specific interactive components like chips or small badges where a `0.5rem` radius can provide better visual distinction from layout blocks, though sharp is always the preferred default.

## Components

### Buttons
- **Primary:** Bright fill (#FF5252 or #FFEB3B), 3px black border, 4px hard black shadow. Text is bold and centered.
- **Hover/Active:** On hover, slightly increase shadow depth. On active, translate the button to "cover" the shadow.

### Cards
- **Structure:** White or Primary-colored background, 3px border, hard 5px offset shadow.
- **Content:** Padding should be a minimum of 24px (gap-md) to ensure content doesn't feel cramped against the heavy borders.

### Input Fields
- **Styling:** White background, 3px black border. Place labels above the input in JetBrains Mono.
- **Focus:** On focus, the field should take a 4px 4px offset shadow (if it didn't have one) or change fill color to a light version of the primary blue.

### Chips & Tags
- **Styling:** Small rectangles with 3px borders. Fills should alternate between the primary colors to denote categories.

### Checkboxes & Radios
- **Styling:** Larger than standard (24px x 24px), 3px borders. Checkmarks must be bold, thick strokes. No rounded corners for checkboxes.

### Lists
- **Styling:** Separated by 3px horizontal rules. Use hard-edged bullet points or JetBrains Mono numbering for a "typewriter" effect.