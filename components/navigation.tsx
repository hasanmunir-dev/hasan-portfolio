"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  num: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "About",      href: "/about",      num: "01" },
  { label: "Work",       href: "/projects",   num: "02" },
  { label: "Skills",     href: "/skills",     num: "03" },
  { label: "Experience", href: "/experience", num: "04" },
  { label: "Contact",    href: "/#contact",   num: "05" },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href.startsWith("/") && !href.includes("#") && pathname.startsWith(href);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          borderBottom: scrolled ? "1px solid #1F1F1F" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          background: scrolled ? "rgba(3,3,3,0.85)" : "transparent",
          transition: "border-bottom 0.3s ease, backdrop-filter 0.3s ease, background 0.3s ease",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="font-display text-2xl text-ink tracking-wider hover:text-fire transition-colors duration-200"
              style={{ cursor: "none" }}
            >
              H·M
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link group flex items-baseline gap-1.5"
                  style={{ cursor: "none" }}
                >
                  <span
                    className={`transition-colors duration-200 ${
                      isActive(item.href) ? "text-fire" : "text-ink-3 group-hover:text-fire"
                    }`}
                    style={{ fontSize: "9px", fontFamily: "var(--font-mono)" }}
                  >
                    {item.num}
                  </span>
                  <span
                    className={
                      isActive(item.href)
                        ? "text-fire"
                        : "group-hover:text-fire transition-colors duration-200"
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }}
                />
                <span className="text-label" style={{ color: "var(--text-2)" }}>Available</span>
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col gap-1.5 p-1"
                style={{ cursor: "none" }}
                aria-label="Menu"
              >
                <motion.span
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                  className="block w-5 h-px bg-ink origin-center"
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  className="block w-5 h-px bg-ink"
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                  className="block w-5 h-px bg-ink origin-center"
                  transition={{ duration: 0.2 }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto px-6 py-24"
            style={{ background: "var(--bg)" }}
          >
            <div className="flex flex-col border-y border-stroke divide-y">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 + 0.08, ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-3 py-4 text-left w-full group"
                    style={{ cursor: "none" }}
                  >
                    <span
                      style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)", fontSize: "10px" }}
                    >
                      {item.num}
                    </span>
                    <span
                      className={`font-display text-4xl sm:text-5xl transition-colors duration-200 ${
                        isActive(item.href) ? "text-fire" : "text-ink group-hover:text-fire"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-label" style={{ color: "var(--text-2)" }}>
                Available for opportunities
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
