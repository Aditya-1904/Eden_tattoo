import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { workBySlug } from "@/content/work";

export default function NotFound() {
  const piece = workBySlug("memento-mori")!;
  return (
    <section className="container-x relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-32">
      <Image src={piece.image} alt="" fill sizes="100vw" className="object-cover opacity-20 grayscale" />
      <div className="relative">
        <p className="eyebrow text-copper">Error 404</p>
        <h1 className="mt-6 font-display text-mega leading-[0.78] tracking-[-0.045em]">
          Lo<span className="italic text-copper">st</span>
        </h1>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <p className="max-w-md text-lg leading-relaxed text-bone/70">
            This page has faded like a tattoo without sunscreen. Let&apos;s get you back to the good stuff.
          </p>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/">Back home</ButtonLink>
            <ButtonLink href="/work" variant="outline">
              See the work
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
