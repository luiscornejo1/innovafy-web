"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ServiceTag {
  text: string;
  href: string;
}

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  link: string;
  videoSrc: string;
  imgSrc: string;
  tags: ServiceTag[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    title: "Web design & development",
    description:
      "Crafting digital experiences where beauty meets ROI, turning heads and unlocking revenue potential with every click.",
    link: "service/web-design-development",
    videoSrc: "https://kota-content.b-cdn.net/app/uploads/2024/02/homepage.mp4",
    imgSrc:
      "https://kota-content.b-cdn.net/app/uploads/2024/02/homepage-mobile.jpg",
    tags: [
      { text: "Creative web design", href: "service/creative-web-design" },
      { text: "Web development", href: "service/web-development" },
      { text: "Copywriting", href: "service/copywriting" },
      { text: "E-Commerce", href: "service/e-commerce" },
      { text: "WordPress", href: "service/wordpress" },
    ],
  },
  {
    id: 2,
    title: "Branding",
    description:
      "It all starts with your brand. We use sound strategic thinking to create or elevate your brand identity, from your visuals to your voice.",
    link: "service/branding",
    videoSrc:
      "https://kota-content.b-cdn.net/app/uploads/2024/02/homepage-1.mp4",
    imgSrc:
      "https://kota-content.b-cdn.net/app/uploads/2024/02/homepage-1-mobile.jpg",
    tags: [
      { text: "Brand strategy", href: "service/brand-strategy" },
      { text: "Tone of voice", href: "service/tone-of-voice" },
      { text: "Visual identity", href: "service/visual-identity" },
    ],
  },
  {
    id: 3,
    title: "Digital Marketing",
    description:
      "Delivering eye-catching motion graphics and campaigns that earn attention, spark emotion and increase conversions.",
    link: "service/digital-marketing",
    videoSrc:
      "https://kota-content.b-cdn.net/app/uploads/2024/02/homepage-3.mp4",
    imgSrc:
      "https://kota-content.b-cdn.net/app/uploads/2024/02/homepage-3-mobile.jpg",
    tags: [
      { text: "Motion graphics", href: "service/motion-graphics" },
      { text: "Creative campaigns", href: "service/creative-campaigns" },
      { text: "Marketing support", href: "service/marketing-support" },
    ],
  },
];

