import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { mapsEmbed, mapsLink, site, whatsappLink } from "@/content/site";
import { styles } from "@/content/work";

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

export function Visit() {
  return (
    <section className="container-x py-28 md:py-40" aria-label="Visit the studio">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow text-ash">
            <span className="text-copper">(06)</span> — Visit
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
