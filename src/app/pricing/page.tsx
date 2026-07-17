import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="grain min-h-[60vh] pt-10">
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
