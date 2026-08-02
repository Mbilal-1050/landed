import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import LiveDemo from "@/components/LiveDemo";
import TemplateShowcase from "@/components/TemplateShowcase";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="grain">
        <Hero />
        <HowItWorks />
        <LiveDemo />
        <TemplateShowcase />
        <Features />
        <SocialProof />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
