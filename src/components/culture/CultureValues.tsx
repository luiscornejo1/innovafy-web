"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function KotaPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".philosophy-our",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".philosophy-values",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".philosophy-text",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".social-icons",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f0ece5] text-[#0A0A0A] pt-28 md:pt-32 pb-0 overflow-hidden"
    >
      {/* Contenedor con márgenes laterales aumentados */}
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 lg:px-20">
        {/* GRID SIN ESPACIO */}
        <div className="grid lg:grid-cols-2 gap-0">
          {/* IZQUIERDA */}
          <div className="flex flex-col">
            <span className="philosophy-our text-8xl md:text-9xl lg:text-[9rem] font-normal tracking-[-0.03em] leading-[0.85] ml-2">
              OUR
            </span>
            <span className="philosophy-values text-8xl md:text-9xl lg:text-[9rem] font-normal tracking-[-0.03em] leading-[0.85] ml-22 md:ml-26 lg:ml-36">
              VALUES
            </span>
          </div>

          {/* DERECHA */}
          <div className="flex flex-col">
            <h2 className="philosophy-text text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-[-0.02em]">
              Why we love what we do, even a Monday
            </h2>
          </div>
        </div>

        {/* ICONOS SIN ESPACIO */}
        <div className="social-icons flex justify-end gap-4 mt-0 pt-0 pb-0 mr-6 md:mr-10 lg:mr-5">
          <a className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black text-black hover:bg-[#4200FF] hover:border-[#4200FF] hover:text-white transition-all duration-300">
            <Twitter size={18} />
          </a>
          <a className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black text-black hover:bg-[#4200FF] hover:border-[#4200FF] hover:text-white transition-all duration-300">
            <Linkedin size={18} />
          </a>
          <a className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black text-black hover:bg-[#4200FF] hover:border-[#4200FF] hover:text-white transition-all duration-300">
            <Instagram size={18} />
          </a>
          <a className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black text-black hover:bg-[#4200FF] hover:border-[#4200FF] hover:text-white transition-all duration-300">
            <Youtube size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
