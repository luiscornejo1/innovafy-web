"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WORKFLOW_STEPS = [
  {
    id: "immersion",
    title: "Immersion",
    time: "1 week",
    description:
      "Ahead of the website kick off we'll immerse ourselves in your brief, company, and scope of work. We'll carry out competitor and industry analysis, a brand audit and start formulating a first draft of a sitemap. We'll mood board some visual concept directions if needed for the kick off.",
    tags: [
      "Research",
      "Competitor Analysis",
      "Industry Analysis",
      "Mood Boards",
      "Sitemap Creation",
      "Formulate KOTA Team",
    ],
    gradient: "bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
    weekMark: "Week 1",
  },
  {
    id: "kick-off",
    title: "Kick Off Meeting",
    time: "3 hours",
    description:
      "After an initial intro call to say hi, we will prepare a timeline of milestones, starting with a 'Kick Off' meeting with key stakeholders and the KOTA team assigned to your project. Here we will discuss a range of points so we can get started soon after, including project goals, functionality, inspiration and website structure.",
    tags: ["Workshop", "Workshop Playback", "Project Timeline"],
    gradient: "bg-gradient-to-tr from-[#ff4b2b] to-[#ff416c]",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
    weekMark: "Week 1",
  },
  {
    id: "structure",
    title: "Structure & UX",
    time: "2 weeks",
    description:
      "The most important step in order for us to build a solid foundation. We will wireframe your entire website, ensuring we have a structured content hierarchy and a seamless user journey.",
    tags: [
      "Sitemap Validation",
      "User Mapping",
      "Information Architecture",
      "UX Design",
      "Wireframing",
      "Prototyping",
    ],
    gradient: "bg-gradient-to-r from-[#4776e6] to-[#8e54e9]",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=600&auto=format&fit=crop",
    weekMark: "Week 2",
  },
  {
    id: "design",
    title: "UI Design",
    time: "3 weeks",
    description:
      "Bringing the wireframes to life. Our design team will apply your brand guidelines, or create a new digital brand identity, to design a beautiful, engaging, and highly converting user interface.",
    tags: ["UI Design", "Prototyping", "Animations", "Mobile & Desktop Resolutions"],
    gradient: "bg-gradient-to-bl from-[#f2994a] to-[#f2c94c]",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop",
    weekMark: "Week 4",
  },
  {
    id: "development",
    title: "Development",
    time: "8 weeks",
    description:
      "Our expert front and back-end developers will build your custom website. We ensure pixel-perfect implementation, smooth animations, robust CMS integration, and rigorous cross-browser testing.",
    tags: ["Front-end", "Back-end", "CMS Integration", "QA Testing", "Launch"],
    gradient: "bg-gradient-to-br from-[#11998e] to-[#38ef7d]",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
    weekMark: "Week 7",
  },
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
    <section ref={sectionRef} className="h-screen w-full bg-transparent overflow-hidden relative flex flex-col pt-24 pb-12">
      
      {/* Título estático */}
      <div className="px-6 lg:px-12 max-w-[1600px] mx-auto w-full mb-12 flex-shrink-0">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-neutral-900 mb-4">
          Website workflow.
        </h2>
        <p className="text-lg md:text-xl text-neutral-600 font-medium">
          Here's an overview of a medium-sized, 14 week website project.
        </p>
      </div>

      {/* Contenedor principal que se moverá horizontalmente */}
      <div className="flex-1 relative w-full flex items-center">
        <div ref={scrollContainerRef} className="absolute left-6 lg:left-12 flex gap-8 lg:gap-12 items-center">
          
          {WORKFLOW_STEPS.map((step, index) => (
            <div 
              key={step.id} 
              className="w-[85vw] md:w-[600px] lg:w-[800px] bg-white rounded-3xl rounded-tr-[60px] lg:rounded-tr-[100px] p-6 lg:p-12 shadow-xl border border-neutral-100 flex flex-col md:flex-row gap-8 lg:gap-12 flex-shrink-0"
            >
              {/* Imagen/Gradiente circular */}
              <div className="w-full md:w-[250px] lg:w-[300px] aspect-square rounded-full overflow-hidden flex-shrink-0 relative group">
                <div className={`absolute inset-0 ${step.gradient} mix-blend-multiply opacity-80 z-10 transition-opacity duration-500 group-hover:opacity-40`}></div>
                <img src={step.image} alt={step.title} className="w-full h-full object-cover filter grayscale contrast-125" />
              </div>

              {/* Contenido de la tarjeta */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-3xl lg:text-4xl font-medium text-neutral-900">{step.title}</h3>
                  <span className="px-3 py-1 text-sm font-medium border border-neutral-300 rounded-md text-neutral-600">
                    {step.time}
                  </span>
                </div>
                
                <p className="text-neutral-600 mb-8 leading-relaxed">
                  {step.description}
                </p>

                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-3">Work involved</p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-neutral-900 text-white text-xs lg:text-sm font-medium rounded-md">
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
      <div className="h-24 w-full relative overflow-hidden flex-shrink-0 mt-8">
        <div ref={timelineRef} className="absolute top-1/2 left-6 lg:left-12 flex items-center h-[1px] bg-neutral-300" style={{ width: '400vw' }}>
          {WORKFLOW_STEPS.map((step, index) => (
            <div 
              key={`timeline-${step.id}`}
              // El ancho del contenedor de cada marcador debe coincidir aproximadamente con el ancho de las tarjetas (800px) + el gap (48px)
              // Aquí usamos un valor en píxeles aproximado para mantenerlo alineado
              className="w-[85vw] md:w-[648px] lg:w-[848px] flex-shrink-0 relative flex justify-center"
            >
               {/* Línea decorativa vertical */}
               <div className="absolute top-[-24px] left-1/2 w-[1px] h-6 bg-neutral-300"></div>
               {/* Caja de semana */}
               <div className="px-4 py-1.5 bg-white border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 z-10 transform -translate-y-1/2 shadow-sm">
                  {step.weekMark}
               </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
