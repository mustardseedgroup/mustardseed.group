import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const nav = [
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Updates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteShell({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <div className={isDark ? "min-h-screen bg-black text-white" : "min-h-screen bg-[var(--background)] text-[var(--foreground)]"}>
      <header className={`sticky top-0 z-40 border-b backdrop-blur-xl ${isDark ? "border-[#252525] bg-[rgba(0,0,0,0.88)]" : "border-[var(--line)] bg-[rgba(232,230,223,0.88)]"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="focus-ring font-medium tracking-tight">
            <BrandLogo brand="msg" className="text-base md:text-lg" />
          </Link>
          <nav className={`hidden items-center gap-8 text-sm md:flex ${isDark ? "text-[#a8a8a8]" : "text-[var(--muted)]"}`}>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={`focus-ring transition ${isDark ? "hover:text-white" : "hover:text-[var(--foreground)]"}`}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className={`hidden items-center gap-3 text-xs lg:flex ${isDark ? "text-[#a8a8a8]" : "text-[var(--muted)]"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${isDark ? "bg-white" : "bg-[var(--foreground)]"}`} />
            Building for the long term
          </div>
          <Link
            href="/contact"
            className={`button focus-ring md:hidden ${isDark ? "border-[#3a3a3a] bg-[#1f1f1f] text-white" : "button-secondary"}`}
          >
            Contact
          </Link>
        </div>
      </header>
      {children}
      <footer className="bg-[#0b0b09] text-[#fbfaf7]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
          <div>
            <BrandLogo brand="msg" className="text-2xl" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#c8c0b2]">
              Building systems that increase human capability.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Portfolio</p>
            <div className="mt-4 grid gap-2 text-sm text-[#c8c0b2]">
              <Link href="/companies/benediction-lab">Benediction Lab</Link>
              <Link href="/companies/orbit">Orbit</Link>
              <Link href="/companies/all-purpose">All Purpose</Link>
              <Link href="/companies/tuxx">TUXX</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Resources</p>
            <div className="mt-4 grid gap-2 text-sm text-[#c8c0b2]">
              <Link href="/products">Products</Link>
              <Link href="/blog">Updates</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Connect</p>
            <div className="mt-4 grid gap-2 text-sm text-[#c8c0b2]">
              <Link href="/companies/chiko-shire">Chiko Shire</Link>
              <a href="https://github.com/chikoshire">GitHub</a>
              <a href="https://linkedin.com/in/chikoshire">LinkedIn</a>
              <a href="https://x.com/chikoshire">X</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-8 text-xs text-[#c8c0b2] md:px-8">
          © Mustard Seed Group. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
