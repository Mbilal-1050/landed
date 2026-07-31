import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplateGallery from "@/components/TemplateGallery";

export default async function PublicTemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return (
    <>
      <Navbar />
      <main className="grain px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-widest text-amber">Templates</p>
          <h1 className="mt-3 font-display text-4xl text-fog sm:text-5xl">40 resume designs, ready to fill in.</h1>
          <p className="mt-4 max-w-xl text-fog-dim">
            Pick a layout and color, then sign up free to add your own details — every template is ATS-friendly and export-ready.
          </p>
          <div className="mt-10">
            <TemplateGallery publicMode initialCategory={category ?? "All"} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
