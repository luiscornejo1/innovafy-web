// data/planesContent.ts

export interface Plan {
  id: string;
  name: string;
  tag: string; // "Esencial", "Avanzado", etc.
  segment: "inicio" | "crecimiento" | "liderazgo";
  popular?: boolean;
  price: number;
  priceDecimal?: number;
  description: string;
  features: {
    category: string;
    items: Array<{
      text: string;
      subtext?: string;
    }>;
  }[];
  idealFor: string;
  ctaText: string;
  focusPill: string;
  color: "cream" | "blue" | "dark";
}

export const planes: Plan[] = [
  // ========== PLANES DE INICIO ==========
  {
    id: "esencial",
    name: "Esencial",
    tag: "✦ Plan Esencial",
    segment: "inicio",
    price: 949.9,
    description:
      "Para emprendedores que necesitan construir su presencia digital desde cero con imagen profesional.",
    features: [
      {
        category: "Marketing Digital",
        items: [
          {
            text: "Community management – Facebook e Instagram",
            subtext:
              "Gestión de comunidades digitales, respuesta de mensajes y comentarios",
          },
          {
            text: "10 publicaciones mensuales + calendario editorial",
            subtext: "8 piezas gráficas + 5 reels básicos con guion creativo",
          },
          { text: "14 stories estratégicas mensuales" },
          {
            text: "Posicionamiento SEO en redes sociales",
            subtext:
              "Optimización de perfiles, hashtags estratégicos e investigación de palabras clave",
          },
          {
            text: "Análisis de métricas mensual",
            subtext:
              "Alcance, engagement, crecimiento de audiencia y consultoría básica",
          },
        ],
      },
      {
        category: "Diseño Digital y Branding",
        items: [
          {
            text: "Diseño de piezas gráficas para redes sociales",
            subtext:
              "Creatividades alineadas a tu identidad visual y manual de marca",
          },
          { text: "Diseño de portadas, banners y perfil de redes sociales" },
          {
            text: "Banco de fotos + mejora de identidad gráfica",
            subtext: "Diseño de kit de marca base para tus comunicaciones",
          },
        ],
      },
    ],
    idealFor:
      "Emprendedores y negocios locales que validan su presencia digital con imagen profesional desde el primer mes.",
    ctaText: "Empezar ahora →",
    focusPill: "🎯 Presencia + Contenido + Branding base",
    color: "cream",
  },
  {
    id: "avanzado",
    name: "Avanzado",
    tag: "✦ Plan Avanzado",
    segment: "inicio",
    popular: true,
    price: 1559.9,
    description:
      "Para PYMEs que quieren visibilidad real, producción fotográfica y sus primeras campañas de pauta activas.",
    features: [
      {
        category: "Marketing Digital — Amplificado",
        items: [
          {
            text: "FB + IG + TikTok + Google My Business",
            subtext: "Gestión profesional y estrategia de contenido unificada",
          },
          {
            text: "16 publicaciones / mes + 20 stories estratégicas",
            subtext:
              "10 gráficas + 6–8 reels con guion creativo y dirección visual",
          },
          {
            text: "Gestión de campañas en Meta Ads",
            subtext:
              "Tráfico, engagement o captación local — con segmentación por públicos",
          },
          {
            text: "Creación de embudos de marketing y ventas",
            subtext:
              "Estrategia de inbound e implementación de funnels de captación de leads",
          },
          {
            text: "Gestión y optimización de landing pages",
            subtext:
              "CRM interno + análisis de métricas y optimización de conversiones (CRO)",
          },
        ],
      },
      {
        category: "Producción Audiovisual",
        items: [
          {
            text: "Sesión fotográfica profesional mensual",
            subtext:
              "Hasta 10 productos o ambientes — edición y entrega incluida",
          },
          {
            text: "Producción de Reels con guion y edición profesional",
            subtext: "Dirección creativa para contenido de redes sociales",
          },
        ],
      },
    ],
    idealFor:
      "PYMEs que quieren visibilidad real, producción fotográfica y sus primeras campañas de pauta activas.",
    ctaText: "Quiero este plan →",
    focusPill: "📣 Pauta activa + Producción fotográfica + Embudos",
    color: "blue",
  },
  {
    id: "premium",
    name: "Premium",
    tag: "✦ Plan Premium",
    segment: "inicio",
    price: 1999.9,
    description:
      "Solución 360°: equipo dedicado, producción pro, todas las plataformas de pauta, web y branding completo.",
    features: [
      {
        category: "¿Qué incluye?",
        items: [
          {
            text: "Área dedicada: Community Management + Diseño Gráfico + Producción Audiovisual + Landing Web / Soporte Web",
          },
          { text: "Gestión completa de redes sociales y Google My Business" },
          {
            text: "20 publicaciones + 30 stories estratégicas / mes",
            subtext:
              "10 gráficas + 10 reels o videos con storytelling profesional",
          },
          {
            text: "Sesión fotográfica profesional + clips de video extendidos",
            subtext: "Banco de fotos y audiovisual completo para reutilización",
          },
          {
            text: "Equipo profesional: cámaras, luces, micrófonos y software de edición profesional",
          },
          {
            text: "Campañas Meta Ads + Google Ads + TikTok Ads",
            subtext:
              "Diseño y gestión de campañas por temporada o lanzamientos",
          },
          {
            text: "SEO avanzado + optimización + estrategias de embudos de venta",
          },
          {
            text: "Branding + diseño de piezas para merchandising o promociones",
            subtext:
              "Soporte continuo de diseño para mantener coherencia visual",
          },
          {
            text: "Reporte detallado de resultados, métricas y ROI mensual",
            subtext:
              "Reuniones de planificación y coordinación estratégica avanzada",
          },
        ],
      },
    ],
    idealFor:
      "Empresas que buscan una solución digital 360° completa con equipo dedicado.",
    ctaText: "Hablar con un experto →",
    focusPill: "💎 Área dedicada · Producción pro · Web",
    color: "dark",
  },

  // ========== PLANES DE CRECIMIENTO ==========
  {
    id: "optimize",
    name: "Optimize",
    tag: "⚡ Growth Starter",
    segment: "crecimiento",
    price: 999,
    description:
      "Para empresas que necesitan convertir mejor lo que ya tienen — sin necesidad de rehacerlo todo.",
    features: [
      {
        category: "Marketing Digital — Optimización",
        items: [
          {
            text: "Consultoría estratégica en marketing digital",
            subtext:
              "Diagnóstico completo: web, redes, SEO, embudos y competencia",
          },
          {
            text: "Optimización de conversiones (CRO)",
            subtext:
              "Pruebas y mejoras UX/UI para aumentar conversión sin rediseño total",
          },
          {
            text: "Estrategias de contenido SEO redefinidas",
            subtext:
              "Investigación de palabras clave + contenido con foco en ventas",
          },
          {
            text: "Optimización técnica SEO",
            subtext:
              "Velocidad, estructura, metadatos y posicionamiento orgánico",
          },
          {
            text: "Gestión estratégica de 2 redes sociales",
            subtext:
              "Calendario editorial con foco en conversión, no solo visibilidad",
          },
        ],
      },
      {
        category: "Diseño UI/UX",
        items: [
          {
            text: "Investigación de experiencia de usuario",
            subtext:
              "Análisis de comportamiento en tu web actual y detección de fricciones",
          },
          {
            text: "Análisis de métricas con KPIs reales",
            subtext:
              "Tráfico, leads, CTR, tasa de conversión y costo por resultado",
          },
        ],
      },
    ],
    idealFor:
      "Empresas que necesitan optimizar su presencia digital actual para convertir mejor.",
    ctaText: "Optimizar mi negocio →",
    focusPill: "🎯 Convertir más con lo que ya tienes",
    color: "cream",
  },
  {
    id: "scale",
    name: "Scale",
    tag: "🚀 Growth Pro",
    segment: "crecimiento",
    popular: true,
    price: 1799,
    description:
      "Para negocios listos para escalar ventas con campañas activas, contenido premium, automatización y datos.",
    features: [
      {
        category: "Marketing Digital — Escala",
        items: [
          {
            text: "Gestión de campañas Meta Ads + Google Ads",
            subtext:
              "Segmentación avanzada, creatividades, A/B testing y optimización continua",
          },
          {
            text: "Implementación de funnels de captación de leads",
            subtext:
              "Estrategia de inbound marketing con nurturing automatizado",
          },
          {
            text: "Email marketing y automatización de correos",
            subtext:
              "Flujos automáticos para convertir leads fríos en clientes activos",
          },
          {
            text: "Rediseño de landing pages clave",
            subtext:
              "Optimización UX/UI con foco en conversión y velocidad de carga",
          },
        ],
      },
      {
        category: "Contenido Audiovisual",
        items: [
          {
            text: "20 piezas de contenido premium / mes",
            subtext:
              "Reels, TikToks y YouTube Shorts con dirección creativa y guion",
          },
          {
            text: "Sesión fotográfica profesional mensual",
            subtext:
              "Productos, servicios o ambientes — edición y entrega incluida",
          },
          {
            text: "Reunión estratégica quincenal con account manager",
            subtext:
              "Revisión de resultados, ajustes y planificación del siguiente período",
          },
        ],
      },
    ],
    idealFor:
      "Negocios listos para escalar ventas con campañas activas y automatización.",
    ctaText: "Quiero este plan →",
    focusPill: "📈 Pauta + Contenido premium + Automatización",
    color: "blue",
  },
  {
    id: "dominate",
    name: "Dominate",
    tag: "💎 Growth Elite",
    segment: "crecimiento",
    price: 2799,
    description:
      "Para empresas que quieren liderazgo digital real: IA, automatización total de procesos y ecosistema web avanzado.",
    features: [
      {
        category: "Automatización con Inteligencia Artificial",
        items: [
          {
            text: "Implementación de chatbots con IA",
            subtext:
              "Automatización de atención al cliente y captación de leads 24/7",
          },
          {
            text: "Automatización de CRM con flujos en n8n",
            subtext:
              "Pipeline inteligente con scoring de leads y seguimiento automático",
          },
          {
            text: "Automatización de procesos de marketing",
            subtext:
              "Del primer clic al cierre de venta sin intervención manual",
          },
          {
            text: "Integración de APIs y herramientas de marketing",
            subtext:
              "Dashboard de inteligencia de negocio con métricas en tiempo real",
          },
        ],
      },
      {
        category: "Desarrollo Web y Apps",
        items: [
          {
            text: "Desarrollo web avanzado o e-commerce",
            subtext:
              "Plataforma a medida con integración de pasarelas de pago y APIs",
          },
          {
            text: "Optimización de velocidad + seguridad web",
            subtext:
              "Implementación de sistemas administrativos y paneles de gestión",
          },
          {
            text: "Account Manager exclusivo · Respuesta <4h",
            subtext:
              "Reuniones semanales + consultoría en transformación digital",
          },
        ],
      },
    ],
    idealFor:
      "Empresas que quieren liderazgo digital real con IA y automatización total.",
    ctaText: "Hablar con un experto →",
    focusPill: "🤖 IA + Automatización + Ecosistema web",
    color: "dark",
  },

  // ========== PLANES DE LIDERAZGO ==========
  {
    id: "leader",
    name: "Leader",
    tag: "🔵 Liderazgo Starter",
    segment: "liderazgo",
    price: 2499,
    description:
      "Para empresas consolidadas que quieren modernizar su identidad digital y posicionarse con autoridad.",
    features: [
      {
        category: "Diseño Digital y Branding",
        items: [
          {
            text: "Branding completo y rediseño de identidad visual",
            subtext:
              "Creación de logotipo profesional + manual de marca + kit visual actualizado",
          },
          {
            text: "Diseño de presentaciones corporativas + material gráfico",
            subtext:
              "Creatividades para campañas, banners y material para marketing",
          },
        ],
      },
      {
        category: "Marketing Digital y Contenido",
        items: [
          {
            text: "Gestión de FB, IG, TikTok, LinkedIn y Google My Business",
            subtext:
              "Estrategia integral unificada en todos los canales activos",
          },
          {
            text: "24 publicaciones mensuales premium",
            subtext:
              "14 gráficas + 10 videos con producción profesional y dirección creativa",
          },
          {
            text: "Campañas Meta Ads + Google Ads activas",
            subtext:
              "Planificación estratégica, segmentación avanzada y optimización continua",
          },
          {
            text: "SEO avanzado + estrategia de contenido de autoridad",
            subtext: "Posicionamiento orgánico y optimización técnica completa",
          },
        ],
      },
      {
        category: "Desarrollo Web UI/UX",
        items: [
          {
            text: "Rediseño web completo con enfoque UX/UI",
            subtext:
              "Arquitectura de información, wireframes, prototipo y diseño de interfaces",
          },
          {
            text: "Optimización de velocidad web + seguridad",
            subtext:
              "Reporte quincenal con ROI detallado y reunión de planificación",
          },
        ],
      },
    ],
    idealFor:
      "Empresas consolidadas que quieren modernizar su identidad digital y posicionarse con autoridad.",
    ctaText: "Modernizar mi marca →",
    focusPill: "🎯 Modernización + Branding + Autoridad digital",
    color: "cream",
  },
  {
    id: "authority",
    name: "Authority",
    tag: "🟣 Liderazgo Pro",
    segment: "liderazgo",
    popular: true,
    price: 3599,
    description:
      "Para empresas que quieren ser la referencia #1 de su categoría con IA, automatización y contenido de alto nivel.",
    features: [
      {
        category: "Automatización con IA",
        items: [
          {
            text: "Automatización de procesos de marketing con IA",
            subtext:
              "Implementación de flujos con n8n + integración de herramientas",
          },
          {
            text: "Automatización de CRM avanzado",
            subtext:
              "Scoring de leads, pipeline automático y seguimiento sin intervención manual",
          },
          {
            text: "Implementación de asistentes virtuales con IA",
            subtext:
              "Atención al cliente automatizada + captación de leads 24/7",
          },
        ],
      },
      {
        category: "Marketing + Contenido + Pauta",
        items: [
          {
            text: "TikTok Ads + YouTube Ads + remarketing avanzado",
            subtext:
              "Audiencias personalizadas, lookalike y retargeting multicanal",
          },
          {
            text: "Email marketing masivo con A/B testing",
            subtext: "Automatización de correos y nurturing de base de datos",
          },
          {
            text: "Estrategia de thought leadership + contenido de autoridad",
            subtext: "Posicionamiento como referente de la industria",
          },
          {
            text: "Dashboard ejecutivo de métricas en tiempo real",
            subtext: "Visibilidad total de marketing, ventas, ROI y embudos",
          },
          {
            text: "Account Manager dedicado + reuniones semanales",
            subtext: "Consultoría en transformación digital continua",
          },
        ],
      },
    ],
    idealFor:
      "Empresas que quieren ser la referencia #1 de su categoría con IA y automatización.",
    ctaText: "Quiero este plan →",
    focusPill: "👑 IA aplicada + Thought leadership + Dominancia",
    color: "blue",
  },
  {
    id: "legacy",
    name: "Legacy",
    tag: "⬡ Liderazgo Elite",
    segment: "liderazgo",
    price: 4999,
    description:
      "El plan definitivo. Ecosistema digital completo con equipo exclusivo, IA personalizada y expansión regional.",
    features: [
      {
        category: "Desarrollo Web, Apps y Plataformas",
        items: [
          {
            text: "Ecosistema digital 360° completo",
            subtext:
              "Web corporativa + App móvil + E-commerce + CRM + IA integrados",
          },
          {
            text: "Desarrollo de plataformas SaaS o sistemas admin",
            subtext:
              "Paneles de gestión, bases de datos e integración de pasarelas de pago",
          },
          {
            text: "Design system completo + diseño UX para apps y e-commerce",
            subtext:
              "Prototipos interactivos, pruebas de usabilidad y design systems escalables",
          },
        ],
      },
      {
        category: "IA y Automatización Avanzada",
        items: [
          {
            text: "IA personalizada entrenada con los datos de tu empresa",
            subtext:
              "Optimización de procesos empresariales con inteligencia artificial",
          },
          {
            text: "Automatización total de procesos internos",
            subtext:
              "Integración de APIs, servicios automatizados y flujos n8n complejos",
          },
        ],
      },
      {
        category: "Producción, Estrategia y Expansión",
        items: [
          {
            text: "Equipo exclusivo dedicado a tu marca",
            subtext:
              "Director de estrategia, diseñador, desarrollador, CM, fotógrafo y analista",
          },
          {
            text: "Producción audiovisual de alto nivel mensual",
            subtext:
              "Videos corporativos, spots publicitarios, series de contenido y YouTube Ads",
          },
          {
            text: "Estrategia de expansión digital latinoamericana",
            subtext:
              "Consultoría estratégica con CEO/directivos + soporte prioritario 24/7 <2h",
          },
        ],
      },
    ],
    idealFor:
      "Empresas que buscan el plan definitivo con ecosistema digital completo y expansión regional.",
    ctaText: "Agendar reunión ejecutiva →",
    focusPill: "🌐 Ecosistema 360° · IA personalizada · Expansión",
    color: "dark",
  },
];

