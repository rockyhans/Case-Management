import React from "react";
import type { ITask, UserRole } from "../../types";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { formatDate, priorityColors } from "../../utils";

interface TaskItemProps {
  task: ITask;
  role: UserRole;
  onEdit: (t: ITask) => void;
  onDelete: (t: ITask) => void;
  onToggle: (t: ITask) => void;
  index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  role,
  onEdit,
  onDelete,
  onToggle,
  index,
}) => {
  const isCompleted = task.status === "Completed";

  return (
    <div
      className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 animate-slide-up opacity-0 stagger-${Math.min(index + 1, 6)}
        ${
          isCompleted
            ? "bg-navy-950/50 border-navy-800 opacity-70"
            : "bg-navy-900 border-navy-700 hover:border-gold-500/20"
        }`}
      style={{ animationFillMode: "forwards" }}
    >
      {/* Toggle checkbox */}
      <button
        onClick={() => onToggle(task)}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
          ${
            isCompleted
              ? "bg-emerald-500 border-emerald-500"
              : "border-navy-600 hover:border-gold-500"
          }`}
      >
        {isCompleted && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${isCompleted ? "line-through text-slate-600" : "text-slate-200"}`}
        >
          {task.title}
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-1">
          <span className="text-xs text-slate-600">
            📅 {formatDate(task.dueDate)}
          </span>
          <span className="text-xs text-slate-600">👤 {task.ownerName}</span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
        <Badge
          className={
            isCompleted
              ? "bg-emerald-900/30 text-emerald-400 border-emerald-700/30"
              : "bg-amber-900/30 text-amber-400 border-amber-700/30"
          }
        >
          {task.status}
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
        <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>
          Edit
        </Button>
        {role === "admin" && (
          <Button variant="danger" size="sm" onClick={() => onDelete(task)}>
            Del
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
