import CategoriesBlog from "../../components/blog/CategoriesBlog";
import HeroBlog from "../../components/blog/HeroBlog";
import FluidBackgroundWork from "../../components/work/FluidBackgroundWork";;

export default function BlogPage() {
  return (
    <main className="relative">

      <div className="fixed inset-0 z-0">
        <FluidBackgroundWork />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-28 pt-24 lg:pt-32">
        <HeroBlog />

        <div className="py-12 border-b border-b-black">
          <h1 className="text-5xl">Creating the Innovafy to celebrete 3 years</h1>
        </div>
        <CategoriesBlog />
      </div>

    </main>
  )
}