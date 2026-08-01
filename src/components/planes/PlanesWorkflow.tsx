"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type PlanesWorkflowStep = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  image: string;
};

export type PlanesWorkflowProps = {
  title: string;
  description: string;
  steps: PlanesWorkflowStep[];
  tagsLabel?: string;
};

export default function PlanesWorkflow({
  title,
  description,
  steps,
  tagsLabel = "Work involved",
}: PlanesWorkflowProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const containerWidth = scrollContainerRef.current!.scrollWidth;
      const windowWidth = window.innerWidth;
      const moveDistance = containerWidth - windowWidth + 100;

      gsap.to([scrollContainerRef.current], {
        x: -moveDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${moveDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [steps]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col overflow-hidden bg-transparent pb-12 pt-28"
    >
      <div className="relative z-10 mx-auto mb-12 w-full max-w-[1600px] flex-shrink-0 px-6 lg:mb-16 lg:px-12">
        <h2 className="mb-6 text-3xl font-normal tracking-tight text-neutral-900 drop-shadow-sm md:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p className="max-w-2xl text-lg font-light text-neutral-800 drop-shadow-sm md:text-xl">
          {description}
        </p>
      </div>

      <div className="relative flex w-full flex-1 items-start">
        <div
          ref={scrollContainerRef}
          className="absolute left-6 flex items-start gap-8 lg:left-12 lg:gap-12"
        >
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex w-[85vw] flex-shrink-0 flex-col items-center gap-6 rounded-none rounded-tr-[80px] bg-[#f4f4f5] p-6 md:w-[600px] md:flex-row md:gap-10 lg:w-[750px] lg:rounded-tr-[100px] lg:p-10"
            >
              <div className="group relative aspect-square w-[180px] flex-shrink-0 overflow-hidden rounded-full md:w-[200px] lg:w-[220px]">
                <div
                  className={`absolute inset-0 z-10 ${step.gradient} opacity-80 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-40`}
                />
                <img
                  src={step.image}
                  alt={step.title}
                  className="h-full w-full object-cover contrast-125 grayscale"
                />
              </div>

              <div className="flex flex-1 flex-col justify-center">
                <div className="mb-8 flex items-center gap-4">
                  <h3 className="text-3xl font-normal leading-none tracking-tight text-neutral-900 lg:text-[40px] mb-18">
                    {step.title}
                  </h3>
                </div>

                <p className="text-[13px] leading-relaxed text-neutral-700 lg:text-[14px]">
                  {step.description}
                </p>

                <div className="mt-5">
                  <p className="mb-2 text-[13px] font-medium text-neutral-500">
                    {tagsLabel}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-[#0a0a0a] px-3 py-1.5 text-[12px] font-normal text-white"
                      >
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
    </section>
  );
}
