"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// ¡AQUÍ PUEDES AGREGAR MÁS PROYECTOS!
// Simplemente añade un nuevo objeto al array siguiendo el mismo formato.
// Puedes usar URLs de imágenes, GIFs animados o videos cortos.
// ============================================================================
const PROJECTS = [
  {
    id: 1,
    name: "UPP",
    year: "2025",
    // Imagen o GIF de fondo (puedes reemplazar esto por el link a tu GIF o imagen animada)
    media: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Incentive Games",
    year: "2025",
    media: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "The Goat Agency",
    year: "2025",
    media: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Bipsync",
    year: "2025",
    media: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function WebDesignRelatedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animar título y botón
      gsap.fromTo(
        ".projects-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Animar las tarjetas escalonadamente
      gsap.fromTo(
        ".project-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-24 w-full overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Cabecera: Título y Botón */}
        <div className="projects-header flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-6">
          <h2 className="text-5xl md:text-6xl lg:text-[80px] font-medium tracking-tight text-white leading-none">
            Related Projects
          </h2>
          
          <Link href="#" className="flex items-center gap-3 border border-white rounded-full px-6 py-3 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors">
            View all projects <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROJECTS.map((project) => (
            <Link key={project.id} href="#" className="project-card block group">
              {/* Contenedor de la Tarjeta */}
              <div className="w-full flex flex-col border border-neutral-800 rounded-[20px] overflow-hidden bg-black transition-colors duration-300 hover:border-neutral-600">
                
                {/* Barra Superior */}
                <div className="flex justify-between items-center px-6 py-5">
                  <div className="flex items-center gap-2">
                    <ArrowDownRight size={18} className="text-[#a87ffb]" />
                    <span className="text-white text-[16px] font-medium tracking-wide">{project.name}</span>
                  </div>
                  <span className="text-white text-[15px] font-medium">{project.year}</span>
                </div>

                {/* Área de Imagen / GIF */}
                <div className="relative w-full aspect-[16/10] lg:aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.media} 
                    alt={project.name} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Capa oscura sutil al hacer hover */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
