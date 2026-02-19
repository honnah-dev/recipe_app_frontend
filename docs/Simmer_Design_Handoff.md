# Simmer — Design Handoff for Claude Code

## What This Is

This is a complete design specification for restyling the **Simmer** app — a Pinterest-style recipe saving app. The app is already functional. Your job is to restyle the CSS/components to match the designer's vision exactly. Work **component by component**, confirming each one looks right before moving on.

---

## Brand Identity

**App Name:** Simmer
**Tagline:** "Strip the Clutter. Keep the Recipe."
**Vibe:** Warm, calm, editorial, food-magazine feel. Not sterile/techy — more like a cozy recipe box.

---

## Color Palette

### On white backgrounds (navbar):
| Name | Hex | Usage |
|------|-----|-------|
| Coral Red | `#e05f41` | Primary buttons (IMPORT, LOGOUT), active nav link color |
| Light Blue | `#88b8d8` | Secondary buttons (LOGIN), accents |
| Dark Navy | `#1c3345` | Logo color, dark text where needed |
| Light Gray | `#efefef` | URL input bar background |

### On cream background (body):
| Name | Hex | Usage |
|------|-----|-------|
| Warm Cream | `#faf8f5` | Page body background |
| Warm Orange-Red | `#ec6e48` | Headings, tagline text, sidebar labels, links |
| Soft Blue | `#b4d8f8` | Board name default color, accents on cream |

### Neutral text:
| Name | Hex | Usage |
|------|-----|-------|
| Dark Gray | `#4d4d4d` | Form labels, body text |
| Medium Gray | `#6b6b6a` | Placeholder text |
| Card Text | `#4c4c4c` | Recipe card titles |

---

## Typography

**Two fonts — both available on Google Fonts:**

### Passion One (Display / Headings)
- Google Fonts: `Passion+One:wght@400;700`
- Always **ALL CAPS** (`text-transform: uppercase`)
- Letter-spacing: `tracking 40` in Illustrator ≈ `letter-spacing: 0.04em` in CSS

| Usage | Size | Weight | Color | Notes |
|-------|------|--------|-------|-------|
| Board names (DINNER, HEALTHY, etc.) | 172pt → `~10rem` | Regular (400) | `#b4d8f8` default, `#ec6e48` on hover | These are dynamic/user-generated text |
| Page headings (LOG IN TO YOUR ACCOUNT) | 50pt → `~3.125rem` | Regular (400) | `#88b8d8` | |
| Tagline | 30pt → `~1.875rem` | Regular (400) | `#ec6e48` | |
| Sidebar label (WELCOME TO / RECIPES!) | 30pt → `~1.875rem` | Regular (400) | `#ec6e48` | Rotated 90° vertical |

### Plus Jakarta Sans (Body / UI)
- Google Fonts: `Plus+Jakarta+Sans:wght@400;500;600;700`

