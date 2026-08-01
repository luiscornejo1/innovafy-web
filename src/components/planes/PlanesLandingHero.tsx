"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export type PlanesLandingHeroProps = {
  titleLines: string[];
  indentSecondLine?: boolean;
  description: ReactNode;
  showHeroVideo?: boolean;
  heroVideoSrc?: string;
  showAwardLogos?: boolean;
};

export default function PlanesLandingHero({
  titleLines,
  indentSecondLine = true,
  description,
  showHeroVideo = false,
  heroVideoSrc = "https://kota-content.b-cdn.net/app/uploads/2025/10/Short-Preview-homepage.mp4",
  showAwardLogos = false,
}: PlanesLandingHeroProps) {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set(container.current, { visibility: "visible" });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 849px)", () => {
        const tl = gsap.timeline({ delay: 0.2 });

        tl.fromTo(
          ".planes-hero-line",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.1 }
        );

        if (showHeroVideo) {
          tl.fromTo(
            ".planes-hero-video",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
            "-=0.6"
          );
        }

        tl.fromTo(
          ".planes-hero-text",
          { yPercent: 120 },
          { yPercent: 0, duration: 1, ease: "power4.out" },
          "-=1.2"
        );

        if (showAwardLogos) {
          tl.fromTo(
            ".planes-hero-logo",
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
            },
            "-=0.8"
          );
        }
      });

      mm.add("(max-width: 848px)", () => {
        gsap.fromTo(
          ".planes-hero-line",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.85, ease: "power4.out", stagger: 0.08 }
        );
        gsap.fromTo(
          ".planes-hero-text",
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power4.out",
            delay: 0.2,
          }
        );
      });

      return () => mm.revert();
    },
    {
      scope: container,
      dependencies: [showHeroVideo, showAwardLogos, titleLines],
    }
  );

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <section
        ref={container}
        className="invisible relative flex h-full min-h-[100svh] items-end pb-[25%] text-black pointer-events-none min-[769px]:items-center min-[769px]:pb-0"
      >
        <div className="relative mx-auto flex w-full max-w-[calc(1400px+15%)] flex-col items-center px-[7%] pointer-events-none">
          <div className="relative z-[2] flex w-full min-[850px]:w-11/12 self-start flex-col pt-[5.625rem] text-[clamp(2.5rem,16vw,99rem)] leading-[0.9] text-black pointer-events-none">
            <h1
              aria-label={titleLines.join(" ")}
              className="font-dmsans m-0 w-full text-[clamp(2.5rem,16vw,10rem)] font-bold leading-[0.95] tracking-[-0.03em]"
            >
              {titleLines.map((line, index) => (
                <div
                  key={`${line}-${index}`}
                  className={`overflow-hidden pb-1 min-[640px]:pb-2 ${
                    index === 1 && indentSecondLine ? "pl-[13.5%]" : ""
                  }`}
                >
                  <span
                    className={`planes-hero-line block ${
                      index === 1 && indentSecondLine ? "font-light" : ""
                    }`}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </h1>

            <p className="font-dmsans mb-0 mt-6 max-w-[42ch] text-[clamp(1rem,3.8vw,1.35rem)] font-normal leading-snug min-[769px]:absolute min-[769px]:bottom-0 min-[769px]:left-0 min-[769px]:mt-0 min-[769px]:w-full min-[769px]:max-w-[42ch] min-[769px]:translate-y-[calc(100%+1rem)] min-[769px]:leading-[1.25] min-[1100px]:left-auto min-[1100px]:right-0 min-[1100px]:w-[35%] min-[1100px]:translate-x-[30%] min-[1100px]:translate-y-0 min-[1100px]:text-[clamp(1.15rem,1.5vw,1.5rem)]">
              <span className="planes-hero-text block">{description}</span>
            </p>

            {showHeroVideo && (
              <div className="planes-hero-video pointer-events-auto absolute bottom-[10%] left-[17.45%] hidden h-[17.5%] w-[12.25%] cursor-pointer opacity-0 min-[850px]:block min-[850px]:max-[1023px]:bottom-[8.5%] min-[850px]:max-[1023px]:left-[17.45%] min-[850px]:max-[1023px]:h-[15.5%] min-[850px]:max-[1023px]:w-[11%]">
                <video
                  src={heroVideoSrc}
                  playsInline
                  autoPlay
                  loop
                  muted
                  className="absolute left-0 top-0 h-full w-full overflow-hidden rounded-[45%] object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {showAwardLogos && (
          <div className="absolute bottom-[1rem] left-[2.5rem] z-[3] w-[calc(100%-5rem)]">
            <div className="flex flex-wrap items-center gap-[1.875rem]">
              <img
                src="https://kota-content.b-cdn.net/app/uploads/2024/03/Digital-Agency-Network.svg"
                alt=""
                className="planes-hero-logo h-auto w-auto"
              />
              <img
                src="https://kota-content.b-cdn.net/app/uploads/2024/02/clutch.svg"
                alt=""
                className="planes-hero-logo h-auto w-auto"
              />
              <img
                src="https://kota-content.b-cdn.net/app/uploads/2024/02/awwwards.svg"
                alt=""
                className="planes-hero-logo h-auto w-auto"
              />
              <img
                src="https://kota-content.b-cdn.net/app/uploads/2024/02/cssda.svg"
                alt=""
                className="planes-hero-logo h-auto w-auto"
              />
            </div>
          </div>
        )}
      </section>
    </section>
  );
}
