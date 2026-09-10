import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-label text-fire mb-4">ERROR / 404</p>
      <h1 className="font-display text-6xl md:text-8xl text-ink leading-none mb-4">
        PAGE NOT FOUND
      </h1>
      <p className="text-sm text-ink-2 max-w-sm mb-10">
        The page you are looking for does not exist or has moved.
      </p>
      <Link href="/" className="btn-outline !px-9 !py-4 !text-sm">
        Back home
      </Link>
    </main>
  );
}
