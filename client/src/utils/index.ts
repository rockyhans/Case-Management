export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const isWithin7Days = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 7;
};

export const stageColors: Record<string, string> = {
  Filing: "bg-blue-900/40 text-blue-300 border-blue-700/50",
  Evidence: "bg-purple-900/40 text-purple-300 border-purple-700/50",
  Arguments: "bg-amber-900/40 text-amber-300 border-amber-700/50",
  "Order Reserved": "bg-emerald-900/40 text-emerald-300 border-emerald-700/50",
};

export const priorityColors: Record<string, string> = {
  Low: "bg-slate-700/50 text-slate-300 border-slate-600/50",
  Medium: "bg-blue-900/40 text-blue-300 border-blue-700/50",
  High: "bg-red-900/40 text-red-300 border-red-700/50",
};
