import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export function CreateTaskDialog({ 
  isOpen, 
  onClose, 
  defaultProjectId = "", 
  taskToEdit = null 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  defaultProjectId?: string;
  taskToEdit?: any;
}) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState(defaultProjectId);
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("PENDING");

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await api.get("/projects");
      return res.data;
    }
  });

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
      setProjectId(taskToEdit.projectId);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
    } else {
      setTitle("");
      setDescription("");
      setProjectId(defaultProjectId);
      setPriority("MEDIUM");
      setStatus("PENDING");
    }
  }, [taskToEdit, defaultProjectId, isOpen]);

  const saveTask = useMutation({
    mutationFn: async (data: any) => {
      if (taskToEdit) {
        return api.patch(`/tasks/${taskToEdit.id}`, data);
      } else {
        return api.post("/tasks", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      if (projectId) {
         queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
      }
      onClose();
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-[#E4E4E7]">
          <h2 className="text-[16px] font-semibold text-[#18181B]">
            {taskToEdit ? "Edit Task" : "Create Task"}
          </h2>
        </div>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (!title || !projectId) return;
            saveTask.mutate({ title, description, projectId, priority, status });
          }}
          className="p-6 space-y-4"
        >
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-[#18181B]">Task Name</label>
            <input 
              required
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-[#E4E4E7] rounded-md px-3 py-2 text-[13px] text-[#18181B] focus:outline-none focus:border-[#18181B]"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-[#18181B]">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-[#E4E4E7] rounded-md px-3 py-2 text-[13px] text-[#18181B] focus:outline-none focus:border-[#18181B] min-h-[80px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-[#18181B]">Project</label>
            <select 
              required
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full border border-[#E4E4E7] rounded-md px-3 py-2 text-[13px] text-[#18181B] focus:outline-none focus:border-[#18181B] bg-white"
            >
              <option value="" disabled>Select a project...</option>
              {projects?.map((p: any) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#18181B]">Priority</label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-[#E4E4E7] rounded-md px-3 py-2 text-[13px] text-[#18181B] focus:outline-none focus:border-[#18181B] bg-white"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#18181B]">Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-[#E4E4E7] rounded-md px-3 py-2 text-[13px] text-[#18181B] focus:outline-none focus:border-[#18181B] bg-white"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-[#71717A] hover:bg-[#F4F4F5] rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title || !projectId || saveTask.isPending}
              className="px-4 py-2 bg-[#18181B] text-white text-[13px] font-medium rounded-md hover:bg-[#27272A] disabled:opacity-50 transition-colors"
            >
              {saveTask.isPending ? "Saving..." : taskToEdit ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
