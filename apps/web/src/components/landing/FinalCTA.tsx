"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 border-t border-[#E4E4E7] bg-[#FAFAF9]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-[42px] md:text-[54px] font-bold tracking-[-0.035em] text-[#18181B] mb-5 leading-[1.1]">
          Ready to bring your<br />work together?
        </h2>
        <p className="text-[17px] text-[#71717A] mb-10 leading-relaxed">
          Create your workspace and start organizing your projects with Nexus.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <Link
            href="/register"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#18181B] text-white text-[14px] font-semibold rounded-lg hover:bg-[#27272A] transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#product"
            className="w-full sm:w-auto text-[14px] font-medium text-[#52525B] hover:text-[#18181B] transition-colors flex items-center justify-center gap-1"
          >
            Explore Nexus <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="text-[12px] text-[#A1A1AA]">
          No unnecessary complexity. Just a clearer way to work.
        </p>
      </div>
    </section>
  );
}
