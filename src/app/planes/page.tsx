"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  segments,
  heroContent,
  personalizadoContent,
  differentials,
  compareTable,
  footerCta,
} from "../../data/planesContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Imágenes para las tarjetas de estadísticas
const statImages = {
  experience:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format",
  planes:
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format",
  servicios:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format",
};

export default function PlanesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const personalizadoRef = useRef<HTMLDivElement>(null);
  const differentialsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const chipsContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Scroll automático para los chips
  useEffect(() => {
    const chipsContainer = chipsContainerRef.current;
    if (!chipsContainer) return;

    const totalWidth = chipsContainer.scrollWidth;
    const containerWidth = chipsContainer.clientWidth;

    // Duplicar contenido para efecto infinito
    const createInfiniteScroll = () => {
      const chips = Array.from(chipsContainer.children);
      chips.forEach((chip) => {
        const clone = chip.cloneNode(true);
        chipsContainer.appendChild(clone);
      });
    };

    createInfiniteScroll();

    const animateScroll = () => {
      if (!chipsContainer) return;

      animationRef.current = gsap.to(chipsContainer, {
        x: -totalWidth,
        duration: 80,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const normalized = parseFloat(x) % totalWidth;
            return normalized + "px";
          },
        },
      });
    };

    animateScroll();

    return () => {
      if (animationRef.current) animationRef.current.kill();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        ".hero-title-line",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        ".hero-stats",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.7 }
      );

      // Cards animation
      gsap.fromTo(
        ".segment-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
        }
      );

      // Personalizado section animation
      gsap.fromTo(
        ".personalizado-left",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          scrollTrigger: {
            trigger: personalizadoRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".personalizado-steps",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: personalizadoRef.current,
            start: "top 80%",
          },
        }
      );

      // Differentials animation
      gsap.fromTo(
        ".differential-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          scrollTrigger: {
            trigger: differentialsRef.current,
            start: "top 85%",
          },
        }
      );

      // Table animation
      gsap.fromTo(
        ".compare-table",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: tableRef.current,
            start: "top 85%",
          },
        }
      );

      // Footer animation
      gsap.fromTo(
        ".footer-cta",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#f0ece5] min-h-screen overflow-hidden">
      {/* ========== HERO - Estilo Culture ========== */}
      <div
        ref={heroRef}
        className="relative w-full overflow-hidden bg-white pt-16 pb-12 md:pt-20 md:pb-16"
      >
        <div className="relative z-10 flex flex-col px-[7vw]">
          <div className="max-w-[1400px]">
            <div className="inline-flex items-center gap-1 bg-[#4400FF]/10 border border-[#4400FF]/20 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-[#4400FF] uppercase mb-5">
              {heroContent.eyebrow}
            </div>

            <h1 className="text-[clamp(2rem,7vw,6rem)] font-normal leading-[1.1] tracking-[-0.02em] text-[#1a1520] max-w-4xl">
              <span className="hero-title-line block overflow-hidden">
                Un plan para cada
              </span>
              <span className="hero-title-line block overflow-hidden">
                <em className="text-[#4400FF] not-italic">etapa</em> de tu marca
              </span>
              <span className="hero-title-line block overflow-hidden">
                y presupuesto.
              </span>
            </h1>

            <p className="text-[#000] text-base font-light leading-relaxed max-w-2xl mt-5">
              {heroContent.description}
            </p>
          </div>
        </div>
      </div>

      {/* Chips de servicios - SCROLL AUTOMÁTICO ESTILO REFERENCIA */}
      <div className="bg-[#f0ece5] py-8 overflow-hidden border-y border-[#ddd8f0] mx-[4rem]">
        <div
          ref={chipsContainerRef}
          className="flex gap-8 whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {[
            ...heroContent.chips,
            ...heroContent.chips,
            ...heroContent.chips,
          ].map((chip, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-8 text-[15px] md:text-[17px] font-medium tracking-wide text-[#1a1520]/70 transition-all duration-300 cursor-default bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text hover:text-transparent"
            >
              {chip}
              <span className="text-[#4400FF]/30 text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Tarjetas de estadísticas - Estilo referencia con fondo negro */}
      <div className="bg-black py-24 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-20">
            <p className="text-white text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.2]">
              Tenemos la experiencia.
              <br />
              Somos Inovafy.
              <br />
              <span className="text-[#4400FF]">Crecemos contigo.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            {/* Tarjeta 2: 9 planes */}
            <div className="text-center group cursor-default">
              <div className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 group-hover:text-[#4400FF] transition-colors duration-300">
                9
              </div>
              <p className="text-white/40 text-xs font-light uppercase tracking-[0.15em]">
                planes diseñados
              </p>
              <p className="text-white/40 text-xs font-light uppercase tracking-[0.15em]">
                para tu negocio
              </p>
            </div>
            {/* Tarjeta 1: Experiencia */}
            <div className="text-center group cursor-default">
              <div className="font-normal text-4xl md:text-5xl lg:text-6xl text-white mb-3 group-hover:text-[#4400FF] transition-colors duration-300">
                +2 años
              </div>
              <p className="text-white/40 text-xs font-light uppercase tracking-[0.15em]">
                de experiencia
              </p>
              <p className="text-white/40 text-xs font-light uppercase tracking-[0.15em]">
                en el mercado peruano
              </p>
            </div>

            {/* Tarjeta 3: 6 servicios */}
            <div className="text-center group cursor-default">
              <div className="font-serif text-4xl md:text-5xl lg:text-6xl  font-black text-white mb-3 group-hover:text-[#4400FF] transition-colors duration-300">
                6
              </div>
              <p className="text-white/40 text-xs font-light uppercase tracking-[0.15em]">
                servicios integrados
              </p>
              <p className="text-white/40 text-xs font-light uppercase tracking-[0.15em]">
                en un solo equipo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== CARDS DE SEGMENTOS ========== */}
      <div
        ref={cardsRef}
        className="max-w-[1400px] mx-auto px-6 md:px-12 py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {segments.map((seg) => (
            <Link key={seg.id} href={`/planes/${seg.id}`}>
              <div className="segment-card group bg-white rounded-3xl p-8 border border-[#ddd8f0] transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-[#4400FF]/30 cursor-pointer min-h-[380px] flex flex-col">
                {/* Número decorativo en lugar de icono */}
                <div className="text-[#4400FF]/10 text-7xl font-serif font-black mb-4 group-hover:text-[#4400FF]/20 transition-colors duration-300">
                  {String(
                    segments.findIndex((s) => s.id === seg.id) + 1
                  ).padStart(2, "0")}
                </div>

                {/* Título */}
                <h3 className="font-serif text-2xl font-bold text-[#1a1520] mb-3 group-hover:text-[#4400FF] transition-colors duration-300">
                  {seg.label}
                </h3>

                {/* Descripción */}
                <p className="text-[#8880a0] text-sm leading-relaxed mb-6 group-hover:text-[#555] transition-colors duration-300 flex-1">
                  {seg.description}
                </p>

                {/* Precio */}
                <p className="text-[#4400FF] text-sm font-semibold mb-4">
                  {seg.priceRange}
                </p>

                {/* Línea decorativa con animación */}
                <div className="w-12 h-0.5 bg-[#4400FF]/30 group-hover:w-full transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ========== TABLA COMPARATIVA ========== */}
      <div ref={tableRef} className="bg-white py-16 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#4400FF]">
              Tabla comparativa
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-[#1a1520] mt-2">
              Los 9 planes
              <br />
              <em className="text-[#4400FF] not-italic">de un vistazo</em>
            </h2>
          </div>

          <div className="compare-table overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#f0ede6]">
                  {compareTable.headers.map((header, idx) => (
                    <th
                      key={idx}
                      className={`p-3 ${
                        idx === 0
                          ? "text-left font-semibold text-[#8880a0] text-xs uppercase"
                          : "text-center font-serif font-bold"
                      } ${
                        idx === 1 || idx === 4 || idx === 7
                          ? "text-[#4400FF]"
                          : idx === 2 || idx === 5 || idx === 8
                          ? "text-[#4400FF] bg-[#4400FF]/5"
                          : idx === 3 || idx === 6 || idx === 9
                          ? "text-white bg-[#1a1520]"
                          : ""
                      } transition-colors duration-300`}
                    >
                      {typeof header === "string" ? (
                        header
                      ) : (
                        <>
                          {header.name}
                          <br />
                          <span className="text-[10px] font-normal">
                            {header.price}
                          </span>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareTable.rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#f0ede6] hover:bg-[#fafaf8] transition-colors duration-300"
                  >
                    <td className="p-3 font-semibold text-[#1a1520] bg-[#fafaf8]">
                      {row.label}
                    </td>
                    {row.values.map((val, i) => (
                      <td
                        key={i}
                        className={`p-3 text-center transition-all duration-300 ${
                          val === "✓"
                            ? "text-green-600 font-bold"
                            : val === "✕"
                            ? "text-[#ccc]"
                            : "text-[#555]"
                        } ${
                          i === 2 || i === 5 || i === 8 ? "bg-[#1a1520]/5" : ""
                        }`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========== FOOTER CTA ========== */}
      <div
        ref={footerRef}
        className="footer-cta bg-[#4400FF] py-20 px-6 md:px-12 text-center relative overflow-hidden"
      >
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-white">
            {footerCta.title}
            <br />
            <em className="text-white/60 not-italic">
              {footerCta.titleEmphasis}
            </em>
          </h2>
          <p className="text-white/65 mt-4 mb-8">{footerCta.description}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/planes/personalizado"
              className="bg-white text-[#4400FF] px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-[#f0ede6] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              {footerCta.ctaText}
            </Link>
            <button className="border border-white/30 text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              {footerCta.ctaSecondary}
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      </div>
    </main>
  );
}
