"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WebDesignDiscover() {
  const categories = [
    "Web design & development",
    "Creative web design",
    "Web development",
    "E-Commerce",
    "WordPress",
    "Copywriting"
  ];

  return (
    <section className="bg-black py-24 w-full">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Lado izquierdo: Título y Tags */}
        <div className="flex-1">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-white leading-none mb-8">
            Discover more
          </h2>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <span 
                key={category}
                className="px-5 py-2.5 rounded-full border border-white text-white text-[14px] font-medium tracking-wide hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Lado derecho: Botón Hire us */}
        <div className="flex-shrink-0">
          <Link href="/contact" className="flex items-center gap-3 bg-white text-black rounded-full px-6 py-3 text-sm font-bold tracking-wide hover:bg-neutral-200 transition-colors">
            Hire us <ArrowRight size={16} />
          </Link>
        </div>

      </div>
      
      {/* Separador inferior sutil */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mt-24">
        <div className="w-full h-[1px] bg-white/20"></div>
      </div>
    </section>
  );
}
