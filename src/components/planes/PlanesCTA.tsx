"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";

type SlideItem = {
  id: number;
  value: string;
  suffix?: string;
  label: string;
  image: string;
};

const SLIDES: SlideItem[] = [
  {
    id: 1,
    value: "100",
    suffix: "%",
    label: "Sesiones personalizadas",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=85",
  },
  {
    id: 2,
    value: "30",
    suffix: " min",
    label: "Sesión gratuita",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=85",
  },
  {
    id: 3,
    value: "Sin",
    label: "Compromiso",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=85",
  },
];

const RESULTS_BG =
  "https://kota-content.b-cdn.net/app/uploads/2023/11/results-light-1400x762.jpg";
const RESULTS_BG_SRCSET =
  "https://kota-content.b-cdn.net/app/uploads/2023/11/results-light-500x272.jpg 500w, https://kota-content.b-cdn.net/app/uploads/2023/11/results-light-768x418.jpg 768w, https://kota-content.b-cdn.net/app/uploads/2023/11/results-light-1400x762.jpg 1400w, https://kota-content.b-cdn.net/app/uploads/2023/11/results-light-1536x836.jpg 1536w, https://kota-content.b-cdn.net/app/uploads/2023/11/results-light-2000x1089.jpg 2000w";

const AUTOPLAY_MS = 2500;
const INITIAL_DELAY_MS = 900;

const EASE_EXP = [0.22, 1, 0.36, 1] as const;

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_EXP },
  },
};

const layer1Variants = {
  hidden: { opacity: 0, x: 32, scale: 1.01, y: -6 },
  visible: {
    opacity: 1,
    x: -28,
    scale: 0.96,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 160,
      damping: 20,
      delay: 0.06,
    },
  },
};

const layer2Variants = {
  hidden: { opacity: 0, x: 22, scale: 1.005, y: -4 },
  visible: {
    opacity: 1,
    x: 10,
    scale: 0.98,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 170,
      damping: 22,
      delay: 0.14,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_EXP, delay: 0.2 },
  },
};

const G_COLS = 8;
const G_ROWS = 5;
const MAX_DIAG = G_COLS + G_ROWS - 2;

const CELLS = Array.from({ length: G_COLS * G_ROWS }, (_, i) => ({
  enterDelay: (((i % G_COLS) + Math.floor(i / G_COLS)) / MAX_DIAG) * 0.6,
}));

function PanelBackground() {
  return (
    <figure
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      aria-hidden
    >
      <img
        src={RESULTS_BG}
        srcSet={RESULTS_BG_SRCSET}
        sizes="(min-width: 1024px) 1100px, 92vw"
        alt=""
        className="h-full w-full object-cover object-center brightness-[1.12] saturate-[0.88]"
      />
      <span className="absolute inset-0 bg-white/30 mix-blend-soft-light" />
      <span className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/15 to-transparent" />
    </figure>
  );
}

