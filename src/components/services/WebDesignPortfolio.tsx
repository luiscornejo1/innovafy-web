"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { ArrowDownLeft } from "lucide-react";

// TODO: Modifica los nombres de tus filtros aquí
const FILTERS = [
  "Diseño y desarrollo web",
  "Diseño web creativo",
  "Desarrollo web",
  "E-Commerce",
  "WordPress",
  "Copywriting",
];

// TODO: Reemplaza estas URLs y textos con tus verdaderas imágenes de portafolio.
// El id determina en qué posición de la cuadrícula aparecerán (en pantallas grandes).
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Innovafy",
    category: "Diseño y desarrollo web",
    image: "/assets/Frame.jpg",
    // Esta será la imagen grande de la izquierda
    gridClass: "lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2",
  },
  {
    id: 2,
    title: "Identidad",
    category: "Diseño web creativo",
    image: "/assets/logos_inovafy (1).jpg",
    // Esta será la imagen cuadrada superior del medio
    gridClass: "lg:col-start-3 lg:col-span-1 lg:row-start-1 lg:row-span-1",
  },
  {
    id: 3,
    title: "Marca",
    category: "Identidad de Marca",
    image: "/assets/logos_inovafy (1)_4.png",
    // Esta será la imagen cuadrada inferior del medio
    gridClass: "lg:col-start-3 lg:col-span-1 lg:row-start-2 lg:row-span-1",
  },
  {
    id: 4,
    title: "Desarrollo",
    category: "Desarrollo web",
    image: "/assets/15.jpg",
    // Esta será la imagen vertical alargada de la derecha
    gridClass: "lg:col-start-4 lg:col-span-1 lg:row-start-1 lg:row-span-2",
  },
];

export default function WebDesignPortfolio() {
  const [activeFilter, setActiveFilter] = useState("Web design & development");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".portfolio-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".portfolio-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-12 bg-transparent">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 mt-8">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-neutral-500 mb-6">
              Descubrir más
            </span>
            
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    activeFilter === filter
                      ? "bg-black text-white border-black"
                      : "bg-transparent text-black border-black hover:bg-neutral-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          {/* Huge Arrow */}
          <div className="hidden md:block pb-1">
            <ArrowDownLeft size={64} className="text-black" strokeWidth={1} />
          </div>
        </div>

        {/* Masonry Grid Layout */}
        {/* Usamos auto-rows para que las celdas individuales tengan una altura base, y los row-span funcionen correctamente */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:auto-rows-[300px]">
          {PORTFOLIO_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`portfolio-item relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg bg-neutral-100 ${item.gridClass} min-h-[300px]`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay suave al pasar el mouse */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
              
              {/* Contenido (Textos) */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-black text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-2xl font-bold text-white drop-shadow-md">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
