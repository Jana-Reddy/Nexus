"use client";

import Link from "next/link";

const nav = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "About", href: "#about" },
];

const resources = [
  { label: "Documentation", href: "#" },
  { label: "API", href: "#" },
  { label: "GitHub", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E4E4E7] py-16 px-6 bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-[#18181B] rounded-[4px] flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">⌘</span>
              </div>
              <span className="font-semibold text-[14px] text-[#18181B]">NEXUS</span>
            </Link>
            <p className="text-[12px] text-[#A1A1AA] leading-relaxed">
              Project & Task Management Platform
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="text-[11px] font-semibold text-[#18181B] uppercase tracking-widest mb-4">
              Navigation
            </div>
            <nav className="flex flex-col gap-2.5">
              {nav.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[13px] text-[#71717A] hover:text-[#18181B] transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <div className="text-[11px] font-semibold text-[#18181B] uppercase tracking-widest mb-4">
              Resources
            </div>
            <nav className="flex flex-col gap-2.5">
              {resources.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[13px] text-[#71717A] hover:text-[#18181B] transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#E4E4E7] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-[#A1A1AA]">© 2026 Nexus. All rights reserved.</p>
          <p className="text-[12px] text-[#A1A1AA]">Project & Task Management Platform</p>
        </div>
      </div>
    </footer>
  );
}
