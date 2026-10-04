import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";

export function PageHeader({
  index,
  eyebrow,
  title,
  intro,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="container-x pb-16 pt-36 md:pb-24 md:pt-48">
      <p className="eyebrow text-ash">
        <span className="text-copper">({index})</span> — {eyebrow}
      </p>
      <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
        <RevealText
          as="h1"
          text={title}
          stagger={0.08}
          className="font-display text-giant leading-[0.86] tracking-[-0.03em] md:col-span-8"
        />
        {intro && (
          <Reveal delay={0.3} className="md:col-span-4">
            <p className="text-lg leading-relaxed text-bone/70">{intro}</p>
            {children}
          </Reveal>
        )}
      </div>
    </header>
  );
}
