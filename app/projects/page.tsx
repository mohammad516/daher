import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f2f1eb] text-center px-6">
      <div className="max-w-lg">
        <div className="text-6xl mb-6">🚧</div>
        <h1 className="text-4xl font-extrabold text-[#1f2937] mb-4 tracking-tight">
          Coming Soon
        </h1>
        <p className="text-[#6b7280] text-lg mb-8">
          Our projects page is currently under construction. Check back soon!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#538DD3] hover:bg-[#457bb8] text-white font-bold px-8 py-3 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
