"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Projects Delivered", prefix: "" },
  { value: 12, suffix: "", label: "Years of Excellence", prefix: "" },
  { value: 150, suffix: "+", label: "Happy Clients", prefix: "" },
  { value: 24, suffix: "/7", label: "Global Support", prefix: "" },
];

function Counter({
  value,
  suffix,
  label,
  prefix,
}: {
  value: number;
  suffix: string;
  label: string;
  prefix: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let start = 0;
            const duration = 2000;
            const increment = value / (duration / 16);
            const timer = setInterval(() => {
              start += increment;
              if (start >= value) {
                setCount(value);
                clearInterval(timer);
              } else {
                setCount(Math.floor(start));
              }
            }, 16);
            return () => clearInterval(timer);
          }
        });
      },
      { threshold: 0.3 } // triggerOnce lo manejamos con hasAnimated
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
        {prefix}
        {count}
        {suffix}
      </div>
      <p className="text-[#888] text-sm md:text-base mt-3 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export default function KotaStats() {
  return (
    <section className="section-padding bg-[#111111]">
      <div className="editorial-container">
        <div className="text-center mb-16">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#888] mb-4">
            Impact
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light">
            By the numbers
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <Counter key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
