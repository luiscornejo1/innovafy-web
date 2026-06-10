"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cultureValues, cultureGallery } from "../../data/cultureContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CultureShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación para cada item del showcase
      gsap.utils.toArray<HTMLElement>(".showcase-item").forEach((item, i) => {
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

      // Animación para la galería final
      gsap.utils.toArray<HTMLElement>(".gallery-reveal").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f0ece5] text-black py-12 md:py-16 overflow-hidden"
    >
      {/* Contenedor con márgenes para las secciones de texto e imagen */}
      <div className="max-w-[1500px] mx-auto pl-10 md:pl-16 lg:pl-24 pr-14 md:pr-20 lg:pr-24">
        {cultureValues.map((value, idx) => {
          // Alternar alignment: idx 0 = derecha, idx 1 = izquierda, idx 2 = derecha, etc.
          const isImageRight = idx % 2 === 0;

          return (
            <div
              key={value.id}
              className={`showcase-item flex flex-col lg:flex-row ${
                !isImageRight ? "lg:flex-row-reverse" : ""
              } gap-16 lg:gap-28 items-center mb-9 lg:mb-15 last:mb-0`}
            >
              {/* TEXTO - con más ancho antes de saltar de línea */}
              <div
                className={`flex flex-col justify-center w-full lg:w-1/2 ${
                  !isImageRight ? "lg:ml-12 xl:ml-20" : ""
                }`}
              >
                <p className="text-2xl md:text-3xl text-[#080707] mb-3 font-normal">
                  {value.id}/
                </p>

                {/* Subrayado más grande, sin rayita lateral, con bordes redondeados */}
                <div className="inline-block w-fit mb-10">
                  <h2
                    className="text-3xl md:text-4xl lg:text-3xl font-normal whitespace-nowrap border-black rounded-full pb-2 px-5"
                    style={{
                      backgroundColor: value.color,
                    }}
                  >
                    {value.title}
                  </h2>
                </div>

                {/* max-w-md → max-w-lg para texto más ancho */}
                <p className="text-base md:text-lg lg:text-2xl leading-snug text-[#272727] max-w-lg">
                  {value.description}
                </p>
              </div>

              {/* IMAGEN - más alta y con menos redondeo */}
              <div
                className={`w-full overflow-hidden ${
                  !isImageRight
                    ? "rounded-tl-[150px] lg:w-[50%]"
                    : "rounded-tr-[200px] lg:w-[44%]"
                }`}
              >
                <img
                  src={value.image}
                  alt={value.title}
                  className="w-full h-[580px] md:h-[650px] lg:h-[560px] object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* IMAGEN FINAL - ANCHO COMPLETO y más alta */}
      <div className="mt-16 md:mt-24 w-full overflow-hidden">
        <img
          src={cultureGallery.fullWidth}
          alt="Full width culture image"
          className="w-full h-[480px] md:h-[580px] lg:h-[720px] object-cover hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
      </div>

      {/* GALERÍA - CON MÁRGENES LATERALES Y EFECTO HOVER, más alta */}
      <div className="mt-12 md:mt-16 w-full px-4 md:px-8 lg:px-12">
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Imagen GRANDE: 3/4 del ancho - más alta */}
          <div className="gallery-reveal w-full md:w-3/4 h-[360px] md:h-[460px] lg:h-[540px] overflow-hidden rounded-xl group cursor-pointer">
            <img
              src={cultureGallery.left}
              alt="Wide gallery image"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
              loading="lazy"
            />
          </div>

          {/* Imagen PEQUEÑA: 1/4 del ancho - más alta */}
          <div className="gallery-reveal w-full md:w-1/4 h-[360px] md:h-[460px] lg:h-[540px] overflow-hidden rounded-xl group cursor-pointer">
            <img
              src={cultureGallery.right}
              alt="Tall gallery image"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
