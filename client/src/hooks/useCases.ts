import { useState, useEffect, useCallback } from "react";
import { casesApi } from "../api/cases";
import type { CaseFilters } from "../api/cases";
import type { ICase } from "../types";

export const useCases = (initialFilters?: CaseFilters) => {
  const [cases, setCases] = useState<ICase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCases = useCallback(async (filters?: CaseFilters) => {
    try {
      setLoading(true);
      setError(null);
      const res = await casesApi.getAll(filters);
      setCases(res.data.data.slice(0, 5));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCases(initialFilters);
  }, [fetchCases]);

  return { cases, loading, error, refetch: fetchCases };
};
