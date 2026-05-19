# 🚀 Innovafy Web

Landing page de agencia creativa basada en el estilo de KOTA. Este proyecto está construido con Next.js y un stack avanzado de animaciones e interacciones 3D para ofrecer una experiencia web inmersiva.

---

## 🛠️ Stack Tecnológico y Arquitectura

- **Framework:** Next.js (App Router)
- **UI y Layout:** Definido en `src/app/layout.tsx` y `src/app/page.tsx`
- **Estilos Globales:** `src/app/globals.css`
- **Stack de Animaciones y Efectos:**
  - **Motion:** Microinteracciones y transiciones fluidas.
  - **GSAP:** Animaciones de revelado (reveals) y secuencias vinculadas al viewport.
  - **Three.js:** Renderizado de fondo 3D en el hero section.
  - **Swiper:** Carruseles dinámicos (ej. sección de testimonios).
  - **Lenis:** Smooth scroll para una navegación suave.
  - **LazySizes:** Carga diferida (lazy-load) de imágenes para optimización.

---

## 🏗️ Estructura del Proyecto

Para mantener el código escalable, utilizamos la siguiente estructura de carpetas dentro de `src/`:

```text
src/
├── app/                  # Rutas principales de Next.js (App Router)
├── components/           # Componentes de la interfaz
│   ├── sections/         # Secciones grandes (Hero, Services, Work, etc.)
│   ├── ui/               # Piezas reutilizables (Botones, Cards, Navbars)
│   └── three/            # Escenas, modelos y shaders de Three.js
├── lib/                  # Helpers, utilidades y configuraciones
└── data/                 # Contenido estático (servicios, proyectos, FAQs)


graph LR
    Root[🚀 Innovafy Web] --> Core(Framework Core)
    Core --> Core1[Next.js App Router]

    Root --> UI(UI & Layout)
    UI --> UI1[src/app/layout.tsx]
    UI --> UI2[src/app/page.tsx]
    UI --> UI3[src/app/globals.css]

    Root --> Anim(Animation Stack)
    Anim --> A1[Motion: Microinteracciones]
    Anim --> A2[GSAP: Viewport Reveals]
    Anim --> A3[Three.js: Fondo 3D Hero]
    Anim --> A4[Swiper: Carruseles]
    Anim --> A5[Lenis: Smooth Scroll]
    Anim --> A6[LazySizes: Lazy-load Imágenes]

    Root --> Org(Project Organization)
    Org --> O1[src/components/sections]
    Org --> O2[src/components/ui]
    Org --> O3[src/components/three]
    Org --> O4[src/lib]
    Org --> O5[src/data]