// Segmentos para el selector
// Segmentos para el selector
export const segments = [
  {
    id: "inicio",
    label: "Planes de Inicio",
    description:
      "Para negocios que recién arrancan su presencia digital. Construimos tu marca desde cero.",
    priceRange: "S/ 949.90 — S/ 1,999.90 / mes",
    icon: "🌱",
  },
  {
    id: "crecimiento",
    label: "Planes de Crecimiento",
    description:
      "Para empresas establecidas que necesitan convertir mejor y escalar sus ventas.",
    priceRange: "S/ 999 — S/ 2,799 / mes",
    icon: "📈",
  },
  {
    id: "liderazgo",
    label: "Planes de Liderazgo",
    description:
      "Para empresas consolidadas que quieren dominar su mercado con IA y automatización.",
    priceRange: "S/ 2,499 — S/ 4,999 / mes",
    icon: "🏆",
  },
  {
    id: "personalizado",
    label: "Plan Personalizado",
    description:
      "Diseñado exclusivamente para ti. Servicios exactos que necesita tu negocio.",
    priceRange: "Presupuesto a medida",
    icon: "🎯",
  },
];
// Diferenciales
export const differentials = [
  {
    icon: "🏆",
    title: "+2 Años de Experiencia",
    description:
      "Más de 2 años liderando la transformación digital de marcas en el sector gastronómico y B2C, con resultados reales y comprobados en el mercado peruano.",
    color: "blue",
  },
  {
    icon: "🎯",
    title: "Equipo Especializado 360°",
    description:
      "Equipo especializado en Community Management, Diseño Gráfico, Producción Audiovisual, Publicidad Digital y SEO — asegurando resultados de alta calidad en cada área.",
    color: "default",
  },
  {
    icon: "📊",
    title: "Metodología Basada en Resultados",
    description:
      "Procesos organizados, entregables concretos y seguimiento constante de métricas. No trabajamos por impresiones — trabajamos por objetivos de negocio medibles.",
    color: "default",
  },
  {
    icon: "🚀",
    title: "Acompañamiento Estratégico Continuo",
    description:
      "Enfocados en la escalabilidad y el crecimiento de la marca a largo plazo. Somos más que un proveedor — somos tu socio digital estratégico.",
    color: "cream",
  },
  {
    icon: "🤖",
    title: "Experiencia en Marcas Locales",
    description:
      "Experiencia liderando marcas locales peruanas, logrando posicionamiento digital real, engagement genuino y fortalecimiento sólido de la presencia digital.",
    color: "default",
  },
  {
    icon: "🤝",
    title: "Sin Contratos Anuales",
    description:
      "Trabajamos mes a mes porque confiamos plenamente en nuestros resultados. Nos quedamos contigo porque generamos valor, no porque lo exija un contrato.",
    color: "default",
  },
];
// ========== HERO CONTENT ==========
export const heroContent = {
  eyebrow: "⬡ Inovafy Studio · Perú · USA · Spain",
  title: ["Un plan", "para cada", "etapa de", "tu marca."],
  description:
    "Desde el primer post hasta dominar tu mercado. Tenemos el plan exacto para donde está tu negocio hoy — y para donde quiere llegar mañana.",
  chips: [
    "✦ Marketing Digital",
    "✦ Diseño Digital",
    "✦ Branding",
    "✦ Diseño UI/UX",
    "✦ Desarrollo App & Web",
    "✦ Producción Audiovisual",
    "✦ Creación de Contenido",
    "✦ IA & Automatización",
  ],
  stats: [
    {
      icon: "✦",
      value: "+2 años",
      label: "Transformando marcas en el sector gastronómico y B2C de Perú",
      colSpan: true,
    },
    { value: "9", label: "Planes por etapa de negocio" },
    { value: "6", label: "Servicios en un equipo" },
  ],
};

