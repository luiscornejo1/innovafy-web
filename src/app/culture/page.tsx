"use client";

import { useEffect } from "react";
import LenisProvider from "../../components/LenisProvider";
import KotaHero from "../../components/cultura/Hero";
import KotaPhilosophy from "../../components/cultura/Values";
import KotaShowcase from "../../components/cultura/KotaShowCase";
import KotaStats from "../../components/cultura/KotaStats";
import KotaValues from "../../components/cultura/KotaValues";
import KotaTeam from "../../components/cultura/KotaTeam";
import KotaManifesto from "../../components/cultura/KotaManifesto";
import InterestedCTA from "../../components/shared/InterestedCTA";
import Footer from "../../components/shared/Footer";

export default function CulturaPage() {
  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".section-fade-in").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-[#0A0A0A] text-[#E8E8E8] overflow-x-hidden">
      <LenisProvider />
      <KotaHero />
      <KotaPhilosophy />
      <KotaShowcase />
      <KotaStats />
      <KotaValues />
      <KotaTeam />
      <KotaManifesto />
      <InterestedCTA />
      <Footer />
    </main>
  );
}
