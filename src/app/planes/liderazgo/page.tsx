"use client";

import PlanesLayout from "../../../components/planes/PlanesLayout";
import PlanesPageBackground from "../../../components/planes/PlanesPageBackground";
import { planes } from "../../../data/planesContent";

const config = {
  segment: "liderazgo",
  tag: "PARA EMPRESAS CONSOLIDADAS CON AÑOS EN EL MERCADO",
  titulo: ["Lidera tu", "industria"] as [string, string],
  descripcion:
    "Para empresas consolidadas con años en el mercado — liderazgo digital total e inatacable.",
  precio: "Planes de Liderazgo: S/ 2,499 - S/ 4,999/mes",
  heroTitulo: ["Domina tu", "mercado"] as [string, string],
  heroDescripcion:
    "Tienes años de experiencia y reputación ganada. Estos planes llevan tu presencia digital al nivel de tu trayectoria — y aseguran que ningún competidor pueda alcanzarte.",
  precioRango: "S/ 2,499 - S/ 4,999 /mes",
  // Círculo: presentación ejecutiva / estrategia / autoridad
  pilloraFila1:
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1000&q=85",
  pilloraFila3:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
  videoSrc: "https://assets.mixkit.co/videos/42643/42643-720.mp4",
};

export default function Page() {
  const segmentPlanes = planes.filter((p) => p.segment === "liderazgo");

  return (
    <>
      <PlanesPageBackground />
      <div className="relative z-[1] min-h-screen w-full overflow-x-clip bg-transparent">
        <PlanesLayout config={config} planes={segmentPlanes} />
      </div>
    </>
  );
}
