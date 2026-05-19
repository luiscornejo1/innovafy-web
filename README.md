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


![Mapa de Arquitectura de Innovafy Web](./docs/assets/arquitectura.png)