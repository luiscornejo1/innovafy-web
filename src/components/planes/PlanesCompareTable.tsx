"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { compareTable } from "../../data/planesContent";

const EASE = [0.22, 1, 0.36, 1] as const;

type PlanHeader = { name: string; price: string };

type PlanMeta = {
  accent: string;
  glow: string;
  segment: "inicio" | "crecimiento" | "liderazgo";
  href: string;
  featured?: boolean;
  popular?: boolean;
};

const PLAN_META: Record<string, PlanMeta> = {
  Esencial: {
    accent: "#8c26d9",
    glow: "rgba(140, 38, 217, 0.4)",
    segment: "inicio",
    href: "/planes/inicio",
  },
  Avanzado: {
    accent: "#e60d99",
    glow: "rgba(230, 13, 153, 0.45)",
    segment: "inicio",
    href: "/planes/inicio",
    popular: true,
  },
  Premium: {
    accent: "#1abff2",
    glow: "rgba(26, 191, 242, 0.4)",
    segment: "inicio",
    href: "/planes/inicio",
    featured: true,
  },
  Optimize: {
    accent: "#059669",
    glow: "rgba(5, 150, 105, 0.4)",
    segment: "crecimiento",
    href: "/planes/crecimiento",
  },
  Scale: {
    accent: "#d97706",
    glow: "rgba(217, 119, 6, 0.4)",
    segment: "crecimiento",
    href: "/planes/crecimiento",
    popular: true,
  },
  Dominate: {
    accent: "#db2777",
    glow: "rgba(219, 39, 119, 0.4)",
    segment: "crecimiento",
    href: "/planes/crecimiento",
  },
  Leader: {
    accent: "#2563eb",
    glow: "rgba(37, 99, 235, 0.4)",
    segment: "liderazgo",
    href: "/planes/liderazgo",
  },
  Authority: {
    accent: "#7c3aed",
    glow: "rgba(124, 58, 237, 0.4)",
    segment: "liderazgo",
    href: "/planes/liderazgo",
    popular: true,
  },
  Legacy: {
    accent: "#0891b2",
    glow: "rgba(8, 145, 178, 0.4)",
    segment: "liderazgo",
    href: "/planes/liderazgo",
    featured: true,
  },
};

const SEGMENT_META = [
  { id: "inicio" as const, label: "Inicio", href: "/planes/inicio" },
  {
    id: "crecimiento" as const,
    label: "Crecimiento",
    href: "/planes/crecimiento",
  },
  { id: "liderazgo" as const, label: "Liderazgo", href: "/planes/liderazgo" },
];

const headerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};

const maskLine = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 0.85, ease: EASE },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

function isPlanHeader(h: string | PlanHeader): h is PlanHeader {
  return typeof h === "object" && h !== null && "name" in h;
}

function CellValue({
  value,
  accent,
  active,
  dark,
}: {
  value: string;
  accent: string;
  active: boolean;
  dark?: boolean;
}) {
  if (value === "✓") {
    return (
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[15px] font-bold transition-all duration-300"
        style={{
          background: active
            ? accent
            : dark
              ? "rgba(255,255,255,0.14)"
              : "rgba(5,150,105,0.18)",
          color: active ? "#fff" : dark ? "#6ee7b7" : "#047857",
          boxShadow: active ? `0 0 14px ${accent}` : "none",
        }}
        aria-label="Incluido"
      >
        ✓
      </span>
    );
  }
  if (value === "✕") {
    return (
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[15px] font-bold transition-all duration-300"
        style={{
          background: dark ? "rgba(255,255,255,0.08)" : "rgba(24,24,27,0.1)",
          color: dark ? "rgba(255,255,255,0.65)" : "#3f3f46",
        }}
        aria-label="No incluido"
      >
        ✕
      </span>
    );
  }
  return (
    <span
      className="font-dmsans text-[13px] font-medium leading-snug md:text-[14px]"
      style={{
        color: dark
          ? active
            ? "#fff"
            : "rgba(255,255,255,0.92)"
          : "#18181b",
      }}
    >
      {value}
    </span>
  );
}

