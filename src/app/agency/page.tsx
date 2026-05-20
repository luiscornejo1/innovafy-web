"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// TODO: REEMPLAZA ESTAS IMAGENES CON LAS FOTOS REALES DE TUS PROYECTOS
// Añade más URLs si quieres que el rastro tenga más variedad.
const TRAIL_IMAGES = [
  "https://picsum.photos/id/1015/400/300",
  "https://picsum.photos/id/1016/400/300",
  "https://picsum.photos/id/1018/400/300",
  "https://picsum.photos/id/1019/400/300",
  "https://picsum.photos/id/1020/400/300",
];

// Trail config
const MAX_TRAIL = 5;
// ↓↓↓ AJUSTA ESTE VALOR para controlar cuántos px debe moverse el mouse antes de que aparezca una nueva imagen ↓↓↓
const TRAIL_SPAWN_DIST = 150; // px mínimo de movimiento del mouse para generar imagen
// ↓↓↓ AJUSTA ESTE VALOR para controlar la velocidad máxima de aparición (1000 / FPS) ↓↓↓
const TRAIL_THROTTLE_MS = 1000 / 10; // 10 FPS cap — más lento y elegante

export default function AgencyPage() {
  const container = useRef<HTMLDivElement>(null);

  // Mouse Trail State
  const [trail, setTrail] = useState<{ id: number; x: number; y: number; img: string }[]>([]);
  const trailCount = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastSpawnTime = useRef(0);

  const handlePointerMove = (e: React.PointerEvent) => {
    // ── 15 FPS time throttle ──
    const now = performance.now();
    if (now - lastSpawnTime.current < TRAIL_THROTTLE_MS) return;

    const dist = Math.hypot(e.pageX - lastPosition.current.x, e.pageY - lastPosition.current.y);
    if (dist < TRAIL_SPAWN_DIST) return;

    lastSpawnTime.current = now;
    lastPosition.current = { x: e.pageX, y: e.pageY };
    const newImage = {
      id: trailCount.current++,
      x: e.pageX,
      y: e.pageY,
      img: TRAIL_IMAGES[trailCount.current % TRAIL_IMAGES.length],
    };

    setTrail((prev) => {
      // Keep max images capped to avoid DOM bloat
      const updated = [...prev, newImage];
      return updated.length > MAX_TRAIL ? updated.slice(-MAX_TRAIL) : updated;
    });

    // Auto-remove after animation lifetime
    setTimeout(() => {
      setTrail((prev) => prev.filter((item) => item.id !== newImage.id));
    }, 1500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Generic fade-up reveal for elements as they scroll into view
      gsap.utils.toArray(".gsap-reveal").forEach((el: any) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });

      // Specific staggered scroll text animation for OUR MISSION grid
      gsap.fromTo(
        ".mission-text",
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mission-section",
            start: "top 70%",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={container}
      className="bg-transparent text-neutral-900 min-h-screen relative overflow-x-hidden"
    >
      {/* MOUSE TRAIL EFFECT */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence>
          {trail.map((item) => (
            <motion.img
              key={item.id}
              src={item.img}
              initial={{ opacity: 0, scale: 0.5, x: item.x - 200, y: item.y - 150 }}
              animate={{ opacity: 1, scale: 1, x: item.x - 200, y: item.y - 150 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute w-[400px] h-[300px] object-cover rounded-xl shadow-2xl"
              style={{ left: 0, top: 0 }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* HERO SECTION */}
      <section 
        className="relative z-10 min-h-screen flex items-center px-6 lg:px-12 pt-32 pb-20 cursor-crosshair"
        onPointerMove={handlePointerMove}
      >
        <h1 className="text-[12vw] md:text-[10vw] leading-[0.85] font-black tracking-[-0.04em] uppercase max-w-[1200px] pointer-events-none gsap-reveal">
          Proudly signing every piece.
        </h1>
      </section>

      {/* OUR MISSION */}
      <section className="mission-section relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-12 py-24">
        <h2 className="text-[14vw] md:text-[12vw] leading-none font-black tracking-[-0.04em] uppercase mb-16 gsap-reveal">
          OUR<br />MISSION
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 items-end">
          <h3 className="mission-text text-4xl md:text-5xl font-medium tracking-tight leading-tight">
            To make the digital world more beautiful, thoughtful & impactful.
          </h3>
          <p className="mission-text text-lg md:text-xl text-neutral-800 leading-relaxed max-w-lg">
            Every pixel matters to us because we know it matters to our clients. 
            We understand that great creativity is not simply about big ideas; 
            it's also about the smallest details. Our focus on the minutiae is not just an obsession, 
            it's a reflection of our commitment to providing the highest quality service.
          </p>
        </div>
      </section>

      {/* VIDEO SECTION */}
      {/* TODO: CAMBIA EL BACKGROUND IMAGE POR TU VIDEO. 
          Puedes usar un tag <video autoPlay loop muted> o un iframe de Vimeo/YouTube. */}
      <section className="relative z-10 w-full px-6 lg:px-12 py-12 gsap-reveal">
        <div className="relative w-full aspect-video bg-neutral-900 rounded-3xl overflow-hidden flex items-center justify-center group cursor-pointer shadow-2xl">
          {/* Placeholder for Video Cover */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity duration-500"
            style={{ backgroundImage: "url('https://picsum.photos/id/1025/1920/1080')" }}
          ></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

          {/* Play Button */}
          <div className="relative z-10 w-32 h-32 bg-white rounded-full flex items-center justify-center text-2xl font-bold tracking-tight text-black group-hover:scale-110 transition-transform duration-500">
            Play
          </div>

          <div className="absolute bottom-12 left-0 right-0 text-center z-10 pointer-events-none">
            <h3 className="text-white text-5xl md:text-6xl font-light tracking-wide mb-4">Film & TV</h3>
            <p className="text-white/80 text-lg">Visual Effects Without Limits. Innovation Without Compromise.</p>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="relative z-10 min-h-screen px-6 lg:px-12 py-24 mt-24">
        <h2 className="text-[12vw] md:text-[10vw] leading-none font-black tracking-[-0.04em] uppercase text-center md:text-right mb-24 gsap-reveal">
          OUR APPROACH
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* TODO: REEMPLAZA ESTA IMAGEN CON LA FOTO DE TU EQUIPO/OFICINA */}
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden rounded-bl-none gsap-reveal">
            <img 
              src="https://picsum.photos/id/1031/800/1000" 
              alt="Our approach team" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-8 max-w-xl">
            <p className="text-xl md:text-2xl text-neutral-900 leading-relaxed font-medium gsap-reveal">
              We're not just coders who take instructions – we're artists who take pride in being bold 
              and draw inspiration from the wider creative world of music, film and the arts.
            </p>
            <p className="text-lg md:text-xl text-neutral-800 leading-relaxed gsap-reveal">
              You'll never see us play it safe, and we especially like partnering with clients who are up for making digital waves.
            </p>
            <p className="text-lg md:text-xl text-neutral-800 leading-relaxed gsap-reveal">
              Sustainability is very close to our hearts, too. If your brand makes a positive impact on the environment, 
              we'd relish in making it even bigger.
            </p>
            <div className="mt-8 gsap-reveal">
              <button className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-neutral-800 transition-colors inline-flex items-center gap-2">
                Start your project <span className="text-xl">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          OUR PARTNERS SECTION
          - Fondo negro, texto morado
          - Los logos son placeholders de texto. Reemplaza cada <span> 
            dentro del grid por un <img src="..." /> con el logo real.
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 bg-black py-24 px-6 lg:px-12">
        {/* Top area: description + title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-[14vw] md:text-[10vw] leading-[0.85] font-light tracking-[-0.03em] text-purple-400 gsap-reveal">
              OUR<br />
              <span className="ml-12 md:ml-24">PARTNERS</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-lg gsap-reveal">
              The brands we partner with are looking to push their industry boundaries, and
              ready to invest quality resources into their digital. They want to work with a
              close, more specialist team they click with – and who they trust to take them
              outside of their creative comfort zone.
            </p>
          </div>
        </div>

        {/* Logo Grid */}
        {/* TODO: REEMPLAZA CADA <span> CON UN <img src="/logos/tu-logo.svg" alt="Nombre" className="max-h-10 object-contain" /> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-12">
          {/* Fila 1 */}
          {/* TODO: Logo 1 - Reemplaza el texto por tu imagen */}
          <div className="flex items-center justify-center py-6 border border-white/10 rounded-xl hover:border-purple-400/40 transition-colors">
            <span className="text-white font-bold text-lg tracking-wide">Partner 1</span>
          </div>
          {/* TODO: Logo 2 */}
          <div className="flex items-center justify-center py-6 border border-white/10 rounded-xl hover:border-purple-400/40 transition-colors">
            <span className="text-white font-bold text-lg tracking-wide">Partner 2</span>
          </div>
          {/* TODO: Logo 3 */}
          <div className="flex items-center justify-center py-6 border border-white/10 rounded-xl hover:border-purple-400/40 transition-colors">
            <span className="text-white font-bold text-lg tracking-wide">Partner 3</span>
          </div>
          {/* TODO: Logo 4 */}
          <div className="flex items-center justify-center py-6 border border-white/10 rounded-xl hover:border-purple-400/40 transition-colors">
            <span className="text-white font-bold text-lg tracking-wide">Partner 4</span>
          </div>
          {/* TODO: Logo 5 */}
          <div className="flex items-center justify-center py-6 border border-white/10 rounded-xl hover:border-purple-400/40 transition-colors">
            <span className="text-white font-bold text-lg tracking-wide">Partner 5</span>
          </div>

          {/* Fila 2 */}
          {/* TODO: Logo 6 */}
          <div className="flex items-center justify-center py-6 border border-white/10 rounded-xl hover:border-purple-400/40 transition-colors">
            <span className="text-white font-bold text-lg tracking-wide">Partner 6</span>
          </div>
          {/* TODO: Logo 7 */}
          <div className="flex items-center justify-center py-6 border border-white/10 rounded-xl hover:border-purple-400/40 transition-colors">
            <span className="text-white font-bold text-lg tracking-wide">Partner 7</span>
          </div>
          {/* TODO: Logo 8 */}
          <div className="flex items-center justify-center py-6 border border-white/10 rounded-xl hover:border-purple-400/40 transition-colors">
            <span className="text-white font-bold text-lg tracking-wide">Partner 8</span>
          </div>
          {/* TODO: Logo 9 */}
          <div className="flex items-center justify-center py-6 border border-white/10 rounded-xl hover:border-purple-400/40 transition-colors">
            <span className="text-white font-bold text-lg tracking-wide">Partner 9</span>
          </div>
          {/* TODO: Logo 10 */}
          <div className="flex items-center justify-center py-6 border border-white/10 rounded-xl hover:border-purple-400/40 transition-colors">
            <span className="text-white font-bold text-lg tracking-wide">Partner 10</span>
          </div>

          {/* Fila 3 */}
          {/* TODO: Logo 11 */}
          <div className="flex items-center justify-center py-6 border border-white/10 rounded-xl hover:border-purple-400/40 transition-colors">
            <span className="text-white font-bold text-lg tracking-wide">Partner 11</span>
          </div>
          {/* TODO: Logo 12 */}
          <div className="flex items-center justify-center py-6 border border-white/10 rounded-xl hover:border-purple-400/40 transition-colors">
            <span className="text-white font-bold text-lg tracking-wide">Partner 12</span>
          </div>
          {/* TODO: Logo 13 */}
          <div className="flex items-center justify-center py-6 border border-white/10 rounded-xl hover:border-purple-400/40 transition-colors">
            <span className="text-white font-bold text-lg tracking-wide">Partner 13</span>
          </div>
          {/* TODO: Logo 14 */}
          <div className="flex items-center justify-center py-6 border border-white/10 rounded-xl hover:border-purple-400/40 transition-colors">
            <span className="text-white font-bold text-lg tracking-wide">Partner 14</span>
          </div>
          {/* TODO: Logo 15 */}
          <div className="flex items-center justify-center py-6 border border-white/10 rounded-xl hover:border-purple-400/40 transition-colors">
            <span className="text-white font-bold text-lg tracking-wide">Partner 15</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          OUR TEAM SECTION
          - Fondo negro, carrusel horizontal con efecto zoom en hover
          - TODO: Reemplaza las URLs de las fotos y los nombres/roles
          ═══════════════════════════════════════════════════════════ */}
      <TeamCarousel />

      {/* ═══════════════════════════════════════════════════════════
          INTERESTED IN WORKING WITH INNOVAFY?
          - Fondo negro con efecto aurora/arena interactivo al mouse
          ═══════════════════════════════════════════════════════════ */}
      <InterestedCTA />

      {/* ═══════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════ */}
      <Footer />
    </main>
  );
}

// ──────────────────────────────────────────────────────────
// INTERESTED CTA WITH INTERACTIVE AURORA CANVAS
// ──────────────────────────────────────────────────────────

function InterestedCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dynamic import Three.js to avoid SSR issues
    let cleanup: (() => void) | null = null;

    import("three").then((THREE) => {
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
      // ── Limitar Pixel Ratio a 1.5 para no sobrecargar pantallas Retina/HiDPI ──
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild(renderer.domElement);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      renderer.domElement.style.pointerEvents = "none";

      // Uniforms passed into the shader
      const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(container.offsetWidth, container.offsetHeight) },
      };

      // ─── GLSL SHADERS ───
      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `;

      // Fragment shader: AURORA BOREAL / Fluid Mesh Gradient
      // Key technique: UV.x is drastically compressed (multiplied by small value)
      // so noise produces long horizontal bands instead of clouds.
      const fragmentShader = `
        precision highp float;

        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        varying vec2 vUv;

        // ── Simplex 3D Noise (Ashima Arts) ──
        vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
        vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v){
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod(i, 289.0);
          vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 1.0/7.0;
          vec3  ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }

        void main() {
          vec2 uv = vUv;
          float aspect = uResolution.x / uResolution.y;

          // ────────────────────────────────────────────
          // CRUCIAL: Stretch UV.x to create horizontal aurora bands
          // Small X multiplier = long horizontal streaks
          // Larger Y multiplier = thin vertical detail
          // ────────────────────────────────────────────
          vec2 st = vec2(uv.x * 0.3, uv.y * 1.8);

          float t = uTime * 0.08; // Very slow drift

          // ── Mouse influence: gentle UV warp ──
          vec2 mousePos = uMouse;
          vec2 diff = uv - mousePos;
          diff.x *= aspect;
          float mouseDist = length(diff);
          // Pull UV toward mouse softly
          st += diff * 0.15 * exp(-mouseDist * 1.5);

          // ── Domain warp (low frequency, 2 passes for fluid feel) ──
          // Pass 1: gentle warp
          float warp1 = snoise(vec3(st * 0.6, t * 0.7));
          float warp2 = snoise(vec3(st * 0.6 + 4.0, t * 0.5 + 2.0));
          vec2 warped = st + vec2(warp1, warp2) * 0.25;

          // Pass 2: warp the warped coords for extra fluidity
          float warp3 = snoise(vec3(warped * 0.5 + 8.0, t * 0.6 + 5.0));
          float warp4 = snoise(vec3(warped * 0.5 + 12.0, t * 0.4 + 8.0));
          warped += vec2(warp3, warp4) * 0.15;

          // ── Noise layers (all LOW frequency for massive shapes) ──
          float n1 = snoise(vec3(warped * 0.7, t * 0.3));
          float n2 = snoise(vec3(warped * 0.5 + 3.0, t * 0.25 + 1.0));
          float n3 = snoise(vec3(warped * 0.6 + 7.0, t * 0.35 + 3.0));

          // ── Color palette ──
          vec3 colBlack   = vec3(0.0, 0.0, 0.0);
          vec3 colMagenta = vec3(0.85, 0.05, 0.55);
          vec3 colCyan    = vec3(0.05, 0.65, 0.95);
          vec3 colBlue    = vec3(0.1, 0.08, 0.45);
          vec3 colWhite   = vec3(0.95, 0.92, 1.0);

          // ── Build color using smoothstep for silky transitions ──
          // Start from pure black
          vec3 color = colBlack;

          // Magenta aurora band - the dominant streak
          float magentaMask = smoothstep(-0.05, 0.35, n1) * smoothstep(0.9, 0.2, n1);
          color = mix(color, colMagenta, magentaMask * 0.9);

          // Cyan band - offset, thinner
          float cyanMask = smoothstep(0.0, 0.4, n2) * smoothstep(0.85, 0.15, n2);
          color = mix(color, colCyan, cyanMask * 0.7);

          // Deep blue/indigo undertone
          float blueMask = smoothstep(-0.3, 0.2, n3) * smoothstep(0.7, 0.0, n3);
          color = mix(color, colBlue, blueMask * 0.6);

          // White-hot core where magenta and cyan overlap
          float coreMask = magentaMask * cyanMask;
          color = mix(color, colWhite, smoothstep(0.05, 0.4, coreMask) * 0.5);

          // ── Mouse proximity glow (subtle purple warmth) ──
          float glow = exp(-mouseDist * 2.5) * 0.3;
          color += vec3(0.4, 0.05, 0.6) * glow;

          // ── Force black dominance in negative space ──
          // Overall luminance fade: push dim areas toward pure black
          float luminance = dot(color, vec3(0.299, 0.587, 0.114));
          color *= smoothstep(0.02, 0.15, luminance);

          // ── Soft vignette ──
          float vig = 1.0 - smoothstep(0.4, 1.3, length((uv - 0.5) * vec2(1.4, 1.8)));
          color *= vig;

          // Gamma / brightness
          color = pow(color, vec3(0.95));

          gl_FragColor = vec4(color, 1.0);
        }
      `;

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        // ── Face Culling: solo renderiza la cara frontal del plano ──
        side: THREE.FrontSide,
      });

      // ── Geometría optimizada: 2x2 plano con segmentos mínimos (fullscreen quad) ──
      const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Mouse tracking
      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        uniforms.uMouse.value.set(
          (e.clientX - rect.left) / rect.width,
          1.0 - (e.clientY - rect.top) / rect.height // flip Y for GLSL
        );
      };
      container.addEventListener("mousemove", onMouseMove);

      // Resize handler
      const onResize = () => {
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        uniforms.uResolution.value.set(container.offsetWidth, container.offsetHeight);
      };
      window.addEventListener("resize", onResize);

      // ── Viewport Culling: pausar rendering cuando la sección no es visible ──
      let isVisible = false;
      const observer = new IntersectionObserver(
        ([entry]) => { isVisible = entry.isIntersecting; },
        { threshold: 0.05 }
      );
      observer.observe(container);

      // Animation loop — capped at 20 FPS for performance on all devices
      const TARGET_FPS = 20;
      const FRAME_INTERVAL = 1000 / TARGET_FPS;
      let animId = 0;
      let lastFrameTime = 0;

      const animate = (now: number) => {
        animId = requestAnimationFrame(animate);
        // ── No renderizar si la sección está fuera del viewport ──
        if (!isVisible) return;
        const delta = now - lastFrameTime;
        if (delta < FRAME_INTERVAL) return; // skip frame
        lastFrameTime = now - (delta % FRAME_INTERVAL);

        uniforms.uTime.value += 0.016;
        renderer.render(scene, camera);
      };
      animId = requestAnimationFrame(animate);

      cleanup = () => {
        cancelAnimationFrame(animId);
        observer.disconnect();
        container.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-10 bg-[#050508] overflow-hidden"
    >
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 px-6 lg:px-12 py-32 min-h-[60vh] items-center">
        {/* Left: CTA Title */}
        <h2 className="text-5xl md:text-7xl font-light text-white leading-tight gsap-reveal">
          {/* TODO: Cambia "Innovafy" por el nombre de tu empresa si cambia */}
          Interested in<br />
          working with<br />
          Innovafy?
        </h2>

        {/* Right: Contact Info */}
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl md:text-5xl font-medium text-white gsap-reveal">
            Drop us a line at
          </h3>
          {/* TODO: Cambia este email por el correo real de tu empresa */}
          <a
            href="mailto:hello@innovafy.com"
            className="text-4xl md:text-5xl font-medium text-white underline underline-offset-8 hover:text-purple-400 transition-colors gsap-reveal"
          >
            hello@innovafy.com
          </a>
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md mt-4 gsap-reveal">
            {/* TODO: Cambia esta descripción por la de tu empresa */}
            We are a Creative Digital Agency, specialising in Creative Web Design, Web
            Development, Branding and Digital Marketing.
          </p>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────
// FOOTER
// ──────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative z-10 bg-black border-t border-white/10 px-6 lg:px-12 pt-16 pb-8">
      {/* Top Row: Logo + Email */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        {/* Logo */}
        <div className="flex items-center justify-center w-14 h-14 border-[3px] border-white font-black text-xs leading-none uppercase tracking-widest text-center text-white">
          <span>INNO<br/>VAFY</span>
        </div>

        {/* TODO: Cambia este email por el correo real */}
        <a
          href="mailto:hello@innovafy.com"
          className="text-4xl md:text-6xl font-bold text-white hover:text-purple-400 transition-colors"
        >
          hello@innovafy.com
        </a>
      </div>

      {/* Middle Row: Social + Badges */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        {/* TODO: Actualiza estos links con las URLs reales de tus redes sociales */}
        <div className="flex gap-6 text-sm text-white/70">
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
            LinkedIn <span className="text-[10px]">↗</span>
          </a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
            Facebook <span className="text-[10px]">↗</span>
          </a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
            Instagram <span className="text-[10px]">↗</span>
          </a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
            Bluesky <span className="text-[10px]">↗</span>
          </a>
        </div>

        {/* TODO: Reemplaza estos badges por los logos/imágenes reales de tus certificaciones */}
        <div className="flex items-center gap-6 text-white/50 text-xs font-bold tracking-widest">
          <span>CLUTCH</span>
          <span>AWWWARDS</span>
        </div>
      </div>

      {/* Links Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        {/* TODO: Actualiza estos links con las rutas reales de tu sitio */}
        <div className="flex gap-6 text-sm text-white/70">
          <a href="#" className="hover:text-white transition-colors">Contact</a>
          <a href="#" className="hover:text-white transition-colors">FAQs</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>

        {/* TODO: Cambia el texto del botón si lo necesitas */}
        <button className="border border-white/30 text-white text-sm px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors">
          Sign up to our newsletter
        </button>
      </div>

      {/* Bottom Row: Sectors + Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-8 border-t border-white/10">
        {/* TODO: Cambia los nombres de los sectores según los que maneje tu empresa */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-white/50 text-xs mr-2">Our sectors :</span>
          {["Agencies", "SaaS and Tech", "B2B Transformation", "Healthcare", "Media & Entertainment", "Retail"].map(
            (sector) => (
              <span
                key={sector}
                className="text-white/60 text-xs border border-white/20 px-3 py-1 rounded-full hover:border-white/50 transition-colors cursor-pointer"
              >
                {sector}
              </span>
            )
          )}
        </div>

        {/* TODO: Cambia el año y el nombre de la empresa */}
        <p className="text-white/40 text-xs">© Innovafy 2026</p>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────────────────
// TEAM CAROUSEL COMPONENT
// ──────────────────────────────────────────────────────────

// TODO: REEMPLAZA ESTAS FOTOS Y DATOS CON LOS MIEMBROS REALES DE TU EQUIPO
const TEAM_MEMBERS = [
  { name: "Nombre 1", role: "CEO & Founder", img: "https://picsum.photos/id/1005/600/800" },
  { name: "Nombre 2", role: "Creative Director", img: "https://picsum.photos/id/1011/600/800" },
  { name: "Nombre 3", role: "Lead Developer", img: "https://picsum.photos/id/1012/600/800" },
  { name: "Nombre 4", role: "UX Designer", img: "https://picsum.photos/id/1027/600/800" },
  { name: "Nombre 5", role: "Project Manager", img: "https://picsum.photos/id/1074/600/800" },
  { name: "Nombre 6", role: "Marketing Lead", img: "https://picsum.photos/id/1082/600/800" },
  { name: "Nombre 7", role: "Motion Designer", img: "https://picsum.photos/id/1013/600/800" },
  { name: "Nombre 8", role: "Brand Strategist", img: "https://picsum.photos/id/1014/600/800" },
];

function TeamCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(3);

  const scrollToIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(index, TEAM_MEMBERS.length - 1));
    setActiveIndex(clamped);
    if (trackRef.current) {
      const card = trackRef.current.children[clamped] as HTMLElement;
      if (card) {
        trackRef.current.scrollTo({
          left: card.offsetLeft - trackRef.current.offsetWidth / 2 + card.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section className="relative z-10 bg-black py-24 overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-6 lg:px-12 mb-16">
        <h2 className="text-[14vw] md:text-[10vw] leading-[0.85] font-light tracking-[-0.03em] text-white gsap-reveal">
          OUR<br />
          <span className="ml-12 md:ml-24">TEAM</span>
        </h2>
        <div className="flex items-end">
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-lg gsap-reveal">
            We're proud to be a Certified Great Place to Work®! You'll find us working
            across Creative Web Design, Web Development, Branding, and Digital
            Marketing.
          </p>
        </div>
      </div>

      {/* Carousel Track */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto px-6 lg:px-12 pb-8 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {TEAM_MEMBERS.map((member, i) => (
          <div
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`
              flex-shrink-0 relative cursor-pointer rounded-3xl overflow-hidden transition-all duration-500 snap-center
              ${activeIndex === i
                ? "w-[350px] md:w-[450px] h-[500px] md:h-[600px]"
                : "w-[180px] md:w-[220px] h-[500px] md:h-[600px] opacity-70"
              }
            `}
          >
            {/* Photo with zoom on hover */}
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            {/* Name overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white font-bold text-lg">{member.name}</p>
              <p className="text-purple-300 text-sm font-medium">{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-center gap-8 mt-10">
        <button
          onClick={() => scrollToIndex(activeIndex - 1)}
          className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:border-purple-400 hover:text-purple-400 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scrollToIndex(activeIndex + 1)}
          className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:border-purple-400 hover:text-purple-400 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
