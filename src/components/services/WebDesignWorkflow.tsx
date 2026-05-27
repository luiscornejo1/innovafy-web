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
    <section ref={sectionRef} className="h-screen w-full bg-transparent overflow-hidden relative flex flex-col pt-28 pb-12">
      
      {/* Título estático */}
      <div className="px-6 lg:px-12 max-w-[1600px] mx-auto w-full mb-12 lg:mb-16 flex-shrink-0 relative z-10">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-neutral-900 mb-4 drop-shadow-sm">
          Website workflow.
        </h2>
        <p className="text-lg md:text-xl text-neutral-800 font-medium drop-shadow-sm">
          Here's an overview of a medium-sized, 14 week website project.
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
