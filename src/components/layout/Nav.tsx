"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, whatsappLink } from "@/content/site";
import { cn, ease } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";

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
      CHD <span className="text-bone">{time ?? "--:--"}</span> IST
    </span>
  );
}

export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 300 && !open);
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
  }, [open, lenis]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.7, ease: ease.expo }}
      >
        <div
          className={cn(
            "container-x flex items-center justify-between gap-6 py-5 transition-[background-color,backdrop-filter,padding] duration-700",
            scrolled && !open && "bg-ink/70 py-4 backdrop-blur-md",
          )}
        >
          <Link href="/" className="group flex items-baseline gap-2" aria-label="Eden Tattoos — home">
            <span className="font-display text-3xl leading-none tracking-tight">Eden</span>
            <span className="eyebrow hidden text-ash transition-colors group-hover:text-copper sm:inline">Tattoos — Chd</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((item, i) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link href={item.href} className="group eyebrow relative flex items-center gap-1.5 py-2">
                      <span className="text-[9px] text-ash">0{i + 1}</span>
                      <span className={cn("transition-colors", active ? "text-copper" : "text-bone group-hover:text-copper")}>
                        {item.label}
                      </span>
                      {active && <motion.span layoutId="nav-dot" className="absolute -bottom-1 left-1/2 h-1 w-1 rounded-full bg-copper" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden xl:block">
              <LocalTime />
            </div>
            <ButtonLink href="/book" className="hidden px-5 py-3 sm:inline-flex">
              Book a session
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-2.5 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-bone transition-transform duration-500",
                    open && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-bone transition-transform duration-500",
                    open && "-translate-y-[4px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-coal lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.9, ease: ease.inout }}
          >
            <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center gap-1 pt-24">
              {[{ href: "/", label: "Home" }, ...nav, { href: "/book", label: "Book" }].map((item, i) => (
                <div key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.9, ease: ease.expo, delay: 0.25 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-baseline gap-4 py-1 font-display text-[13vw] leading-[1] sm:text-7xl",
                        pathname === item.href ? "text-copper italic" : "text-bone",
                      )}
                    >
                      <span className="eyebrow text-ash">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              className="container-x flex flex-wrap items-end justify-between gap-4 border-t hairline py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
            >
              <div className="eyebrow space-y-1 text-ash">
                <a href={site.phoneHref} className="block text-bone">{site.phone}</a>
                <a href={whatsappLink()} className="block">WhatsApp</a>
                <a href={site.instagram.url} className="block">Instagram</a>
              </div>
              <LocalTime />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
