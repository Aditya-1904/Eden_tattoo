"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Annotation } from "@/components/stencil/Annotation";
import { TornEdge } from "@/components/stencil/TornEdge";
import { styles, workBySlug, workByStyle, type StyleId, type WorkItem } from "@/content/work";
import { cn } from "@/lib/utils";

const covers: Record<StyleId, string> = {
  ornamental: "filigree-forearm",
  mandala: "chakra-mandala",
  "fine-line": "butterfly-sternum",
  spiritual: "shiva-tandava",
  realism: "tiger-eyes",
  blackwork: "memento-mori",
};

type Card = { id: string; label: string; href: string; piece?: WorkItem; count?: number };

const cards: Card[] = [
  ...styles.map((s) => ({ id: s.id, label: s.name, href: `/work?style=${s.id}`, piece: workBySlug(covers[s.id])!, count: workByStyle(s.id).length })),
  { id: "yours", label: "your idea?", href: "/book" },
];

// Hand-placed layout for the pin-board (desktop). Percentages of the board.
const layout = [
  { left: "3%", top: "8%", rotate: -6, w: "w-[17vw]" },
  { left: "23%", top: "28%", rotate: 4, w: "w-[15vw]" },
  { left: "39%", top: "4%", rotate: -2, w: "w-[18vw]" },
  { left: "59%", top: "26%", rotate: 5, w: "w-[16vw]" },
  { left: "78%", top: "6%", rotate: -4, w: "w-[15vw]" },
  { left: "2%", top: "60%", rotate: 3, w: "w-[13vw]" },
  { left: "71%", top: "58%", rotate: -7, w: "w-[14vw]" },
];

function PrintCard({ card, index, mobile }: { card: Card; index: number; mobile?: boolean }) {
  const blank = !card.piece;
  return (
    <div className={cn("print relative p-2.5 pb-14 md:p-3 md:pb-16", blank && "border border-dashed border-stencil/50 bg-transparent shadow-none")}>
      <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" aria-hidden />
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
        {card.piece ? (
          <Image src={card.piece.image} alt={card.piece.title} fill sizes={mobile ? "45vw" : "18vw"} className="pointer-events-none object-cover" draggable={false} />
        ) : (
          <div className="grid h-full place-items-center p-4 text-center">
            <span className="hand text-4xl leading-[0.9]">
              draw it
              <br />
              with us
            </span>
          </div>
        )}
      </div>
      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
        <span className="hand text-[1.7rem] leading-none text-ink md:text-3xl">{card.label}</span>
        <span className="eyebrow text-graphite">{card.count ? `${card.count} pcs` : `No. 0${index + 1}`}</span>
      </div>
    </div>
  );
}

/** A pin-board of prints — one per style — that visitors can drag around. */
export function FlashWall() {
  const board = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState(cards.map((_, i) => i));
  const dragged = useRef(false);

  const toFront = (i: number) => setOrder((o) => [...o.filter((x) => x !== i), i]);

  return (
    <section className="relative bg-paper py-28 md:py-36" aria-labelledby="flash-title">
      <TornEdge seed={11} />
      <div className="container-x grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="eyebrow text-graphite">
            <span className="text-stencil">03</span> — Styles
          </p>
          <h2 id="flash-title" className="mt-6 font-display text-[clamp(3rem,7.5vw,7.5rem)] font-[350] leading-[0.9] tracking-[-0.03em]">
            The flash <span className="italic text-stencil">wall</span>
          </h2>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <p className="leading-relaxed text-ink/70">
            Six styles we live and breathe. Pick one up, move it around — then open it to see every piece in that style.
          </p>
          <Annotation className="mt-6 hidden md:inline-block" rotate={-3}>
            (go on — rearrange them)
          </Annotation>
        </div>
      </div>

      {/* Desktop: draggable pin-board */}
      <div ref={board} className="relative mx-[var(--gutter)] mt-12 hidden h-[clamp(560px,82vh,860px)] md:block">
        {cards.map((card, i) => {
          const pos = layout[i];
          return (
            <motion.div
              key={card.id}
              className={cn("absolute cursor-grab active:cursor-grabbing", pos.w)}
              style={{ left: pos.left, top: pos.top, zIndex: order.indexOf(i) + 1 }}
              initial={{ opacity: 0, y: 60, rotate: pos.rotate * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: pos.rotate }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              drag
              dragConstraints={board}
              dragElastic={0.12}
              dragMomentum
              whileHover={{ y: -6, rotate: pos.rotate * 0.4 }}
              whileDrag={{ scale: 1.06, rotate: 0, boxShadow: "0 30px 60px -20px rgb(40 30 20 / 0.45)" }}
              onPointerDown={() => toFront(i)}
              onDragStart={() => (dragged.current = true)}
              onDragEnd={() => setTimeout(() => (dragged.current = false), 0)}
              data-cursor="Drag"
            >
              <PrintCard card={card} index={i} />
              <Link
                href={card.href}
                onClick={(e) => dragged.current && e.preventDefault()}
                data-cursor={card.piece ? "Open" : "Book"}
                className="absolute -right-3 -top-3 grid h-10 w-10 place-items-center rounded-full bg-stencil text-paper shadow-lg transition-transform duration-500 hover:scale-110"
                aria-label={card.piece ? `See ${card.label} tattoos` : "Start an enquiry"}
              >
                ↗
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: a loose grid */}
      <div className="container-x mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:hidden">
        {cards.map((card, i) => (
          <Link key={card.id} href={card.href} style={{ rotate: `${layout[i].rotate * 0.5}deg` }} className="block">
            <PrintCard card={card} index={i} mobile />
          </Link>
        ))}
      </div>
    </section>
  );
}
