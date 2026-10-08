"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Project } from "@nexus/shared-types";
import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function ProjectsPage() {
  const queryClient = useQueryClient();
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await api.get("/projects");
      return res.data;
    },
  });

  const deleteProject = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const filteredProjects = projects?.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const createProject = useMutation({
    mutationFn: async (title: string) => {
      return api.post("/projects", { title });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setNewProjectTitle("");
      setIsCreating(false);
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-[#A1A1AA] text-sm">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#18181B] tracking-tight mb-1">
            Projects
          </h1>
          <p className="text-[14px] text-[#71717A]">
            Manage and track all your projects in one place.
          </p>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-[#18181B] text-white px-4 py-2 rounded-lg text-[13px] font-medium hover:bg-[#27272A] transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        )}
      </div>

      {isCreating && (
        <div className="bg-white p-6 rounded-xl border border-[#E4E4E7] shadow-sm animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-[14px] font-semibold text-[#18181B] mb-4">
            Create a New Project
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newProjectTitle.trim()) {
                createProject.mutate(newProjectTitle.trim());
              }
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              autoFocus
              placeholder="e.g. Website Redesign"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
              className="flex-1 border border-[#E4E4E7] rounded-lg px-4 py-2 text-[14px] text-[#18181B] placeholder-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-colors"
              disabled={createProject.isPending}
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-[13px] font-medium text-[#71717A] hover:bg-[#F4F4F5] rounded-lg transition-colors"
                disabled={createProject.isPending}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newProjectTitle.trim() || createProject.isPending}
                className="px-4 py-2 bg-[#18181B] text-white text-[13px] font-medium rounded-lg hover:bg-[#27272A] disabled:opacity-50 transition-colors"
              >
                {createProject.isPending ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-white border border-[#E4E4E7] rounded-lg px-4 py-2 text-[13px] text-[#18181B] placeholder-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-colors"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-[#E4E4E7] rounded-lg px-4 py-2 text-[13px] text-[#18181B] focus:outline-none focus:border-[#18181B] transition-colors appearance-none min-w-[140px]"
        >
          <option value="ALL">All Statuses</option>
          <option value="NOT_STARTED">Not Started</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-[#E4E4E7] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E4E4E7] bg-[#FAFAF9]">
                <th className="px-6 py-3 text-[11px] font-semibold text-[#71717A] uppercase tracking-widest whitespace-nowrap">
                  Project
                </th>
                <th className="px-6 py-3 text-[11px] font-semibold text-[#71717A] uppercase tracking-widest whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-3 text-[11px] font-semibold text-[#71717A] uppercase tracking-widest whitespace-nowrap hidden md:table-cell">
                  Start Date
                </th>
                <th className="px-6 py-3 text-[11px] font-semibold text-[#71717A] uppercase tracking-widest whitespace-nowrap hidden lg:table-cell">
                  Created
                </th>
                <th className="px-6 py-3 text-[11px] font-semibold text-[#71717A] uppercase tracking-widest whitespace-nowrap text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              {filteredProjects?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#A1A1AA] text-[13px]">
                    No projects found.
                  </td>
                </tr>
              ) : (
                filteredProjects?.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-[#FAFAF9] transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/project/${project.id}`}
                        className="text-[14px] font-medium text-[#18181B] group-hover:text-[#6366F1] transition-colors block"
                      >
                        {project.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${
                          project.status === "COMPLETED"
                            ? "bg-[#F4F4F5] text-[#52525B] border-[#E4E4E7]"
                            : "bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]"
                        }`}
                      >
                        {project.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#71717A] hidden md:table-cell">
                      {project.startDate ? new Date(project.startDate).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#71717A] hidden lg:table-cell">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/project/${project.id}`}
                          className="text-[13px] font-medium text-[#71717A] hover:text-[#18181B] transition-colors"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this project?")) {
                              deleteProject.mutate(project.id);
                            }
                          }}
                          className="text-[13px] font-medium text-[#71717A] hover:text-[#DC2626] transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
