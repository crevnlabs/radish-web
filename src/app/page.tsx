"use client";

import Layout from "@/components/layouts/MainLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { features, futureFeatures } from "@/config/features";
import { VisionSection } from "@/components/home/VisionSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <VisionSection />
      <FeaturesSection 
        title="Why Trade on Radish?" 
        features={features} 
        className="bg-black text-white"
      />
      <FeaturesSection 
        title="Coming Soon" 
        features={futureFeatures} 
        className="bg-zinc-50"
      />
      <CTASection />
    </Layout>
  );
}
