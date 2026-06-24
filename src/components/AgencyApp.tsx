"use client";

import Hero from "./Hero";
import HomeServices from "./ServicesPanels";
import HomeEthos from "./EthosHome";
import HomeStatistics from "./Statistics";

export default function AgencyApp() {
  return (
    <div className="min-h-screen bg-transparent">
      <Hero />
      <HomeServices />
      <HomeEthos />
      <HomeStatistics />
    </div>
  );
}
