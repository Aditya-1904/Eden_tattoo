"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny shared store so page sections can wait for the preloader to finish
 * before playing their entrance animations.
 */
const STORAGE_KEY = "eden-intro";
let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {}
  listeners.forEach((l) => l());
}

export function introAlreadySeen() {
  return typeof document !== "undefined" && document.documentElement.classList.contains("intro-seen");
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useIntroDone() {
  return useSyncExternalStore(
    subscribe,
    () => done || introAlreadySeen(),
    () => false,
  );
}
