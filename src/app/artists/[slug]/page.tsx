import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { ClipReveal, Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { Gallery } from "@/components/work/Gallery";
import { artistBySlug, artists } from "@/content/artists";
import { styleName, work } from "@/content/work";

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/artists/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const artist = artistBySlug(slug);
  if (!artist) return {};
  return {
    title: `${artist.name} — ${artist.role}`,
    description: `${artist.name} at Eden Tattoos Chandigarh. ${artist.intro}`,
    alternates: { canonical: `/artists/${artist.slug}` },
  };
}

export default async function ArtistPage({ params }: PageProps<"/artists/[slug]">) {
  const { slug } = await params;
  const artist = artistBySlug(slug);
  if (!artist) notFound();
  const pieces = work.filter((w) => w.artist === artist.slug);

  return (
    <>
      <section className="container-x grid gap-12 pb-24 pt-36 md:grid-cols-12 md:pt-44">
        <div className="md:col-span-7">
          <p className="eyebrow text-graphite">
            <TextLink href="/artists">Artists</TextLink> <span className="text-stencil">/</span> {artist.role}
          </p>
          <RevealText as="h1" text={artist.name} className="mt-6 font-display text-mega italic leading-[0.78] tracking-[-0.045em]" />
          <Reveal delay={0.3} className="mt-12 grid gap-10 md:grid-cols-7">
            <div className="md:col-span-4">
              <p className="text-xl leading-relaxed text-ink/85 md:text-2xl">{artist.intro}</p>
              {artist.bio.map((p) => (
                <p key={p.slice(0, 20)} className="mt-5 leading-relaxed text-ink/60">
                  {p}
                </p>
              ))}
            </div>
            <div className="md:col-span-3">
              <p className="eyebrow mb-4 text-graphite">Specialties</p>
              <ul className="space-y-2 border-t hairline pt-4">
                {artist.specialties.map((s, i) => (
                  <li key={s} className="flex items-baseline justify-between border-b hairline pb-2 font-display text-2xl">
                    {styleName(s)} <span className="eyebrow text-graphite">0{i + 1}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col items-start gap-4">
                <ButtonLink href={`/book?artist=${artist.slug}`}>Book with {artist.name}</ButtonLink>
                {artist.instagram && (
                  <TextLink href={artist.instagram} className="eyebrow text-graphite">
                    Instagram ↗
                  </TextLink>
                )}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-5">
          <ClipReveal className="relative aspect-[4/5] overflow-hidden md:sticky md:top-28">
            <Image src={artist.portrait} alt={`${artist.name}, ${artist.role.toLowerCase()} at Eden Tattoos`} fill priority sizes="(max-width: 768px) 100vw, 40vw" placeholder="blur" className="object-cover object-[50%_30%]" />
          </ClipReveal>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-x mb-10 flex items-end justify-between border-t hairline pt-10">
          <h2 className="font-display text-big leading-none">
            Work by <span className="italic text-stencil">{artist.name}</span>
          </h2>
          <span className="eyebrow text-graphite">{pieces.length} pieces</span>
        </div>
        <Gallery items={pieces} showFilters={false} />
      </section>

      <FinalCTA title={`Book with *${artist.name}.*`} />
    </>
  );
}
