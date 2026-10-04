import Image from "next/image";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { reviews } from "@/content/copy";
import { mapsEmbed, mapsLink, reviewsLink, site, whatsappLink } from "@/content/site";
import { styles, work } from "@/content/work";

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-copper" aria-hidden>
      <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7L12 17.5 5.8 21.2l1.6-7L2 9.5l7.1-.6L12 2z" />
    </svg>
  );
}

/** Oversized running band of style names between sections. */
export function StyleBand() {
  return (
    <div className="border-y hairline py-6 md:py-8" aria-hidden>
      <Marquee duration={45}>
        {[...styles, { id: "cover", name: "Cover-ups" }, { id: "pierce", name: "Piercing" }].map((s, i) => (
          <span key={s.id} className="flex items-center">
            <span className={`px-8 font-display text-6xl leading-none md:text-8xl ${i % 2 ? "italic text-copper" : ""}`}>{s.name}</span>
            <span className="text-3xl text-copper">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export function Reviews() {
  const strip = work.slice(0, 10);
  return (
    <section className="relative overflow-hidden py-28 md:py-40" aria-labelledby="reviews-title">
      <div className="container-x grid gap-10 md:grid-cols-12">
        <p className="eyebrow text-ash md:col-span-3">
          <span className="text-copper">(06)</span> — Word of mouth
        </p>
        <div className="md:col-span-9">
          <h2 id="reviews-title" className="sr-only">
            Client reviews
          </h2>
          <Reveal className="flex items-end gap-6">
            <span className="font-display text-[clamp(6rem,16vw,14rem)] leading-[0.8] tracking-[-0.04em]">{site.rating.value}</span>
            <span className="mb-3 space-y-2">
              <span className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} />
                ))}
              </span>
              <span className="eyebrow block text-ash">
                {site.rating.count}+ Google reviews
              </span>
            </span>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 space-y-6 md:mt-24">
        <Marquee duration={50} pauseOnHover>
          {[...reviews, ...reviews].map((r, i) => (
            <figure key={i} className="mx-3 flex w-[min(80vw,460px)] shrink-0 flex-col justify-between gap-8 border hairline bg-coal p-8">
              <blockquote className="font-display text-3xl leading-[1.15] md:text-4xl">
                <span className="text-copper">“</span>
                {r.text}
              </blockquote>
              <figcaption className="eyebrow flex items-center justify-between text-ash">
                <span className="text-bone">{r.name}</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </Marquee>
        <Marquee duration={60} reverse>
          {strip.map((w) => (
            <div key={w.slug} className="relative mx-3 aspect-square w-40 shrink-0 overflow-hidden md:w-56">
              <Image src={w.image} alt={w.title} fill sizes="224px" className="object-cover grayscale transition duration-700 hover:grayscale-0" />
            </div>
          ))}
        </Marquee>
      </div>

      <div className="container-x mt-14 flex flex-wrap items-center justify-between gap-6">
        <TextLink href={reviewsLink} className="eyebrow text-copper">
          Read all reviews on Google ↗
        </TextLink>
        <TextLink href={site.instagram.url} className="eyebrow text-ash">
          @{site.instagram.handle} — {site.instagram.followers} followers ↗
        </TextLink>
      </div>
    </section>
  );
}

export function Visit() {
  return (
    <section className="container-x py-28 md:py-40" aria-label="Visit the studio">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow text-ash">
            <span className="text-copper">(07)</span> — Visit
          </p>
          <RevealText as="h2" text="Come say *hello*" className="mt-6 font-display text-huge leading-[0.92] tracking-[-0.02em]" />

          <dl className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <div>
              <dt className="eyebrow mb-3 text-ash">Studio</dt>
              <dd className="leading-relaxed text-bone/85">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.city} {site.address.postalCode}
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-3 text-ash">Hours</dt>
              <dd className="leading-relaxed text-bone/85">
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days} — {h.time}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-3 text-ash">Call</dt>
              <dd>
                <TextLink href={site.phoneHref} className="text-bone/85">{site.phone}</TextLink>
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-3 text-ash">Write</dt>
              <dd>
                <TextLink href={`mailto:${site.email}`} className="break-all text-bone/85">{site.email}</TextLink>
              </dd>
            </div>
          </dl>

          <div className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href={mapsLink}>Get directions</ButtonLink>
            <ButtonLink href={whatsappLink("Hi Eden Tattoos! I'd like to know more about getting a tattoo.")} variant="outline">
              WhatsApp us
            </ButtonLink>
          </div>
        </div>

        <Reveal className="relative min-h-[420px] overflow-hidden border hairline md:col-span-6 md:col-start-7">
          <iframe
            title="Map to Eden Tattoos"
            src={mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full [filter:grayscale(1)_invert(0.92)_contrast(0.85)_brightness(0.9)]"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-line" />
        </Reveal>
      </div>
    </section>
  );
}
