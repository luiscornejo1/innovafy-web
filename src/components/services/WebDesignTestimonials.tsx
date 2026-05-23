"use client";

import { useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Beyond the aesthetics, the site is incredibly functional. The CMS gives us the flexibility and control we need to keep our content fresh and relevant, and they have significantly improved the website's UX. We couldn't be happier!",
    author: "Jenny Frame",
    role: "Marketing Manager",
    company: "INCENTIVE GAMES",
    bgColor: "bg-[#f4add7]", // Pink
  },
  {
    id: 2,
    quote: "It was our brand positioning work that really made everything click. KOTA were empathetic, patient, flexible, quick, and, most importantly, incredibly talented with brand positioning, visual identity, and digital experiences. I've already recommended them twice!",
    author: "Shanice Daeche",
    role: "CMO",
    company: "Florence",
    bgColor: "bg-[#cebdfb]", // Purple
  },
  {
    id: 3,
    quote: "The team delivered an outstanding platform that has elevated our digital presence significantly. Their attention to detail and creative approach made the entire process seamless from start to finish.",
    author: "David Smith",
    role: "Director",
    company: "TechCorp",
    bgColor: "bg-[#aee6e6]", // Cyan
  }
];

export default function WebDesignTestimonials() {
  const [cards, setCards] = useState(TESTIMONIALS);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCards(prev => {
        const newCards = [...prev];
        const first = newCards.shift();
        if (first) newCards.push(first);
        return newCards;
      });
      setIsAnimating(false);
    }, 400); // Esperar la animación de salida
  };

  return (
    <section className="bg-black min-h-screen flex items-center py-24 overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-12 flex flex-col lg:flex-row gap-20 lg:gap-24 items-center">
        
        {/* Izquierda: Título gigante */}
        <div className="lg:w-5/12 flex-shrink-0 w-full">
          <h2 className="text-6xl md:text-7xl lg:text-[110px] font-medium text-white leading-[1] tracking-tight">
            What our<br />clients say
          </h2>
        </div>

        {/* Derecha: Cartas Apiladas */}
        <div className="lg:w-7/12 relative h-[500px] md:h-[450px] w-full flex justify-end">
          
          {cards.map((testimonial, index) => {
            const isFront = index === 0;
            const isMiddle = index === 1;
            const isBack = index === 2;

            let transform = "translate(0px, 0px)";
            let zIndex = 0;
            let opacity = 1;

            if (isAnimating && isFront) {
               // Animación de salida: se mueve a la derecha y arriba, y se desvanece
               transform = "translate(40px, -20px) scale(0.95)";
               opacity = 0;
               zIndex = 30;
            } else if (isFront) {
               // Posición normal al frente
               transform = "translate(0px, 0px) scale(1)";
               zIndex = 30;
            } else if (isMiddle) {
               // Primera carta detrás (desplazada a la izquierda y abajo)
               transform = "translate(-16px, 16px) scale(1)";
               zIndex = 20;
            } else if (isBack) {
               // Segunda carta detrás
               transform = "translate(-32px, 32px) scale(1)";
               zIndex = 10;
            } else {
               opacity = 0;
            }

            return (
              <div 
                key={testimonial.id}
                className={`absolute right-0 lg:right-12 top-0 w-[90vw] md:w-[600px] lg:w-[650px] h-[480px] lg:h-[460px] p-8 md:p-12 ${testimonial.bgColor} rounded-sm rounded-tr-[80px] lg:rounded-tr-[120px] shadow-2xl transition-all duration-[400ms] ease-in-out flex flex-col`}
                style={{ transform, zIndex, opacity }}
              >
                {/* Logo / Nombre empresa */}
                <div className="flex items-center gap-3 mb-6 md:mb-8 text-black flex-shrink-0">
                  <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center">
                    <span className="font-bold text-[10px]">{testimonial.company.charAt(0)}</span>
                  </div>
                  <span className="text-[13px] font-bold tracking-wider uppercase">{testimonial.company}</span>
                </div>

                {/* Cita principal */}
                <p className="text-[17px] md:text-[20px] leading-snug text-black mb-6 flex-1 overflow-hidden">
                  "{testimonial.quote}"
                </p>

                {/* Contenedor inferior (Autor y botones) */}
                <div className="flex-shrink-0 mt-auto">
                  {/* Autor */}
                  <div className="text-[14px] text-black">
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="opacity-80">{testimonial.role}</p>
                  </div>
                  
                  {/* Botones */}
                  <div className="mt-8 flex justify-between items-end">
                    <button 
                      className={`flex items-center gap-2 border border-black rounded-full px-5 py-2 text-sm font-medium transition-colors ${isFront ? 'hover:bg-black hover:text-white pointer-events-auto' : 'pointer-events-none'}`}
                    >
                      View project <ArrowRight size={16} />
                    </button>
                    <button 
                      onClick={isFront ? nextCard : undefined} 
                      className={`w-12 h-12 rounded-full border border-black flex items-center justify-center transition-colors ${isFront ? 'hover:bg-black hover:text-white cursor-pointer pointer-events-auto' : 'pointer-events-none'}`}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
