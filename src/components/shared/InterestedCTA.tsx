"use client";

import FluidBackground from "../three/FluidBackground";

export default function InterestedCTA() {
  return (
    <section className="relative z-10 bg-[#050508] overflow-hidden">
      {/* Absolute fluid background constrained to this section */}
      <FluidBackground className="absolute inset-0 z-0 pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 px-6 lg:px-12 py-32 min-h-[60vh] items-center">
        <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">
          Hagamos<br />
          algo<br />
          original
        </h2>

        <div className="flex flex-col gap-6">
          <h3 className="text-4xl md:text-5xl font-medium text-white">
            Escríbenos a
          </h3>
          <a
            href="mailto:hello@innovafy.com"
            className="text-4xl md:text-5xl font-medium text-white underline underline-offset-8 hover:text-purple-400 transition-colors"
          >
            hello@innovafy.com
          </a>
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md mt-4">
            Somos una agencia digital creativa, enfocada en crear productos extraordinarios y elevar el valor de tu marca.
          </p>
        </div>
      </div>
    </section>
  );
}
