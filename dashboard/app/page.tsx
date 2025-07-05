"use client";

import DashboardPreview from "@/components/DashboardPreview";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Integration from "@/components/Integration";
import Navigation from "@/components/Navigation";
import Pricing from "@/components/Pricing";

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-[#0A0A23] text-[#F2F2F2] font-['Space_Grotesk']">
        <Navigation />
        <Hero />
        <HowItWorks />
        <Integration />
        <Features />
        <DashboardPreview />
        <Pricing />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
