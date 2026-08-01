"use client";

import PlanesLayout from "../../../components/planes/PlanesLayout";
import PlanesPageBackground from "../../../components/planes/PlanesPageBackground";
import { planes } from "../../../data/planesContent";

const config = {
  segment: "crecimiento",
  tag: "PARA NEGOCIOS QUE QUIEREN ESCALAR AL SIGUIENTE NIVEL",
  titulo: ["Escala sin", "límites"] as [string, string],
  descripcion:
    "Ya tienes tracción. Estos planes potencian lo que funciona y eliminan lo que te frena para que crezcas más rápido.",
  precio: "Planes de Crecimiento: S/ 1,299 - S/ 2,299/mes",
  heroTitulo: ["Muestra", "Resultados"] as [string, string],
  heroDescripcion:
    "Ya tienes tracción. Estos planes potencian lo que funciona y eliminan lo que te frena para que crezcas más rápido.",
  precioRango: "S/ 1,299 - S/ 2,299 /mes",
  // Círculo: trabajo enfocado / métricas / escalamiento
  pilloraFila1:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=85",
  pilloraFila3:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
  videoSrc:
    "https://assets.mixkit.co/active_storage/video_items/100328/1722991554/100328-video-720.mp4",
};

export default function Page() {
  const segmentPlanes = planes.filter((p) => p.segment === "crecimiento");

  return (
    <>
      <PlanesPageBackground />
      <div className="relative z-[1] min-h-screen w-full overflow-x-clip bg-transparent">
        <PlanesLayout config={config} planes={segmentPlanes} />
      </div>
    </>
  );
}
