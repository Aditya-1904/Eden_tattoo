import type { Metadata } from "next";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { aftercare, donts, dos, faqs } from "@/content/copy";
import { whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Tattoo Aftercare & FAQ",
  description:
    "Day-by-day tattoo aftercare from Eden Tattoos Chandigarh, plus answers to common questions about pricing, pain, cover-ups and safety.",
  alternates: { canonical: "/aftercare" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function AftercarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }} />
      <PageHeader
        index="C"
        eyebrow="Aftercare"
        title="Heal it *right*"
        intro="Half of a great tattoo happens after you leave the chair. Follow these steps — and always your artist's specific advice — for crisp lines that last a lifetime."
      />

      <section className="container-x" aria-label="Healing timeline">
        <ol>
          {aftercare.map((step, i) => (
            <li key={step.when} className="grid md:grid-cols-12">
              <p className="eyebrow hidden pr-10 pt-3 text-right text-stencil md:col-span-3 md:block">{step.when}</p>
              <div className="relative border-l hairline pb-16 pl-8 md:col-span-9 md:pl-16">
                <span className="absolute -left-[5px] top-3 h-[9px] w-[9px] rounded-full bg-stencil" aria-hidden />
                <Reveal delay={i * 0.04}>
                  <p className="eyebrow text-stencil md:hidden">{step.when}</p>
                  <h2 className="mt-3 font-display text-5xl leading-none md:mt-0 md:text-6xl">{step.title}</h2>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/65">{step.text}</p>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-x grid gap-4 py-28 md:grid-cols-2 md:py-40" aria-label="Dos and don'ts">
        {[
          { title: "Do", items: dos, mark: "+", tone: "text-stencil" },
          { title: "Don't", items: donts, mark: "−", tone: "text-graphite" },
        ].map((col, ci) => (
          <Reveal key={col.title} delay={ci * 0.1} className="border hairline bg-paper-2 p-8 md:p-12">
            <h2 className="font-display text-6xl italic md:text-7xl">{col.title}</h2>
            <ul className="mt-10 space-y-4">
              {col.items.map((t) => (
                <li key={t} className="flex gap-4 border-b hairline pb-4 leading-relaxed text-ink/75">
                  <span className={`font-display text-2xl leading-none ${col.tone}`}>{col.mark}</span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      <section className="container-x pb-12" aria-label="Frequently asked questions">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-graphite">
              <span className="text-stencil">(FAQ)</span> — Questions
            </p>
            <RevealText as="h2" text="Good *questions*" className="mt-6 font-display text-huge leading-[0.92]" />
            <p className="mt-6 max-w-xs leading-relaxed text-ink/60">Something not covered here? Message us — a real person will reply.</p>
            <div className="mt-8">
              <ButtonLink href={whatsappLink("Hi Eden! I have a question about my tattoo.")} variant="outline">
                Ask on WhatsApp
              </ButtonLink>
            </div>
          </div>
          <div className="md:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
