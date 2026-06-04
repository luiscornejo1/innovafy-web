import LenisProvider from "../../../components/LenisProvider";
import FluidBackground from "../../../components/three/FluidBackground";

export default function BrandingPage() {
  return (
    <main className="min-h-screen bg-transparent relative flex items-center justify-center">
      <FluidBackground />
      <LenisProvider />
      <h1 className="text-4xl md:text-6xl font-black text-white relative z-10">
        Experiencia de Marca y Diseño Digital
      </h1>
    </main>
  );
}
