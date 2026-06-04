"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    align: "right",
  },
  {
    id: "02",
    title: "Stay curious",
    description:
      "We never stop learning. Every day brings new questions, and we embrace the unknown with excitement. Curiosity drives our creativity and fuels our growth.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format",
    align: "left",
  },
  {
    id: "03",
    title: "Build together",
    description:
      "Collaboration is at our core. We believe the best ideas come from diverse perspectives. Together, we create solutions that are greater than the sum of their parts.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format",
    align: "right",
  },
  {
    id: "04",
    title: "Deliver excellence",
    description:
      "Mediocrity is not in our vocabulary. We strive for excellence in everything we do, from the smallest detail to the biggest vision. Quality is our signature.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format",
    align: "left",
  },
];

export default function CultureShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".showcase-item").forEach((item: any, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.12,
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
      className="relative bg-[#f0ece5] text-black py-12 md:py-16 overflow-hidden"
    >
      {/* Contenedor CON márgenes para las secciones de texto e imagen */}
      <div className="max-w-[1500px] mx-auto pl-10 md:pl-16 lg:pl-24 mr-14 md:mr-20 lg:mr-24">
        {sections.map((section) => {
          const isImageRight = section.align === "right";

          return (
            <div
              key={section.id}
              className={`showcase-item flex flex-col lg:flex-row ${
                !isImageRight ? "lg:flex-row-reverse" : ""
              } gap-16 lg:gap-28 items-center mb-9 lg:mb-15 last:mb-0`}
            >
              {/* TEXTO */}
              <div
                className={`flex flex-col justify-center w-full lg:w-1/2 ${
                  !isImageRight ? "ml-12 md:ml-16 lg:ml-20" : ""
                }`}
              >
                <p className="text-2xl md:text-3xl text-[#999] mb-4">
                  {section.id}/
                </p>

                <div className="inline-block w-fit py-2 mb-10 border-l-2 border-black pl-4">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-normal whitespace-nowrap">
                    {section.title}
                  </h2>
                </div>

                <p className="text-base md:text-lg leading-relaxed text-[#272727] max-w-md">
                  {section.description}
                </p>
              </div>

              {/* IMAGEN */}
              <div
                className={`w-full lg:w-[45%] overflow-hidden rounded-[2px] ${
                  !isImageRight ? "rounded-tl-[180px]" : "rounded-tr-[180px]"
                }`}
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-[320px] md:h-[400px] lg:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ====================================================== */}
      {/* IMAGEN FINAL - ANCHO COMPLETO (un poco más larga) */}
      {/* ====================================================== */}
      <div className="mt-16 md:mt-24 w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format"
          alt="Full width culture image"
          className="w-full h-[380px] md:h-[480px] lg:h-[620px] object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* ====================================================== */}
      {/* GALERÍA - CON MÁRGENES LATERALES Y EFECTO HOVER */}
      {/* ====================================================== */}
      <div className="mt-12 md:mt-16 w-full px-4 md:px-8 lg:px-12">
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Imagen GRANDE: 3/4 del ancho - CON EFECTO HOVER MEJORADO */}
          <div className="w-full md:w-3/4 h-[280px] md:h-[380px] overflow-hidden rounded-xl group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format"
              alt="Wide gallery image"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
            />
          </div>

          {/* Imagen PEQUEÑA: 1/4 del ancho - CON EFECTO HOVER MEJORADO */}
          <div className="w-full md:w-1/4 h-[280px] md:h-[380px] overflow-hidden rounded-xl group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format"
              alt="Tall gallery image"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
