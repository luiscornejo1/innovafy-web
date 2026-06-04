"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WORKFLOW_STEPS = [
  {
    id: "idea",
    title: "De la idea a la ejecución",
    time: "Capacidad",
    description:
      "Desarrollamos el producto íntegramente internamente, desde la estrategia inicial hasta el resultado final. Esto significa que todo lo que hacemos cumple su función y se produce con la máxima calidad.",
    tags: [
      "Estrategia",
      "Diseño",
      "Ejecución"
    ],
    gradient: "bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]",
    image: "/assets/15.jpg",
    weekMark: "Estrategia",
  },
  {
    id: "fullstack",
    title: "Full Stack",
    time: "Capacidad",
    description:
      "Somos un espacio que reúne tanto a generalistas como a especialistas, abarcando bajo un mismo techo el desarrollo de interfaces de usuario, el diseño de interacción, la configuración de CMS y el desarrollo técnico.",
    tags: ["UI/UX", "CMS", "Frontend", "Backend"],
    gradient: "bg-gradient-to-tr from-[#ff4b2b] to-[#ff416c]",
    image: "/assets/16.jpg",
    weekMark: "Desarrollo",
  },
  {
    id: "neutralidad",
    title: "Neutralidad tecnológica",
    time: "Capacidad",
    description:
      "La mejor tecnología es la que funciona. Escuchamos y observamos constantemente para poder recomendarle la solución óptima para su problema empresarial.",
    tags: [
      "Consultoría",
      "Arquitectura",
      "Soluciones",
    ],
    gradient: "bg-gradient-to-r from-[#4776e6] to-[#8e54e9]",
    image: "/assets/17.jpg",
    weekMark: "Arquitectura",
  },
  {
    id: "integrado",
    title: "Integrado",
    time: "Capacidad",
    description:
      "Colocamos su sitio web en el centro de su ecosistema digital, proporcionando integraciones API seguras y soluciones automatizadas en todos sus sistemas empresariales.",
    tags: ["APIs", "Automatización", "Sistemas", "Integración"],
    gradient: "bg-gradient-to-bl from-[#f2994a] to-[#f2c94c]",
    image: "/assets/18.jpg",
    weekMark: "Integración",
  }
];

export default function WebDesignWorkflow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      const containerWidth = scrollContainerRef.current!.scrollWidth;
      const windowWidth = window.innerWidth;
      
      // Calculate how far we need to move to the left
      const moveDistance = containerWidth - windowWidth + 100; // Added extra padding at the end

      // Horizontal Scroll Animation
      gsap.to([scrollContainerRef.current, timelineRef.current], {
        x: -moveDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // When the section hits the top of the viewport
          end: () => `+=${moveDistance}`, // Pin duration equals the scroll distance
          pin: true,
          scrub: 1, // Smooth scrubbing
          invalidateOnRefresh: true, // Recalculate on window resize
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full bg-transparent overflow-hidden relative flex flex-col pt-28 pb-12">
      
      {/* Título estático */}
      <div className="px-6 lg:px-12 max-w-[1600px] mx-auto w-full mb-12 lg:mb-16 flex-shrink-0 relative z-10">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-neutral-900 mb-4 drop-shadow-sm">
          Experiencias Digitales Extraordinarias.
        </h2>
        <p className="text-lg md:text-xl text-neutral-800 font-medium drop-shadow-sm max-w-3xl">
          Aprovechamos nuestras fortalezas: Durante más de 14 años hemos ideado, creado y lanzado productos maravillosos en Internet.
        </p>
      </div>

      {/* Contenedor principal que se moverá horizontalmente */}
      <div className="flex-1 relative w-full flex items-start">
        <div ref={scrollContainerRef} className="absolute left-6 lg:left-12 flex gap-8 lg:gap-12 items-start">
          
          {WORKFLOW_STEPS.map((step, index) => (
            <div 
              key={step.id} 
              className="w-[85vw] md:w-[600px] lg:w-[750px] bg-[#f4f4f5] rounded-none rounded-tr-[80px] lg:rounded-tr-[100px] p-6 lg:p-10 flex flex-col md:flex-row gap-6 lg:gap-10 flex-shrink-0 items-center"
            >
              {/* Imagen/Gradiente circular */}
              <div className="w-[180px] md:w-[200px] lg:w-[220px] aspect-square rounded-full overflow-hidden flex-shrink-0 relative group">
                <div className={`absolute inset-0 ${step.gradient} mix-blend-multiply opacity-80 z-10 transition-opacity duration-500 group-hover:opacity-40`}></div>
                <img src={step.image} alt={step.title} className="w-full h-full object-cover filter grayscale contrast-125" />
              </div>

              {/* Contenido de la tarjeta */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-3xl lg:text-[40px] tracking-tight font-medium text-neutral-900 leading-none">{step.title}</h3>
                  <span className="px-2 py-1 text-[11px] lg:text-[12px] font-medium border border-neutral-300 rounded text-neutral-600">
                    {step.time}
                  </span>
                </div>
                
                <p className="text-neutral-700 leading-relaxed text-[14px] lg:text-[15px]">
                  {step.description}
                </p>

                <div className="mt-5">
                  <p className="text-[13px] font-medium text-neutral-500 mb-2">Work involved</p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-[#0a0a0a] text-white text-[12px] font-medium rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Línea de tiempo (Timeline) en la parte inferior */}
      <div className="absolute bottom-4 lg:bottom-12 left-0 h-24 w-full overflow-hidden z-20 pointer-events-none">
        <div ref={timelineRef} className="absolute top-1/2 left-6 lg:left-12 flex items-center h-[1px] bg-neutral-400" style={{ width: '400vw' }}>
          {WORKFLOW_STEPS.map((step, index) => (
            <div 
              key={`timeline-${step.id}`}
              className="w-[85vw] md:w-[648px] lg:w-[848px] flex-shrink-0 relative flex justify-center"
            >
               {/* Línea decorativa vertical */}
               <div className="absolute top-[-24px] left-1/2 w-[1px] h-6 bg-neutral-400 pointer-events-auto"></div>
               {/* Caja de semana */}
               <div className="px-3 py-1 bg-white border border-neutral-300 rounded text-[13px] font-medium text-neutral-800 z-10 transform -translate-y-1/2 pointer-events-auto">
                  {step.weekMark}
               </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