export default function PlanesCompareTable() {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  const planHeaders = compareTable.headers.filter(isPlanHeader);
  const rows = compareTable.rows;

  return (
    <section className="relative w-full bg-transparent py-16 md:py-24">
      <div className="relative mx-auto max-w-[1500px] px-4 md:px-8 lg:px-12">
        {/* Header — mask reveal + stagger */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          variants={headerContainer}
          className="mb-8 max-w-3xl text-left md:mb-10"
        >
          <div className="mb-3 overflow-hidden">
            <motion.p
              variants={maskLine}
              className="font-dmsans text-[11px] font-normal uppercase tracking-[0.28em] text-neutral-700"
            >
              Comparativa completa
            </motion.p>
          </div>

          <h2 className="font-inter text-[clamp(2.4rem,5.5vw,4rem)] font-light leading-[1.08] tracking-[-0.03em] text-black">
            <div className="overflow-hidden pb-1">
              <motion.span className="block" variants={maskLine}>
                Los 9 planes{" "}
                <span className="font-normal">de un vistazo</span>
              </motion.span>
            </div>
          </h2>

          <motion.p
            variants={fadeUp}
            className="font-dmsans mt-4 max-w-xl text-[15px] font-normal leading-relaxed text-neutral-800"
          >
            Compara servicios, alcance y profundidad de cada plan — elige según
            la etapa de tu negocio.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
          className="relative rounded-[1.35rem] border border-black/5 bg-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-[6px] md:rounded-[1.5rem]"
        >
          <div className="overflow-x-auto overscroll-x-contain">
            <table className="w-full min-w-[1100px] border-separate border-spacing-1 p-1.5 text-left md:p-2">
              <thead>
                <tr>
                  <th className="min-w-[132px] px-2 py-1.5 md:min-w-[150px]" />
                  {SEGMENT_META.map((seg, segIdx) => {
                    const count = planHeaders.filter(
                      (h) => PLAN_META[h.name]?.segment === seg.id
                    ).length;
                    return (
                      <th
                        key={seg.id}
                        colSpan={count}
                        className="px-0.5 py-1.5 text-center"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: false, amount: 0.5 }}
                          transition={{
                            duration: 0.55,
                            ease: EASE,
                            delay: 0.15 + segIdx * 0.08,
                          }}
                        >
                          <Link
                            href={seg.href}
                            className="font-dmsans inline-flex rounded-full border border-black/15 bg-black/[0.06] px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-neutral-900 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                          >
                            {seg.label}
                          </Link>
                        </motion.div>
                      </th>
                    );
                  })}
                </tr>

                <tr>
                  <th className="px-2 pb-2 pt-0.5 text-left">
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="font-dmsans text-[12px] font-bold uppercase tracking-[0.16em] text-neutral-800"
                    >
                      Servicio
                    </motion.span>
                  </th>
                  {planHeaders.map((plan, colIdx) => {
                    const meta = PLAN_META[plan.name];
                    const isFeatured = !!meta?.featured;
                    const isPopular = !!meta?.popular;
                    const isColHover = hoveredCol === colIdx;

                    return (
                      <th
                        key={plan.name}
                        className="min-w-[104px] p-0 text-center align-bottom"
                        onMouseEnter={() => setHoveredCol(colIdx)}
                        onMouseLeave={() => setHoveredCol(null)}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.86, y: 16 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: false, amount: 0.4 }}
                          transition={{
                            duration: 0.5,
                            ease: EASE,
                            delay: 0.22 + colIdx * 0.055,
                          }}
                          className="relative overflow-hidden rounded-xl px-1.5 py-3 transition-transform duration-300 ease-out"
                          style={{
                            transform: isColHover
                              ? "translateY(-3px) scale(1.03)"
                              : undefined,
                            background: isFeatured
                              ? "#0a0a0c"
                              : isPopular
                                ? meta.accent
                                : isColHover
                                  ? "rgba(255,255,255,0.95)"
                                  : "#f4f4f5",
                            boxShadow: isColHover
                              ? `0 10px 28px ${meta.glow}`
                              : "none",
                          }}
                        >
                          {isPopular && !isFeatured && (
                            <span className="font-dmsans mb-0.5 block text-[9px] font-bold uppercase tracking-[0.14em] text-white/90">
                              Popular
                            </span>
                          )}
                          <Link href={meta?.href ?? "/planes"} className="block">
                            <span
                              className="font-dmsans block text-[14px] font-bold tracking-tight md:text-[15px]"
                              style={{
                                color:
                                  isFeatured || isPopular
                                    ? "#fff"
                                    : meta.accent,
                              }}
                            >
                              {plan.name}
                            </span>
                            <span
                              className="font-dmsans mt-0.5 block text-[11px] font-bold md:text-[12px]"
                              style={{
                                color:
                                  isFeatured || isPopular
                                    ? "rgba(255,255,255,0.8)"
                                    : "#27272a",
                              }}
                            >
                              {plan.price}
                            </span>
                          </Link>
                        </motion.div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, rowIdx) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className="px-2 py-0.5 text-left"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{
                          duration: 0.45,
                          ease: EASE,
                          delay: 0.35 + rowIdx * 0.04,
                        }}
                        className="rounded-lg px-2 py-2"
                      >
                        <span className="font-dmsans text-[13px] font-bold text-neutral-900 md:text-[14px]">
                          {row.label}
                        </span>
                      </motion.div>
                    </th>
                    {row.values.map((value, colIdx) => {
                      const plan = planHeaders[colIdx];
                      const meta = PLAN_META[plan?.name];
                      const cellId = `${rowIdx}-${colIdx}`;
                      const isCellHover = hoveredCell === cellId;
                      const isColHover = hoveredCol === colIdx;
                      const active = isCellHover || isColHover;
                      const isFeatured = !!meta?.featured;
                      // Onda diagonal: fila + columna
                      const appearDelay =
                        0.38 + rowIdx * 0.045 + colIdx * 0.035;

                      return (
                        <td
                          key={cellId}
                          className="p-0 text-center"
                          onMouseEnter={() => {
                            setHoveredCol(colIdx);
                            setHoveredCell(cellId);
                          }}
                          onMouseLeave={() => {
                            setHoveredCol(null);
                            setHoveredCell(null);
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.72 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{
                              duration: 0.4,
                              ease: EASE,
                              delay: appearDelay,
                            }}
                            className="relative flex min-h-[48px] items-center justify-center rounded-lg px-1.5 py-2.5 transition-transform duration-300 ease-out"
                            style={{
                              transform: isCellHover
                                ? "translateY(-2px) scale(1.06)"
                                : isColHover
                                  ? "scale(1.015)"
                                  : undefined,
                              zIndex: isCellHover ? 10 : 1,
                              background: isFeatured
                                ? isCellHover
                                  ? "#141418"
                                  : "#0a0a0c"
                                : isCellHover
                                  ? "#fff"
                                  : isColHover
                                    ? "rgba(255,255,255,0.85)"
                                    : "rgba(255,255,255,0.4)",
                              border: isCellHover
                                ? `1px solid ${meta.accent}`
                                : "1px solid transparent",
                              boxShadow: isCellHover
                                ? `0 10px 28px ${meta.glow}`
                                : "none",
                            }}
                          >
                            <CellValue
                              value={value}
                              accent={meta.accent}
                              active={active}
                              dark={isFeatured}
                            />
                          </motion.div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