function InnovafyLogo({ animKey }: { animKey: string }) {
  return (
    <div className="flex items-center gap-3" aria-label="INNOVAFY">
      <span className="text-base font-bold tracking-[0.25rem] text-black md:text-lg">
        {"INNOVAFY".split("").map((letter, i) => (
          <motion.span
            key={`${animKey}-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.11, duration: 0.02 }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </div>
  );
}

function MetricValue({ slide }: { slide: SlideItem }) {
  const hasSuffix = Boolean(slide.suffix);
  const isWord =
    !hasSuffix && Number.isNaN(Number(slide.value.replace(",", ".")));

  const grad =
    "bg-gradient-to-r from-[#2b66d9] via-[#7c3aed] to-[#d9129d] bg-clip-text text-transparent";

  if (isWord) {
    return (
      <span
        className={`block px-2 text-[clamp(4.5rem,9vw,9rem)] font-medium leading-[0.95] tracking-[-0.03em] ${grad}`}
      >
        {slide.value}
      </span>
    );
  }

  return (
    <span
      className={`flex items-baseline px-2 text-[clamp(4.5rem,9vw,9rem)] font-normal leading-[0.95] tracking-[-0.03em] ${grad}`}
    >
      <span>{slide.value}</span>
      {slide.suffix && (
        <span className="ml-1 bg-gradient-to-r from-[#7c3aed] to-[#d9129d] bg-clip-text text-[0.55em] font-bold tracking-tight text-transparent">
          {slide.suffix}
        </span>
      )}
    </span>
  );
}

function GridShutterOverlay({
  phase,
  imageSrc,
  onComplete,
}: {
  phase: "cover" | "reveal";
  imageSrc: string;
  onComplete: () => void;
}) {
  const isCover = phase === "cover";
  const maxDelay = CELLS.reduce(
    (max, cell) => Math.max(max, cell.enterDelay),
    0
  );

  useEffect(() => {
    const timer = window.setTimeout(
      onComplete,
      (maxDelay + 0.28) * 1000 + 40
    );
    return () => window.clearTimeout(timer);
  }, [phase, onComplete, maxDelay]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2]"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${G_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${G_ROWS}, 1fr)`,
      }}
    >
      {CELLS.map(({ enterDelay }, i) => {
        const col = i % G_COLS;
        const row = Math.floor(i / G_COLS);

        return (
          <motion.div
            key={`${phase}-${i}`}
            className="relative overflow-hidden bg-transparent"
            initial={{ opacity: isCover ? 1 : 0 }}
            animate={{ opacity: isCover ? 0 : 1 }}
            transition={{
              delay: enterDelay,
              duration: 0.28,
              ease: EASE_EXP,
            }}
          >
            <img
              src={imageSrc}
              alt=""
              aria-hidden
              draggable={false}
              className="pointer-events-none absolute max-w-none object-cover"
              style={{
                width: `${G_COLS * 100}%`,
                height: `${G_ROWS * 100}%`,
                left: `${-col * 100}%`,
                top: `${-row * 100}%`,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

function CTAButton({ label = "Agendar sesión gratuita" }: { label?: string }) {
  return (
    <div className="group relative inline-flex max-w-full cursor-pointer items-center justify-start border-none bg-transparent p-0 text-black">
      <Link
        href="/contacto"
        className="relative flex items-center justify-start whitespace-nowrap p-[14px_20px] font-dmsans text-[1rem] font-normal leading-[1] text-black no-underline md:px-[1.5rem] md:pb-[0.85rem] md:pt-[0.75rem] md:text-[1.125rem] md:font-bold"
      >
        <span className="pointer-events-none absolute right-0 top-0 h-[44px] w-full rounded-[2.0625rem] border-[2px] border-black transition-all duration-300 ease-out group-hover:w-[44px] group-hover:-translate-x-[10px]" />
        <span className="flex items-center">
          <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-[10px]">
            {label}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 17.1 15.17"
            className="ml-[1rem] w-[14px] translate-x-[-3px] text-black opacity-100 md:w-[18px] md:translate-x-[2px]"
            aria-hidden
          >
            <path
              d="m17.1,7.58s-.01-.04-.01-.06c.01-.22-.06-.45-.24-.61L9.23.19c-.31-.27-.78-.24-1.06.07-.27.31-.24.78.07,1.06l6.26,5.52H.75c-.41,0-.75.34-.75.75s.34.75.75.75h13.74l-6.26,5.52c-.31.27-.34.75-.07,1.06.15.17.35.25.56.25.18,0,.35-.06.5-.19l7.62-6.72c.18-.16.25-.39.24-.61,0-.02.01-.04.01-.06Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
}

export default function PlanesCTA({
  title = "¿Que Plan es para Ti?",
  description = "Agenda una sesión estratégica gratuita de 30 minutos. Te ayudamos a elegir el plan ideal para tu etapa de negocio.",
}: {
  title?: string;
  description?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [shutterPhase, setShutterPhase] = useState<"idle" | "cover" | "reveal">(
    "idle"
  );
  const pendingIndexRef = useRef(0);

  const [viewKey, setViewKey] = useState(0);
  useEffect(() => {
    if (isInView) setViewKey((v) => v + 1);
  }, [isInView]);

  const handleCoverComplete = useCallback(() => {
    setActiveIndex(pendingIndexRef.current);
    setShutterPhase("reveal");
  }, []);

  const handleRevealComplete = useCallback(() => {
    setShutterPhase("idle");
  }, []);

  const goNext = useCallback(() => {
    if (shutterPhase !== "idle") return;
    pendingIndexRef.current = (activeIndex + 1) % SLIDES.length;
    setShutterPhase("cover");
  }, [activeIndex, shutterPhase]);

  useEffect(() => {
    if (!isInView || paused) return;

    const initial = window.setTimeout(goNext, INITIAL_DELAY_MS);
    const interval = window.setInterval(goNext, AUTOPLAY_MS);

    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
    };
  }, [isInView, paused, goNext]);

  const activeSlide = SLIDES[activeIndex];

  const cardRadius = "rounded-[10px] md:rounded-[20px] md:rounded-tr-[75px]";

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={sectionVariants}
      className="relative overflow-hidden px-6 pb-20 pt-6 font-sans md:px-12 md:pb-28 md:pt-8 lg:px-24"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          variants={headingVariants}
          className="mb-7 max-w-3xl md:mb-12"
        >
          <h2 className="text-[clamp(3.2rem,5vw,3.5rem)] font-normal leading-[1.85] tracking-[-0.03em] text-neutral-900">
            {title}
          </h2>
          <p className="mt-8 max-w-3xl font-normal leading-relaxed text-black md:text-lg">
            {description}
          </p>
        </motion.div>

        <div
          className="relative mx-auto aspect-[16/10] w-full max-w-[1150px] pl-[48px] md:aspect-[16/9] lg:aspect-[22/12]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            aria-hidden
            variants={layer1Variants}
            className={`pointer-events-none absolute inset-0 z-0 overflow-hidden border border-black/10 bg-[#f3f3f4] ${cardRadius}`}
            style={{
              boxShadow:
                "6px 10px 28px rgba(0,0,0,0.10), 2px 4px 10px rgba(0,0,0,0.06)",
            }}
          >
            <PanelBackground />
            {/* Sombra proyectada del card frontal sobre el borde visible */}
            <span
              className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/18 via-black/6 to-transparent"
              aria-hidden
            />
          </motion.div>

          <motion.div
            aria-hidden
            variants={layer2Variants}
            className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden border border-black/12 bg-[#f7f7f8] ${cardRadius}`}
            style={{
              boxShadow:
                "4px 8px 22px rgba(0,0,0,0.11), 1px 3px 8px rgba(0,0,0,0.05)",
            }}
          >
            <PanelBackground />
            <span
              className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/14 via-black/4 to-transparent"
              aria-hidden
            />
          </motion.div>

          <motion.div
            variants={cardVariants}
            className={`absolute inset-y-0 left-[48px] right-0 z-10 grid grid-cols-1 overflow-hidden border border-black/12 bg-white md:grid-cols-12 ${cardRadius}`}
            style={{
              boxShadow:
                "0 24px 48px rgba(0,0,0,0.14), 0 8px 18px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.7) inset",
            }}
          >
            <PanelBackground />

            <div className="relative z-10 flex flex-col justify-between p-8 text-black md:col-span-6 md:p-12 lg:p-16">
              <InnovafyLogo animKey={String(viewKey)} />

              <div className="my-auto pb-6 pt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE_EXP }}
                  >
                    <MetricValue slide={activeSlide} />
                    <p className="mt-6 max-w-sm text-base font-normal uppercase tracking-[0.06em] text-neutral-800 md:text-lg lg:text-xl">
                      {activeSlide.label}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div>
                <CTAButton />
              </div>
            </div>

            <div className="relative z-10 flex min-h-[200px] items-center justify-center p-5 md:col-span-6 md:p-7 lg:p-9">
              <div className="relative h-full w-full overflow-hidden rounded-xl md:rounded-2xl">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.label}
                  draggable={false}
                  className={`aspect-[4/3] h-full w-full object-cover transition-opacity duration-150 md:aspect-auto md:min-h-[220px] ${
                    shutterPhase !== "idle" ? "opacity-0" : "opacity-100"
                  }`}
                />

                {shutterPhase === "cover" && (
                  <GridShutterOverlay
                    key="cover"
                    phase="cover"
                    imageSrc={activeSlide.image}
                    onComplete={handleCoverComplete}
                  />
                )}
                {shutterPhase === "reveal" && (
                  <GridShutterOverlay
                    key="reveal"
                    phase="reveal"
                    imageSrc={activeSlide.image}
                    onComplete={handleRevealComplete}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
