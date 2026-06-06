"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "About",      href: "#about",       num: "01" },
  { label: "Work",       href: "#projects",   num: "02" },
  { label: "Skills",     href: "#skills",      num: "03" },
  { label: "Experience", href: "#experience",  num: "04" },
  { label: "Contact",    href: "#contact",     num: "05" },
];

export function Navigation() {
  const [scrolled, setScrolled]    = useState(false);
  const [menuOpen, setMenuOpen]    = useState(false);
  const [activeSection, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    NAV_ITEMS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2.0 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          borderBottom: scrolled ? "1px solid #1F1F1F" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          background: scrolled ? "rgba(3,3,3,0.85)" : "transparent",
          transition: "border-bottom 0.4s ease, backdrop-filter 0.4s ease, background 0.4s ease",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => scrollTo("#home")}
              className="font-display text-2xl text-ink tracking-wider hover:text-fire transition-colors duration-200"
              style={{ cursor: "none" }}
            >
              H·M
            </button>

            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map(({ label, href, num }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="nav-link group flex items-baseline gap-1.5"
                  style={{ cursor: "none" }}
                >
                  <span
                    className="text-ink-3 transition-colors duration-200 group-hover:text-fire"
                    style={{ fontSize: "9px", fontFamily: "var(--font-mono)" }}
                  >
                    {num}
                  </span>
                  <span
                    className={
                      activeSection === href.replace("#", "")
                        ? "text-ink"
                        : ""
                    }
                  >
                    {label}
                  </span>
                </button>
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
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  className="block w-5 h-px bg-ink"
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                  className="block w-5 h-px bg-ink origin-center"
                  transition={{ duration: 0.3 }}
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
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center px-8"
            style={{ background: "var(--bg)" }}
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map(({ label, href, num }, i) => (
                <motion.button
                  key={href}
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 + 0.15, ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
                  onClick={() => scrollTo(href)}
                  className="flex items-baseline gap-4 text-left group"
                  style={{ cursor: "none" }}
                >
                  <span className="text-label" style={{ color: "var(--text-3)" }}>{num}</span>
                  <span
                    className="font-display text-7xl group-hover:text-fire transition-colors duration-200"
                    style={{ color: "var(--text)" }}
                  >
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>
            <div className="mt-12 flex items-center gap-2">
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
