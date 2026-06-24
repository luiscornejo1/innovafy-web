"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { culturePerks, cultureSkills } from "../../data/cultureContent";
import SectionBackground from "./SectionBackground";

export default function CultureCollaborate() {
  const [index, setIndex] = useState(0);
  const perkRef = useRef<HTMLDivElement>(null);

  const nextItem = () => {
    setIndex((prev) => (prev + 1) % culturePerks.length);
  };

  useEffect(() => {
    if (!perkRef.current) return;

    gsap.fromTo(
      perkRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, [index]);

  const perk = culturePerks[index];

  return (
    <>
      <section className="relative bg-black text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32 lg:px-20">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="text-5xl font-normal leading-tight md:text-5xl lg:text-6xl">
              Sorry, no table football, but...
            </h2>

            <div className="flex gap-6 pl-6 md:pl-10">
              {/* Rayita de colores animada - más ancha */}
              <div className="w-1 min-h-[160px] bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 rounded-full animate-pulse" />

              <div ref={perkRef} className="min-h-[160px]">
                <p className="mb-3 text-5xl font-light md:text-5xl lg:text-6xl">
                  {perk.heading}
                </p>
                <p className="mb-8 max-w-md text-lg md:text-xl leading-tight text-white/60">
                  {perk.text}
                </p>

                <button
                  type="button"
                  onClick={nextItem}
                  className="group flex items-center gap-3 text-base md:text-lg uppercase tracking-widest transition-colors duration-300"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-500/50 transition duration-500 group-hover:rotate-180 group-hover:border-pink-500 group-hover:bg-gradient-to-br group-hover:from-purple-500/30 group-hover:via-blue-500/30 group-hover:to-pink-500/30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 62.52 62.52"
                      className="h-5 w-5 text-white/80 group-hover:text-white"
                      fill="none"
                    >
                      <path
                        fill="currentColor"
                        d="M31.14 57.71c-7.01 0-13.61-2.73-18.57-7.69-4.96-4.96-7.69-11.55-7.69-18.57 0-7.01 2.73-13.61 7.69-18.57 4.96-4.96 11.55-7.69 18.57-7.69 7.01 0 13.61 2.73 18.57 7.69 4.96 4.96 7.69 11.55 7.69 18.57h-3c0-6.21-2.42-12.05-6.81-16.45-4.39-4.39-10.23-6.81-16.44-6.81S19.1 10.61 14.7 15c-4.39 4.39-6.81 10.23-6.81 16.44s2.42 12.05 6.81 16.45c4.39 4.39 10.23 6.81 16.44 6.81s12.05-2.42 16.45-6.81l2.12 2.12c-4.96 4.96-11.55 7.69-18.57 7.69z"
                      />
                      <path
                        fill="currentColor"
                        d="M50.73 26.09h10.34c.56 0 1.02.45 1.02 1.01 0 .19-.05.37-.14.53l-5.17 8.69c-.29.48-.91.64-1.39.36-.15-.09-.27-.21-.36-.36l-5.17-8.69c-.29-.49-.12-1.11.36-1.4.16-.09.33-.14.51-.14z"
                      />
                    </svg>
                  </span>
                  <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:via-blue-400 group-hover:to-pink-400">
                    Show another
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gradiente de transición - solo negro sutil */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </section>

      <section className="relative isolate overflow-hidden bg-black py-16 md:py-20">
        <SectionBackground />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="max-w-xl">
              <h3 className="mb-10 text-5xl font-semibold leading-[1.1] text-white md:text-5xl g:text-6xl">
                Got some cool stuff you&apos;d like to share? We&apos;d love to
                see it, even if there isn&apos;t a fit right now.
              </h3>

              <a
                href="mailto:hello@innovafy.com"
                className="group relative inline-flex items-center gap-8 rounded-full border-4 border-white/50 px-8 py-4 text-white transition-all duration-500 hover:border-transparent"
              >
                <span className="relative z-10 text-lg font-medium transition-all duration-500 group-hover:-translate-x-2">
                  Get in touch
                </span>

                <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-4 border-transparent transition-all duration-500 group-hover:border-purple-500 group-hover:w-12 group-hover:h-12 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:via-blue-500 group-hover:to-pink-500">
                  <span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:text-white">
                    →
                  </span>
                </span>
              </a>
            </div>

            <div className="flex justify-start md:justify-end">
              <div className="w-full md:max-w-md lg:max-w-lg rounded-tr-[2.25rem] bg-white/[0.12] p-5 backdrop-blur-xl border border-white/15 md:p-6 lg:p-8">
                <p className="mb-3 text-lg font-medium text-white">
                  We&apos;re interested in :
                </p>
                <div className="flex flex-col gap-1 text-base md:text-lg text-white/85">
                  {cultureSkills.map((skill) => (
                    <span
                      key={skill}
                      className="cursor-default transition-colors hover:text-purple-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