export default function ServicePanels() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 850px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".stacking-panel");

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
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-[2] w-full max-w-[100vw] py-[3.25rem] text-black min-[850px]:pt-[9.375rem] min-[850px]:pb-[50vh]"
    >
      <div className="stacking-panel mx-auto w-full max-w-[calc(1400px+15%)] px-[7%]">
        <h2 className="relative col-span-12 m-0 flex flex-col font-dmsans text-[12vw] font-normal uppercase leading-[0.9] tracking-[-0.02em] min-[500px]:text-[clamp(3rem,10.6vw,10rem)]">
          <div className="relative block w-full shrink-0 overflow-visible">
            <span className="w-full">
              <div className="w-full">
                <span
                  className="col-span-12 m-0 flex flex-col text-[12vw] font-normal uppercase leading-[0.9] tracking-[-0.02em] min-[500px]:text-[clamp(3rem,10.6vw,10rem)]"
                  aria-label="Nuestros"
                >
                  <div className="relative block text-start" aria-hidden="true">
                    <div className="relative inline-block overflow-hidden">
                      {"NUESTROS".split("").map((char, index) => (
                        <div
                          key={index}
                          className="relative inline-block translate-y-0 transform opacity-100"
                        >
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>
                </span>

                <span
                  className="col-span-12 mb-0 flex w-full flex-col pl-[13.5%] text-[12vw] font-normal uppercase leading-[0.9] tracking-[-0.02em] md:mb-[10vh] min-[500px]:text-[clamp(3rem,10.6vw,10rem)]"
                  aria-label="Servicios"
                >
                  <div className="relative block text-start" aria-hidden="true">
                    <div className="relative inline-block overflow-hidden">
                      {"SERVICIOS".split("").map((char, index) => (
                        <div
                          key={index}
                          className="relative inline-block translate-y-0 transform opacity-100"
                        >
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>
                </span>
              </div>
            </span>
          </div>

          <div className="absolute bottom-0 right-0 flex h-full items-end justify-end">
            <div className="relative flex h-[1.18ch] origin-center transition-transform md:bottom-[10vh] min-[850px]:rotate-[6.0207deg]">
              <svg
                className="h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 111.42 110.66"
              >
                <polygon
                  points="13.65 102.66 109.53 6.67 103.87 1.02 8 97 8 0 0 0 0 110.66 111.42 110.66 111.42 102.66 13.65 102.66"
                  fill="currentColor"
                ></polygon>
              </svg>
            </div>
          </div>
        </h2>
      </div>

      <div className="mt-[5rem] w-full md:mt-[4rem] md:mb-[10vh] min-[850px]:mb-[25vh]">
        <div className="mx-auto flex w-full max-w-[calc(1400px+15%)] flex-col px-[7%] gap-[4.25rem] min-[850px]:gap-[50vh] min-[850px]:max-[1450px]:px-[1.625rem]">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="stacking-panel col-span-12 relative w-full block"
            >
              <div className="relative flex w-full flex-col-reverse items-center justify-between md:flex-row min-[850px]:max-[1450px]:p-[3.125rem_3.125rem_3.125rem_5vw] z-[2] ">
                <div className="relative z-[2] flex flex-col items-start gap-[1rem] max-md:pb-[0.5rem] md:w-[50%] md:gap-[1.5rem]">
                  <h3 className="font-dmsans m-0 mb-[0.54rem] text-[2.5rem] font-normal leading-[1] tracking-[-0.02em] md:text-[clamp(2.5rem,6.5vw,7rem)]">
                    {service.title}
                  </h3>

                  <div className="font-dmsans flex flex-wrap gap-x-[0.4rem] gap-y-[0.625rem] md:gap-[0.625rem]">
                    {service.tags.map((tag, idx) => (
                      <a
                        key={idx}
                        href={tag.href}
                        className="rounded-[2rem] border-[2px] border-black/30 px-[10px] py-[5px] text-[1rem] text-black no-underline transition-colors duration-200 cursor-pointer hover:bg-black hover:text-white hover:border-black min-[850px]:border-[#e9e9e9] min-[850px]:text-[1.125rem]"
                      >
                        {tag.text}
                      </a>
                    ))}
                  </div>

                  <p className="font-dmsans m-0 text-[1.125rem]">
                    {service.description}
                  </p>

                  <div className="inline-block mt-[1rem]">
                    <div className="group relative inline-flex max-w-full cursor-pointer items-center justify-start border-none bg-transparent p-0 text-black">
                      <a
                        href={service.link}
                        className="relative flex items-center justify-start whitespace-nowrap p-[14px_20px] font-dmsans text-[1rem] font-normal leading-[1] text-black no-underline md:px-[1.5rem] md:pb-[0.85rem] md:pt-[0.75rem] md:text-[1.125rem]"
                      >
                        <span className="absolute right-0 top-0 h-[44px] w-full rounded-[2.0625rem] border-[2px] border-black pointer-events-none transition-all duration-300 ease-out group-hover:w-[44px] group-hover:-translate-x-[10px]"></span>

                        <span className="flex items-center">
                          <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-[10px]">
                            Más información
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 17.1 15.17"
                            className="ml-[1rem] w-[14px] text-black opacity-100 translate-x-[-3px] md:w-[18px] md:translate-x-[2px]"
                          >
                            <path
                              d="m17.1,7.58s-.01-.04-.01-.06c.01-.22-.06-.45-.24-.61L9.23.19c-.31-.27-.78-.24-1.06.07-.27.31-.24.78.07,1.06l6.26,5.52H.75c-.41,0-.75.34-.75.75s.34.75.75.75h13.74l-6.26,5.52c-.31.27-.34.75-.07,1.06.15.17.35.25.56.25.18,0,.35-.06.5-.19l7.62-6.72c.18-.16.25-.39.24-.61,0-.02.01-.04.01-.06Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative z-[2] aspect-square w-full overflow-hidden rounded-tr-[5rem] max-md:mb-[1.25rem] md:w-[45%] min-[850px]:rounded-tr-[12.5rem]">
                  <span className="absolute left-0 top-0 flex h-full w-full min-[769px]:hidden">
                    <img
                      src={service.imgSrc}
                      alt={service.title}
                      className="absolute left-0 top-0 h-full w-full object-cover"
                    />
                  </span>

                  <span className="absolute left-0 top-0 hidden h-full w-full min-[769px]:flex">
                    <video
                      loop
                      muted
                      playsInline
                      autoPlay
                      className="absolute left-0 top-0 h-full w-full object-cover"
                    >
                      <source src={service.videoSrc} type="video/mp4" />
                    </video>
                  </span>
                </div>

                <div className="absolute left-[-7vw] top-[-1.5rem] z-[1] h-[calc(100%+3rem)] w-[calc(100%+14vw)] rounded-[0.625rem] bg-white min-[850px]:max-[1450px]:left-0 min-[850px]:max-[1450px]:top-0 min-[850px]:max-[1450px]:h-full min-[850px]:max-[1450px]:w-full min-[850px]:max-[1450px]:pl-[1.625rem] min-[1000px]:rounded-[4rem] min-[1450px]:left-[-2.8125rem] min-[1450px]:top-[-2.8125rem] min-[1450px]:h-[calc(100%+5.625rem)] min-[1450px]:w-[calc(100%+5.625rem)] min-[1920px]:left-[-4rem] min-[1920px]:w-[calc(100%+8rem)]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
