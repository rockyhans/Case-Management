import api from "./axios";
import type { ICase, ApiResponse } from "../types";

export interface CaseFilters {
  search?: string;
  stage?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const casesApi = {
  getAll: (filters?: CaseFilters) =>
    api.get<ApiResponse<ICase[]>>("/cases", { params: filters }),

  getById: (id: string) => api.get<ApiResponse<ICase>>(`/cases/${id}`),

  create: (data: Omit<ICase, "_id" | "createdAt" | "updatedAt">) =>
    api.post<ApiResponse<ICase>>("/cases", data),

  update: (id: string, data: Partial<ICase>) =>
    api.put<ApiResponse<ICase>>(`/cases/${id}`, data),

  delete: (id: string) => api.delete<ApiResponse<null>>(`/cases/${id}`),
};
