"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ease } from "@/lib/utils";

let hasNavigated = false;

/**
 * Route transition: on every client-side navigation (not the first load, which has the preloader)
 * a panel covers the new page and lifts away.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  // False on the server and on the first client render (hydration); true when mounted by a client navigation.
  const [curtain, setCurtain] = useState(() => typeof window !== "undefined" && hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {curtain && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[80] flex items-end bg-coal"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.95, ease: ease.inout, delay: 0.15 }}
          onAnimationComplete={() => setCurtain(false)}
        >
          <span className="container-x eyebrow pb-6 text-ash">Eden Tattoos</span>
        </motion.div>
      )}
      {children}
    </>
  );
}
