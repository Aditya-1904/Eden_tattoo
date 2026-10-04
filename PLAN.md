# Eden Tattoos — Website Plan

## 1. What we know (from edentattoos.com + Instagram @chd.edentattoos)

| Item | Value |
|---|---|
| Name | Eden Tattoos — Chandigarh |
| Positioning (IG bio) | Ornamental · Mandala · Custom Ink — "Unique designs for every soul" |
| Lead artist | Bhavna |
| Services | Tattoos, Piercing, Cover-ups, Religious/Spiritual tattoos, **Academy** (from reopening poster) |
| Phone / WhatsApp | +91 89899 98996 |
| Email | chd.edentattoos@gmail.com |
| Instagram | @chd.edentattoos (29.3K followers) |
| Rating | 4.9 ★ on Google, 700+ reviews |
| Old address (website) | SCO 292, First Floor, Sector 32D, Chandigarh 160030 |
| **New address? (IG poster)** | Plot No. 53, Industrial Area Phase 1, Chandigarh — Grand Reopening 4 Oct 2026 |
| Blog posts | Zodiac tattoos · Aftercare · Why Eden · Japanese tattoos · Colour vs Black |

Real work collected so far: ~15 photos (Joker sleeve, Shiva back pieces, mandala sleeve,
fine-line ornamental, butterfly sternum, tiger eyes, grim reaper, koi, portrait, astronaut,
Krishna/Radha, flute & peacock feather, chakra mandala back, Gemini ornamental back).

## 2. Creative direction — "Dark luxury editorial"

The site should feel like a contemporary art gallery's catalogue, not a template.

- **Palette**: Ink `#0A0A09` (bg) · Charcoal `#141412` (surfaces) · Bone `#EDE7DB` (text) ·
  Ash `#8A857C` (muted) · **Burnished copper** `#C48A55` single accent (matches their logo), used sparingly.
- **Type**: *Instrument Serif* (huge editorial display, italics for emphasis) +
  *Geist / Inter Tight* (body) + *Geist Mono* (small uppercase labels, numbering like `(01)`).
- **Texture**: subtle film-grain overlay, hairline 1px dividers, generous negative space,
  asymmetric 12-col grid, oversized numbers and index labels.
- **Motion language**: slow, weighted easing (`cubic-bezier(.76,0,.24,1)`), masked line-by-line
  text reveals, clip-path image reveals, Lenis smooth scroll. All motion respects
  `prefers-reduced-motion`.

### Signature moments (what makes it not-generic)
1. **Preloader** — "EDEN" letters rise from a mask with a 0→100 counter, curtain wipes up.
2. **Hero** — giant serif "Eden" wordmark; moving the cursor leaves a **trail of tattoo photos**
   (21st.dev "image trail" pattern). Mobile: slow auto-cycling crossfade instead.
3. **Styles index** — big typographic list (Ornamental, Mandala, Fine-line, Realism, Spiritual,
   Cover-ups…); hovering a row **reveals a floating image that follows the cursor**.
4. **Zoom-parallax gallery** — on scroll, a central image scales up to fullscreen while
   surrounding images drift away.
5. **Horizontal-scroll "Process"** — Consult → Design → Session → Heal, pinned section.
6. **Reviews marquee** — dual-row infinite marquee of Google reviews + 4.9★ / 700+ counter.
7. **Custom cursor** — small dot that grows into a "View" / "Drag" label over interactive media.
8. **Magnetic buttons + page-transition curtain** between routes.

## 3. Sitemap

| Route | Contents |
|---|---|
| `/` | Preloader · Hero · Manifesto (text reveal) · Styles index · Featured work (zoom-parallax) · Artist teaser · Process · Reviews · Studio/visit · Big CTA |
| `/work` | Filterable masonry portfolio (by style), fullscreen lightbox with keyboard/swipe |
| `/artists` + `/artists/[slug]` | Artist cards → profile: portrait, bio, specialties, their work |
| `/studio` | Story, studio space, hygiene & safety standards, piercing, academy section |
| `/aftercare` | Day-by-day healing timeline + FAQ accordion |
| `/journal` + `/journal/[slug]` | The existing blog posts migrated (SEO value) — MDX |
| `/book` | Multi-step enquiry form |
| `not-found` | Styled 404 |

## 4. Booking enquiry flow
Multi-step form (react-hook-form + zod): **Idea** (style, description) → **Placement & size**
(body area picker, size, colour/black&grey) → **References** (image upload) → **You**
(name, phone, email, preferred artist, dates, budget range) → Review & send.

Delivery: Next.js API route → **Resend** email to the studio (free tier). If no API key is set,
the form falls back to opening **WhatsApp with a pre-filled summary**. Both options always shown.

## 5. Tech stack
- Next.js (App Router) + TypeScript, Tailwind CSS v4
- Motion (Framer Motion) for animation, Lenis for smooth scroll
- next/image (AVIF/WebP, blur placeholders), next/font (self-hosted Google fonts)
- MDX for journal posts; all studio content in typed `src/content/*.ts` files → easy to edit
- Zod + react-hook-form; Resend for email
- No CMS initially (can add Sanity later if the studio wants to self-edit)

## 6. SEO & quality
- Per-page metadata, Open Graph images, `sitemap.xml`, `robots.txt`
- JSON-LD `TattooParlor` / `LocalBusiness` schema (address, hours, rating, geo)
- Target keywords: "tattoo studio Chandigarh", "best tattoo artist Chandigarh", "mandala tattoo"
- Lighthouse targets: Performance 90+, Accessibility 95+, SEO 100
- Fully responsive (mobile-first); keyboard accessible; reduced-motion support

## 7. Build phases
1. Scaffold, design tokens, fonts, layout shell (nav, footer, cursor, smooth scroll, transitions)
2. Home page with all signature sections
3. Work, Artists, Studio, Aftercare, Journal pages
4. Booking flow + API route
5. SEO, performance pass, accessibility, mobile polish
6. README with GitHub + Vercel deployment steps

## 8. Open items for the client
- Confirm **current address** (old Sector 32D vs new Industrial Area Phase 1) and opening hours
- Other artists' names/bios/photos (only Bhavna known)
- More high-resolution photos (studio interior, artist portraits, healed work)
- Is the Academy a real offering to feature with its own page?
- Domain name to use on Vercel
