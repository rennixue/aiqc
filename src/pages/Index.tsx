import React from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AIQCModule } from '@/components/AIQCModule';
import { IntroductionModule } from '@/components/IntroductionModule';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AIQCModule />
      <IntroductionModule />
      <Footer />
    </div>
  );
};

export default Index;
