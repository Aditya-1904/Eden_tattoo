import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCTA } from "@/components/home/FinalCTA";
import { TextLink } from "@/components/ui/Button";
import { ClipReveal, Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { postBySlug, posts, postsSorted, readingTime, type Block } from "@/content/journal";
import { site } from "@/content/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.date, images: [post.cover.src] },
  };
}

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "h2":
      return <h2 key={i}>{b.text}</h2>;
    case "ul":
      return (
        <ul key={i}>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote key={i}>{b.text}</blockquote>;
    default:
      return <p key={i}>{b.text}</p>;
  }
}

export default async function PostPage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const idx = postsSorted.findIndex((p) => p.slug === post.slug);
  const next = postsSorted[(idx + 1) % postsSorted.length];

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: `${site.url}${post.cover.src}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <article>
        <header className="container-x grid gap-12 pb-10 pt-36 md:grid-cols-12 md:items-end md:pt-48">
          <div className="md:col-span-7">
            <p className="eyebrow flex flex-wrap gap-4 text-graphite">
              <TextLink href="/journal">Journal</TextLink>
              <span className="text-stencil">{post.category}</span>
              <span>{formatDate(post.date)}</span>
              <span>{readingTime(post)} min read</span>
            </p>
            <RevealText as="h1" text={post.title} stagger={0.04} className="mt-8 font-display text-huge leading-[0.95] tracking-[-0.02em]" />
            <Reveal delay={0.3}>
              <p className="mt-8 max-w-lg text-xl leading-relaxed text-ink/70">{post.excerpt}</p>
            </Reveal>
          </div>
          <ClipReveal className="relative aspect-[4/5] overflow-hidden md:col-span-4 md:col-start-9">
            <Image src={post.cover} alt="" fill priority sizes="(max-width: 768px) 100vw, 33vw" placeholder="blur" className="object-cover" />
          </ClipReveal>
        </header>

        <div className="container-x grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <aside className="md:col-span-3">
            <p className="eyebrow text-graphite md:sticky md:top-28">
              <span className="text-stencil">Eden</span> — Journal
            </p>
          </aside>
          <Reveal className="prose-eden md:col-span-7">{post.body.map(renderBlock)}</Reveal>
        </div>
      </article>

      {next && next.slug !== post.slug && (
        <Link href={`/journal/${next.slug}`} data-cursor="Next" className="group container-x block border-y hairline py-16 md:py-24">
          <p className="eyebrow text-graphite">Next article →</p>
          <p className="mt-6 font-display text-big leading-[1] transition-all duration-700 ease-expo group-hover:translate-x-4 group-hover:italic group-hover:text-stencil">
            {next.title}
          </p>
        </Link>
      )}

      <FinalCTA />
    </>
  );
}
