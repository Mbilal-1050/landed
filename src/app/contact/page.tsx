import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="grain px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-amber">Contact</p>
          <h1 className="mt-3 font-display text-4xl text-fog sm:text-5xl">Get in touch</h1>
          <p className="mt-4 text-fog-dim">
            Questions about your account, billing, or the product — send us a message and we&apos;ll reply by email.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
