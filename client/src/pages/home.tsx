import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/hero-section";
import PartnersSection from "@/components/partners-section";
import FeaturesSection from "@/components/features-section";
import SolutionsSection from "@/components/solutions-section";
import PaymentCardDemo from "@/components/payment-card-demo";
import PricingSection from "@/components/pricing-section";
import TestimonialsSection from "@/components/testimonials-section";
import CtaSection from "@/components/cta-section";
import { setupAnimations } from "@/lib/animations";

export default function Home() {
  useEffect(() => {
    // Set up animations when the component mounts
    setupAnimations();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <PartnersSection />
        <FeaturesSection />
        <SolutionsSection />
        <PaymentCardDemo />
        <PricingSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
