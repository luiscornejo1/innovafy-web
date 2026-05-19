# 🚀 Innovafy Web

Landing page de agencia creativa basada en el estilo de INNOVAFY. Este proyecto está construido con Next.js y un stack avanzado de animaciones e interacciones 3D para ofrecer una experiencia web inmersiva.

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
```

---

## 🧱 Diagrama de Arquitectura

![Mapa de Arquitectura de Innovafy Web](docs/assets/arquitectura.png)


## 🚀 Inicio Rápido (Guía de Instalación)

Sigue estos pasos para clonar el proyecto, instalar las dependencias y levantar el entorno de desarrollo local.

### 1. Clonar el repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
cd innovafyweb

### 2. Instalar dependencias
```bash
npm install
```
### 3. Levantar el entorno de desarrollo
```bash
npm run dev
```
### 4. Acceder a la aplicación
Abre tu navegador y navega a `http://localhost:3000` para ver la aplicación en acción.


### 👨‍💻 Flujo de Trabajo (Git)
Trabajaremos bajo la metodología de Feature Branches. NUNCA se debe hacer commit directamente a la rama main.

Asignaciones y Ramas:
Cada desarrollador debe trabajar exclusivamente en su rama:

👤 Mathias: feat/home-contacto 

👤 Luis: feat/agency-services 

👤 Michael: feat/work-blog 

👤 Geraldine: feat/cultura-planes 

Pasos diarios:
Asegúrate de estar al día: git checkout main y git pull origin main 

Muévete a tu rama: git checkout feat/nombre-de-tu-rama 

Trabaja, haz tus cambios y súbelos: git commit -m "feat: descripción" y git push origin feat/nombre-de-tu-rama 

Crea un Pull Request (PR) hacia main para revisión.