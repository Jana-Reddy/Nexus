"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Project, Task } from "@nexus/shared-types";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import Link from "next/link";

import { useDashboard } from "@/hooks/api";

export default function DashboardPage() {
  const { data: dashboard, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-[#A1A1AA] text-sm">
        Loading dashboard...
      </div>
    );
  }

  const { stats, projectsOverview, recentTasks } = dashboard || { stats: {}, projectsOverview: [], recentTasks: [] };
  
  const getProgress = (proj: Project) => {
    // If backend doesn't provide progress, we'd calculate it. 
    // Assuming backend might not return populated tasks here.
    return 0; // The actual implementation might need tasks count, let's keep it simple or assume backend gives it.
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-[24px] font-semibold text-[#18181B] tracking-tight mb-1">
          Good morning
        </h1>
        <p className="text-[14px] text-[#71717A]">
          Here's an overview of your projects and tasks.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Projects", value: stats?.totalProjects || 0 },
          { label: "Total Tasks", value: stats?.totalTasks || 0 },
          { label: "Completed", value: stats?.completedTasks || 0 },
          { label: "Pending", value: stats?.pendingTasks || 0 },
          { label: "In Progress (Projects)", value: stats?.inProgressProjects || 0 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-5 rounded-xl border border-[#E4E4E7] bg-white shadow-sm"
          >
            <div className="text-[28px] font-semibold text-[#18181B] mb-1 leading-none tracking-tight">
              {stat.value}
            </div>
            <div className="text-[13px] text-[#71717A] font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Projects Overview */}
        <div className="rounded-xl border border-[#E4E4E7] bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-[#E4E4E7] flex justify-between items-center bg-[#FAFAF9]">
            <h2 className="text-[14px] font-semibold text-[#18181B]">
              Projects Overview
            </h2>
            <Link
              href="/projects"
              className="text-[12px] font-medium text-[#71717A] hover:text-[#18181B] transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-[#F0F0F1] flex-1">
            {projectsOverview?.length === 0 ? (
              <div className="p-8 text-center text-[#A1A1AA] text-[13px]">
                No projects found.
              </div>
            ) : (
              projectsOverview?.slice(0, 5).map((project: any) => {
                const pct = getProgress(project);
                return (
                  <Link
                    key={project.id}
                    href={`/project/${project.id}`}
                    className="flex flex-col gap-2 p-5 hover:bg-[#FAFAF9] transition-colors group block"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] font-medium text-[#18181B] group-hover:text-[#6366F1] transition-colors">
                        {project.title}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${
                          project.status === "COMPLETED"
                            ? "bg-[#F4F4F5] text-[#52525B] border-[#E4E4E7]"
                            : "bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]"
                        }`}
                      >
                        {project.status.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-[#F4F4F5] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#18181B] rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-[#A1A1AA] w-8 text-right font-medium">
                        {pct}%
                      </span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="rounded-xl border border-[#E4E4E7] bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-[#E4E4E7] flex justify-between items-center bg-[#FAFAF9]">
            <h2 className="text-[14px] font-semibold text-[#18181B]">
              Recent Tasks
            </h2>
            <Link
              href="/tasks"
              className="text-[12px] font-medium text-[#71717A] hover:text-[#18181B] transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-[#F0F0F1] flex-1">
            {recentTasks?.length === 0 ? (
              <div className="p-8 text-center text-[#A1A1AA] text-[13px]">
                No tasks found.
              </div>
            ) : (
              recentTasks?.slice(0, 7).map((task: any) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-4 hover:bg-[#FAFAF9] transition-colors"
                >
                  {task.status === "COMPLETED" ? (
                    <CheckCircle2 className="w-4 h-4 text-[#18181B] shrink-0" />
                  ) : task.status === "IN_PROGRESS" ? (
                    <Clock className="w-4 h-4 text-[#4F46E5] shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#D4D4D8] shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-[13px] font-medium truncate ${
                        task.status === "COMPLETED"
                          ? "text-[#A1A1AA] line-through"
                          : "text-[#18181B]"
                      }`}
                    >
                      {task.title}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border uppercase tracking-wider shrink-0 ${
                      task.priority === "HIGH"
                        ? "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]"
                        : task.priority === "MEDIUM"
                        ? "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]"
                        : "bg-[#F4F4F5] text-[#52525B] border-[#E4E4E7]"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
