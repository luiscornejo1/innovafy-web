import LenisProvider from "../../../components/LenisProvider";
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
    <main className="min-h-screen bg-transparent">
      <LenisProvider />
      <WebDesignHero />
      <WebDesignPortfolio />
      <WebDesignFeatures />
      <WebDesignResults />
      <WebDesignWorkflow />
      <WebDesignTestimonials />
      <WebDesignArticles />
      <WebDesignRelatedProjects />
      <WebDesignFAQs />
      <WebDesignDiscover />
      <InterestedCTA />
      <Footer />
    </main>
  );
}
