"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const values = [
  {
    number: "01",
    title: "Design First",
    desc: "Every pixel tells a story. Beauty and function in perfect harmony.",
  },
  {
    number: "02",
    title: "Radical Innovation",
    desc: "Pushing boundaries daily. If it's been done before, we do it better.",
  },
  {
    number: "03",
    title: "Deep Collaboration",
    desc: "Better together. We grow with our clients, not just for them.",
  },
  {
    number: "04",
    title: "Relentless Excellence",
    desc: "No compromises. Good enough is never enough.",
  },
];

export default function KotaValues() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".value-item",
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-[#0A0A0A]">
      <div className="editorial-container">
        <div className="mb-16">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#888] mb-4">
            Core Values
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.2] max-w-3xl">
            What guides everything we do.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 border-t border-[#222] pt-12">
          {values.map((value, i) => (
            <div key={i} className="value-item group cursor-pointer">
              <div className="flex items-start justify-between">
                <span className="text-[#4200FF] text-sm font-mono tracking-wider">
                  {value.number}
                </span>
                <div className="w-8 h-8 rounded-full border border-[#333] group-hover:border-[#4200FF] transition-all duration-300 flex items-center justify-center">
                  <span className="text-[#4200FF] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-medium mt-6 mb-4 group-hover:text-[#4200FF] transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-[#888] text-sm md:text-base leading-relaxed max-w-md">
                {value.desc}
              </p>
              <div className="mt-6 w-12 h-[1px] bg-[#333] group-hover:w-20 group-hover:bg-[#4200FF] transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
