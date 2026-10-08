"use client";

import { CheckCircle2, Circle, Search } from "lucide-react";

/* ── Projects Preview ──────────────────────────────────────── */
export function ProjectPreview() {
  const projects = [
    { name: "Website Redesign", status: "IN PROGRESS", pct: 72 },
    { name: "Mobile Application", status: "IN PROGRESS", pct: 48 },
    { name: "Research Platform", status: "COMPLETED", pct: 100 },
  ];

  return (
    <div className="rounded-xl border border-[#E4E4E7] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#E4E4E7] flex items-center justify-between">
        <span className="text-[12px] font-semibold text-[#18181B] tracking-wide uppercase">Projects</span>
        <div className="flex items-center gap-2">
          <span className="text-[10.5px] font-medium text-[#71717A] border border-[#E4E4E7] rounded px-2 py-0.5 cursor-pointer hover:bg-[#F4F4F5]">Status</span>
          <span className="text-[10.5px] font-medium text-[#71717A] border border-[#E4E4E7] rounded px-2 py-0.5 cursor-pointer hover:bg-[#F4F4F5]">Sort</span>
        </div>
      </div>
      {/* Search */}
      <div className="px-5 py-3 border-b border-[#E4E4E7]">
        <div className="flex items-center gap-2 bg-[#F7F7F8] rounded-md px-3 py-2">
          <Search className="w-3.5 h-3.5 text-[#A1A1AA]" />
          <span className="text-[11.5px] text-[#A1A1AA]">Search projects...</span>
        </div>
      </div>
      {/* Rows */}
      <div className="divide-y divide-[#F0F0F1]">
        {projects.map(({ name, status, pct }) => (
          <div key={name} className="px-5 py-3.5 flex items-center gap-4 hover:bg-[#FAFAF9] transition-colors group">
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-[#18181B] truncate">{name}</div>
              <span
                className={`inline-block mt-1 text-[9.5px] font-semibold px-1.5 py-0.5 rounded border ${
                  status === "COMPLETED"
                    ? "bg-[#F4F4F5] text-[#52525B] border-[#E4E4E7]"
                    : "bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]"
                }`}
              >
                {status}
              </span>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-20 h-1.5 bg-[#E4E4E7] rounded-full overflow-hidden">
                <div className="h-full bg-[#18181B] rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-[10px] text-[#71717A] w-7 text-right tabular-nums">{pct}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Tasks Preview ──────────────────────────────────────────── */
export function TaskPreview() {
  const tasks = [
    { label: "Implement authentication", priority: "HIGH", status: "IN PROGRESS", done: false },
    { label: "Design dashboard", priority: "MEDIUM", status: "PENDING", done: false },
    { label: "Create database schema", priority: "HIGH", status: "COMPLETED", done: true },
  ];

  return (
    <div className="rounded-xl border border-[#E4E4E7] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#E4E4E7]">
        <span className="text-[12px] font-semibold text-[#18181B] tracking-wide uppercase">Tasks</span>
      </div>
      <div className="px-5 py-3 border-b border-[#E4E4E7]">
        <div className="flex items-center gap-2 bg-[#F7F7F8] rounded-md px-3 py-2">
          <Search className="w-3.5 h-3.5 text-[#A1A1AA]" />
          <span className="text-[11.5px] text-[#A1A1AA]">Search tasks...</span>
        </div>
      </div>
      <div className="divide-y divide-[#F0F0F1]">
        {tasks.map(({ label, priority, status, done }) => (
          <div key={label} className="px-5 py-3.5 flex items-center gap-3 hover:bg-[#FAFAF9] transition-colors">
            {done ? (
              <CheckCircle2 className="w-4 h-4 text-[#18181B] shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-[#D4D4D8] shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <span className={`text-[12px] font-medium ${done ? "line-through text-[#A1A1AA]" : "text-[#18181B]"}`}>
                {label}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className={`text-[9.5px] font-semibold px-1.5 py-0.5 rounded border ${
                priority === "HIGH"
                  ? "bg-[#F4F4F5] text-[#18181B] border-[#D4D4D8]"
                  : "bg-[#F7F7F8] text-[#52525B] border-[#E4E4E7]"
              }`}>
                {priority}
              </span>
              <span className={`text-[9.5px] font-semibold px-1.5 py-0.5 rounded border ${
                status === "COMPLETED"
                  ? "bg-[#F4F4F5] text-[#3F3F46] border-[#D4D4D8]"
                  : status === "IN PROGRESS"
                  ? "bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]"
                  : "bg-[#F4F4F5] text-[#52525B] border-[#E4E4E7]"
              }`}>
                {status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Dashboard Preview ──────────────────────────────────────── */
export function DashboardPreview() {
  const stats = [
    { label: "Total Projects", value: "12" },
    { label: "Total Tasks", value: "48" },
    { label: "Completed", value: "27" },
    { label: "Pending", value: "21" },
    { label: "In Progress", value: "8" },
  ];

  const projects = [
    { name: "Website Redesign", pct: 72 },
    { name: "Mobile Application", pct: 48 },
    { name: "Research Platform", pct: 100 },
  ];

  return (
    <div className="rounded-xl border border-[#E4E4E7] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden p-5 space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2.5">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-[#FAFAF9] rounded-lg border border-[#E4E4E7] p-3 text-center">
            <div className="text-[18px] font-bold text-[#18181B] leading-none">{value}</div>
            <div className="text-[9.5px] text-[#71717A] mt-1 leading-tight">{label}</div>
          </div>
        ))}
      </div>

      {/* Projects overview */}
      <div>
        <div className="text-[11px] font-semibold text-[#18181B] mb-3 uppercase tracking-wide">Projects Overview</div>
        <div className="space-y-2.5">
          {projects.map(({ name, pct }) => (
            <div key={name} className="flex items-center gap-3">
              <span className="text-[11.5px] text-[#52525B] w-36 shrink-0 truncate">{name}</span>
              <div className="flex-1 h-1.5 bg-[#E4E4E7] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-[#18181B]" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-[10px] text-[#A1A1AA] w-7 text-right tabular-nums">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tasks */}
      <div>
        <div className="text-[11px] font-semibold text-[#18181B] mb-3 uppercase tracking-wide">Recent Tasks</div>
        <div className="space-y-2">
          {[
            { label: "Implement authentication", done: false },
            { label: "Design dashboard", done: false },
            { label: "Create database schema", done: true },
          ].map(({ label, done }) => (
            <div key={label} className="flex items-center gap-2">
              {done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#52525B] shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-[#D4D4D8] shrink-0" />
              )}
              <span className={`text-[11.5px] ${done ? "line-through text-[#A1A1AA]" : "text-[#52525B]"}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
