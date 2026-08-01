"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

export type PlanesManifestoItem = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type PlanesBrandManifestoProps = {
  headingLines: [string, string];
  items: PlanesManifestoItem[];
};

const CHAR_DELAY = 0.045;
const LINE_PAUSE = 0.18;

function TypewriterLine({
  text,
  animKey,
  startDelay,
}: {
  text: string;
  animKey: number;
  startDelay: number;
}) {
  return (
    <span className="block" aria-hidden>
      {text.split("").map((letter, i) => (
        <motion.span
          key={`${animKey}-${startDelay}-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: startDelay + i * CHAR_DELAY,
            duration: 0.02,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

export default function PlanesBrandManifesto({
  headingLines,
  items,
}: PlanesBrandManifestoProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [touchedId, setTouchedId] = useState<string | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.6 });
  const [typewriterKey, setTypewriterKey] = useState(0);
  const wasInViewRef = useRef(false);

  useEffect(() => {
    if (isHeadingInView && !wasInViewRef.current) {
      setTypewriterKey((k) => k + 1);
    }
    wasInViewRef.current = isHeadingInView;
  }, [isHeadingInView]);

  const activeId = hoveredId ?? touchedId;

  const line2Start = headingLines[0].length * CHAR_DELAY + LINE_PAUSE;

  const getInactiveOpacity = (index: number) => {
    if (items.length <= 1) return 0.35;
    const t = index / (items.length - 1);
    return 0.55 - t * 0.4;
  };

  return (
    <section className="relative w-full bg-black py-20 text-white min-[1024px]:py-28">
      <div className="mx-auto w-full max-w-[calc(1400px+15%)] px-[5%] min-[1024px]:px-[7%]">
        <h2
          ref={headingRef}
          className="font-dmsans m-0 text-center text-[clamp(2rem,5.5vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white"
          aria-label={`${headingLines[0]} ${headingLines[1]}`}
        >
          <TypewriterLine
            text={headingLines[0]}
            animKey={typewriterKey}
            startDelay={0}
          />
          <TypewriterLine
            text={headingLines[1]}
            animKey={typewriterKey}
            startDelay={line2Start}
          />
        </h2>

        <div className="mt-16 w-full min-[1024px]:mt-24">
          {items.map((item, index) => {
            const isActive = activeId === item.id;
            const inactiveOpacity = getInactiveOpacity(index);

            return (
              <article
                key={item.id}
                className="grid grid-cols-1 items-center gap-6 border-t border-white/10 py-10 min-[768px]:grid-cols-[1fr_minmax(240px,38%)] min-[768px]:gap-10 min-[1024px]:py-14 min-[1024px]:gap-16"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() =>
                  setTouchedId((prev) => (prev === item.id ? null : item.id))
                }
              >
                <div className="min-w-0">
                  <p
                    className="font-dmsans m-0 mb-3 text-sm tracking-wide transition-colors duration-300 min-[1024px]:text-base"
                    style={{
                      color: isActive
                        ? "rgba(255,255,255,0.55)"
                        : "rgba(163,163,163,0.5)",
                    }}
                  >
                    {item.number}/
                  </p>

                  <h3
                    className="font-dmsans m-0 text-[clamp(1.85rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.02em] transition-all duration-300 ease-out"
                    style={{
                      color: isActive ? "#ffffff" : "#a3a3a3",
                      opacity: isActive ? 1 : inactiveOpacity,
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                <div className="flex min-h-[4.5rem] items-center min-[768px]:justify-end">
                  <p
                    className="font-dmsans m-0 max-w-[36ch] text-base leading-[1.35] text-white/80 transition-all duration-300 ease-out min-[1024px]:text-lg min-[1024px]:leading-[1.4]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(8px)",
                      visibility: isActive ? "visible" : "hidden",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
