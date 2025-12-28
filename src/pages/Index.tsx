import React, { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import VideoHero from '@/components/VideoHero';
import Listings from '@/pages/Listings';

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

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (showVideoHero) {
    return <VideoHero onExplore={handleExplore} />;
  }

  return <Listings />;
};

export default Index;
