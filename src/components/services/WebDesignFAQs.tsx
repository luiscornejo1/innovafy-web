"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "How long does a typical web design and development project take?",
    answer: "A web design and build project can last around 12-14 weeks. But there are always ways to consider your business objectives (such as phased launches), so even if your timescales don't work with this, it's always worth reaching out."
  },
  {
    question: "What are the latest trends in web design and development I should know about?",
    answer: "Currently, we're seeing a big push towards immersive 3D elements, dark mode optimization, micro-interactions, and AI-driven personalization. However, we always prioritize timeless, user-centric design over fleeting trends to ensure your site remains effective for years."
  },
  {
    question: "How does web design impact SEO and my site's visibility on Google?",
    answer: "Web design directly affects SEO through site speed, mobile responsiveness, and user experience metrics like bounce rate. A clean, accessible code structure and logical navigation are essential for search engines to properly crawl and index your content."
  },
  {
    question: "What's the difference between custom and template-based web design?",
    answer: "Template-based designs are quicker and cheaper but limit your brand's unique identity and functionality. Custom web design is built from the ground up specifically for your business goals, offering total control over the user journey, superior performance, and seamless scalability."
  },
  {
    question: "How do I maintain my website once it's live?",
    answer: "We offer ongoing support and maintenance packages to keep your site secure, fast, and up-to-date. Alternatively, we build our sites on intuitive CMS platforms so your team can easily update content, add pages, and manage the site day-to-day without needing to code."
  },
  {
    question: "What should I expect to pay for professional web design and development services?",
    answer: "Costs vary widely depending on the scope, functionality, and complexity of the project. We offer transparent pricing after our initial discovery phase, ensuring the final product aligns perfectly with both your business goals and your budget."
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
