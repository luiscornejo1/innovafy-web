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
    id: "potencia-tu-marca",
    title: "Potencia tu marca",
    description:
      "Combinamos diseño innovador, tecnología de vanguardia y contenido estratégico para crear sitios web visualmente atractivos y altamente funcionales. Aproveche el poder de las experiencias digitales altamente atractivas para llevar su marca al siguiente nivel.",
    // Cambia la imagen aquí
    image: "/assets/11.jpg",
    bgColor: "bg-inovafy-blue", // Azul principal
    reverse: false,
  },
  {
    id: "experiencias-humanas",
    title: "Experiencias Humanas",
    description:
      "Ofrezca una experiencia de usuario inmersiva que capture la esencia de su marca y conecte con su público objetivo. Desde una navegación intuitiva hasta una narrativa envolvente, cada sitio web está meticulosamente diseñado para captar la atención y dejar una huella imborrable.",
    image: "/assets/12.jpg",
    bgColor: "bg-inovafy-blue-xl", // Azul claro (XL)
    reverse: true,
  },
  {
    id: "robusto-seguro",
    title: "Robusto, Seguro, Flexible",
    description:
      "Cada sitio web que desarrollamos se apoya en una infraestructura segura y de alto rendimiento, adaptada a las necesidades de la organización. Esto garantiza que su presencia digital pueda crecer con la demanda y ofrecer la flexibilidad necesaria para satisfacer las necesidades de su negocio a lo largo del tiempo.",
    image: "/assets/13.jpg",
    bgColor: "bg-inovafy-ink2", // Fondo oscuro (Ink2)
    reverse: false,
  },
  {
    id: "asociaciones",
    title: "Asociaciones gratificantes",
    description:
      "Detrás de cada sitio web de primera categoría hay una colaboración estrecha entre la agencia y el cliente. Trabajamos codo a codo con usted para garantizar resultados que ofrezcan experiencias extraordinarias y generen beneficios. Los premios son importantes, pero su éxito es mucho más valioso.",
    image: "/assets/14.jpg",
    bgColor: "bg-inovafy-blue-l", // Azul claro (Glow)
    reverse: true,
  }
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
                Descubrir más
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
