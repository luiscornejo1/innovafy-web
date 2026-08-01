"use client";

import { useEffect } from "react";
import FluidBackground from "../three/FluidBackground";

/**
 * Fondo fluido solo para /planes.
 * Debe ser hermano de <main>, no hijo: si va dentro de un contenedor con
 * overflow-x-clip, position:fixed deja de cubrir el viewport completo.
 */
export default function PlanesPageBackground() {
  useEffect(() => {
    const html = document.documentElement;
    const { body } = document;
    const prevHtmlOverflow = html.style.overflowX;
    const prevBodyOverflow = body.style.overflowX;

    html.style.overflowX = "hidden";
    body.style.overflowX = "hidden";

    return () => {
      html.style.overflowX = prevHtmlOverflow;
      body.style.overflowX = prevBodyOverflow;
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full"
      aria-hidden
    >
      <FluidBackground className="absolute inset-0 h-full w-full pointer-events-none" />
    </div>
  );
}
