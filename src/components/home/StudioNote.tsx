import { Reveal } from "@/components/ui/Reveal";
import { Annotation } from "@/components/stencil/Annotation";
import { site } from "@/content/site";

/** A short studio introduction, set like a page from the artist's notebook with margin notes. */
export function StudioNote() {
  return (
    <section className="container-x relative py-28 md:py-44" aria-label="About the studio">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="eyebrow text-graphite">
            <span className="text-stencil">01</span> — The studio
          </p>
          <Annotation className="mt-10 hidden md:block" rotate={-4}>
            no flash.
            <br />
            drawn by hand,
            <br />
            every time ✓
          </Annotation>
        </div>

        <Reveal className="md:col-span-8">
          <p className="font-display text-[clamp(2rem,4.2vw,4.1rem)] font-[350] leading-[1.08] tracking-[-0.015em]">
            Eden is a custom tattoo studio in {site.city}. We don&apos;t do flash off the wall — every design is{" "}
            <span className="relative inline-block">
              sketched
              <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full text-stencil" aria-hidden>
                <path d="M3 14 C 50 4, 120 4, 197 10" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            for one person, fitted to one body, and transferred line by line.
          </p>

          <div className="mt-14 grid gap-8 border-t hairline pt-8 sm:grid-cols-3">
            {[
              [`${site.rating.value}★`, "Google rating"],
              [`${site.rating.count}+`, "Client reviews"],
              [site.instagram.followers, "On Instagram"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-5xl font-[350] leading-none md:text-6xl">{v}</p>
                <p className="eyebrow mt-3 text-graphite">{l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
