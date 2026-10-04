# Eden Tattoos — Website

A dark, editorial portfolio site for **Eden Tattoos**, a custom tattoo & piercing studio in Chandigarh.

Built with **Next.js 16** (App Router) · **TypeScript** · **Tailwind CSS v4** · **Motion** · **Lenis** · **React Hook Form + Zod** · **Resend**.

## Concept — "From stencil to skin"

Every tattoo begins as a violet thermal stencil before it becomes ink on skin. The site is built around that:
warm sketchbook paper, black ink, stencil violet as the single accent, handwritten margin notes and taped prints.

## Highlights

- **Hero:** a procedurally generated mandala traces itself in stencil violet; scrolling turns the lines to ink and the
  finished tattoo opens out of the mandala's centre to fill the screen
- **Ink flood:** a soft pool of ink spreads across the page and carries you into the dark zoom-parallax portfolio
- **Flash wall:** taped prints (one per style) you can drag around, each linking to that style in the portfolio
- **Process:** a hand-drawn path that traces itself between the four steps as you scroll; line icons draw on
- Artist signature that writes itself, review notes, and a rubber-stamp "Book" button
- Filterable portfolio with a keyboard / swipe lightbox (`/work?style=mandala` deep-links work)
- 4-step booking enquiry with reference-image upload → email via Resend, with WhatsApp fallback
- SEO: per-page metadata, generated Open Graph image, sitemap, robots, `TattooParlor`, `FAQPage` and `BlogPosting` JSON-LD
- Respects `prefers-reduced-motion`; responsive down to 320px

### Theming

Colours are semantic tokens in `src/app/globals.css`: `paper` (background), `ink` (text), `stencil` (accent),
`graphite` (muted). Add the class `theme-ink` to any element to flip it to the dark ink palette — used by the
portfolio, lightbox and footer.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Editing content

Everything the studio might change lives in `src/content/` — no code knowledge needed beyond editing text.

| File | What it controls |
|---|---|
| `src/content/site.ts` | Name, phone, WhatsApp, email, **address**, **opening hours**, rating, Instagram |
| `src/content/work.ts` | Portfolio pieces and the list of styles |
| `src/content/artists.ts` | Artist profiles |
| `src/content/copy.ts` | Reviews, process steps, FAQ, aftercare timeline, dos & don'ts |
| `src/content/journal.ts` | Journal / blog articles |

**Add a portfolio piece:** drop a JPG (≈1600px on the long side) into `src/assets/work/`, import it at the top of
`work.ts`, and add an entry to the `work` array. It appears in the gallery, filters and artist page automatically.

### Still to confirm with the studio

Search the code for `TODO(client)` — each marks something written as a sensible placeholder:

- **Opening hours** (currently "By appointment")
- Artist **bios and portraits**, and any other artists besides Bhavna; which artist did each portfolio piece
- More **full-length Google reviews** (only short excerpts are used today)
- Hygiene standards and piercing details on `/studio` (single-use needles, no piercing guns, implant-grade jewellery)
- Academy course details
- Higher-resolution originals of the Instagram photos (several are 480px and look soft when large)

## Booking emails (Resend)

1. Create a free account at [resend.com](https://resend.com) and an API key.
2. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`.
3. For production, verify the studio's domain in Resend and set `ENQUIRY_FROM_EMAIL` to an address on it
   (e.g. `Eden Tattoos <bookings@edentattoos.com>`).

Without a key the form still works: after the last step it opens WhatsApp with the whole enquiry pre-written.

## Deploy — GitHub + Vercel

```bash
git add -A
git commit -m "Eden Tattoos website"
git branch -M main
git remote add origin https://github.com/<you>/eden-tattoos.git
git push -u origin main
```

Then on [vercel.com](https://vercel.com): **Add New → Project → Import** the repository. Vercel detects Next.js; no
build settings are needed. Under **Settings → Environment Variables** add the keys from `.env.example`
(`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`) and redeploy.

To use the studio's domain, add it under **Settings → Domains** and follow the DNS instructions, then set
`NEXT_PUBLIC_SITE_URL` to it.

## Project structure

```
src/
  app/                 routes (home, work, artists/[slug], studio, aftercare, journal/[slug], book, api/enquiry)
  components/
    home/              homepage sections (StencilHero, InkFlood, ZoomParallax, FlashWall, ProcessPath, …)
    stencil/           Mandala (+ geometry), handwritten Annotation, TornEdge
    layout/            Nav, Footer, Preloader
    work/              Gallery + Lightbox
    book/              EnquiryForm
    ui/                Button, RevealText, Reveal, Magnetic, Marquee, Cursor, Accordion, PageHeader
    providers/         Lenis smooth scroll + Motion config
  content/             all editable studio content
  assets/              portfolio photos + fonts used by the generated OG image
  lib/                 utilities, enquiry schema, hooks
```
