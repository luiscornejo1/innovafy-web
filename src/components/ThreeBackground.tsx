"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ThreeBackgroundProps = {
  className?: string;
};

export default function ThreeBackground({ className }: ThreeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 6;

    const geometry = new THREE.TorusKnotGeometry(1.5, 0.45, 140, 16);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#6366f1"),
      emissive: new THREE.Color("#3b82f6"),
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.35,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const light1 = new THREE.PointLight(0xffffff, 1.1);
    light1.position.set(6, 6, 6);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xff9ed1, 0.8);
    light2.position.set(-6, -4, 3);
    scene.add(light2);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();

    let frameId = 0;
    const animate = (time: number) => {
      mesh.rotation.x = time * 0.0002;
      mesh.rotation.y = time * 0.0003;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
