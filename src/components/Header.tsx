"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

// TODO: Cambia los nombres de los servicios del menú desplegable aquí
const MENU_SERVICES = [
  { label: "Web Design", href: "/services/web-design" },
  { label: "Branding", href: "/services/branding" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
];

// TODO: Cambia los links del menú desplegable aquí
const MENU_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Agency", href: "/agency" },
  { label: "Services", href: "/services/web-design" },
  { label: "Blog", href: "/blog" },
  { label: "Culture", href: "/culture" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Reset services submenu when menu closes
  useEffect(() => {
    if (!menuOpen) setServicesOpen(false);
  }, [menuOpen]);

  return (
    <>
      {/* ── FIXED TOP BAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* LEFT: Logo */}
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight pointer-events-auto hover:opacity-70 transition-opacity"
            >
              {/* TODO: Cambia "INNOVAFY" por el nombre/logo de tu empresa */}
              INNOVAFY
            </Link>

            {/* RIGHT: Hire Us + Hamburger — wrapper is relative so menu anchors here */}
            <div className="relative flex items-center gap-3 pointer-events-auto">
              {/* TODO: Puedes cambiar el nombre de este botón donde dice "Hire us" */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                Hire us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              {/* Hamburger / Close toggle */}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="w-11 h-11 rounded-full border border-neutral-900/20 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-black hover:text-white hover:border-black group transition-colors duration-300"
              >
                {menuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  </svg>
                )}
              </button>

              {/* ── DROPDOWN MENU — positioned relative to this wrapper ── */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.aside
                    initial={{ opacity: 0, y: -10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full right-0 mt-3 w-[280px] sm:w-[320px] bg-white text-neutral-900 rounded-3xl shadow-2xl p-6"
                  >
                    {/* Close button */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => setMenuOpen(false)}
                        className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Navigation links */}
                    <nav className="mt-4 space-y-4 text-lg font-semibold">
                      {MENU_LINKS.map((link) => {
                        // Services gets expandable treatment
                        if (link.label === "Services") {
                          return (
                            <div key={link.label}>
                              <button
                                onClick={() => setServicesOpen((prev) => !prev)}
                                className="w-full flex items-center justify-between hover:text-blue-600 transition-colors"
                              >
                                Services
                                <motion.span
                                  animate={{ rotate: servicesOpen ? 45 : 0 }}
                                  className="text-2xl leading-none"
                                >
                                  +
                                </motion.span>
                              </button>

                              <AnimatePresence>
                                {servicesOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="pl-4 mt-2 text-base font-medium text-neutral-600 space-y-2 overflow-hidden"
                                  >
                                    {MENU_SERVICES.map((service) => (
                                      <Link
                                        key={service.label}
                                        href={service.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="block hover:text-blue-600 transition-colors"
                                      >
                                        {service.label}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        }

                        return (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="block hover:text-blue-600 transition-colors"
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </nav>

                    {/* CTA at bottom of menu */}
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center justify-between w-full px-5 py-3 rounded-full border border-neutral-300 text-sm font-medium hover:bg-neutral-50 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {/* TODO: Cambia "Start your project" por tu CTA */}
                      Start your project
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </motion.aside>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* ── BACKDROP OVERLAY (separate so it covers the whole screen) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.button
            type="button"
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
