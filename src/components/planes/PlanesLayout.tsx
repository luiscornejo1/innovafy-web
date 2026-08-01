"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import PlanesHeader from "./PlanesHeader";
import PlanesHeros from "./PlanesHeros";
import PlanesCard from "./PlanesCard";
import PlanesCTA from "./PlanesCTA";
import Footer from "../../components/shared/Footer";

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const tagVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const maskRevealVariants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 0.85, ease: EASE } },
};

const titleSectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export type PlanesConfig = {
  segment: string;
  tag: string;
  titulo: [string, string];
  descripcion: string;
  precio: string;
  /** Dos líneas del bloque negro (ej. CRECE SIN / LÍMITES) */
  heroTitulo: [string, string];
  heroDescripcion: string;
  /** Precio mostrado en el bloque negro (ej. S/ 2,499 - S/ 4,999/mes) */
  precioRango: string;
  pilloraFila1: string;
  pilloraFila3: string;
  videoSrc: string;
};

export default function PlanesLayout({
  config,
  planes,
}: {
  config: PlanesConfig;
  planes: any[];
}) {
  const [openPlanIndex, setOpenPlanIndex] = useState<number | null>(0);
  const [openBlockIndex, setOpenBlockIndex] = useState<{
    plan: number;
    block: number | null;
  }>({ plan: 0, block: null });

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".liderazgo-line",
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.15,
        }
      );
      gsap.fromTo(
        ".liderazgo-meta",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(
        ".pillora-row",
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          delay: 0.6,
        }
      );
      gsap.fromTo(
        ".hero-video",
        { opacity: 0, y: 80, scale: 1.05 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          delay: 0.9,
          ease: "power4.out",
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-transparent pb-0 pt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        <div ref={headerRef} className="mb-12 md:mb-16">
          <PlanesHeader config={config} />
        </div>
      </div>

      <PlanesHeros config={config} />

      <div className="mx-auto mb-10 max-w-[1400px] px-6 md:mb-12 md:px-12 lg:px-24">
        <div className="mt-12 md:mt-16">
          {/* Título de sección — mask reveal idéntico a PlanesHeader */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={titleSectionVariants}
            className="mb-10 md:mb-14"
          >
            <div className="mb-3 overflow-hidden">
              <motion.p
                variants={tagVariants}
                className="text-[11px] font-medium uppercase tracking-[0.28em] text-neutral-400"
              >
                Nuestros planes
              </motion.p>
            </div>

            <h2 className="font-inter text-[clamp(2.4rem,4.5vw,3.4rem)] font-light leading-[1.1] tracking-[-0.03em] text-neutral-900">
              <div className="overflow-hidden pb-1">
                <motion.span className="block" variants={maskRevealVariants}>
                  Planes de{" "}
                  <span className="capitalize">{config.segment}</span>
                </motion.span>
              </div>
            </h2>
          </motion.div>

          {/* Cards — stagger en viewport, re-anima al volver */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.08 }}
            variants={gridVariants}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {planes.map((plan, planIndex) => {
              const isPlanOpen = openPlanIndex === planIndex;
              return (
                <PlanesCard
                  key={plan.id}
                  plan={plan}
                  planIndex={planIndex}
                  isPlanOpen={isPlanOpen}
                  openBlockIndex={
                    openBlockIndex.plan === planIndex
                      ? openBlockIndex.block
                      : null
                  }
                  onTogglePlan={() =>
                    setOpenPlanIndex(isPlanOpen ? null : planIndex)
                  }
                  onToggleBlock={(block) =>
                    setOpenBlockIndex({ plan: planIndex, block })
                  }
                />
              );
            })}
          </motion.div>
        </div>
      </div>
      <PlanesCTA description={config.heroDescripcion} />
      <Footer/>
    </main>
  );
}
