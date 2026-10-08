"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Task } from "@nexus/shared-types";
import { CheckCircle2, Circle, Clock, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";

export default function TasksPage() {
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await api.get("/tasks");
      return res.data;
    },
  });

  const updateTask = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: string }) => {
      return api.patch(`/tasks/${taskId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-[#A1A1AA] text-sm">
        Loading tasks...
      </div>
    );
  }

  const filteredTasks = tasks?.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "ALL" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  }) || [];

  const pendingTasks = filteredTasks.filter((t) => t.status === "PENDING");
  const inProgressTasks = filteredTasks.filter((t) => t.status === "IN_PROGRESS");
  const completedTasks = filteredTasks.filter((t) => t.status === "COMPLETED");

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#18181B] tracking-tight mb-1">
            Tasks
          </h1>
          <p className="text-[14px] text-[#71717A]">
            Everything that needs to get done.
          </p>
        </div>
        <button 
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2 bg-[#18181B] text-white px-4 py-2 rounded-lg text-[13px] font-medium hover:bg-[#27272A] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Task
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
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
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="bg-white border border-[#E4E4E7] rounded-lg px-4 py-2 text-[13px] text-[#18181B] focus:outline-none focus:border-[#18181B] transition-colors appearance-none min-w-[140px]"
        >
          <option value="ALL">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <div className="bg-white border border-[#E4E4E7] rounded-xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#E4E4E7] bg-[#FAFAF9] text-[11px] font-semibold text-[#71717A] uppercase tracking-widest">
          <div className="col-span-5 md:col-span-6">Task</div>
          <div className="col-span-3 md:col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Priority</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="divide-y divide-[#F0F0F1]">
          {tasks?.length === 0 ? (
            <div className="p-12 text-center text-[#A1A1AA] text-[13px]">
              You have no tasks. Go to a project to create some.
            </div>
          ) : (
            <>
              {inProgressTasks.map((task) => (
                <TaskRow key={task.id} task={task} updateTask={updateTask} onEdit={() => { setTaskToEdit(task); setIsDialogOpen(true); }} />
              ))}
              {pendingTasks.map((task) => (
                <TaskRow key={task.id} task={task} updateTask={updateTask} onEdit={() => { setTaskToEdit(task); setIsDialogOpen(true); }} />
              ))}
              {completedTasks.map((task) => (
                <TaskRow key={task.id} task={task} updateTask={updateTask} onEdit={() => { setTaskToEdit(task); setIsDialogOpen(true); }} />
              ))}
            </>
          )}
        </div>
      </div>

      <CreateTaskDialog 
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setTaskToEdit(null);
        }}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}

function TaskRow({ task, updateTask, onEdit }: { task: Task; updateTask: any; onEdit: () => void }) {
  const queryClient = useQueryClient();
  const isCompleted = task.status === "COMPLETED";
  const isPending = task.status === "PENDING";
  const isInProgress = task.status === "IN_PROGRESS";

  const getNextStatus = () => {
    if (isCompleted) return "PENDING";
    if (isPending) return "IN_PROGRESS";
    return "COMPLETED";
  };

  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  return (
    <div
      className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors ${
        isCompleted ? "bg-[#FAFAF9]" : "hover:bg-[#FAFAF9]"
      }`}
    >
      <div className="col-span-5 md:col-span-6 flex items-center gap-3">
        <button
          onClick={() =>
            updateTask.mutate({ taskId: task.id, status: getNextStatus() })
          }
          className="shrink-0 transition-transform hover:scale-110 active:scale-95"
          title={`Mark as ${getNextStatus()}`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-4 h-4 text-[#18181B]" />
          ) : isInProgress ? (
            <Clock className="w-4 h-4 text-[#4F46E5]" />
          ) : (
            <Circle className="w-4 h-4 text-[#D4D4D8] hover:text-[#A1A1AA]" />
          )}
        </button>
        <div className="min-w-0">
          <div
            className={`text-[13px] font-medium truncate ${
              isCompleted ? "text-[#A1A1AA] line-through" : "text-[#18181B]"
            }`}
          >
            {task.title}
          </div>
          <Link
            href={`/project/${task.projectId}`}
            className="text-[11px] text-[#A1A1AA] hover:text-[#6366F1] transition-colors truncate block"
          >
            View Project
          </Link>
        </div>
      </div>

      <div className="col-span-3 md:col-span-2 flex justify-center">
        <span
          className={`text-[9.5px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${
            isCompleted
              ? "bg-[#F4F4F5] text-[#52525B] border-[#E4E4E7]"
              : isInProgress
              ? "bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]"
              : "bg-white text-[#71717A] border-[#E4E4E7]"
          }`}
        >
          {task.status.replace("_", " ")}
        </span>
      </div>

      <div className="col-span-2 flex justify-center">
        <span
          className={`text-[9.5px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${
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

      <div className="col-span-2 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
         <button
          onClick={onEdit}
          className="text-[#71717A] hover:text-[#18181B] transition-colors"
          title="Edit Task"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            if (confirm("Delete task? This action cannot be undone.")) {
              deleteTask.mutate(task.id);
            }
          }}
          className="text-[#71717A] hover:text-[#DC2626] transition-colors"
          title="Delete Task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
