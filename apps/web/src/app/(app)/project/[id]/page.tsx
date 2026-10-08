"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Project, Task } from "@nexus/shared-types";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle2, Circle, Clock, ArrowLeft, MoreHorizontal, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";

export default function ProjectPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const { data: project, isLoading: projectLoading } = useQuery<Project>({
    queryKey: ["project", id],
    queryFn: async () => {
      const res = await api.get(`/projects/${id}`);
      return res.data;
    },
  });

  const { data: tasks, isLoading: tasksLoading } = useQuery<Task[]>({
    queryKey: ["tasks", id],
    queryFn: async () => {
      const res = await api.get(`/tasks?projectId=${id}`);
      return res.data;
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (taskId: string) => {
      await api.delete(`/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const updateTask = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: string }) => {
      return api.patch(`/tasks/${taskId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
    },
  });

  if (projectLoading || tasksLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-[#A1A1AA] text-sm">
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center gap-4">
        <div className="text-[#A1A1AA] text-sm">Project not found</div>
        <Link
          href="/dashboard"
          className="text-[#18181B] font-medium text-[13px] hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const completedCount = tasks?.filter((t) => t.status === "COMPLETED").length || 0;
  const progress = tasks?.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-[13px] font-medium text-[#71717A] hover:text-[#18181B] transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-semibold text-[#18181B] tracking-tight mb-2">
              {project.title}
            </h1>
            <p className="text-[14px] text-[#71717A] max-w-xl leading-relaxed">
              {project.description || "No description provided."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border uppercase tracking-widest ${
                project.status === "COMPLETED"
                  ? "bg-[#F4F4F5] text-[#52525B] border-[#E4E4E7]"
                  : "bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]"
              }`}
            >
              {project.status.replace("_", " ")}
            </span>
            <button className="p-2 text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] rounded-md transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border border-[#E4E4E7] rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-end mb-3">
          <div>
            <div className="text-[13px] font-medium text-[#18181B] mb-1">
              Project Progress
            </div>
            <div className="text-[12px] text-[#A1A1AA]">
              {completedCount} of {tasks?.length || 0} tasks completed
            </div>
          </div>
          <div className="text-[24px] font-semibold text-[#18181B] leading-none tracking-tight">
            {progress}%
          </div>
        </div>
        <div className="h-2 w-full bg-[#F4F4F5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#18181B] rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tasks Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[16px] font-semibold text-[#18181B]">Tasks</h2>
          <button 
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2 bg-[#18181B] text-white px-3 py-1.5 rounded-lg text-[12px] font-medium hover:bg-[#27272A] transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Task
          </button>
        </div>

        <div className="bg-white border border-[#E4E4E7] rounded-xl shadow-sm overflow-hidden">


          <div className="divide-y divide-[#F0F0F1]">
            {tasks?.length === 0 ? (
              <div className="p-12 text-center text-[#A1A1AA] text-[13px]">
                No tasks yet. Create one above.
              </div>
            ) : (
              tasks?.map((task) => {
                const isCompleted = task.status === "COMPLETED";
                const isPending = task.status === "PENDING";
                return (
                  <div
                    key={task.id}
                    className={`group flex items-center gap-4 px-5 py-4 transition-colors ${
                      isCompleted ? "bg-[#FAFAF9]" : "hover:bg-[#FAFAF9]"
                    }`}
                  >
                    <button
                      onClick={() =>
                        updateTask.mutate({
                          taskId: task.id,
                          status: isCompleted ? "PENDING" : "COMPLETED",
                        })
                      }
                      className="shrink-0 transition-transform hover:scale-110 active:scale-95"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-[#18181B]" />
                      ) : isPending ? (
                        <Circle className="w-5 h-5 text-[#D4D4D8] hover:text-[#A1A1AA]" />
                      ) : (
                        <Clock className="w-5 h-5 text-[#4F46E5]" />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-[14px] font-medium transition-colors ${
                          isCompleted
                            ? "text-[#A1A1AA] line-through"
                            : "text-[#18181B]"
                        }`}
                      >
                        {task.title}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${
                          task.priority === "HIGH"
                            ? "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]"
                            : task.priority === "MEDIUM"
                            ? "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]"
                            : "bg-[#F4F4F5] text-[#52525B] border-[#E4E4E7]"
                        }`}
                      >
                        {task.priority}
                      </span>
                      <div className="flex justify-end gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button
                          onClick={() => {
                            setTaskToEdit(task);
                            setIsDialogOpen(true);
                          }}
                          className="text-[#71717A] hover:text-[#18181B] p-1.5 rounded-md transition-colors"
                          title="Edit Task"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Delete task? This action cannot be undone.")) {
                              deleteTask.mutate(task.id);
                            }
                          }}
                          className="text-[#71717A] hover:text-[#DC2626] p-1.5 rounded-md transition-colors"
                          title="Delete Task"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <CreateTaskDialog 
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setTaskToEdit(null);
        }}
        defaultProjectId={id}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}
