export function Section({ title, children, plain }: { title: string; children: React.ReactNode; plain?: boolean }) {
  return (
    <div className="mt-5">
      <h2
        className={`mb-2 text-xs font-bold uppercase tracking-widest ${plain ? "text-gray-800 border-b border-gray-300 pb-1" : ""}`}
        style={plain ? undefined : { color: "var(--r-accent)" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
