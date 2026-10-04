"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mapsLink, nav, site, whatsappLink } from "@/content/site";
import { workBySlug } from "@/content/work";
import { cn, ease } from "@/lib/utils";

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: site.timezone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="eyebrow tabular-nums text-ash" suppressHydrationWarning>
      Chandigarh <span className="text-bone">{time ?? "--:--"}</span> IST
    </span>
  );
}

// Each menu entry previews a piece of work on hover.
const links = [
  { href: "/", label: "Home", image: "shiva-tandava" },
  ...nav.map((n, i) => ({ ...n, image: ["mandala-sleeve", "memento-mori", "filigree-forearm", "koi", "tiger-eyes"][i] })),
  { href: "/book", label: "Book", image: "butterfly-sternum" },
].map((l) => ({ ...l, piece: workBySlug(l.image)! }));

function MenuOverlay({ pathname }: { pathname: string }) {
  const current = Math.max(0, links.findIndex((l) => (l.href === "/" ? pathname === "/" : pathname.startsWith(l.href))));
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? current;

  return (
    <motion.div
      id="site-menu"
      className="fixed inset-0 z-40 flex flex-col bg-coal"
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 0.9, ease: ease.inout }}
    >
      <div className="container-x grid flex-1 items-center gap-10 pt-24 md:grid-cols-12">
        <nav aria-label="Site" className="md:col-span-7" onPointerLeave={() => setHover(null)}>
          <ul>
            {links.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 0.9, ease: ease.expo, delay: 0.25 + i * 0.045 }}
                >
                  <Link
                    href={item.href}
                    onPointerEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    className={cn(
                      "group flex items-baseline gap-5 py-0.5 font-display text-[12.5vw] leading-[0.98] transition-[color,opacity,transform] duration-500 ease-expo sm:text-7xl lg:text-[5.6vw]",
                      i === current ? "italic text-copper" : "text-bone",
                      hover !== null && hover !== i && "opacity-30",
                      "hover:translate-x-3",
                    )}
                  >
                    <span className="eyebrow w-6 not-italic text-ash">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </nav>

        <motion.div
          className="relative hidden aspect-[4/5] max-h-[68svh] overflow-hidden md:col-span-4 md:col-start-9 md:block"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: ease.expo, delay: 0.35 }}
        >
          {links.map((l, i) => (
            <motion.div
              key={l.href}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === shown ? 1 : 0, scale: i === shown ? 1 : 1.08 }}
              transition={{ duration: 0.9, ease: ease.expo }}
            >
              <Image src={l.piece.image} alt="" fill sizes="35vw" className="object-cover" />
            </motion.div>
          ))}
          <span className="eyebrow absolute bottom-4 left-4 z-10 text-bone">{links[shown].piece.title}</span>
        </motion.div>
      </div>

      <motion.div
        className="container-x flex flex-wrap items-end justify-between gap-6 border-t hairline py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.6 } }}
        exit={{ opacity: 0 }}
      >
        <div className="eyebrow flex flex-wrap gap-x-8 gap-y-2 text-ash">
          <a href={site.phoneHref} className="text-bone hover:text-copper">{site.phone}</a>
          <a href={whatsappLink()} className="hover:text-copper">WhatsApp</a>
          <a href={site.instagram.url} className="hover:text-copper">Instagram</a>
          <a href={mapsLink} className="hover:text-copper">{site.address.line2}</a>
        </div>
        <LocalTime />
      </motion.div>
    </motion.div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200);
  });

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const lenis = useLenis();
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 [text-shadow:0_1px_12px_rgb(10_10_9/0.45)]"
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.7, ease: ease.expo }}
      >
        <div className="container-x flex items-center justify-between py-6">
          <Link href="/" className="font-display text-3xl leading-none tracking-tight text-bone" aria-label="Eden Tattoos — home">
            Eden
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/book" className="eyebrow hidden text-bone transition-opacity hover:opacity-60 sm:block">
              Book a session
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="group eyebrow flex items-center gap-3 text-bone"
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <span className="relative block h-[1.2em] overflow-hidden">
                <span className={cn("block transition-transform duration-500 ease-expo", open && "-translate-y-full")}>Menu</span>
                <span className={cn("absolute inset-0 block translate-y-full transition-transform duration-500 ease-expo", open && "translate-y-0")}>Close</span>
              </span>
              <span className="relative block h-2 w-6" aria-hidden>
                <span className={cn("absolute left-0 top-0 h-px w-full bg-bone transition-transform duration-500", open && "translate-y-[3.5px] rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-px w-full bg-bone transition-transform duration-500", open && "-translate-y-[3.5px] -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>{open && <MenuOverlay pathname={pathname} />}</AnimatePresence>
    </>
  );
}
