"use client";

import { useEffect, useRef } from "react";

export default function InterestedCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanup: (() => void) | null = null;

    import("three").then((THREE) => {
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
      
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild(renderer.domElement);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      renderer.domElement.style.pointerEvents = "none";

      const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(container.offsetWidth, container.offsetHeight) },
      };

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        precision highp float;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        varying vec2 vUv;

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

          vec2 st = vec2(uv.x * 0.3, uv.y * 1.8);
          float t = uTime * 0.08;

          vec2 mousePos = uMouse;
          vec2 diff = uv - mousePos;
          diff.x *= aspect;
          float mouseDist = length(diff);
          
          st += diff * 0.15 * exp(-mouseDist * 1.5);

          float warp1 = snoise(vec3(st * 0.6, t * 0.7));
          float warp2 = snoise(vec3(st * 0.6 + 4.0, t * 0.5 + 2.0));
          vec2 warped = st + vec2(warp1, warp2) * 0.25;

          float warp3 = snoise(vec3(warped * 0.5 + 8.0, t * 0.6 + 5.0));
          float warp4 = snoise(vec3(warped * 0.5 + 12.0, t * 0.4 + 8.0));
          warped += vec2(warp3, warp4) * 0.15;

          float n1 = snoise(vec3(warped * 0.7, t * 0.3));
          float n2 = snoise(vec3(warped * 0.5 + 3.0, t * 0.25 + 1.0));
          float n3 = snoise(vec3(warped * 0.6 + 7.0, t * 0.35 + 3.0));

          vec3 colBlack   = vec3(0.0, 0.0, 0.0);
          vec3 colMagenta = vec3(0.85, 0.05, 0.55);
          vec3 colCyan    = vec3(0.05, 0.65, 0.95);
          vec3 colBlue    = vec3(0.1, 0.08, 0.45);
          vec3 colWhite   = vec3(0.95, 0.92, 1.0);

          vec3 color = colBlack;

          float magentaMask = smoothstep(-0.05, 0.35, n1) * smoothstep(0.9, 0.2, n1);
          color = mix(color, colMagenta, magentaMask * 0.9);

          float cyanMask = smoothstep(0.0, 0.4, n2) * smoothstep(0.85, 0.15, n2);
          color = mix(color, colCyan, cyanMask * 0.7);

          float blueMask = smoothstep(-0.3, 0.2, n3) * smoothstep(0.7, 0.0, n3);
          color = mix(color, colBlue, blueMask * 0.6);

          float coreMask = magentaMask * cyanMask;
          color = mix(color, colWhite, smoothstep(0.05, 0.4, coreMask) * 0.5);

          float glow = exp(-mouseDist * 2.5) * 0.3;
          color += vec3(0.4, 0.05, 0.6) * glow;

          float luminance = dot(color, vec3(0.299, 0.587, 0.114));
          color *= smoothstep(0.02, 0.15, luminance);

          float vig = 1.0 - smoothstep(0.4, 1.3, length((uv - 0.5) * vec2(1.4, 1.8)));
          color *= vig;

          color = pow(color, vec3(0.95));

          gl_FragColor = vec4(color, 1.0);
        }
      `;

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        side: THREE.FrontSide,
      });

      const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        uniforms.uMouse.value.set(
          (e.clientX - rect.left) / rect.width,
          1.0 - (e.clientY - rect.top) / rect.height
        );
      };
      container.addEventListener("mousemove", onMouseMove);

      const onResize = () => {
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        uniforms.uResolution.value.set(container.offsetWidth, container.offsetHeight);
      };
      window.addEventListener("resize", onResize);

      let isVisible = false;
      const observer = new IntersectionObserver(
        ([entry]) => { isVisible = entry.isIntersecting; },
        { threshold: 0.05 }
      );
      observer.observe(container);

      const TARGET_FPS = 20;
      const FRAME_INTERVAL = 1000 / TARGET_FPS;
      let animId = 0;
      let lastFrameTime = 0;

      const animate = (now: number) => {
        animId = requestAnimationFrame(animate);
        if (!isVisible) return;
        const delta = now - lastFrameTime;
        if (delta < FRAME_INTERVAL) return; 
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
        <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">
          Interested in<br />
          working with<br />
          Innovafy?
        </h2>

        <div className="flex flex-col gap-6">
          <h3 className="text-4xl md:text-5xl font-medium text-white">
            Drop us a line at
          </h3>
          <a
            href="mailto:hello@innovafy.com"
            className="text-4xl md:text-5xl font-medium text-white underline underline-offset-8 hover:text-purple-400 transition-colors"
          >
            hello@innovafy.com
          </a>
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md mt-4">
            We are a Creative Digital Agency, specialising in Creative Web Design, Web
            Development, Branding and Digital Marketing.
          </p>
        </div>
      </div>
    </section>
  );
}
