"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// TODO: Cambia los textos, URLs de imágenes y colores de fondo según tu preferencia.
const FEATURES = [
  {
    id: "creative-web-design",
    title: "Creative web design.",
    description:
      "Drawing inspiration from different mediums, trends and audiences, we craft thoughtful, creative websites that help brands put their best digital foot forwards.",
    // Cambia la imagen aquí
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop",
    bgColor: "bg-[#FF5C35]", // Naranja similar a KOTA
    reverse: false,
  },
  {
    id: "web-development",
    title: "Web development.",
    description:
      "Powered by front-end technologies and forward-thinking concepts, we make animated and interactive elements that enhance your website without slowing it down.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    bgColor: "bg-gradient-to-br from-[#c1e8ff] to-[#f4f186]", // Gradiente azul/amarillo
    reverse: true,
  },
  {
    id: "copywriting",
    title: "Copywriting.",
    description:
      "We craft purposeful copy that packs a punch – not only telling your story, but selling your brand.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=1000&auto=format&fit=crop",
    bgColor: "bg-[#f4f186]", // Amarillo
    reverse: false,
  },
  {
    id: "ecommerce",
    title: "E-Commerce.",
    description:
      "Transform your online store with seamless, high-converting e-commerce solutions tailored to your unique brand needs and designed to maximize sales.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop",
    bgColor: "bg-[#d4c1ff]", // Morado suave
    reverse: true,
  },
  {
    id: "wordpress",
    title: "WordPress.",
    description:
      "Robust, scalable, and easy-to-manage WordPress websites that give you full control over your content and digital presence.",
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1000&auto=format&fit=crop",
    bgColor: "bg-[#ffc1e3]", // Rosa suave
    reverse: false,
  },
];

export default function WebDesignFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Seleccionamos cada sección de característica
      const features = gsap.utils.toArray<HTMLElement>(".feature-section");

      features.forEach((feature) => {
        const textContent = feature.querySelector(".feature-text");
        const imageContent = feature.querySelector(".feature-image");

        // Animación del texto
        gsap.fromTo(
          textContent,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: feature,
              start: "top 75%", // Empieza a animar cuando el 75% del viewport toca la sección
              toggleActions: "play none none reverse",
            },
          }
        );

        // Animación de la imagen (ligero zoom y slide up)
        gsap.fromTo(
          imageContent,
          { opacity: 0, scale: 0.9, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: feature,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-24 lg:gap-32 py-24 bg-transparent overflow-hidden">
      {FEATURES.map((feature) => (
        <section
          key={feature.id}
          className={`feature-section max-w-[1400px] mx-auto w-full px-6 lg:px-12 flex flex-col ${
            feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center gap-12 lg:gap-0`}
        >
          {/* Text Area (50%) */}
          <div
            className={`feature-text w-full lg:w-1/2 flex flex-col justify-center ${
              feature.reverse ? "lg:pl-20" : "lg:pr-20"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 mb-6">
              {feature.title}
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 font-medium leading-relaxed mb-10 max-w-lg">
              {feature.description}
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 text-sm font-medium hover:bg-black hover:text-white hover:border-black transition-colors group"
              >
                Find out more
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Image Area (50%) */}
          <div className="feature-image w-full lg:w-1/2 relative">
            <div
              className={`w-full aspect-[4/3] lg:aspect-square ${
                feature.bgColor
              } relative overflow-hidden shadow-xl ${
                feature.reverse
                  ? "rounded-3xl lg:rounded-l-[80px] lg:rounded-r-3xl"
                  : "rounded-3xl lg:rounded-r-[80px] lg:rounded-l-3xl"
              }`}
            >
              {/* 
                TODO: Replace this img tag with your actual mockups/designs. 
                In KOTA's site, they have floating phones/laptops over the colored background.
                For now, we use a stock image perfectly centered.
              */}
              <div className="absolute inset-8 lg:inset-16 overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
