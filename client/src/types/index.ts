export type CaseStage = "Filing" | "Evidence" | "Arguments" | "Order Reserved";
export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "Pending" | "Completed";
export type UserRole = "admin" | "intern";

export interface ICase {
  _id: string;
  caseTitle: string;
  clientName: string;
  courtName: string;
  caseType: string;
  nextHearingDate: string;
  stage: CaseStage;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITask {
  _id: string;
  caseId: string;
  title: string;
  dueDate: string;
  ownerName: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardSummary {
  totalCases: number;
  upcomingHearings: number;
  pendingTasks: number;
  completedTasks: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  total?: number;
}
