"use client";

import { useEffect, useRef } from "react";
import { ProjectPreview, TaskPreview, DashboardPreview } from "./Previews";

const showcases = [
  {
    tag: "Projects",
    title: "Projects, without the clutter.",
    description:
      "Create, organize, and track projects from a single focused workspace. Every detail in the right place.",
    preview: ProjectPreview,
    flip: false,
  },
  {
    tag: "Tasks",
    title: "Know what comes next.",
    description:
      "Search, filter, prioritize, and complete tasks without losing sight of the bigger picture.",
    preview: TaskPreview,
    flip: true,
  },
  {
    tag: "Dashboard",
    title: "Progress at a glance.",
    description:
      "Understand your workload and project progress without digging through individual tasks.",
    preview: DashboardPreview,
    flip: false,
  },
];

function ShowcaseItem({
  tag,
  title,
  description,
  preview: Preview,
  flip,
}: {
  tag: string;
  title: string;
  description: string;
  preview: React.ComponentType;
  flip: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center py-20 border-t border-[#E4E4E7] ${
        flip ? "md:flex md:flex-row-reverse" : ""
      }`}
    >
      {/* Text side */}
      <div>
        <span className="inline-block text-[11px] font-semibold text-[#6366F1] tracking-widest uppercase mb-4">
          {tag}
        </span>
        <h3 className="text-[32px] md:text-[38px] font-bold tracking-[-0.03em] text-[#18181B] mb-4 leading-[1.1]">
          {title}
        </h3>
        <p className="text-[16px] text-[#71717A] leading-relaxed">{description}</p>
      </div>

      {/* Preview side */}
      <div className={flip ? "md:mr-auto" : "md:ml-auto"} style={{ width: "100%" }}>
        <Preview />
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  return (
    <section id="product" className="py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-4 pt-20">
          <h2 className="text-[38px] md:text-[48px] font-bold tracking-[-0.03em] text-[#18181B] mb-4 leading-[1.1]">
            A clearer view of your work.
          </h2>
          <p className="text-[17px] text-[#71717A] max-w-xl mx-auto">
            Designed to give you the right information at the right moment.
          </p>
        </div>

        {/* Showcase items */}
        {showcases.map((s) => (
          <ShowcaseItem key={s.tag} {...s} />
        ))}
      </div>
    </section>
  );
}
