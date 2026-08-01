import PlanesLayout from "../../../components/planes/PlanesLayout";
import PlanesPageBackground from "../../../components/planes/PlanesPageBackground";
import { planes } from "../../../data/planesContent";

const config = {
  segment: "inicio",
  tag: "PARA NEGOCIOS QUE ESTÁN DANDO SUS PRIMEROS PASOS",
  titulo: ["Empieza", "fuerte"] as [string, string],
  descripcion:
    "Todo negocio grande comenzó con una base sólida. Estos planes te dan las herramientas digitales para arrancar con ventaja.",
  precio: "Planes de Inicio: S/ 499 - S/ 999/mes",
  heroTitulo: ["Arranca con", "ventaja"] as [string, string],
  heroDescripcion:
    "Todo negocio grande comenzó con una base sólida. Estos planes te dan las herramientas digitales para arrancar con ventaja.",
  precioRango: "S/ 499 - S/ 999 /mes",
  // Círculo: equipo joven colaborando (emprender / primeros pasos)
  pilloraFila1:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=85",
  pilloraFila3:
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=900&q=80",
  videoSrc:
    "https://assets.mixkit.co/active_storage/video_items/100319/1722990360/100319-video-720.mp4",
};

export default function Page() {
  const segmentPlanes = planes.filter((p) => p.segment === "inicio");
  return (
    <>
      <PlanesPageBackground />
      <div className="relative z-[1] min-h-screen w-full overflow-x-clip bg-transparent">
        <PlanesLayout config={config} planes={segmentPlanes} />
      </div>
    </>
  );
}
