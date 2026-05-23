"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ARTICLES = [
  {
    id: 1,
    // Usando una imagen colorida abstracta de Unsplash similar a la referencia (rosado/relojes)
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", 
    title: "How long does it take to design and build a website?",
    category: "Expertise"
  },
  {
    id: 2,
    // Pantallas y diseño web
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop", 
    title: "10 signs you probably need a new website",
    category: "Expertise"
  },
  {
    id: 3,
    // Personas trabajando (detrás de escena)
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop", 
    title: "Behind the scenes at KOTA: Web Design process",
    category: "Expertise"
  }
];

export default function WebDesignArticles() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animar título y botón
      gsap.fromTo(
        ".articles-header",
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
        ".article-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15, // Las tarjetas aparecen una tras otra con 150ms de diferencia
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
    <section ref={sectionRef} className="bg-black py-24 w-full">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Cabecera: Título y Botón */}
        <div className="articles-header flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-6">
          <h2 className="text-5xl md:text-6xl font-medium tracking-tight text-white">
            Related Articles
          </h2>
          
          <Link href="#" className="flex items-center gap-3 border border-white rounded-full px-5 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors">
            View all articles <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid de Artículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ARTICLES.map((article) => (
            <Link key={article.id} href="#" className="article-card block group">
              {/* Imagen y Etiqueta */}
              <div className="relative w-full aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-xl mb-6">
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 bg-black text-white text-[11px] font-medium tracking-wide uppercase rounded-full">
                    {article.category}
                  </span>
                </div>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Título del artículo */}
              <h3 className="text-white text-[17px] md:text-[19px] font-medium leading-snug tracking-tight group-hover:text-neutral-300 transition-colors">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
