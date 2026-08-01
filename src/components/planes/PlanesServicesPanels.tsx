"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export type PlanesServiceTag = {
  text: string;
  href: string;
};

export type PlanesServiceItem = {
  id: number;
  title: string;
  description: string;
  link: string;
  videoSrc: string;
  imgSrc: string;
  tags: PlanesServiceTag[];
};

export type PlanesServicesPanelsProps = {
  headingLines: [string, string];
  services: PlanesServiceItem[];
  ctaLabel?: string;
};

function HeadingLine({ text }: { text: string }) {
  return (
    <div className="relative block text-start" aria-hidden="true">
      <div className="relative inline-block overflow-hidden">
        {text.split("").map((char, index) => (
          <span
            key={`${text}-${index}`}
            className="planes-heading-char inline-block overflow-hidden"
          >
            <span className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PlanesServicesPanels({
  headingLines,
  services,
  ctaLabel = "Más información",
}: PlanesServicesPanelsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.querySelectorAll(".planes-heading-char > span"),
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.75,
            ease: "power4.out",
            stagger: 0.025,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          headingRef.current.querySelector(".planes-heading-arrow"),
          { opacity: 0, rotate: -12, scale: 0.85 },
          {
            opacity: 1,
            rotate: 6,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.35,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 850px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(
          ".planes-stacking-panel"
        );

        panels.forEach((panel, index) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "center center",
            endTrigger: sectionRef.current,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
          });

          if (index > 0) {
            gsap.to(panels[index - 1], {
              scale: 0.9,
              opacity: 0,
              y: -50,
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "center center",
                scrub: true,
              },
            });
          }

          if (index === panels.length - 1) {
            gsap.to(panel, {
              scale: 0.9,
              opacity: 0,
              y: -50,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: () =>
                  `bottom-=${Math.round(window.innerHeight / 2)}px bottom`,
                end: "bottom bottom",
                scrub: true,
              },
            });
          }
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [services, headingLines] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-[2] w-full max-w-full overflow-x-clip py-[3.25rem] text-black min-[850px]:pt-[9.375rem] min-[850px]:pb-[50vh]"
    >
      {/* Heading — primer stacking-panel (igual que ServicesPanels original) */}
      <div className="planes-stacking-panel mx-auto w-full max-w-[calc(1400px+15%)] px-[7%]">
        <h2
          ref={headingRef}
          className="relative col-span-12 m-0 flex flex-col font-dmsans text-[12vw] font-normal uppercase leading-[0.9] tracking-[-0.02em] min-[500px]:text-[clamp(3rem,10.6vw,10rem)]"
        >
          <div className="relative block w-full shrink-0 overflow-visible">
            <span className="w-full">
              <div className="w-full">
                <span
                  className="col-span-12 m-0 flex flex-col text-[12vw] font-normal uppercase leading-[0.9] tracking-[-0.02em] min-[500px]:text-[clamp(3rem,10.6vw,10rem)]"
                  aria-label={headingLines[0]}
                >
                  <HeadingLine text={headingLines[0]} />
                </span>

                <span
                  className="col-span-12 mb-0 flex w-full flex-col pl-[13.5%] text-[12vw] font-normal uppercase leading-[0.9] tracking-[-0.02em] md:mb-[10vh] min-[500px]:text-[clamp(3rem,10.6vw,10rem)]"
                  aria-label={headingLines[1]}
                >
                  <HeadingLine text={headingLines[1]} />
                </span>
              </div>
            </span>
          </div>

          <div className="absolute bottom-0 right-0 flex h-full items-end justify-end">
            <div className="planes-heading-arrow relative flex h-[1.18ch] origin-center transition-transform md:bottom-[10vh] min-[850px]:rotate-[6.0207deg]">
              <svg
                className="h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 111.42 110.66"
                aria-hidden
              >
                <polygon
                  points="13.65 102.66 109.53 6.67 103.87 1.02 8 97 8 0 0 0 0 110.66 111.42 110.66 111.42 102.66 13.65 102.66"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </h2>
      </div>

      <div className="mt-[5rem] w-full md:mt-[4rem] md:mb-[10vh] min-[850px]:mb-[25vh]">
        <div className="mx-auto flex w-full max-w-[calc(1400px+15%)] flex-col gap-[4.25rem] px-[7%] min-[850px]:gap-[50vh] min-[850px]:max-[1450px]:px-[1.625rem]">
          {services.map((service) => (
            <div
              key={service.id}
              className="planes-stacking-panel relative col-span-12 block w-full"
            >
              <div className="relative z-[2] flex w-full flex-col-reverse items-center justify-between min-[850px]:max-[1450px]:p-[3.125rem_3.125rem_3.125rem_5vw] md:flex-row">
                <div className="relative z-[2] flex flex-col items-start gap-[1rem] max-md:pb-[0.5rem] md:w-[50%] md:gap-[1.5rem]">
                  <h3 className="font-dmsans m-0 mb-[0.54rem] text-[2.5rem] font-normal leading-[1] tracking-[-0.02em] md:text-[clamp(2.5rem,6.5vw,7rem)]">
                    {service.title}
                  </h3>

                  <div className="font-dmsans flex flex-wrap gap-x-[0.4rem] gap-y-[0.625rem] md:gap-[0.625rem]">
                    {service.tags.map((tag, idx) => (
                      <a
                        key={idx}
                        href={tag.href}
                        className="cursor-pointer rounded-[2rem] border-[2px] border-black/30 px-[10px] py-[5px] text-[1rem] text-black no-underline transition-colors duration-200 hover:border-black hover:bg-black hover:text-white min-[850px]:border-[#e9e9e9] min-[850px]:text-[1.125rem]"
                      >
                        {tag.text}
                      </a>
                    ))}
                  </div>

                  <p className="font-dmsans m-0 text-[1.125rem]">
                    {service.description}
                  </p>

                  <div className="mt-[1rem] inline-block">
                    <div className="group relative inline-flex max-w-full cursor-pointer items-center justify-start border-none bg-transparent p-0 text-black">
                      <a
                        href={service.link}
                        className="relative flex items-center justify-start whitespace-nowrap p-[14px_20px] font-dmsans text-[1rem] font-normal leading-[1] text-black no-underline md:px-[1.5rem] md:pb-[0.85rem] md:pt-[0.75rem] md:text-[1.125rem]"
                      >
                        <span className="pointer-events-none absolute right-0 top-0 h-[44px] w-full rounded-[2.0625rem] border-[2px] border-black transition-all duration-300 ease-out group-hover:w-[44px] group-hover:-translate-x-[10px]" />
                        <span className="flex items-center">
                          <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-[10px]">
                            {ctaLabel}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 17.1 15.17"
                            className="ml-[1rem] w-[14px] translate-x-[-3px] text-black opacity-100 md:w-[18px] md:translate-x-[2px]"
                          >
                            <path
                              d="m17.1,7.58s-.01-.04-.01-.06c.01-.22-.06-.45-.24-.61L9.23.19c-.31-.27-.78-.24-1.06.07-.27.31-.24.78.07,1.06l6.26,5.52H.75c-.41,0-.75.34-.75.75s.34.75.75.75h13.74l-6.26,5.52c-.31.27-.34.75-.07,1.06.15.17.35.25.56.25.18,0,.35-.06.5-.19l7.62-6.72c.18-.16.25-.39.24-.61,0-.02.01-.04.01-.06Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative z-[2] aspect-square w-full overflow-hidden rounded-tr-[5rem] max-md:mb-[1.25rem] md:w-[45%] min-[850px]:rounded-tr-[12.5rem]">
                  <img
                    src={service.imgSrc}
                    alt={service.title}
                    className="absolute left-0 top-0 h-full w-full object-cover"
                  />
                </div>

                <div className="absolute left-[-7vw] top-[-1.5rem] z-[1] h-[calc(100%+3rem)] w-[calc(100%+14vw)] rounded-[0.625rem] bg-white min-[850px]:max-[1450px]:left-0 min-[850px]:max-[1450px]:top-0 min-[850px]:max-[1450px]:h-full min-[850px]:max-[1450px]:w-full min-[850px]:max-[1450px]:pl-[1.625rem] min-[1000px]:rounded-[4rem] min-[1450px]:left-[-2.8125rem] min-[1450px]:top-[-2.8125rem] min-[1450px]:h-[calc(100%+5.625rem)] min-[1450px]:w-[calc(100%+5.625rem)] min-[1920px]:left-[-4rem] min-[1920px]:w-[calc(100%+8rem)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
