import Link from "next/link";
import { mapsLink, nav, site, whatsappLink } from "@/content/site";
import { TextLink } from "@/components/ui/Button";
import { BackToTop } from "./BackToTop";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t hairline bg-ink pt-20">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-4xl leading-[1.05] md:text-5xl">
            Ink with intent.
            <br />
            <span className="italic text-copper">Designed for one.</span>
          </p>
          <Link
            href="/book"
            className="eyebrow mt-8 inline-flex items-center gap-3 border-b border-copper pb-1 text-copper transition-colors hover:text-bone"
          >
            Start your enquiry →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
          <div>
            <p className="eyebrow mb-5 text-ash">Visit</p>
            <address className="space-y-1 not-italic text-bone/80">
              <span className="block">{site.address.line1}</span>
              <span className="block">{site.address.line2}</span>
              <span className="block">
                {site.address.city} {site.address.postalCode}
              </span>
            </address>
            <TextLink href={mapsLink} className="eyebrow mt-4 text-copper">
              Directions
            </TextLink>
          </div>
          <div>
            <p className="eyebrow mb-5 text-ash">Contact</p>
            <ul className="space-y-1 text-bone/80">
              <li><TextLink href={site.phoneHref}>{site.phone}</TextLink></li>
              <li><TextLink href={whatsappLink()}>WhatsApp</TextLink></li>
              <li><TextLink href={`mailto:${site.email}`}>Email</TextLink></li>
              <li><TextLink href={site.instagram.url}>Instagram</TextLink></li>
              <li><TextLink href={site.facebook}>Facebook</TextLink></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-5 text-ash">Explore</p>
            <ul className="space-y-1 text-bone/80">
              {nav.map((n) => (
                <li key={n.href}><TextLink href={n.href}>{n.label}</TextLink></li>
              ))}
              <li><TextLink href="/book">Book</TextLink></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-x mt-20 flex flex-wrap items-center justify-between gap-4 border-t hairline py-6">
        <p className="eyebrow text-ash">
          © {year} {site.name} · {site.city}
        </p>
        <p className="eyebrow text-ash">
          {site.rating.value}★ on Google · {site.rating.count}+ reviews
        </p>
        <BackToTop />
      </div>

      <div aria-hidden className="pointer-events-none select-none px-[2vw] pb-[1vw]">
        <p className="font-display text-center leading-[0.78] tracking-[-0.04em] text-bone/[0.06] text-[32vw]">
          Eden
        </p>
      </div>
    </footer>
  );
}
