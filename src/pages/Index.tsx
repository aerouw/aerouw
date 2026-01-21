import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AircraftGallerySection from "@/components/AircraftGallerySection";
import CompetitionSection from "@/components/CompetitionSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import TimelineSection from "@/components/TimelineSection";
import FAQSection from "@/components/FAQSection";
import TeamSection from "@/components/TeamSection";
import JoinSection from "@/components/JoinSection";
import SponsorsSection from "@/components/SponsorsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <main id="home">
        <HeroSection />
        <AboutSection />
        <AircraftGallerySection />
        <CompetitionSection />
        <WhatWeDoSection />
        <TimelineSection />

        <TeamSection />
        <JoinSection />
        <SponsorsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
