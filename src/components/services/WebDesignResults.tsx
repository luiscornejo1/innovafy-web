"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WebDesignResults() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animar todo el bloque cuando aparece en pantalla
      gsap.fromTo(
        ".results-box",
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Animar los mockups de derecha a izquierda
      gsap.fromTo(
        ".mockup-card",
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 lg:px-12 max-w-[1600px] mx-auto overflow-hidden">
      {/* Título */}
      <div className="mb-12">
        <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-neutral-900 mb-4">
          Our Results
        </h2>
        <p className="text-xl text-neutral-600 font-medium">The proof is in the pudding</p>
      </div>

      {/* Contenedor principal con gradiente */}
      <div className="results-box relative w-full bg-gradient-to-r from-[#fdfbfb] via-[#e5e1ff] to-[#d9129d] rounded-[40px] lg:rounded-l-[40px] lg:rounded-r-[120px] shadow-2xl p-8 lg:p-16 flex flex-col lg:flex-row items-center border border-neutral-100">
        
        {/* Contenido izquierdo (Texto) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center z-10 mb-12 lg:mb-0">
          <div className="mb-12">
            {/* Logo placeholder */}
            <div className="flex items-center gap-2 font-bold text-xl tracking-widest uppercase mb-16">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 22h20L12 2z" />
              </svg>
              ISI GLOBAL
            </div>
          </div>
          
          <div className="flex items-baseline text-[#5b7a9e] mb-4">
            <span className="text-8xl md:text-[140px] font-medium leading-none tracking-tighter">
              104.9
            </span>
            <span className="text-6xl md:text-8xl font-medium leading-none text-[#8e4585]">%</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-medium text-neutral-900 mb-12 max-w-md">
            increase in organic visits after 1 month
          </h3>

          <div>
            <Link
              href="/portfolio/isi-global"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-neutral-900 text-neutral-900 font-medium hover:bg-neutral-900 hover:text-white transition-colors group"
            >
              View project
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Contenido derecho (Mockups flotantes) */}
        <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[600px] flex items-center justify-center lg:justify-end">
          
          {/* Mockup 1 (Izquierda, más pequeño) */}
          <div className="mockup-card absolute left-0 lg:left-[10%] top-[20%] w-[180px] lg:w-[220px] rounded-3xl overflow-hidden shadow-2xl border-4 border-neutral-900 bg-neutral-900 z-10 transform -rotate-2">
            {/* TODO: Reemplazar con tu imagen real */}
            <div className="h-6 w-full flex items-center px-4 bg-neutral-900">
               <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop" 
              alt="Mockup 1" 
              className="w-full h-auto aspect-[1/2] object-cover"
            />
          </div>

          {/* Mockup 2 (Centro, principal) */}
          <div className="mockup-card absolute left-[30%] lg:left-[35%] top-[5%] w-[220px] lg:w-[280px] rounded-3xl overflow-hidden shadow-2xl border-4 border-neutral-900 bg-neutral-900 z-20">
             {/* TODO: Reemplazar con tu imagen real */}
             <div className="h-6 w-full flex items-center px-4 bg-neutral-900">
               <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=600&auto=format&fit=crop" 
              alt="Mockup 2" 
              className="w-full h-auto aspect-[1/2] object-cover grayscale opacity-90 mix-blend-luminosity bg-black"
            />
            {/* Gráfico decorativo tipo KOTA */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-screen">
               <svg className="w-3/4 h-3/4 text-[#b7ff00]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8">
                  <path d="M 20 80 Q 50 10 80 80 Q 50 150 20 80" strokeLinecap="round" />
               </svg>
            </div>
          </div>

          {/* Mockup 3 (Derecha, más pequeño) */}
          <div className="mockup-card absolute right-0 lg:right-[5%] top-[15%] w-[180px] lg:w-[220px] rounded-3xl overflow-hidden shadow-2xl border-4 border-neutral-900 bg-neutral-900 z-10 transform rotate-3">
             {/* TODO: Reemplazar con tu imagen real */}
             <div className="h-6 w-full flex items-center px-4 bg-neutral-900">
               <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" 
              alt="Mockup 3" 
              className="w-full h-auto aspect-[1/2] object-cover"
            />
          </div>
          
        </div>

        {/* Botón flecha esquina inferior derecha */}
        <div className="absolute bottom-8 right-8 z-30">
          <button className="w-14 h-14 rounded-full border-2 border-neutral-900 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
