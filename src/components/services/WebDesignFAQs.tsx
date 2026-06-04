"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "¿Cuánto tiempo dura un proyecto típico de diseño y desarrollo web?",
    answer: "Un proyecto de diseño y desarrollo web puede durar alrededor de 12-14 semanas. Pero siempre hay formas de considerar los objetivos de su empresa (como lanzamientos por fases), así que incluso si sus plazos no se ajustan a esto, siempre vale la pena comunicarse con nosotros."
  },
  {
    question: "¿Cuáles son las últimas tendencias en diseño y desarrollo web que debería conocer?",
    answer: "Actualmente, vemos un gran impulso hacia elementos 3D inmersivos, optimización para el modo oscuro, micro-interacciones y personalización impulsada por IA. Sin embargo, siempre priorizamos el diseño atemporal y centrado en el usuario sobre las tendencias pasajeras para garantizar que su sitio siga siendo efectivo durante años."
  },
  {
    question: "¿Cómo impacta el diseño web en el SEO y la visibilidad de mi sitio en Google?",
    answer: "El diseño web afecta directamente al SEO a través de la velocidad del sitio, la capacidad de respuesta móvil y las métricas de experiencia del usuario, como la tasa de rebote. Una estructura de código limpia y accesible, junto con una navegación lógica, son esenciales para que los motores de búsqueda rastreen e indexen correctamente su contenido."
  },
  {
    question: "¿Cuál es la diferencia entre un diseño web personalizado y uno basado en plantillas?",
    answer: "Los diseños basados en plantillas son más rápidos y económicos, pero limitan la identidad única y la funcionalidad de su marca. El diseño web personalizado se construye desde cero específicamente para sus objetivos comerciales, ofreciendo control total sobre el viaje del usuario, rendimiento superior y escalabilidad perfecta."
  },
  {
    question: "¿Cómo mantengo mi sitio web una vez que está en línea?",
    answer: "Ofrecemos paquetes de soporte y mantenimiento continuo para mantener su sitio seguro, rápido y actualizado. Alternativamente, construimos nuestros sitios en plataformas CMS intuitivas para que su equipo pueda actualizar contenido fácilmente, agregar páginas y administrar el sitio en el día a día sin necesidad de programar."
  },
  {
    question: "¿Cuánto debería esperar pagar por servicios profesionales de diseño y desarrollo web?",
    answer: "Los costos varían ampliamente dependiendo del alcance, la funcionalidad y la complejidad del proyecto. Ofrecemos precios transparentes después de nuestra fase de descubrimiento inicial, asegurando que el producto final se alinee perfectamente tanto con sus objetivos comerciales como con su presupuesto."
  }
];

export default function WebDesignFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // El primero abierto por defecto, o null

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black py-24 w-full">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Título */}
        <div className="lg:w-1/3 flex-shrink-0">
          <h2 className="text-6xl md:text-7xl lg:text-[100px] font-medium tracking-tight text-white leading-none">
            FAQ's
          </h2>
        </div>

        {/* Acordeón de Preguntas */}
        <div className="lg:w-2/3 flex flex-col gap-6 lg:gap-8 pt-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className="group cursor-pointer"
                onClick={() => toggleOpen(index)}
              >
                <div className="flex items-start gap-4 lg:gap-6">
                  {/* Icono + / x */}
                  <div className="flex-shrink-0 mt-1">
                    <div 
                      className={`text-white text-3xl font-light leading-none transition-transform duration-500 ease-out ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                    >
                      +
                    </div>
                  </div>

                  {/* Texto de Pregunta y Respuesta */}
                  <div className="flex-1">
                    <h3 className={`text-xl lg:text-[26px] leading-tight font-medium tracking-tight transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white group-hover:text-neutral-300'}`}>
                      {faq.question}
                    </h3>
                    
                    {/* Contenedor animado para la respuesta */}
                    <div 
                      className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-white text-[16px] lg:text-[18px] leading-relaxed pr-4 lg:pr-12">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
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
