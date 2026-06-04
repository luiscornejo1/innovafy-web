import HeroWork from "../../components/work/HeroWork";
import SectionWorkCard from "../../components/work/SectionWorkCard";
import FluidBackgroundWork from "../../components/work/FluidBackgroundWork";

export default function WorkPage() {
  return (
    <main className="relative">

      {/* Fondo */}
      <div className="fixed inset-0 z-0">
        <FluidBackgroundWork />
      </div>

      {/* Contenido */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-28 pt-24 lg:pt-32">
        <HeroWork />
        <div className="flex flex-row flex-wrap items-center pt-16 lg:pt-32 gap-6 sm:gap-12 lg:gap-36">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-gray-500 hover:text-black transition-colors duration-300 cursor-pointer">
            Sectors
          </h1>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-gray-500 hover:text-black transition-colors duration-300 cursor-pointer">
            Services
          </h1>
        </div>
        <SectionWorkCard />
      </div>

    </main>
  )
}