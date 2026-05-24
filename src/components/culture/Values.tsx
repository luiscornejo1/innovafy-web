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
      // Animación para "OUR"
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

      // Animación para "VALUES"
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

      // Animación para el texto derecho
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

      // Animación para los iconos
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
      className="relative bg-[#F5F2ED] text-[#0A0A0A] py-32 md:py-40 overflow-hidden"
    >
      <div className="editorial-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Lado Izquierdo - OUR / VALUES apilados - TAMAÑO AUMENTADO */}
          <div className="flex flex-col">
            <span className="philosophy-our text-8xl md:text-9xl lg:text-[9rem] font-normal tracking-[-0.03em] leading-[0.9]">
              OUR
            </span>
            <span className="philosophy-values text-8xl md:text-9xl lg:text-[9rem] font-normal tracking-[-0.03em] leading-[0.9] ml-16 md:ml-20 lg:ml-24">
              VALUES
            </span>
          </div>

          {/* Lado Derecho - Texto */}
          <div className="flex flex-col justify-between">
            <h2 className="philosophy-text text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.2] tracking-[-0.02em]">
              Why we love what we do, even a Monday
            </h2>
          </div>
        </div>

        {/* Iconos de Redes Sociales - Circulo blanco, borde negro, icono negro */}
        <div className="social-icons flex justify-end gap-4 mt-0 mr-8 md:mr-12 lg:mr-5">
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black text-black hover:bg-[#4200FF] hover:border-[#4200FF] hover:text-white transition-all duration-300 hover:scale-110"
          >
            <Twitter size={18} />
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black text-black hover:bg-[#4200FF] hover:border-[#4200FF] hover:text-white transition-all duration-300 hover:scale-110"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black text-black hover:bg-[#4200FF] hover:border-[#4200FF] hover:text-white transition-all duration-300 hover:scale-110"
          >
            <Instagram size={18} />
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black text-black hover:bg-[#4200FF] hover:border-[#4200FF] hover:text-white transition-all duration-300 hover:scale-110"
          >
            <Youtube size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
