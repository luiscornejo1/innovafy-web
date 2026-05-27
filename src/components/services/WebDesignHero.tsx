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
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-32 pb-20 bg-transparent"
    >
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center flex-1">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center z-10">
          <div className="fade-up flex items-center gap-4 mb-8 lg:mb-12">
            <div className="h-[1px] w-8 bg-neutral-900"></div>
            <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-neutral-600">
              Creative web design and development services
            </span>
          </div>

          <h1 className="text-[12vw] sm:text-[10vw] lg:text-[7vw] leading-[0.85] font-black tracking-[-0.04em] text-neutral-950">
            <div className="overflow-hidden pb-2">
              <div className="reveal-text transform origin-bottom">Welcome to</div>
            </div>
            <div className="overflow-hidden pb-2">
              <div className="reveal-text transform origin-bottom">the digital</div>
            </div>
            <div className="overflow-hidden pb-2">
              <div className="reveal-text transform origin-bottom">renaissance.</div>
            </div>
          </h1>

          <p className="fade-up mt-8 lg:mt-12 text-lg md:text-xl text-neutral-600 max-w-md font-medium leading-relaxed">
            Crafting the future of websites with enjoyably-creative and technologically-advanced design and development.
          </p>
        </div>

        {/* Right Content - Circular Image */}
        <div className="fade-up relative flex justify-center lg:justify-end z-10">
          <div className="relative w-[80vw] h-[80vw] sm:w-[60vw] sm:h-[60vw] lg:w-[40vw] lg:h-[40vw] max-w-[600px] max-h-[600px] rounded-full overflow-hidden shadow-2xl group">
            {/* 
              TODO: Replace this dummy image with your own image or video.
              Example: src="/images/your-hero-image.jpg"
            */}
            <img 
              src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop" 
              alt="Digital renaissance visualization" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Optional gradient overlay to match KOTA's purple vibe */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-transparent mix-blend-multiply pointer-events-none"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
