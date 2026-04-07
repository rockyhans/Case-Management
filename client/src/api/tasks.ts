import api from "./axios";
import type { ITask, ApiResponse } from "../types";

export const tasksApi = {
  getByCase: (caseId: string) =>
    api.get<ApiResponse<ITask[]>>(`/cases/${caseId}/tasks`),

  create: (
    caseId: string,
    data: Omit<ITask, "_id" | "caseId" | "createdAt" | "updatedAt">,
  ) => api.post<ApiResponse<ITask>>(`/cases/${caseId}/tasks`, data),

  update: (taskId: string, data: Partial<ITask>) =>
    api.put<ApiResponse<ITask>>(`/tasks/${taskId}`, data),

  delete: (taskId: string) => api.delete<ApiResponse<null>>(`/tasks/${taskId}`),

  toggleStatus: (taskId: string) =>
    api.patch<ApiResponse<ITask>>(`/tasks/${taskId}/status`),
};
