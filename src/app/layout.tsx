import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cuetes El Chispazo",
  description: "Venta de cuetes y pirotecnia",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <header className="border-b border-zinc-800 bg-zinc-900">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-xl font-bold text-orange-400">
              🎆 Cuetes El Chispazo
            </Link>
            <div className="flex gap-4 text-sm">
              <Link href="/" className="hover:text-orange-400">Catálogo</Link>
              <Link href="/admin" className="hover:text-orange-400">Administrar</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
