"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function WebDesignHero() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      // Reveal text animation
      gsap.fromTo(
        ".reveal-text",
        {
          y: "110%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
        }
      );

      // Fade in animations
      gsap.fromTo(
        ".fade-up",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.4, ease: "power3.out", stagger: 0.2 }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative flex flex-col justify-center px-6 lg:px-12 pt-40 pb-0 bg-transparent overflow-hidden"
    >
      <div className="max-w-[1500px] w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
        
        {/* Left Column: Huge Typography */}
        <div className="flex flex-col z-10 lg:w-[55%]">
          <h1 className="text-[14vw] sm:text-[12vw] lg:text-[8vw] leading-[0.85] font-normal tracking-tighter text-black">
            <div className="overflow-hidden pb-2 lg:pb-4">
              <div className="reveal-text">Sitios web de</div>
            </div>
            <div className="overflow-hidden pb-2 lg:pb-4">
              <div className="reveal-text">primera <span className="font-bold">categoría</span></div>
            </div>
            <div className="overflow-hidden pb-2 lg:pb-4">
              <div className="reveal-text">para marcas innovadoras.</div>
            </div>
          </h1>
        </div>

        {/* Right Column: Circular Image & Paragraph */}
        <div className="flex flex-col z-10 lg:w-[45%] items-center lg:items-end mt-12 lg:mt-0">
          
          {/* Circular Image - Larger size like reference */}
          <div className="fade-up relative w-[75vw] h-[75vw] md:w-[50vw] md:h-[50vw] lg:w-[42vw] lg:h-[42vw] max-w-[650px] max-h-[650px] rounded-full overflow-hidden mb-12 lg:-mr-12">
            <img 
              src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop" 
              alt="Digital renaissance visualization" 
              className="absolute inset-0 w-full h-full object-cover scale-105"
            />
          </div>

          {/* Paragraph placed below the circle image, aligned to the left of the column */}
          <div className="fade-up max-w-[340px] w-full text-left self-start lg:ml-12">
            <p className="text-base md:text-lg text-black font-normal leading-relaxed">
              Productos digitales extraordinarios. Aumenta el valor de tu marca con una plataforma rápida, escalable y centrada en la conversión.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
