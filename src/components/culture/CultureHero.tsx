"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CultureHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".culture-hero-line",
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.15,
        }
      );
      gsap.fromTo(
        ".culture-hero-culture",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        ".culture-hero-meta",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.85 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white"
    >
      <figure className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          poster="https://kota-content.b-cdn.net/app/uploads/2023/11/culture-row-2.jpg"
        >
          <source
            src="https://kota-content.b-cdn.net/app/uploads/2024/02/culture-header.mp4"
            type="video/mp4"
            media="(min-width: 768px)"
          />
          <source
            src="https://kota-content.b-cdn.net/app/uploads/2024/08/culture-mobile-header-1.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/75" />
      </figure>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-[7vw] pb-8 pt-28 md:pb-12 md:pt-32">
        <div className="max-w-[1400px]">
          <h2 className="text-[clamp(2.25rem,6.5vw,5.5rem)] font-normal leading-[1.05] tracking-[-0.02em]">
            <span className="culture-hero-line block overflow-hidden">
              Be part of a <em className="not-italic">great</em>
            </span>
            <span className="culture-hero-line block overflow-hidden">
              <em className="not-italic">team,</em> but work
            </span>
            <span className="culture-hero-line block overflow-hidden">
              from anywhere.
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
