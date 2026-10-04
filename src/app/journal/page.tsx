import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Arrow } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { ClipReveal, Reveal } from "@/components/ui/Reveal";
import { postsSorted, readingTime } from "@/content/journal";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Journal — Tattoo Guides & Ideas",
  description: "Tattoo guides, meanings and aftercare advice from Eden Tattoos, Chandigarh.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const [lead, ...rest] = postsSorted;
  return (
    <>
      <PageHeader
        index="J"
        eyebrow="Journal"
        title="Notes on *ink*"
        intro="Guides, meanings and the occasional deep dive — everything we wish people knew before their first (or fifth) tattoo."
      />

      <section className="container-x">
        <Link href={`/journal/${lead.slug}`} data-cursor="Read" className="group grid gap-8 border-t hairline pt-10 md:grid-cols-12">
          <ClipReveal className="relative aspect-[16/10] overflow-hidden md:col-span-7">
            <Image src={lead.cover} alt="" fill sizes="(max-width: 768px) 100vw, 60vw" placeholder="blur" className="object-cover transition-transform duration-[1.6s] ease-expo group-hover:scale-105" />
          </ClipReveal>
          <Reveal className="flex flex-col justify-between gap-8 md:col-span-5">
            <p className="eyebrow flex gap-4 text-ash">
              <span className="text-copper">{lead.category}</span>
              <span>{formatDate(lead.date)}</span>
              <span>{readingTime(lead)} min read</span>
            </p>
            <div>
              <h2 className="font-display text-big leading-[1] transition-colors duration-500 group-hover:text-copper">{lead.title}</h2>
              <p className="mt-6 max-w-md leading-relaxed text-bone/60">{lead.excerpt}</p>
            </div>
            <span className="eyebrow inline-flex items-center gap-3 text-copper">
              Read article <Arrow className="transition-transform duration-500 group-hover:rotate-45" />
            </span>
          </Reveal>
        </Link>

        <ul className="mt-24 border-t hairline">
          {rest.map((post, i) => (
            <li key={post.slug} className="border-b hairline">
              <Link href={`/journal/${post.slug}`} data-cursor="Read" className="group grid items-center gap-4 py-8 md:grid-cols-12 md:gap-8">
                <span className="eyebrow text-ash md:col-span-1">0{i + 2}</span>
                <span className="eyebrow text-copper md:col-span-2">{post.category}</span>
                <span className="font-display text-4xl leading-[1.05] transition-all duration-700 ease-expo group-hover:translate-x-3 group-hover:italic md:col-span-6 md:text-5xl">
                  {post.title}
                </span>
                <span className="eyebrow text-ash md:col-span-2">{formatDate(post.date)}</span>
                <span className="relative hidden aspect-square w-16 overflow-hidden md:col-span-1 md:block md:justify-self-end">
                  <Image src={post.cover} alt="" fill sizes="64px" className="object-cover grayscale transition duration-700 group-hover:grayscale-0" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FinalCTA />
    </>
  );
}
