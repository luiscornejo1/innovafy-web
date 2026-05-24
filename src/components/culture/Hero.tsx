"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function KotaHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { y: 200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "power4.out",
          delay: 0.2,
        }
      );
      gsap.fromTo(
        ".hero-bottom",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
          poster="https://images.unsplash.com/photo-1536697248787-b4e521cd1b15?q=80&w=1974&auto=format"
        >
          <source
            src="https://cdn.pixabay.com/video/2025/04/23/273922_large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
      </div>

      {/* Floating blur effect */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#4200FF] blur-[120px] opacity-20" />

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-between pb-16 md:pb-9">
        {/* Título principal - Mismo espaciado que abajo */}
        <div className="pt-24 md:pt-32 px-[7vw]">
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-semibold leading-[1.1]">
            <span className="hero-line inline-block overflow-visible font-normal">
              Be part of a great
            </span>
            <br />
            <span className="hero-line inline-block overflow-visible font-normal">
              team, but work
            </span>
            <br />
            <span className="hero-line inline-block overflow-visible font-normal text-[#4200FF]">
              from anywhere.
            </span>
          </h1>
        </div>

        {/* Bottom Section - Studio/Based/Founded - Mismo px-[5vw] */}
        <div className="hero-bottom px-[7.5vw]">
          <div className="flex gap-12 md:gap-20">
            <div>
              <p className="text-[10px] md:text-xs text-[#888] uppercase tracking-wider mb-1">
                Studio
              </p>
              <p className="text-sm md:text-base font-medium text-white/90">
                Innovafy
              </p>
            </div>
            <div>
              <p className="text-[10px] md:text-xs text-[#888] uppercase tracking-wider mb-1">
                Based
              </p>
              <p className="text-sm md:text-base font-medium text-white/90">
                Global / Remote
              </p>
            </div>
            <div>
              <p className="text-[10px] md:text-xs text-[#888] uppercase tracking-wider mb-1">
                Founded
              </p>
              <p className="text-sm md:text-base font-medium text-white/90">
                2013
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
