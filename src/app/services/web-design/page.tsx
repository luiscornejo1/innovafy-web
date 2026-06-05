import LenisProvider from "../../../components/LenisProvider";
import FluidBackground from "../../../components/three/FluidBackground";
import WebDesignHero from "../../../components/services/WebDesignHero";
import WebDesignPortfolio from "../../../components/services/WebDesignPortfolio";
import WebDesignFeatures from "../../../components/services/WebDesignFeatures";
import WebDesignResults from "../../../components/services/WebDesignResults";
import WebDesignWorkflow from "../../../components/services/WebDesignWorkflow";
import WebDesignTestimonials from "../../../components/services/WebDesignTestimonials";
import WebDesignArticles from "../../../components/services/WebDesignArticles";
import WebDesignRelatedProjects from "../../../components/services/WebDesignRelatedProjects";
import WebDesignFAQs from "../../../components/services/WebDesignFAQs";
import WebDesignDiscover from "../../../components/services/WebDesignDiscover";
import InterestedCTA from "../../../components/shared/InterestedCTA";
import Footer from "../../../components/shared/Footer";

export const metadata = {
  title: "Web Design Services - Innovafy",
  description: "Crafting the future of websites with enjoyably-creative and technologically-advanced design and development.",
};

export default function WebDesignPage() {
  return (
    <main className="min-h-screen relative">
      <LenisProvider />
      
      {/* 
        Primera sección hasta la línea de tiempo (Workflow) 
        Fondo blanco/off-white según las indicaciones
      */}
      <div className="bg-[#f4f4f4] text-black transition-colors duration-700">
        <WebDesignHero />
        <WebDesignPortfolio />
        <WebDesignFeatures />
        <WebDesignResults />
        <WebDesignWorkflow />
      </div>

      {/* 
        Después de la línea de tiempo el fondo es negro 
      */}
      <div className="bg-[#050508] text-white transition-colors duration-700">
        <WebDesignTestimonials />
        <WebDesignArticles />
        <WebDesignRelatedProjects />
        <WebDesignFAQs />
        <WebDesignDiscover />
        <InterestedCTA />
        <Footer />
      </div>
    </main>
  );
}
