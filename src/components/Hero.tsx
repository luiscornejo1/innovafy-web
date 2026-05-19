"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal text animation
      gsap.fromTo(
        ".reveal-text",
        {
          y: "100%",
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        },
        {
          y: "0%",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        }
      );

      // Simple parallax on scroll for the background blobs
      gsap.to(".bg-blob", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-32 pb-20 overflow-hidden bg-[#f8f9fa]"
    >
      {/* Fluid Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="bg-blob absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[120px] animate-pulse opacity-60"
          style={{ backgroundColor: "#ff00ff", animationDuration: "8s" }}
        />
        <div
          className="bg-blob absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[120px] animate-pulse opacity-60"
          style={{ backgroundColor: "#00ffff", animationDuration: "10s" }}
        />
        <div
          className="bg-blob absolute bottom-[-10%] left-[20%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[140px] animate-pulse opacity-50"
          style={{ backgroundColor: "#0000ff", animationDuration: "12s" }}
        />
        <div className="bg-blob absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-white opacity-80 mix-blend-overlay filter blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col justify-center flex-1">
        {/* Massive Typography */}
        <div className="flex flex-col w-full text-[14vw] md:text-[15vw] leading-[0.75] font-black tracking-[-0.04em] text-neutral-950 uppercase select-none">
          {/* rebel */}
          <div className="overflow-hidden pb-2">
            <div className="reveal-text inline-block transform origin-bottom">rebel</div>
          </div>

          {/* against */}
          <div className="overflow-hidden ml-[12vw] sm:ml-[15vw] md:ml-[20vw] pb-2">
            <div className="reveal-text inline-block transform origin-bottom">against</div>
          </div>

          {/* boring + right paragraph */}
          <div className="relative flex flex-col md:flex-row md:items-end justify-between mt-2 md:mt-0 pb-2">
            <div className="overflow-hidden flex items-center">
              <div className="reveal-text flex items-center transform origin-bottom">
                <span className="pr-[0.02em]">b</span>
                {/* The "o" Cut-Out with Video */}
                <div className="relative w-[0.75em] h-[0.75em] rounded-full overflow-hidden mx-[0.02em] flex-shrink-0 bg-black shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover scale-[1.2]"
                  >
                    <source
                      src="https://assets.codepen.io/3364143/7btrrd.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <span className="pl-[0.02em]">ring</span>
              </div>
            </div>

            {/* Paragraph text */}
            <div className="overflow-hidden md:max-w-[280px] lg:max-w-[320px] mt-8 md:mt-0 md:pb-[1.5vw] md:pr-4 lg:pr-12">
              <p className="reveal-text text-sm sm:text-base lg:text-lg font-medium text-neutral-800 leading-tight normal-case tracking-normal">
                We're a creative web design and branding agency based in London that crafts beautiful work for brands who <strong className="font-black">refuse to blend in.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Awards/Logos */}
        <div className="mt-16 md:mt-24 flex gap-6 sm:gap-10 items-center overflow-hidden">
          <div className="reveal-text flex gap-8 md:gap-12 items-center opacity-80 grayscale">
            <div className="text-xs md:text-sm font-bold tracking-widest uppercase">DAN</div>
            <div className="text-xs md:text-sm font-bold tracking-widest uppercase">Clutch</div>
            <div className="text-xs md:text-sm font-bold tracking-widest uppercase">AWWWARDS</div>
            <div className="text-xs md:text-sm font-bold tracking-widest uppercase">CSSDA</div>
          </div>
        </div>
      </div>
    </section>
  );
}
