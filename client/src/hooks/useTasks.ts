import { useState, useEffect, useCallback } from "react";
import { tasksApi } from "../api/tasks";
import type { ITask } from "../types";

export const useTasks = (caseId: string) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    if (!caseId) return;
    try {
      setLoading(true);
      setError(null);
      const res = await tasksApi.getByCase(caseId);
      setTasks(res.data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [caseId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, refetch: fetchTasks };
};
