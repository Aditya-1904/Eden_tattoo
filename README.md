# Eden Tattoos — Website

A dark, editorial portfolio site for **Eden Tattoos**, a custom tattoo & piercing studio in Chandigarh.

Built with **Next.js 16** (App Router) · **TypeScript** · **Tailwind CSS v4** · **Motion** · **Lenis** · **React Hook Form + Zod** · **Resend**.

## Highlights

- Cinematic hero: fullscreen tattoo frames with a slow zoom and wipe transition, one headline and a progress bar
- Minimal header with a full-screen menu that previews a piece for each link
- Zoom-parallax portfolio reveal, pinned styles showcase, full-bleed artist feature, single-review slider
- Filterable portfolio with a keyboard / swipe lightbox (`/work?style=mandala` deep-links work)
- 4-step booking enquiry with reference-image upload → email via Resend, with WhatsApp fallback
- SEO: per-page metadata, generated Open Graph image, sitemap, robots, `TattooParlor`, `FAQPage` and `BlogPosting` JSON-LD
- Custom cursor, magnetic buttons, film grain; respects `prefers-reduced-motion`; responsive down to 320px

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
    home/              homepage sections (CinematicHero, Statement, ZoomParallax, StylesSticky, Cinematic, …)
    layout/            Nav, Footer, Preloader
    work/              Gallery + Lightbox
    book/              EnquiryForm
    ui/                Button, RevealText, Reveal, Magnetic, Marquee, Cursor, Accordion, PageHeader
    providers/         Lenis smooth scroll + Motion config
  content/             all editable studio content
  assets/              portfolio photos + display font (used for the OG image)
  lib/                 utilities, enquiry schema, hooks
```
