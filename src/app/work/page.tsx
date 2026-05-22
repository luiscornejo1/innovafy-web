import { Section } from "lucide-react";
import HeroWork from "../../components/HeroWork";
import PageShell from "../../components/PageShell";
import SectionWorkCard from "../../components/SectionWorkCard";

export default function WorkPage() {
  return (
    <main className="px-6 md:px-12 lg:px-20 xl:px-28 pt-24 lg:pt-32">
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
    </main>

  )
}