// ========== PLAN PERSONALIZADO CONTENT ==========
export const personalizadoContent = {
  eyebrow: "✦ Plan Personalizado",
  title: "Tu plan,",
  titleEmphasis: "a tu medida.",
  description:
    "Cada negocio es único. Si ninguno de nuestros planes encaja exactamente con lo que necesitas, diseñamos uno desde cero para ti — con los servicios exactos, al ritmo de tu presupuesto y objetivos.",
  steps: [
    {
      num: "1",
      title: "📅 Reunión de diagnóstico",
      desc: "Agendamos una sesión de 30–60 min contigo para entender tu negocio.",
    },
    {
      num: "2",
      title: "🔍 Análisis y verificación",
      desc: "Auditamos tu presencia digital y detectamos oportunidades.",
    },
    {
      num: "3",
      title: "📋 Propuesta a medida",
      desc: "Te presentamos un plan 100% personalizado.",
    },
    {
      num: "4",
      title: "🚀 Ejecución y seguimiento",
      desc: "Arrancamos con equipo dedicado y métricas claras.",
    },
  ],
  benefits: [
    "Diagnóstico digital completo sin costo",
    "Selección de servicios exactos que necesitas",
    "Combinación libre de cualquier servicio Inovafy",
    "Presupuesto adaptado a tu realidad",
    "Cronograma y entregables definidos contigo",
    "KPIs y métricas de éxito acordadas desde el inicio",
    "Escalable mes a mes según resultados",
  ],
  priceNote:
    "El precio se define después de la reunión de diagnóstico, en función de los servicios elegidos y tus objetivos. Sin compromiso previo.",
  ctaText: "Agendar reunión gratuita →",
  ctaWhatsapp: "Escribirnos por WhatsApp",
};

