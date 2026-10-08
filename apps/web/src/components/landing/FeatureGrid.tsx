"use client";

import { useEffect, useRef } from "react";
import { Layers, Target, TrendingUp } from "lucide-react";

const features = [
  {
    number: "01",
    icon: Layers,
    title: "Organize",
    description:
      "Keep every project and its tasks structured in one focused workspace. No scattered notes, no missing context.",
  },
  {
    number: "02",
    icon: Target,
    title: "Prioritize",
    description:
      "Know what needs attention with clear status and priority tracking. Always act on what matters most.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Progress",
    description:
      "See what's moving forward, what's pending, and what's complete. Understand your workload at a glance.",
  },
];

export default function FeatureGrid() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = el.querySelectorAll("[data-reveal]");
    cards.forEach((card, i) => {
      (card as HTMLElement).style.transitionDelay = `${i * 80}ms`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="features" className="py-28 px-6 border-t border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <h2 className="text-[38px] md:text-[46px] font-bold tracking-[-0.03em] text-[#18181B] mb-4 leading-[1.1]">
            Everything aligned.<br />Nothing overlooked.
          </h2>
          <p className="text-[17px] text-[#71717A] leading-relaxed">
            Nexus gives you a single place to organize projects, manage tasks, track progress, and stay focused on what matters.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[#E4E4E7] rounded-xl overflow-hidden border border-[#E4E4E7]">
          {features.map(({ number, icon: Icon, title, description }) => (
            <div
              key={title}
              data-reveal
              className="opacity-0 translate-y-6 transition-all duration-500 bg-[#FAFAF9] hover:bg-white p-8 md:p-10 flex flex-col gap-6"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg border border-[#E4E4E7] bg-white flex items-center justify-center shadow-sm">
                  <Icon className="w-5 h-5 text-[#18181B]" />
                </div>
                <span className="text-[11px] font-semibold text-[#A1A1AA] tracking-widest">{number}</span>
              </div>
              <div>
                <h3 className="text-[20px] font-semibold text-[#18181B] mb-2">{title}</h3>
                <p className="text-[14px] text-[#71717A] leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
