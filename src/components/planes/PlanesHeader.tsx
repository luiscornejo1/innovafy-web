"use client";

import { motion } from "motion/react";
import { PlanesConfig } from "./PlanesLayout";

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

/**
 * PATRÓN CORRECTO para cascada con Framer Motion:
 * - El PADRE tiene whileInView + staggerChildren
 * - Los HIJOS solo declaran `variants` y heredan el estado del padre
 * - Así el IntersectionObserver solo observa el contenedor grande (nunca falla)
 */

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Mask reveal idéntico al de PlanesHeros: texto sube desde el slot invisible
const maskRevealVariants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 0.85, ease: EASE },
  },
};

// Para el bloque derecho (descripción + flecha): entra con delay extra
const rightBlockVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay: 0.15 },
  },
};

// Círculo: entra con scale + leve rotación → sensación cinematográfica
const circleVariants = {
  hidden: { opacity: 0, scale: 0.72, rotate: -6 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.1, ease: EASE, delay: 0.2 },
  },
};

function ArrowIcon() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 text-black"
      aria-hidden
    >
      <path
        d="M8 8L64 64M64 64H20M64 64V20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PlanesHeader({ config }: { config: PlanesConfig }) {
  return (
    /* El padre observa el viewport y propaga "visible" a todos los hijos */
    <motion.section
      className="font-inter relative pb-8 md:pb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={sectionVariants}
    >
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12 pt-5 md:pt-5 lg:pt-10">
        {/* ── Tag + Título — izquierda ── */}
        <div className="lg:col-span-8">
          {/* Tag — mask reveal */}
          <div className="overflow-hidden pb-1 mb-8">
            <motion.p
              className="max-w-none text-[11px] font-normal uppercase leading-relaxed tracking-[0.22em] text-black"
              variants={maskRevealVariants}
            >
              {config.tag}
            </motion.p>
          </div>

          {/* Título — mask reveal línea por línea */}
          <h1 className="text-[clamp(5.5rem,14vw,10rem)] font-bold leading-[1.15] tracking-[-0.03em] text-black">
            <div className="overflow-hidden pb-2">
              <motion.span className="block" variants={maskRevealVariants}>
                {config.titulo[0]}
              </motion.span>
            </div>

            {config.titulo[1] && (
              <div className="overflow-hidden pb-2">
                <motion.span
                  className="block font-light pl-0 md:pl-16 lg:pl-24"
                  variants={maskRevealVariants}
                >
                  {config.titulo[1]}
                </motion.span>
              </div>
            )}
          </h1>
        </div>

        {/* ── Círculo con video — derecha ── */}
        <div className="lg:col-span-4 lg:justify-self-end flex items-center justify-center lg:justify-end w-full">
          {/* Wrapper con anillo decorativo giratorio */}
          <motion.div
            className="relative lg:ml-auto lg:-mt-8 xl:-mt-12"
            variants={circleVariants}
          >
            {/* Anillo exterior punteado — gira lentamente */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-[-14px] rounded-full border border-dashed border-[#7c3aed]"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            />
            {/* Punto marcador en el anillo */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute top-[-14px] left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-black/25"
              animate={{ rotate: 360 }}
              style={{ originX: "50%", originY: "calc(100% + 14px + 50%)" }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            />

            {/* Círculo principal — tamaño aumentado */}
            <motion.div
              className="aspect-square h-[240px] w-[240px] md:h-[310px] md:w-[310px] lg:h-[400px] lg:w-[400px] overflow-hidden rounded-full bg-black shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 5.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <video
                key={config.videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={config.pilloraFila1}
                className="h-full w-full object-cover scale-110"
              >
                <source src={config.videoSrc} type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Descripción + flecha — abajo derecha ── */}
        <motion.div
          className="lg:col-span-7 lg:col-start-6"
          variants={rightBlockVariants}
        >
          <div className="flex items-start justify-between gap-6 lg:max-w-[520px] lg:ml-auto lg:mt-25">
            <p className="text-[15px] leading-[1.65] text-black md:text-base">
              {config.descripcion}
            </p>
            <div className="rotate-90 transform flex-shrink-0 mt-1">
              <ArrowIcon />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
