"use client";

import { FolderKanban, CheckSquare, Sliders, BarChart3 } from "lucide-react";

const pillars = [
  { icon: FolderKanban, label: "Projects" },
  { icon: CheckSquare, label: "Tasks" },
  { icon: Sliders, label: "Priorities" },
  { icon: BarChart3, label: "Progress" },
];

export default function Positioning() {
  return (
    <section className="py-16 px-6 border-t border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <p className="text-[13px] font-medium text-[#71717A] uppercase tracking-widest">
            Everything you need to move work forward.
          </p>
          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            {pillars.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-[#52525B]">
                <Icon className="w-4 h-4 text-[#A1A1AA]" />
                <span className="text-[13px] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
