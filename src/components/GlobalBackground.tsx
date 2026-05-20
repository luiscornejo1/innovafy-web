"use client";

import { useEffect, useRef } from "react";

/**
 * GlobalBackground — WebGL fluid aurora gradient (KOTA-style).
 *
 * - Mouse follows the gradient ONLY in the first viewport (scrollY < window.innerHeight)
 * - After scrolling past the hero, the gradient animates on its own
 * - Performance: pixelRatio 1.5, 15 FPS cap, simplified shader (fewer noise passes)
 * - Renders at half resolution for extra savings
 */

export default function GlobalBackground() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    let cleanup: (() => void) | null = null;
    let isUnmounted = false;

    import("three").then((THREE) => {
      if (isUnmounted || !container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const renderer = new THREE.WebGLRenderer({
        alpha: true, // true forces a different composite path in Chrome, fixing white tile glitches
        antialias: false,
      });

      // ── DETECT HARDWARE ACCELERATION ──
      const gl = renderer.getContext();
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const rendererString = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        if (
          rendererString &&
          (rendererString.toLowerCase().includes("swiftshader") ||
            rendererString.toLowerCase().includes("software"))
        ) {
          console.warn("Hardware Acceleration is disabled. Falling back to CSS background.");
          renderer.dispose();
          if (container) {
             container.style.background = "radial-gradient(circle at 50% 0%, #ffd1eb 0%, #f5f5f7 40%), radial-gradient(circle at 100% 50%, #d1f4ff 0%, #f5f5f7 50%), radial-gradient(circle at 0% 100%, #e6ccff 0%, #f5f5f7 60%)";
             container.style.backgroundColor = "#f5f5f7";
          }
          return;
        }
      }

      // ── Render at reduced resolution for performance & stability ──
      // Capping pixel ratio at 0.75 prevents massive canvas sizes on maximized 4K screens.
      // Large canvases cause Chrome's compositor to break into tiles, leading to white/black square glitches.
      // Since this is a soft, blurry aurora, it looks identical at lower resolutions!
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 0.75));
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uMouseInfluence: { value: 1.0 }, // 1.0 = full follow, 0.0 = no follow
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      };

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `;

      // ── Simplified aurora shader (fewer noise passes than InterestedCTA) ──
      // Light background version: white/gray base with magenta/cyan/purple aurora
      const fragmentShader = `
        precision highp float;

        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uMouseInfluence;
        uniform vec2 uResolution;
        varying vec2 vUv;

        // Simplex 3D Noise (Ashima Arts)
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

          // Stretch UV for horizontal aurora bands
          vec2 st = vec2(uv.x * 0.35, uv.y * 1.6);
          float t = uTime * 0.06;

          // Safe, linear mouse influence (parallax pan) 
          // This avoids exp() and length() which cause HLSL compiler bugs (white squares) on some Windows Chrome GPUs.
          vec2 mouseOffset = (uMouse - 0.5) * 0.3 * uMouseInfluence;
          st += mouseOffset;

          // Single-pass domain warp (simpler than InterestedCTA)
          float warp1 = snoise(vec3(st * 0.5, t * 0.6));
          float warp2 = snoise(vec3(st * 0.5 + 4.0, t * 0.4 + 2.0));
          vec2 warped = st + vec2(warp1, warp2) * 0.2;

          // Two noise layers (reduced from 3)
          float n1 = snoise(vec3(warped * 0.6, t * 0.25));
          float n2 = snoise(vec3(warped * 0.45 + 3.0, t * 0.2 + 1.0));

          // ── Light background palette ──
          vec3 colBg      = vec3(0.96, 0.96, 0.97); // #f5f5f7 light gray
          vec3 colMagenta = vec3(0.9, 0.05, 0.6);
          vec3 colCyan    = vec3(0.1, 0.75, 0.95);
          vec3 colPurple  = vec3(0.55, 0.15, 0.85);

          // Start from light background
          vec3 color = colBg;

          // Magenta aurora — dominant band
          float magentaMask = smoothstep(-0.1, 0.3, n1) * smoothstep(0.85, 0.15, n1);
          color = mix(color, colMagenta, magentaMask * 0.45);

          // Cyan band — thinner, offset
          float cyanMask = smoothstep(0.0, 0.35, n2) * smoothstep(0.8, 0.1, n2);
          color = mix(color, colCyan, cyanMask * 0.3);

          // Purple blend where magenta and cyan overlap
          float overlapMask = magentaMask * cyanMask;
          color = mix(color, colPurple, smoothstep(0.02, 0.3, overlapMask) * 0.35);

          // White highlight in bright zones
          float bright = max(magentaMask, cyanMask);
          color = mix(color, vec3(1.0), smoothstep(0.3, 0.7, bright) * 0.2);

          // Safe, basic glow (avoids exp() and length() for Windows/Chrome HLSL bugs)
          float distX = abs(uv.x - uMouse.x);
          float distY = abs(uv.y - uMouse.y);
          float manhattanDist = distX + distY;
          float glow = max(0.0, 1.0 - manhattanDist * 2.0) * 0.15 * uMouseInfluence;
          color += vec3(0.5, 0.05, 0.7) * glow;

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

      // ── Mouse tracking ──
      const onMouseMove = (e: MouseEvent) => {
        uniforms.uMouse.value.set(
          e.clientX / window.innerWidth,
          1.0 - e.clientY / window.innerHeight
        );
      };
      window.addEventListener("mousemove", onMouseMove);

      // ── Scroll-based mouse influence ──
      // Mouse follows only in the first viewport, then fades out
      const onScroll = () => {
        const scrollRatio = window.scrollY / window.innerHeight;
        // Fully follows at scrollRatio=0, fades to 0 by scrollRatio=1
        uniforms.uMouseInfluence.value = Math.max(0, 1.0 - scrollRatio);
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      // ── Resize ──
      const onResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      // ── Animation loop — 15 FPS cap ──
      const FRAME_INTERVAL = 1000 / 15;
      let animId = 0;
      let lastFrameTime = 0;

      const animate = (now: number) => {
        animId = requestAnimationFrame(animate);
        const delta = now - lastFrameTime;
        if (delta < FRAME_INTERVAL) return;
        lastFrameTime = now - (delta % FRAME_INTERVAL);

        uniforms.uTime.value += 0.016;
        renderer.render(scene, camera);
      };
      animId = requestAnimationFrame(animate);

      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("scroll", onScroll);
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
      isUnmounted = true;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{ transform: "translateZ(0)" }} // Force hardware compositing layer to fix Chrome white tile bugs
    />
  );
}
