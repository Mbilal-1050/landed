import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/FaqAccordion";

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="grain px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-amber">FAQ</p>
          <h1 className="mt-3 font-display text-4xl text-fog sm:text-5xl">Common questions</h1>
          <div className="mt-10">
            <FaqAccordion />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
