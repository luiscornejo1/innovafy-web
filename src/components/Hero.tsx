import FluidBackground from '../components/three/FluidBackground';
import HeroContent from '../components/HeroContent';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      <div className="absolute inset-0 z-0">
        <FluidBackground />
      </div>

      <div className="relative z-10 w-full h-full">
        <HeroContent />
      </div>

    </section>
  );
}