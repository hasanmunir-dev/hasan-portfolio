"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Top-of-page progress bar for App Router client navigations (Next 13 has no
 * router events). A capture-phase click listener on internal <a> elements starts
 * a trickling bar; it completes when `usePathname()` changes.
 */
export function NavProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(0);
  const trickle = useRef<number | null>(null);

  const stopTrickle = useCallback(() => {
    if (trickle.current !== null) {
      window.clearInterval(trickle.current);
      trickle.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stopTrickle();
    setActive(true);
    setValue(8);
    let v = 8;
    trickle.current = window.setInterval(() => {
      v = Math.min(v + Math.random() * 12, 90);
      setValue(v);
    }, 220);
  }, [stopTrickle]);

  // Route settled → finish and fade out.
  useEffect(() => {
    stopTrickle();
    setValue(100);
    const hide = window.setTimeout(() => setActive(false), 200);
    const reset = window.setTimeout(() => setValue(0), 500);
    return () => {
      window.clearTimeout(hide);
      window.clearTimeout(reset);
    };
  }, [pathname, stopTrickle]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // Same path (hash-only or no-op) — no navigation to show.
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }
      start();
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      stopTrickle();
    };
  }, [start, stopTrickle]);

  return (
    <div
      className="nav-progress"
      data-active={active ? "true" : "false"}
      style={{ transform: `scaleX(${value / 100})` }}
      aria-hidden
    />
  );
}
