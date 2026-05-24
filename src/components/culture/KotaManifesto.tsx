"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function KotaManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on scroll
      gsap.fromTo(
        ".manifesto-text",
        { scale: 1, opacity: 0.8 },
        {
          scale: 1.1,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#4200FF] py-32 md:py-52 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#ffffff20,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#00000030,_transparent_70%)]" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-black/20 blur-3xl" />

      <div className="relative z-10 editorial-container text-center">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-white/60 mb-6 md:mb-8">
          Manifesto
        </p>

        <h2
          ref={textRef}
          className="manifesto-text text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-[1.1] tracking-[-0.03em] text-white max-w-5xl mx-auto"
        >
          We don't create
          <br />
          digital presence.
          <br />
          <span className="font-medium">We create perception.</span>
        </h2>

        <div className="mt-12 md:mt-16">
          <div className="inline-flex items-center gap-3 text-white/80 hover:text-white transition-colors group cursor-pointer">
            <span className="text-xs uppercase tracking-[0.2em]">
              Read the full manifesto
            </span>
            <span className="text-xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
