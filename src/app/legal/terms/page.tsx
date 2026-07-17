import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="grain px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-amber">Legal</p>
          <h1 className="mt-3 font-display text-4xl text-fog">Terms of Service</h1>
          <p className="mt-2 text-sm text-fog-dim">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="mt-10 space-y-8 text-fog-dim leading-relaxed [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-fog [&_h2]:mb-2">
            <section>
              <h2>1. Acceptance of terms</h2>
              <p>By creating an account or using Landed, you agree to these Terms of Service. If you don&apos;t agree, please don&apos;t use the service.</p>
            </section>
            <section>
              <h2>2. The service</h2>
              <p>Landed helps you tailor resumes and cover letters against job descriptions and provides an estimated ATS keyword match score. The score is a guidance tool based on keyword overlap — it does not guarantee interviews, offers, or that any specific applicant tracking system will treat your resume a certain way.</p>
            </section>
            <section>
              <h2>3. Accounts</h2>
              <p>You&apos;re responsible for keeping your login credentials secure and for all activity under your account. Notify us if you suspect unauthorized access.</p>
            </section>
            <section>
              <h2>4. Subscriptions and billing</h2>
              <p>Paid plans are billed on a recurring basis through our payment processor, Whop. You can cancel at any time from your Whop account; access continues until the end of the current billing period. Fees are non-refundable except as required by law or as stated in our refund policy.</p>
            </section>
            <section>
              <h2>5. Acceptable use</h2>
              <p>You agree not to misuse the service — including submitting false credentials, attempting to disrupt the platform, or using it to generate fraudulent application materials.</p>
            </section>
            <section>
              <h2>6. Your content</h2>
              <p>You own the resumes, job descriptions, and other content you submit. You grant us a limited license to store and process that content solely to provide the service to you.</p>
            </section>
            <section>
              <h2>7. Termination</h2>
              <p>You may delete your account at any time from Settings. We may suspend or terminate accounts that violate these terms.</p>
            </section>
            <section>
              <h2>8. Disclaimer</h2>
              <p>The service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee employment outcomes.</p>
            </section>
            <section>
              <h2>9. Changes</h2>
              <p>We may update these terms from time to time. Continued use of the service after changes means you accept the updated terms.</p>
            </section>
            <section>
              <h2>10. Contact</h2>
              <p>Questions about these terms? Reach us via the <a href="/contact" className="text-amber hover:underline">contact page</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