| Usage | Size | Weight | Tracking | Color | Notes |
|-------|------|--------|----------|-------|-------|
| Nav links (MY BOARDS, MY RECIPES) | 24pt → `~1.5rem` | Medium (500) | `letter-spacing: 0.1em` | `#e05f41` | All caps. Underline on active/current page |
| Page section title (MY BOARDS) | 30pt → `~1.875rem` | Medium (500) | `letter-spacing: 0.3em` | — | All caps, underlined |
| CREATE BOARD text | 54pt → `~3.375rem` | Medium (500) | `letter-spacing: 0.3em` | — | All caps |
| Sidebar username (Hannah's) | 35pt → `~2.2rem` | SemiBold (600) | `letter-spacing: 0` | `#b4d8f8` | All caps |
| Body text / form labels | 20pt → `~1.25rem` | Regular (400) | 0 | `#4d4d4d` | |
| Placeholder text | 20pt → `~1.25rem` | Regular (400) | 0 | `#6b6b6a` | |
| Small links (Register here) | 17pt → `~1.06rem` | Regular (400) | 0 | `#e05f41` | |
| Recipe card titles | 15pt → `~0.94rem` | Bold (700) | 0 | `#4c4c4c` | |

---

## Border Radius

| Element | Radius |
|---------|--------|
| Input fields | `9px` |
| Buttons | `9px` |
| Recipe cards | `18px` |
| Board thumbnail images | `22px` |

---

## Layout & Components

### Navbar
- **Background:** White
- **Left:** Simmer logo (SVG, provided — use the dark navy version)
- **Center:** URL input bar — background `#efefef`, border-radius `9px`, placeholder "Paste recipe URL..."
- **Right of input:** IMPORT button — background `#e05f41`, white text, border-radius `9px`
- **Far right:** Nav links (MY BOARDS, MY RECIPES) in coral red, LOGOUT button with border
- **Active nav link:** underlined

### Login / Landing Page
- Two-column layout on the cream background
- **Left:** Login card — white background, border-radius `18px`, contains heading, email/password fields, LOGIN button (light blue `#88b8d8`), and "Need an account? Register here." link in coral
- **Right:** Large Simmer logo (use the dark navy script logo SVG) with tagline underneath in `#ec6e48`
- **Bottom-right corner:** Circular text badge SVG (provided)

### My Boards View
- **Left sidebar:** Vertical rotated text reading "WELCOME TO [Username]'s RECIPES!" — the username part is in `#b4d8f8` Plus Jakarta Sans SemiBold, the "WELCOME TO" and "RECIPES!" parts are in `#ec6e48` Passion One
- **Main content:** Section title "MY BOARDS" (underlined)
- **Board list:** Each board shows a small image thumbnail (border-radius `22px`) + board name in huge Passion One text. Default color `#b4d8f8`, hover color `#ec6e48`. Add a smooth CSS transition on the color change.
- **Bottom:** "+ CREATE BOARD" in Plus Jakarta Sans, large, all caps

### Board Detail View (e.g., DINNER)
- "← Back to boards" link in coral
- Board name as massive Passion One heading (use `#ec6e48` here)
- Recipe cards in a responsive CSS Grid — 4 columns on desktop
- Same left sidebar with vertical text
- Circular text badge in bottom-right

### Recipe Cards
- White background, border-radius `18px`
- **Top:** Food image, fills card width, rounded top corners (use `border-radius: 18px 18px 0 0` on image or `overflow: hidden` on card)
- **Bottom:** Recipe title in Plus Jakarta Sans 15pt Bold, `#4c4c4c`, with some padding

### All Recipes View
- Same layout as board detail but shows all recipes across all boards
- Search bar for filtering by title
- Recipe cards in grid

### Review & Save Page (Import Preview)
- Form layout with fields for: Recipe Title, Description, Image URL (with image preview), Prep Time, Cook Time, Servings, Ingredients, Instructions, Source URL
- Board assignment checkboxes + "Create Board" option
- CANCEL and SAVE RECIPE buttons at bottom

### Cook Mode (Single Recipe View)
- "← Back to all recipes" link at top
- **Left column:** Large food image
- **Right column:** Recipe title in big Passion One text (`#ec6e48`), metadata row (prep time, cook time, servings), description
- Below: Two-column layout — Ingredients list on left, numbered Instructions on right
- "View Original Recipe" link
- DELETE and EDIT buttons in coral
- "View All Recipes" and "View All My Boards" links at bottom

### Circular Text Badge
- An SVG is provided (`text_in_a_circlesvg.svg`). Place this as a decorative element in the **bottom-right** area of most pages.
- It should be relatively small (around 100-150px), subtle, and positioned with CSS (absolute or fixed).

### Sidebar Vertical Text
- Implement with `writing-mode: vertical-rl` and `transform: rotate(180deg)` so it reads bottom-to-top on the left side
- Fixed or absolute positioned along the left edge of the page

---

## Interaction Details

- **Board names on hover:** Transition from `#b4d8f8` → `#ec6e48` with `transition: color 0.3s ease`
- **Active nav link:** Underlined (use `text-decoration: underline` or a `border-bottom`)
- **Buttons:** Subtle hover darkening or opacity change
- **Recipe cards:** Optional subtle `box-shadow` or `transform: translateY(-2px)` on hover for a lift effect

---

## Assets Provided

Place these SVG files in your project's assets/images folder:

1. **`Simmer_logo.svg`** — Main logo (dark navy script), used in navbar
2. **`REd_Simmer.svg`** — Red version of logo, used on landing page or wherever needed
3. **`text_in_a_circlesvg.svg`** — Circular "YOUR OWN DIGITAL RECIPE BOX" badge, decorative element

---

## Build Order

Please restyle in this order, confirming each step works before moving on:

1. **CSS custom properties** — Set up all colors, fonts, radii as CSS variables
2. **Google Fonts import** — Add Passion One and Plus Jakarta Sans
3. **Navbar** — Logo, URL input, IMPORT button, nav links, LOGOUT
4. **Login/Landing page** — Two-column layout with login card and logo
5. **My Boards view** — Board list with hover effects, sidebar vertical text
6. **Board Detail / Recipe grid** — Card grid layout with responsive columns
7. **Recipe cards** — Image + title styling
8. **Cook Mode** — Single recipe detail layout
9. **Review & Save form** — Import/edit form styling
10. **Decorative elements** — Circular badge placement, sidebar text, polish
11. **Responsive cleanup** — Make sure everything works on smaller screens

---

## Important Notes

- Board names and recipe titles are **dynamic/user-generated** — style them, don't hardcode them
- The body background is `#faf8f5` (warm cream), NOT pure white
- The navbar background IS pure white to create contrast
- All Passion One text is ALWAYS uppercase via CSS `text-transform: uppercase`
- Nav links use wide letter-spacing (`0.1em`) — this is intentional, don't tighten it
- The font sizes above are approximate conversions from Illustrator points — adjust slightly if needed for web readability, but stay close to the proportions
