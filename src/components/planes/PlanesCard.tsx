"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { type Plan } from "../../data/planesContent";

const EASE_EXP = [0.22, 1, 0.36, 1] as const;

const AURORA_THEMES = [
  {
    from: "#e60d99",
    via: "#8c26d9",
    to: "#1abff2",
    glow: "rgba(230, 13, 153, 0.22)",
  },
  {
    from: "#1abff2",
    via: "#8c26d9",
    to: "#e60d99",
    glow: "rgba(26, 191, 242, 0.22)",
  },
  {
    from: "#8c26d9",
    via: "#e60d99",
    to: "#1abff2",
    glow: "rgba(140, 38, 217, 0.22)",
  },
] as const;

const cardItemVariants = {
  hidden: { opacity: 0, y: 56, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_EXP },
  },
};

interface PlanCardProps {
  plan: Plan;
  planIndex?: number;
  isPlanOpen?: boolean;
  openBlockIndex?: number | null;
  onTogglePlan?: () => void;
  onToggleBlock?: (blockIndex: number | null) => void;
}

export default function PlanCard({
  plan,
  planIndex = 0,
  isPlanOpen = false,
  openBlockIndex = null,
  onTogglePlan,
  onToggleBlock,
}: PlanCardProps) {
  const [hovered, setHovered] = useState(false);
  const accent = AURORA_THEMES[planIndex % AURORA_THEMES.length];
  const isActive = hovered || isPlanOpen;

  const titleGradient = `linear-gradient(125deg, ${accent.from} 0%, ${accent.via} 48%, ${accent.to} 100%)`;
  const titleGradientLight =
    "linear-gradient(125deg, #ffffff 0%, #f0e8ff 42%, #b8f0ff 100%)";

  const ctaLabel = plan.ctaText.replace(/\s*→\s*$/, "");

  return (
    <motion.div
      variants={cardItemVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onTogglePlan?.()}
      whileHover={{
        y: -10,
        scale: 1.012,
        transition: { type: "spring", stiffness: 280, damping: 26 },
      }}
      className="group relative cursor-pointer rounded-[1.35rem] p-[1px]"
      style={{
        background: isActive
          ? `linear-gradient(145deg, ${accent.from}ee, ${accent.via}cc, ${accent.to}dd)`
          : `linear-gradient(145deg, ${accent.from}55, ${accent.via}35, ${accent.to}40)`,
        boxShadow: isActive
          ? `0 32px 80px ${accent.glow}, 0 12px 32px rgba(0,0,0,0.45)`
          : `0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04)`,
        transition: "background 0.55s ease, box-shadow 0.55s ease",
      }}
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[1.3rem] p-8 md:p-9"
        style={{
          background: isActive
            ? "linear-gradient(165deg, #08080a 0%, #0f0d14 48%, #050507 100%)"
            : "linear-gradient(165deg, #0a0a0c 0%, #121018 52%, #070708 100%)",
          transition: "background 0.55s ease",
        }}
      >
        {/* Orbes aurora */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full blur-3xl"
          animate={{
            opacity: isActive ? 0.95 : 0.55,
            scale: isActive ? 1.15 : 1,
          }}
          transition={{ duration: 0.6, ease: EASE_EXP }}
          style={{
            background: `radial-gradient(circle, ${accent.from}66 0%, ${accent.to}28 45%, transparent 72%)`,
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-12 h-44 w-44 rounded-full blur-3xl"
          animate={{ opacity: isActive ? 0.65 : 0.35, scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.65, ease: EASE_EXP }}
          style={{
            background: `radial-gradient(circle, ${accent.to}50 0%, transparent 70%)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-4 top-2 select-none font-serif text-7xl font-bold italic opacity-[0.04]"
          style={{ color: accent.to }}
        >
          {plan.name.charAt(0)}
        </div>

        {plan.popular && (
          <div
            className="absolute right-5 top-5 z-[2] rounded-full px-3 py-1 text-[10px] font-normal uppercase tracking-wide text-white"
            style={{
              background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
              boxShadow: `0 4px 20px ${accent.glow}`,
            }}
          >
            Más popular
          </div>
        )}

        {/* Badge */}
        <span
          className="font-dmsans relative z-[1] mb-3 block text-[10px] font-normal uppercase tracking-[0.22em]"
          style={{ color: isActive ? accent.to : "rgba(255,255,255,0.42)" }}
        >
          {plan.tag}
        </span>

        {/* Nombre */}
        <motion.h3
          className="font-dmsans relative z-[1] mb-3 font-normal leading-[1.08] tracking-[-0.03em]"
          animate={{ fontSize: isActive ? "2.25rem" : "2rem" }}
          transition={{ duration: 0.45, ease: EASE_EXP }}
        >
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage: isActive ? titleGradientLight : titleGradient,
              WebkitBackgroundClip: "text",
            }}
          >
            {plan.name}
          </span>
          <motion.span
            aria-hidden
            className="mt-2.5 block h-[3px] rounded-full"
            initial={false}
            animate={{ width: isActive ? "55%" : "38%", opacity: isActive ? 1 : 0.7 }}
            transition={{ duration: 0.5, ease: EASE_EXP }}
            style={{ background: titleGradient }}
          />
        </motion.h3>

        {/* Descripción */}
        <p
          className="font-dmsans relative z-[1] mb-5 text-sm font-normal leading-relaxed"
          style={{
            color: isActive ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.68)",
          }}
        >
          {plan.description}
        </p>

        {/* Precio */}
        <div className="relative z-[1] mb-1 flex items-baseline gap-1">
          <span
            className="font-dmsans text-[11px] font-normal"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Inversión desde
          </span>
          <span
            className="font-dmsans text-sm font-normal"
            style={{ color: accent.to }}
          >
            S/
          </span>
          <span
            className="font-dmsans text-5xl font-normal leading-none tracking-tight"
            style={{
              backgroundImage: titleGradient,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {Math.floor(plan.price)}
          </span>
          {plan.priceDecimal !== undefined && (
            <span
              className="font-dmsans mt-1 text-xl font-normal"
              style={{ color: accent.from }}
            >
              .{plan.priceDecimal}
            </span>
          )}
        </div>
        <p
          className="font-dmsans relative z-[1] mb-5 text-xs font-normal"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          / mes ·{" "}
          {plan.color === "blue"
            ? "Incluye todo del Plan Esencial"
            : "Sin contrato anual"}
        </p>

        <hr
          className="relative z-[1] my-4 border-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        />

        {/* Focus pill */}
        <div
          className="font-dmsans relative z-[1] mb-8 inline-flex w-fit max-w-full items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-normal"
          style={{
            border: isActive
              ? `1px solid ${accent.to}55`
              : "1px solid rgba(255,255,255,0.12)",
            background: isActive
              ? "rgba(255,255,255,0.08)"
              : "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.88)",
          }}
        >
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
            }}
          />
          {plan.focusPill}
        </div>

        {/* CTA — pill → círculo; despliega detalles */}
        <div className="relative z-[1] mt-auto w-full">
          <div className="group/btn relative w-full cursor-pointer border-none bg-transparent p-0 text-white">
            <button
              type="button"
              className="relative flex h-[52px] w-full items-center justify-start px-5 font-dmsans text-[0.875rem] font-normal leading-snug text-white no-underline md:px-6 md:text-[0.9375rem]"
              onClick={(e) => {
                e.stopPropagation();
                onTogglePlan?.();
              }}
            >
              <span
                className="pointer-events-none absolute right-0 top-1/2 h-[44px] w-full -translate-y-1/2 rounded-full border-[2px] transition-all duration-300 ease-out group-hover/btn:w-[44px] group-hover/btn:-translate-x-[10px]"
                style={{
                  borderColor: isActive
                    ? "rgba(255,255,255,0.55)"
                    : "rgba(255,255,255,0.28)",
                }}
              />
              <span className="relative flex w-full min-w-0 items-center">
                <span className="min-w-0 flex-1 line-clamp-2 pr-2 text-left transition-transform duration-300 ease-out group-hover/btn:-translate-x-[10px]">
                  {isPlanOpen ? "Cerrar detalles" : ctaLabel}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 17.1 15.17"
                  className="ml-[1rem] w-[14px] shrink-0 translate-x-[-3px] md:w-[18px] md:translate-x-[2px]"
                  aria-hidden
                >
                  <path
                    d="m17.1,7.58s-.01-.04-.01-.06c.01-.22-.06-.45-.24-.61L9.23.19c-.31-.27-.78-.24-1.06.07-.27.31-.24.78.07,1.06l6.26,5.52H.75c-.41,0-.75.34-.75.75s.34.75.75.75h13.74l-6.26,5.52c-.31.27-.34.75-.07,1.06.15.17.35.25.56.25.18,0,.35-.06.5-.19l7.62-6.72c.18-.16.25-.39.24-.61,0-.02.01-.04.01-.06Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Accordion — categorías colapsables */}
        <div
          className={`relative z-[1] overflow-hidden transition-all duration-700 ease-out ${
            isPlanOpen ? "mt-6 max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className="flex flex-col gap-3 border-t pt-6"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            {plan.features.map((block, blockIndex) => {
              const isOpen = openBlockIndex === blockIndex;

              return (
                <div
                  key={blockIndex}
                  className="overflow-hidden rounded-xl transition-all duration-300"
                  style={{
                    border: isOpen
                      ? `1px solid ${accent.to}66`
                      : "1px solid rgba(255,255,255,0.1)",
                    background: isOpen
                      ? "rgba(255,255,255,0.07)"
                      : "rgba(255,255,255,0.03)",
                    boxShadow: isOpen ? `0 8px 28px ${accent.glow}` : "none",
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBlock?.(isOpen ? null : blockIndex);
                    }}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                    <h3
                      className="font-dmsans text-[15px] font-normal tracking-tight"
                      style={{ color: "rgba(255,255,255,0.92)" }}
                    >
                      {block.category}
                    </h3>
                    <motion.span
                      aria-hidden
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="ml-4 shrink-0 text-xl font-light leading-none"
                      style={{
                        color: isOpen ? accent.to : "rgba(255,255,255,0.42)",
                      }}
                    >
                      +
                    </motion.span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul
                      className="space-y-3.5 px-5 pb-5 pt-2"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {block.items.map((item, idx) => (
                        <li key={idx}>
                          <p
                            className="font-dmsans text-[14px] font-normal leading-[1.55]"
                            style={{ color: "rgba(255,255,255,0.78)" }}
                          >
                            <span
                              className="mr-2 inline-block font-normal"
                              style={{ color: accent.to }}
                            >
                              ✓
                            </span>
                            {item.text}
                          </p>
                          {item.subtext && (
                            <p
                              className="font-dmsans ml-5 mt-1.5 text-[13px] font-normal leading-relaxed"
                              style={{ color: "rgba(255,255,255,0.48)" }}
                            >
                              {item.subtext}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}

            {/* Ideal para — dentro del panel expandido */}
            <div
              className="font-dmsans rounded-xl border p-3.5 text-xs font-normal"
              style={{
                borderColor: `${accent.to}44`,
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.72)",
              }}
            >
              <strong
                className="mb-1 block text-[11px] font-normal"
                style={{ color: accent.to }}
              >
                Ideal para
              </strong>
              {plan.idealFor}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
