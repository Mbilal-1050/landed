import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="grain px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-amber">About</p>
          <h1 className="mt-3 font-display text-4xl text-fog sm:text-5xl">
            We built Landed because job hunting shouldn&apos;t feel like guessing.
          </h1>
          <div className="mt-8 space-y-5 text-fog-dim leading-relaxed">
            <p>
              Most job applications never reach a human. They&apos;re filtered by an applicant
              tracking system first, and that system is looking for specific language from the
              job posting — language most resumes simply don&apos;t have.
            </p>
            <p>
              Landed reads the job description the same way that filter does, checks your resume
              against it, and shows you exactly what&apos;s missing before you apply — not after
              you&apos;ve been rejected without knowing why.
            </p>
            <p>
              We&apos;re a small, independent team. No outside investors telling us to add features
              nobody asked for. Just a tool we wished existed when we were job hunting ourselves.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-surface/40 p-5">
              <p className="font-display text-2xl text-fog">Independent</p>
              <p className="mt-1 text-sm text-fog-dim">Self-funded, no ad-driven incentives.</p>
            </div>
            <div className="rounded-xl border border-line bg-surface/40 p-5">
              <p className="font-display text-2xl text-fog">Privacy-first</p>
              <p className="mt-1 text-sm text-fog-dim">Your resumes are yours. Delete anytime.</p>
            </div>
            <div className="rounded-xl border border-line bg-surface/40 p-5">
              <p className="font-display text-2xl text-fog">Built to ship</p>
              <p className="mt-1 text-sm text-fog-dim">Small team, fast iteration.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
