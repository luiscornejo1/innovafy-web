"use client";

import { motion } from "motion/react";
import { PlanesConfig } from "./PlanesLayout";

const EASE_OUT_EXPO: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const SECTION_VARIANTS = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE_OUT_EXPO,
      when: "beforeChildren",
      staggerChildren: 0.13,
    },
  },
};

const MASK_LINE_VARIANTS = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_OUT_EXPO, delay },
  }),
};

export default function PlanesHeros({ config }: { config: PlanesConfig }) {
  const [line1, line2] = config.heroTitulo;

  return (
    <motion.div
      className="hero-video w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={SECTION_VARIANTS}
    >
      <section className="relative bg-black text-[#F5F5F5]">
        <div className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-20 lg:px-20 lg:py-40">
          {/* Descripción + precio — flotante arriba a la derecha en desktop */}
          <motion.div
            className="mb-10 flex w-full flex-col items-start text-left md:mb-0 lg:absolute lg:right-20 lg:top-40 lg:z-10 lg:w-[min(340px,28%)] lg:items-end lg:text-right xl:right-20"
            custom={0.2}
            variants={FADE_UP_VARIANTS}
          >
            <div className="overflow-y-hidden py-1">
              <motion.p
                className="w-full text-[15px] font-normal leading-[1.65] text-[#F5F5F5]/95 md:text-base"
                variants={MASK_LINE_VARIANTS}
              >
                {config.heroDescripcion}
              </motion.p>
            </div>

            <div className="overflow-y-hidden py-1">
              <motion.p
                className="mt-5 w-full text-xl font-bold tracking-[-0.02em] text-[#F5F5F5] md:mt-8 md:text-2xl lg:text-[1.65rem]"
                variants={MASK_LINE_VARIANTS}
              >
                {config.precioRango}
              </motion.p>
            </div>
          </motion.div>

          {/* Título — ancho completo; tipografía acotada para palabras largas */}
          <div className="pt-2 md:pt-10 lg:pt-24 lg:pr-[min(360px,30%)]">
            <h2 className="w-full text-[clamp(3rem,9vw,7.75rem)] font-normal uppercase leading-[0.9] tracking-[-0.02em] text-[#F5F5F5]">
              <div className="overflow-y-hidden py-1">
                <motion.span className="block" variants={MASK_LINE_VARIANTS}>
                  {line1}
                </motion.span>
              </div>

              <div className="overflow-y-hidden py-1">
                <motion.span
                  className="mt-5 block pl-0 md:mt-12 md:pl-14 lg:mt-14 lg:pl-24"
                  variants={MASK_LINE_VARIANTS}
                >
                  {line2}
                </motion.span>
              </div>
            </h2>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
