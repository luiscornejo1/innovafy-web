"use client";

import { type Plan } from "@/data/planesContent";

interface PlanCardProps {
  plan: Plan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const colorStyles = {
    cream: {
      card: "bg-white border border-[#ddd8f0]",
      badge: "text-[#4400FF]",
      name: "text-[#1a1520]",
      sub: "text-[#8880a0]",
      price: "text-[#4400FF]",
      note: "text-[#8880a0]",
      hr: "border-[#ddd8f0]",
      focusPill: "bg-[#ece8ff] text-[#4400FF] border-[#4400FF]/20",
      svcLbl: "text-[#bbb]",
      svcTxt: "text-[#333]",
      svcSpan: "text-[#aaa]",
      sc: "bg-[#ece8ff] text-[#4400FF]",
      kpiBox: "bg-[#ece8ff] border-[#4400FF]/15 text-[#4400FF]",
      cta: "bg-[#4400FF] text-white hover:bg-[#6633ff]",
    },
    blue: {
      card: "bg-[#4400FF] border-[#4400FF]",
      badge: "text-white/60",
      name: "text-white",
      sub: "text-white/55",
      price: "text-white",
      note: "text-white/35",
      hr: "border-white/14",
      focusPill: "bg-white/12 text-white border-white/20",
      svcLbl: "text-white/25",
      svcTxt: "text-white/82",
      svcSpan: "text-white/32",
      sc: "bg-white/15 text-white",
      kpiBox: "bg-white/10 border-white/18 text-white/85",
      cta: "bg-white text-[#4400FF] hover:bg-[#f0ede6]",
    },
    dark: {
      card: "bg-[#0a0a0a] border-[#4400FF]/30",
      badge: "text-[#4400FF]/70",
      name: "text-white",
      sub: "text-white/45",
      price: "text-white/90",
      note: "text-white/30",
      hr: "border-[#4400FF]/20",
      focusPill: "bg-[#4400FF]/10 text-[#4400FF]/90 border-[#4400FF]/20",
      svcLbl: "text-[#4400FF]/50",
      svcTxt: "text-white/78",
      svcSpan: "text-white/28",
      sc: "bg-[#4400FF]/15 text-[#4400FF]/90",
      kpiBox: "bg-[#4400FF]/8 border-[#4400FF]/18 text-[#4400FF]/85",
      cta: "bg-[#4400FF] text-white hover:bg-[#6633ff]",
    },
  };

  const styles = colorStyles[plan.color];

  return (
    <div
      className={`rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${styles.card}`}
    >
      {/* Decoración */}
      <div
        className={`absolute top-0 right-0 text-7xl font-bold font-serif italic opacity-5 pointer-events-none select-none`}
      >
        {plan.name.charAt(0)}
      </div>

      {/* Popular flag */}
      {plan.popular && (
        <div className="absolute top-4 right-4 text-[10px] font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-[#4400FF] text-white">
          ⭐ Más popular
        </div>
      )}

      {/* Badge */}
      <span
        className={`text-[10px] font-bold tracking-[0.2em] uppercase block mb-2 ${styles.badge}`}
      >
        {plan.tag}
      </span>

      {/* Name */}
      <h3
        className={`font-serif text-4xl font-black tracking-tight mb-2 ${styles.name}`}
      >
        {plan.name}
      </h3>

      {/* Description */}
      <p className={`text-sm leading-relaxed mb-5 ${styles.sub}`}>
        {plan.description}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className={`text-[11px] font-normal ${styles.note}`}>
          Inversión desde
        </span>
        <span className={`text-sm font-semibold ${styles.price}`}>S/</span>
        <span
          className={`font-serif text-5xl font-black tracking-tight leading-none ${styles.price}`}
        >
          {Math.floor(plan.price)}
        </span>
        {plan.priceDecimal !== undefined && (
          <span className={`font-serif text-xl font-bold mt-1 ${styles.price}`}>
            .{plan.priceDecimal}
          </span>
        )}
      </div>
      <p className={`text-xs mb-5 ${styles.note}`}>
        / mes ·{" "}
        {plan.color === "blue"
          ? "Incluye todo del Plan Esencial"
          : "Sin contrato anual"}
      </p>

      <hr className={`my-4 ${styles.hr}`} />

      {/* Focus pill */}
      <div
        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold border mb-4 ${styles.focusPill}`}
      >
        {plan.focusPill}
      </div>

      {/* Features por categoría */}
      {plan.features.map((category, idx) => (
        <div key={idx} className="mb-4 last:mb-0">
          <span
            className={`text-[9px] font-bold tracking-[0.22em] uppercase block mb-3 ${styles.svcLbl}`}
          >
            {category.category}
          </span>
          <ul className="space-y-2.5">
            {category.items.map((item, itemIdx) => (
              <li key={itemIdx} className="flex gap-2 text-start">
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-black flex-shrink-0 mt-0.5 ${styles.sc}`}
                >
                  ✓
                </span>
                <div className={`text-xs leading-relaxed ${styles.svcTxt}`}>
                  {item.text}
                  {item.subtext && (
                    <span
                      className={`block text-[10px] font-light mt-0.5 ${styles.svcSpan}`}
                    >
                      {item.subtext}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Ideal for KPI box */}
      <div className={`rounded-lg p-3 my-4 text-xs border ${styles.kpiBox}`}>
        <strong className="block text-[11px] font-bold mb-1">
          💡 Ideal para
        </strong>
        {plan.idealFor}
      </div>

      {/* CTA Button */}
      <button
        className={`w-full py-3.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-all hover:-translate-y-0.5 ${styles.cta}`}
      >
        {plan.ctaText}
      </button>
    </div>
  );
}
