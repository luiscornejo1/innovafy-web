"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sections = [
  {
    id: "01",
    title: "Tune in",
    description:
      "We actually listen. We listen to everyone around us and respect each other's opinions, whether it's our team, our clients, or our friends and family. Two heads are often better than one.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format",
    align: "right", // imagen a la derecha, texto a la izquierda
  },
  {
    id: "02",
    title: "Stay curious",
    description:
      "We never stop learning. Every day brings new questions, and we embrace the unknown with excitement. Curiosity drives our creativity and fuels our growth.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format",
    align: "left", // imagen a la izquierda, texto a la derecha
  },
  {
    id: "03",
    title: "Build together",
    description:
      "Collaboration is at our core. We believe the best ideas come from diverse perspectives. Together, we create solutions that are greater than the sum of their parts.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format",
    align: "right", // imagen a la derecha, texto a la izquierda
  },
  {
    id: "04",
    title: "Deliver excellence",
    description:
      "Mediocrity is not in our vocabulary. We strive for excellence in everything we do, from the smallest detail to the biggest vision. Quality is our signature.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format",
    align: "left", // imagen a la izquierda, texto a la derecha
  },
];

export default function KotaShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".showcase-item").forEach((item: any, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-black py-32 md:py-40 overflow-hidden"
    >
      <div className="editorial-container">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`showcase-item grid lg:grid-cols-2 gap-12 lg:gap-16 mb-24 lg:mb-32 last:mb-0`}
          >
            {/* Imagen - Izquierda o Derecha según align */}
            <div
              className={`${
                section.align === "right" ? "order-1" : "order-2"
              } rounded-3xl overflow-hidden`}
            >
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Contenido de Texto - Izquierda o Derecha según align */}
            <div
              className={`${
                section.align === "right" ? "order-2" : "order-1"
              } flex flex-col justify-center`}
            >
              {/* Número */}
              <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#666] mb-4">
                {section.id}/
              </p>

              {/* Título con Borde Cuadrado */}
              <div className="inline-block border-2 border-black px-6 py-3 md:px-8 md:py-4 mb-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.02em]">
                  {section.title}
                </h2>
              </div>

              {/* Descripción */}
              <p className="text-base md:text-lg leading-relaxed text-[#666] max-w-md">
                {section.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
