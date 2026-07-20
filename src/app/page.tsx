import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import LiveDemo from "@/components/LiveDemo";
import Features from "@/components/Features";
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
        <Features />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
