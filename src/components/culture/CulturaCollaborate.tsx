"use client";

import { useEffect, useRef, useState } from "react";

export default function CultureCollaborate() {
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ contenido dinámico
  const items = [
    {
      title: "4.5 day week.",
      desc: "Finish at 1pm on a Friday!",
    },
    {
      title: "Remote and flexible working.",
      desc: "Choose where you work from. Change location but just make sure you have a good internet connection. We operate core hours but make your day work for you.",
    },
    {
      title: "Zero ego hiring policy.",
      desc: "We only hire open minded people that will be easy going and of course, talented.",
    },
    {
      title: "Open communication.",
      desc: "Every team member has a mentor to sound board off and have 1 to 1’s every month. Every six months we get together for performance reviews.",
    },
    {
      title: "Creative freedom.",
      desc: "We encourage ideas, experimentation and pushing boundaries on every project.",
    },
  ];

  const [index, setIndex] = useState(0);

  const nextItem = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  // ✅ SHADER SOLO PARA LA SEGUNDA SECCIÓN
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanup: (() => void) | null = null;

    import("three").then((THREE) => {
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        powerPreference: "low-power",
      });

      renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild(renderer.domElement);

      Object.assign(renderer.domElement.style, {
        position: "absolute",
        inset: "0",
        pointerEvents: "none",
      });

      const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;
          uniform float uTime;
          uniform vec2 uMouse;
          varying vec2 vUv;

          float noise(vec2 p){
            return sin(p.x)*sin(p.y);
          }

          float fbm(vec2 p){
            float v = 0.0;
            v += noise(p) * .5;
            v += noise(p*2.0) * .25;
            v += noise(p*4.0) * .125;
            return v;
          }

          void main(){
            vec2 uv = vUv;

            float t = uTime * 0.25;
            float n = fbm(uv * 2.0 + t);

            vec3 dark1 = vec3(0.02);
            vec3 dark2 = vec3(0.15);

            vec3 base = mix(dark1, dark2, n);

            vec3 magenta = vec3(0.85, 0.1, 0.5);
            vec3 blue = vec3(0.1, 0.5, 0.9);

            float dist = distance(uv, uMouse);
            float glow = exp(-dist * 6.0);

            vec3 col = mix(magenta, blue, n);

            vec3 finalColor = mix(base, col, glow);
            finalColor += col * glow * 0.35;

            gl_FragColor = vec4(finalColor, 1.0);
          }
        `,
      });

      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);

      scene.add(mesh);

      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        uniforms.uMouse.value.set(
          (e.clientX - rect.left) / rect.width,
          1 - (e.clientY - rect.top) / rect.height
        );
      };

      container.addEventListener("mousemove", onMouseMove);

      let raf = 0;

      const animate = () => {
        raf = requestAnimationFrame(animate);
        uniforms.uTime.value += 0.016;
        renderer.render(scene, camera);
      };

      animate();

      cleanup = () => {
        cancelAnimationFrame(raf);
        container.removeEventListener("mousemove", onMouseMove);
        renderer.dispose();
      };
    });

    return () => cleanup?.();
  }, []);

  return (
    <>
      {/* ✅ SECCIÓN 1: NEGRA (CORREGIDA EXACTA) */}
      <section className="bg-[#000000]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-32">
          <div className="grid lg:grid-cols-3 items-start gap-10">
            {/* LEFT */}
            <h2 className="text-5xl md:text-5xl text-white font-medium">
              Sorry, no table football, but...
            </h2>

            {/* RIGHT */}
            <div className="lg:col-span-2 flex gap-6">
              {/* ✅ LINEA AJUSTADA */}
              <div className="ml-4 w-[4px] min-h-[140px] bg-gradient-to-b from-purple-500 via-blue-500 to-transparent rounded-full" />

              {/* CONTENIDO */}
              <div className="pl-2">
                <h3 className="text-4xl md:text-5xl text-white font-light mb-3">
                  {items[index].title}
                </h3>

                <p className="text-white/60 mb-6 max-w-md leading-relaxed">
                  {items[index].desc}
                </p>

                <button
                  onClick={nextItem}
                  className="flex items-center gap-3 text-white/80 group"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-white/40 rounded-full group-hover:rotate-180 transition duration-500">
                    ↻
                  </div>

                  <span className="text-sm tracking-wide">SHOW ANOTHER</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ SECCIÓN 2: SHADER */}
      <section
        ref={containerRef}
        className="relative bg-[#050508] overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-xl">
              <p className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-white/85 font-medium mb-10">
                Got some cool stuff you’d like to share? We’d love to see it,
                even if there isn’t a fit right right now.
              </p>

              <button className="group flex items-center gap-3 border border-white/40 rounded-full px-6 py-3 text-white hover:bg-white hover:text-black transition-all duration-300">
                <span className="text-lg">Get in touch</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </div>

            <div className="flex lg:justify-end">
              <div className="w-full max-w-sm rounded-r-[36px] bg-white/[0.08] backdrop-blur-xl border border-white/10 shadow-[0_20px_120px_rgba(0,0,0,0.6)] p-10">
                <p className="text-white font-semibold text-lg mb-6">
                  We’re interested in :
                </p>

                <div className="flex flex-col gap-3 text-white/80 text-sm">
                  {[
                    "Webflow",
                    "WebGL",
                    "Web Animation",
                    "Motion Graphics",
                    "Photography",
                    "Illustration",
                    "Creative Strategy",
                    "Copywriting",
                  ].map((item) => (
                    <span
                      key={item}
                      className="hover:text-purple-300 cursor-pointer"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
