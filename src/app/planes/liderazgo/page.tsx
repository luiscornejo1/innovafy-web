"use client";

import PlanCard from "../../../components/planes/PlanCard";
import { planes } from "../../../data/planesContent";

export default function PlanesLiderazgoPage() {
  const filteredPlanes = planes.filter((plan) => plan.segment === "liderazgo");

  return (
    <main className="bg-[#f0ede6] min-h-screen pt-32">
      {/* Hero específico para Liderazgo */}
      <div className="bg-[#4400FF] pt-16 pb-16 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase mb-5">
              🏆 Planes de Liderazgo
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-white tracking-tight">
              Lidera tu
              <br />
              <em className="text-white/55 not-italic">Industria</em>
            </h1>
            <p className="text-white/60 text-base font-light leading-relaxed max-w-md mt-5">
              Tienes años de experiencia y reputación ganada. Estos planes
              llevan tu presencia digital al nivel de tu trayectoria.
            </p>
            <p className="text-white/40 text-sm mt-4">
              Inversión desde S/ 2,499 — S/ 4,999 / mes
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 text-[400px] font-serif font-black italic text-white/5 pointer-events-none select-none leading-none">
          L
        </div>
      </div>

      {/* Grid de planes */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlanes.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </main>
  );
}
