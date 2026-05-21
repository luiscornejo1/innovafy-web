import LenisProvider from "../../../components/LenisProvider";
import WebDesignHero from "../../../components/services/WebDesignHero";
import WebDesignPortfolio from "../../../components/services/WebDesignPortfolio";
import WebDesignFeatures from "../../../components/services/WebDesignFeatures";
import WebDesignResults from "../../../components/services/WebDesignResults";
import WebDesignWorkflow from "../../../components/services/WebDesignWorkflow";

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
    </main>
  );
}
