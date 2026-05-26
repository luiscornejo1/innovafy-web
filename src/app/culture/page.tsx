"use client";

import LenisProvider from "../../components/LenisProvider";
import CultureHero from "../../components/culture/CultureHero";
import CultureShowcase from "../../components/culture/CultureShowCase";
import CultureValues from "../../components/culture/CultureValues";
import CultureCollaborate from "../../components/culture/CulturaCollaborate";
import Footer from "../../components/shared/Footer";

export default function CulturaPage() {
  return (
    <main className="bg-[#0A0A0A] text-[#E8E8E8] overflow-x-hidden">
      <LenisProvider />
      <CultureHero />
      <CultureValues />
      <CultureShowcase />
      <CultureCollaborate />
      <Footer />
    </main>
  );
}
