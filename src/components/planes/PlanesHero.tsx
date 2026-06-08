"use client";

import { segments } from "../../data/planesContent";

interface PlanesHeroProps {
  activeSegment: string;
  onSegmentChange: (segmentId: string) => void;
}

export default function PlanesHero({
  activeSegment,
  onSegmentChange,
}: PlanesHeroProps) {
  return (
    <>
      {/* Hero principal */}
      <div className="bg-[#4400FF] pt-28 pb-16 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase mb-5">
                ⬡ Inovafy Studio · Perú · USA · Spain
              </div>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] text-white tracking-tight">
                Un plan
                <br />
                para cada
                <br />
                <em className="text-white/55 not-italic">etapa</em> de
                <br />
                tu marca.
              </h1>
              <p className="text-white/60 text-base font-light leading-relaxed max-w-md mt-5">
                Desde el primer post hasta dominar tu mercado. Tenemos el plan
                exacto para donde está tu negocio hoy — y para donde quiere
                llegar mañana.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  "✦ Marketing Digital",
                  "✦ Diseño Digital",
                  "✦ Branding",
                  "✦ Diseño UI/UX",
                  "✦ Desarrollo App & Web",
                  "✦ Producción Audiovisual",
                  "✦ Creación de Contenido",
                  "✦ IA & Automatización",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="bg-white/8 border border-white/15 rounded-md px-3 py-1.5 text-[11px] font-medium text-white/65 hover:bg-white/15 transition-colors"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/8 border border-white/15 rounded-xl p-5 col-span-2 flex items-center gap-4">
                <div className="text-3xl">✦</div>
                <div>
                  <div className="font-serif text-3xl font-black text-white">
                    +2 años
                  </div>
                  <div className="text-[11px] font-light text-white/45">
                    Transformando marcas en el sector gastronómico y B2C de Perú
                  </div>
                </div>
              </div>
              <div className="bg-white/8 border border-white/15 rounded-xl p-5">
                <div className="font-serif text-4xl font-black text-white">
                  9
                </div>
                <div className="text-[11px] font-light text-white/45">
                  Planes por etapa de negocio
                </div>
              </div>
              <div className="bg-white/8 border border-white/15 rounded-xl p-5">
                <div className="font-serif text-4xl font-black text-white">
                  6
                </div>
                <div className="text-[11px] font-light text-white/45">
                  Servicios en un equipo
                </div>
              </div>
            </div>
          </div>

          {/* Segment Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {segments.map((seg) => (
              <button
                key={seg.id}
                onClick={() => onSegmentChange(seg.id)}
                className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                  activeSegment === seg.id
                    ? "border-white bg-white/15"
                    : "border-white/15 bg-white/6 hover:bg-white/10"
                }`}
              >
                <span className="text-2xl block mb-2">{seg.icon}</span>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeSegment === seg.id ? "bg-white" : "bg-transparent"
                    }`}
                  />
                  <span
                    className={`text-sm font-bold font-serif ${
                      activeSegment === seg.id ? "text-white" : "text-white/80"
                    }`}
                  >
                    {seg.label}
                  </span>
                </div>
                <p className="text-[11px] font-light text-white/45 leading-relaxed">
                  {seg.description}
                </p>
                <span className="text-[10px] font-semibold text-white/50 mt-2 block tracking-wide">
                  {seg.priceRange}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Decoración */}
        <div className="absolute bottom-0 right-0 text-[520px] font-serif font-black italic text-white/5 pointer-events-none select-none leading-none">
          I
        </div>
      </div>
    </>
  );
}
