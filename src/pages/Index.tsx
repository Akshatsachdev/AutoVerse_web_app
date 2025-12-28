import React, { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import VideoHero from '@/components/VideoHero';
import BrandIdentity from '@/components/BrandIdentity';
import CompanyAmbitions from '@/components/CompanyAmbitions';
import UpcomingModels from '@/components/UpcomingModels';
import Listings from '@/pages/Listings';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showVideoHero, setShowVideoHero] = useState(false);
  const [showMain, setShowMain] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setShowVideoHero(true);
  };

  const handleExplore = () => {
    setShowVideoHero(false);
    setShowMain(true);
  };

  // Enable smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (showVideoHero) {
    return <VideoHero onExplore={handleExplore} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Brand Story Sections */}
      <BrandIdentity />
      
      {/* Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <CompanyAmbitions />
      
      {/* Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <UpcomingModels />
      
      {/* Section Separator */}
      <div className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block px-6 py-3 rounded-full bg-accent/10 text-accent font-semibold text-lg mb-4">
            Explore Our Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Premium Used <span className="text-gradient">Cars</span>
          </h2>
          <p className="text-muted-foreground">
            Handpicked, verified, and ready for your next adventure.
          </p>
        </div>
      </div>
      
      {/* Car Listings */}
      <div id="listings" className="scroll-mt-20">
        <Listings embedded />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
