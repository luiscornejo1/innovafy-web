"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const team = [
  {
    name: "Darwin Tantalean",
    role: "Founder & Creative Director",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format",
  },
  {
    name: "Maria Gonzales",
    role: "Head of Strategy",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format",
  },
  {
    name: "Carlos Rodriguez",
    role: "Technical Director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format",
  },
  {
    name: "Laura Fernandez",
    role: "Creative Lead",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format",
  },
];

export default function KotaTeam() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
      gsap.fromTo(
        ".team-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[#F5F2ED] text-[#0A0A0A] overflow-hidden"
    >
      <div className="editorial-container">
        <div className="team-title mb-12 md:mb-16">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#666] mb-4">
            Team
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.2]">
            The people behind
            <br />
            the work.
          </h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
          {team.map((member, i) => (
            <div
              key={i}
              className="team-card min-w-[280px] md:min-w-[350px] lg:min-w-[400px] snap-start group cursor-pointer"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4] mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover image-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-xs uppercase tracking-wider">
                    View Profile →
                  </p>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-1">
                {member.name}
              </h3>
              <p className="text-[#666] text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
