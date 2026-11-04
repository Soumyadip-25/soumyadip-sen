import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 font-mono">
      <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-zinc-400 mb-6">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-4 py-2 border border-zinc-700 rounded hover:bg-zinc-800 transition"
      >
        Return Home
      </Link>
    </div>
  );
}
