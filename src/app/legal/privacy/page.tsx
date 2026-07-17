import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="grain px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-amber">Legal</p>
          <h1 className="mt-3 font-display text-4xl text-fog">Privacy Policy</h1>
          <p className="mt-2 text-sm text-fog-dim">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="mt-10 space-y-8 text-fog-dim leading-relaxed [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-fog [&_h2]:mb-2">
            <section>
              <h2>1. What we collect</h2>
              <p>Account information (name, email), authentication data (handled by our provider, Supabase, including Google sign-in if you choose it), and the resume and job description text you submit to use the service.</p>
            </section>
            <section>
              <h2>2. How we use it</h2>
              <p>To provide the core service — storing your resumes, generating match scores, and keeping your account secure. We don&apos;t sell your personal data.</p>
            </section>
            <section>
              <h2>3. Payment data</h2>
              <p>Subscription payments are processed by Whop. We don&apos;t store your full payment card details — Whop handles that directly under its own privacy policy.</p>
            </section>
            <section>
              <h2>4. Storage and security</h2>
              <p>Data is stored with Supabase using row-level security, meaning your resumes and profile are only accessible to your own account by design, not just by app-level checks.</p>
            </section>
            <section>
              <h2>5. Cookies</h2>
              <p>We use essential cookies to keep you logged in. We don&apos;t use third-party advertising trackers.</p>
            </section>
            <section>
              <h2>6. Your rights</h2>
              <p>You can update your profile, delete individual resumes, or permanently delete your entire account and all associated data at any time from Settings.</p>
            </section>
            <section>
              <h2>7. Newsletter</h2>
              <p>If you subscribe to updates, we store your email solely to send you those updates. You can ask to be removed at any time via the contact page.</p>
            </section>
            <section>
              <h2>8. Changes</h2>
              <p>We&apos;ll update this policy as the product evolves and note the &quot;last updated&quot; date above.</p>
            </section>
            <section>
              <h2>9. Contact</h2>
              <p>Questions about your data? Reach us via the <a href="/contact" className="text-amber hover:underline">contact page</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