// ========== TABLA COMPARATIVA ==========
export const compareTable = {
  headers: [
    "Servicio",
    { name: "Esencial", price: "S/949.90" },
    { name: "Avanzado", price: "S/1,559.90" },
    { name: "Premium", price: "S/1,999.90" },
    { name: "Optimize", price: "S/999" },
    { name: "Scale", price: "S/1,799" },
    { name: "Dominate", price: "S/2,799" },
    { name: "Leader", price: "S/2,499" },
    { name: "Authority", price: "S/3,599" },
    { name: "Legacy", price: "S/4,999" },
  ],
  rows: [
    {
      label: "Community Manager",
      values: ["✓", "✓", "✓", "✓", "✓", "✓", "✓", "✓", "✓"],
    },
    {
      label: "Publicaciones / mes",
      values: ["10", "16", "20", "12", "20", "24", "24", "30", "Ilimitadas"],
    },
    {
      label: "Sesión fotográfica pro",
      values: ["✕", "✓", "✓", "✕", "✓", "✓", "✓", "✓", "✓"],
    },
    {
      label: "Pauta publicitaria",
      values: [
        "✕",
        "Meta",
        "Meta+Google+TK",
        "✕",
        "Meta+Google",
        "Todas",
        "Meta+Google",
        "Todas",
        "Todas+Nacional",
      ],
    },
    {
      label: "Web / UI-UX",
      values: [
        "✕",
        "✕",
        "Landing",
        "CRO",
        "Landings",
        "Web avanzada",
        "Rediseño completo",
        "Web + App",
        "Ecosistema total",
      ],
    },
    {
      label: "IA & Automatización",
      values: ["✕", "✕", "✕", "✕", "✕", "✓", "✕", "✓", "IA personalizada"],
    },
    {
      label: "Email marketing",
      values: [
        "✕",
        "✕",
        "✕",
        "✕",
        "✓",
        "✓",
        "✓",
        "Masivo A/B",
        "Masivo avanzado",
      ],
    },
    {
      label: "CRM integrado",
      values: [
        "✕",
        "✓",
        "✓",
        "✕",
        "✓",
        "Avanzado",
        "✓",
        "Avanzado",
        "Enterprise",
      ],
    },
    {
      label: "Account Manager",
      values: [
        "Compartido",
        "Compartido",
        "Dedicado",
        "Compartido",
        "Dedicado",
        "Exclusivo",
        "Dedicado",
        "Exclusivo",
        "Equipo exclusivo",
      ],
    },
    {
      label: "Reportes",
      values: [
        "Mensual simple",
        "Mensual detallado",
        "ROI mensual",
        "KPIs mensual",
        "Quincenal",
        "Semanal+Dashboard",
        "Quincenal ROI",
        "Semanal ejecutivo",
        "Tiempo real 24/7",
      ],
    },
  ],
};

// ========== FOOTER CTA ==========
export const footerCta = {
  title: "¿No sabes qué plan",
  titleEmphasis: "es para ti?",
  description:
    "Agenda una sesión estratégica gratuita de 30 minutos. Te ayudamos a elegir el plan ideal para tu etapa de negocio.",
  ctaText: "Agendar sesión gratuita →",
  ctaSecondary: "Ver todos los planes",
};
