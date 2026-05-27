'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FluidBackground() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.PlaneGeometry(2, 2, 128, 128);

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uRayMouse: { value: new THREE.Vector2(0, 0) },
                uAmount: { value: 0.25 },
                uPow: { value: 1.5 },
                uAlpha: { value: 1.0 },
                uColor: {
                    value: [
                        new THREE.Color(0.8879, 0.7913, 0.7084),
                        new THREE.Color(0.1651, 0.6939, 0.8148),
                        new THREE.Color(0.2623, 0.0467, 0.6308),
                        new THREE.Color(0.6308, 0.0497, 0.2270),
                        new THREE.Color(0.9047, 0.0497, 0.9473),
                        new THREE.Color(0.2623, 0.0467, 0.6308)
                    ]
                },
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec2 uPos;
                uniform vec2 uRayMouse;
                void main() {
                    vUv = uv;
                    uPos = position.xy + (uRayMouse * 0.2); 
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform float uAmount;
                uniform float uPow;
                uniform float uAlpha;
                varying vec2 vUv;
                varying vec2 uPos;
                uniform vec3 uColor[6];

                float PI = 3.141592653589793;

                vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
                vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
                float cnoise21(vec2 P) {
                    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
                    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
                    Pi = mod(Pi, 289.0);
                    vec4 ix = Pi.xzxz; vec4 iy = Pi.yyww;
                    vec4 fx = Pf.xzxz; vec4 fy = Pf.yyww;
                    vec4 i = permute(permute(ix) + iy);
                    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0;
                    vec4 gy = abs(gx) - 0.5;
                    vec4 tx = floor(gx + 0.5);
                    gx = gx - tx;
                    vec2 g00 = vec2(gx.x, gy.x); vec2 g10 = vec2(gx.y, gy.y);
                    vec2 g01 = vec2(gx.z, gy.z); vec2 g11 = vec2(gx.w, gy.w);
                    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11));
                    g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
                    float n00 = dot(g00, vec2(fx.x, fy.x));
                    float n10 = dot(g10, vec2(fx.y, fy.y));
                    float n01 = dot(g01, vec2(fx.z, fy.z));
                    float n11 = dot(g11, vec2(fx.w, fy.w));
                    vec2 fade_xy = fade(Pf.xy);
                    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
                    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
                    return 2.3 * n_xy;
                }

                void main() {
                    vec3 firstColor = uColor[0];
                    vec2 seed = (vUv * -uPos) * mix(vUv, uPos, 30.0 * uAmount);
                    float ml = pow(6.0, 0.5) * -0.01;
                    
                    float timeOsc = sin(uTime * 0.5); 
                    float n = cnoise21(seed) + 1.0 * timeOsc;
                    vec3 color = mix(firstColor, firstColor, cnoise21(seed) / 1000.0);
                    
                    for (int i = 1; i < 5; i++) {
                        float amount = (float(i) + 1.0) * 0.09;
                        float n2 = smoothstep(amount * timeOsc + ml, amount * timeOsc + ml + amount * timeOsc, n * timeOsc);
                        color = mix(color, uColor[i], n2);
                    }
                    
                    float alpha = uAlpha * pow(sin(vUv.x * PI), uPow);
                    alpha *= pow(sin(vUv.y * PI), uPow);
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.z = 2.75;
        mesh.scale.set(2, 2, 1);
        scene.add(mesh);

        const clock = new THREE.Clock();
        const animate = () => {
            material.uniforms.uTime.value = clock.getElapsedTime() * 0.2;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        const handleMouseMove = (e: MouseEvent) => {
            material.uniforms.uRayMouse.value.set(
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            );
        };

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
}