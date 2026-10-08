import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Positioning from "@/components/landing/Positioning";
import FeatureGrid from "@/components/landing/FeatureGrid";
import ProductShowcase from "@/components/landing/ProductShowcase";
import CrossPlatformSection from "@/components/landing/CrossPlatformSection";
import SecuritySection from "@/components/landing/SecuritySection";
import PhilosophySection from "@/components/landing/PhilosophySection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEXUS — Project & Task Management Platform",
  description:
    "Turn complex work into clear progress. Nexus brings your projects, tasks, priorities, and progress into one focused workspace.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Positioning />
        <FeatureGrid />
        <ProductShowcase />
        <CrossPlatformSection />
        <SecuritySection />
        <PhilosophySection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
