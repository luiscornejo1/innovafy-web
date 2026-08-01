"use client";

import PlanesLandingHero from "../../components/planes/PlanesLandingHero";
import PlanesServicesPanels, {
  type PlanesServiceItem,
} from "../../components/planes/PlanesServicesPanels";
import PlanesBrandManifesto, {
  type PlanesManifestoItem,
} from "../../components/planes/PlanesBrandManifesto";
import PlanesSigningSection from "../../components/planes/PlanesSigningSection";
import PlanesWorkflow, {
  type PlanesWorkflowStep,
} from "../../components/planes/PlanesWorkflow";
import { segments } from "../../data/planesContent";
import Footer from "../../components/shared/Footer";
import PlanesCTA from "../../components/planes/PlanesCTA";
import PlanesCompareTable from "../../components/planes/PlanesCompareTable";
import PlanesPageBackground from "../../components/planes/PlanesPageBackground";

const PLANS_SERVICES: PlanesServiceItem[] = [
  {
    id: 1,
    title: segments[0].label,
    description: segments[0].description,
    link: "/planes/inicio",
    videoSrc: "https://kota-content.b-cdn.net/app/uploads/2024/02/homepage.mp4",
    imgSrc:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
    tags: [
      { text: "Branding", href: "/planes/inicio" },
      { text: "Redes sociales", href: "/planes/inicio" },
      { text: "Contenido", href: "/planes/inicio" },
    ],
  },
  {
    id: 2,
    title: segments[1].label,
    description: segments[1].description,
    link: "/planes/crecimiento",
    videoSrc:
      "https://kota-content.b-cdn.net/app/uploads/2024/02/homepage-1.mp4",
    imgSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    tags: [
      { text: "Automatización", href: "/planes/crecimiento" },
      { text: "Publicidad", href: "/planes/crecimiento" },
      { text: "Conversión", href: "/planes/crecimiento" },
    ],
  },
  {
    id: 3,
    title: segments[2].label,
    description: segments[2].description,
    link: "/planes/liderazgo",
    videoSrc:
      "https://kota-content.b-cdn.net/app/uploads/2024/02/homepage-3.mp4",
    imgSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    tags: [
      { text: "IA", href: "/planes/liderazgo" },
      { text: "Autoridad digital", href: "/planes/liderazgo" },
      { text: "Ecosistema", href: "/planes/liderazgo" },
    ],
  },
];

const PLANS_WORKFLOW: PlanesWorkflowStep[] = [
  {
    id: "evaluación",
    title: "+2 Años de Experiencia",
    description:
      "Más de 2 años liderando la transformación digital de marcas en el sector gastronómico y B2C, con resultados reales y comprobados en el mercado peruano.",
    tags: ["Auditoría", "Estrategia", "Transformación"],
    gradient: "bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]",
    image: "/assets/15.jpg",
  },
  {
    id: "diagnostico",
    title: "Equipo Especializado 360°",
    description:
      "Equipo especializado en Community Management, Diseño Gráfico, Producción Audiovisual, Publicidad Digital y SEO — asegurando resultados de alta calidad en cada área.",
    tags: ["Branding", "Contenido", "Campañas", "Automatización"],
    gradient: "bg-gradient-to-tr from-[#ff4b2b] to-[#ff416c]",
    image: "/assets/16.jpg",
  },
  {
    id: "implementacion",
    title: "Metodología Basada en Resultados",
    description:
      "Procesos organizados, entregables concretos y seguimiento constante de métricas. No trabajamos por impresiones — trabajamos por objetivos de negocio medibles.",
    tags: ["Métricas", "A/B testing", "Escalamiento"],
    gradient: "bg-gradient-to-r from-[#4776e6] to-[#8e54e9]",
    image: "/assets/17.jpg",
  },
  {
    id: "optimizacion",
    title: "Acompañamiento Estratégico Continuo",
    description:
      "Enfocados en la escalabilidad y el crecimiento de la marca a largo plazo. Somos más que un proveedor — somos tu socio digital estratégico.",
    tags: ["IA", "Autoridad", "Ecosistema", "Liderazgo"],
    gradient: "bg-gradient-to-bl from-[#f2994a] to-[#f2c94c]",
    image: "/assets/18.jpg",
  },
  {
    id: "crecimiento",
    title: "Experiencia en Marcas Locales",
    description:
      "Experiencia liderando marcas locales peruanas, logrando posicionamiento digital real, engagement genuino y fortalecimiento sólido de la presencia digital.",
    tags: ["Local", "Posicionamiento", "Engagement"],
    gradient: "bg-gradient-to-br from-[#11998e] to-[#38ef7d]",
    image: "/assets/11.jpg",
  },
  {
    id: "Acompañamiento",
    title: "Sin Contratos Anuales",
    description:
      "Trabajamos mes a mes porque confiamos plenamente en nuestros resultados. Nos quedamos contigo porque generamos valor, no porque lo exija un contrato.",
    tags: ["Flexibilidad", "Confianza", "Resultados"],
    gradient: "bg-gradient-to-tr from-[#667eea] to-[#764ba2]",
    image: "/assets/12.jpg",
  },
];

const PLANS_MANIFESTO: PlanesManifestoItem[] = [
  {
    id: "diseno",
    number: "01",
    title: "Reunión de diagnóstico",
    description:
      "Agendamos una sesión de 30–60 min contigo para entender tu negocio, objetivos, presupuesto y situación digital actual.",
  },
  {
    id: "proceso",
    number: "02",
    title: "Proceso claro desde el día uno.",
    description:
      "Auditamos tu presencia digital, analizamos a tu competencia y detectamos las oportunidades de mayor impacto para tu marca.",
  },
  {
    id: "escala",
    number: "03",
    title: "Propuesta a medida",
    description:
      "Te presentamos un plan 100% personalizado con los servicios que realmente necesitas, precios claros y resultados esperados.",
  },
  {
    id: "conversion",
    number: "04",
    title: "Ejecución y seguimiento",
    description:
      "Arrancamos con un equipo dedicado, métricas claras desde el día 1 y ajustes continuos basados en resultados reales.",
  },
];

export default function PlanesPage() {
  return (
    <>
      <PlanesPageBackground />
      <main className="relative z-[1] min-h-screen w-full bg-transparent">
        <div className="w-full max-w-full overflow-x-clip">
          <PlanesLandingHero
            titleLines={["Evoluciona", "tu marca"]}
            description="Desde el primer post hasta dominar tu mercado. Tenemos el plan exacto para donde está tu negocio hoy — y para donde quiere llegar mañana."
          />
          <PlanesServicesPanels
            headingLines={["NUESTROS", "PLANES"]}
            services={PLANS_SERVICES}
            ctaLabel="Ver plan"
          />
          <PlanesWorkflow
            title="Diferencial Competitivo"
            description="Lo que nos hace únicos frente a cualquier agencia o estudio digital del mercado peruano."
            steps={PLANS_WORKFLOW}
            tagsLabel="Incluye"
          />
          <PlanesSigningSection
            logoColor="#ffffff"
            logoTextShadow="0 4px 28px rgba(0,0,0,0.28), 0 1px 4px rgba(0,0,0,0.18)"
          />
          <PlanesBrandManifesto
            headingLines={["Plan Personalizado", "Tu plan a Medida"]}
            items={PLANS_MANIFESTO}
          />
          <PlanesCompareTable />
          <PlanesCTA />
          <Footer />
        </div>
      </main>
    </>
  );
}
