"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  LayoutDashboard,
  Briefcase,
  CheckSquare,
  Settings,
  ArrowRight,
} from "lucide-react";

function DashboardPreview() {
  return (
    <div className="relative w-full max-w-[860px] mx-auto">
      {/* Glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#E4E4E7] to-transparent opacity-60 blur-sm" />

      <div className="relative rounded-2xl border border-[#E4E4E7] bg-white shadow-[0_32px_80px_rgba(0,0,0,0.08)] overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#F0F0F1] bg-[#FAFAF9]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E4E4E7]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E4E4E7]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E4E4E7]" />
          <div className="ml-3 flex-1 bg-[#F0F0F1] rounded-md h-5 max-w-[200px] flex items-center px-2">
            <span className="text-[9px] text-[#A1A1AA] truncate">nexus.app/dashboard</span>
          </div>
        </div>

        {/* App layout */}
        <div className="flex h-[420px] md:h-[480px]">
          {/* Sidebar */}
          <div className="w-44 border-r border-[#F0F0F1] bg-[#FAFAF9] flex flex-col py-4 shrink-0 hidden sm:flex">
            <div className="px-4 mb-6 flex items-center gap-2">
              <div className="w-5 h-5 bg-[#18181B] rounded-[4px] flex items-center justify-center">
                <span className="text-white font-bold text-[9px]">⌘</span>
              </div>
              <span className="font-semibold text-[11px] text-[#18181B] tracking-tight">NEXUS</span>
            </div>
            <nav className="px-2 space-y-0.5">
              {[
                { icon: LayoutDashboard, label: "Dashboard", active: true },
                { icon: Briefcase, label: "Projects", active: false },
                { icon: CheckSquare, label: "Tasks", active: false },
                { icon: Settings, label: "Settings", active: false },
              ].map(({ icon: Icon, label, active }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors ${
                    active
                      ? "bg-[#F4F4F5] text-[#18181B]"
                      : "text-[#71717A] hover:text-[#18181B]"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </div>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-y-auto p-5 bg-[#FAFAF9]">
            {/* Greeting */}
            <div className="mb-5">
              <h2 className="text-[15px] font-semibold text-[#18181B]">Good morning</h2>
              <p className="text-[11px] text-[#71717A] mt-0.5">Here's what's happening with your projects.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
              {[
                { label: "Projects", value: "12" },
                { label: "Tasks", value: "48" },
                { label: "Completed", value: "27" },
                { label: "Pending", value: "21" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-lg border border-[#E4E4E7] p-3">
                  <div className="text-[18px] font-semibold text-[#18181B] leading-none">{value}</div>
                  <div className="text-[10px] text-[#71717A] mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Projects Overview */}
            <div className="bg-white rounded-lg border border-[#E4E4E7] mb-3">
              <div className="px-4 py-3 border-b border-[#F0F0F1]">
                <span className="text-[11px] font-semibold text-[#18181B]">Projects Overview</span>
              </div>
              <div className="divide-y divide-[#F0F0F1]">
                {[
                  { name: "Website Redesign", status: "In Progress", pct: 72 },
                  { name: "Mobile Application", status: "In Progress", pct: 48 },
                  { name: "Research Platform", status: "Completed", pct: 100 },
                ].map(({ name, status, pct }) => (
                  <div key={name} className="px-4 py-2.5 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-[10.5px] font-medium text-[#18181B] truncate">{name}</div>
                      <div className={`text-[9.5px] mt-0.5 font-medium ${pct === 100 ? "text-[#52525B]" : "text-[#4F46E5]"}`}>{status}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-16 h-1 bg-[#E4E4E7] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#18181B] rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[9.5px] text-[#71717A] w-6 text-right">{pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Tasks */}
            <div className="bg-white rounded-lg border border-[#E4E4E7]">
              <div className="px-4 py-3 border-b border-[#F0F0F1]">
                <span className="text-[11px] font-semibold text-[#18181B]">Recent Tasks</span>
              </div>
              <div className="divide-y divide-[#F0F0F1]">
                {[
                  { label: "Implement authentication", done: false },
                  { label: "Design dashboard", done: false },
                  { label: "Create database schema", done: true },
                ].map(({ label, done }) => (
                  <div key={label} className="px-4 py-2 flex items-center gap-2.5">
                    {done ? (
                      <CheckCircle2 className="w-3 h-3 text-[#18181B] shrink-0" />
                    ) : (
                      <Circle className="w-3 h-3 text-[#A1A1AA] shrink-0" />
                    )}
                    <span className={`text-[10.5px] font-medium ${done ? "line-through text-[#A1A1AA]" : "text-[#18181B]"}`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    const raf = requestAnimationFrame(() => {
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-32 pb-24 px-6 relative overflow-hidden"
    >
      {/* Background subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#18181B 1px, transparent 1px), linear-gradient(90deg, #18181B 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Hero text */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E4E4E7] bg-white/80 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
            <span className="text-[11px] font-semibold text-[#52525B] tracking-widest uppercase">
              Project & Task Management
            </span>
          </div>

          <h1 className="text-[52px] sm:text-[64px] md:text-[72px] font-bold tracking-[-0.04em] leading-[1.05] text-[#18181B] mb-6">
            Turn complex work<br />
            <span className="text-[#18181B]">into clear progress.</span>
          </h1>

          <p className="text-[17px] text-[#52525B] leading-relaxed max-w-xl mx-auto mb-10">
            Nexus brings your projects, tasks, priorities, and progress into one focused workspace — so you always know what needs to happen next.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link
              href="/register"
              className="w-full sm:w-auto px-6 py-3 bg-[#18181B] text-white font-medium text-[14px] rounded-lg hover:bg-[#27272A] transition-colors duration-150 shadow-sm flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#product"
              className="w-full sm:w-auto px-6 py-3 bg-white text-[#18181B] font-medium text-[14px] rounded-lg border border-[#E4E4E7] hover:bg-[#F4F4F5] transition-colors duration-150 flex items-center justify-center"
            >
              Explore Nexus
            </a>
          </div>

          <p className="text-[12px] text-[#A1A1AA] tracking-wider">
            Projects · Tasks · Progress · One workspace
          </p>
        </div>

        {/* Dashboard Preview */}
        <DashboardPreview />
      </div>
    </section>
  );
}
