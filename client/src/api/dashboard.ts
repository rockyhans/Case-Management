import api from "./axios";
import type { DashboardSummary, ApiResponse } from "../types";

export const dashboardApi = {
  getSummary: () =>
    api.get<ApiResponse<DashboardSummary>>("/dashboard/summary"),
};
