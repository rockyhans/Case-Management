import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { casesApi } from "../api/cases";
import { tasksApi } from "../api/tasks";
import type { ICase, ITask, UserRole } from "../types";
import { useTasks } from "../hooks/useTasks";
import { useToast } from "../hooks/useToast";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import TaskForm from "../components/tasks/TaskForm";
import TaskItem from "../components/tasks/TaskItem";
// import ConfirmDialog from "../components/common/ConfirmDialog";
import EmptyState from "../components/common/EmptyState";
import ToastContainer from "../components/common/ToastContainer";
import { SkeletonCard } from "../components/ui/Skeleton";
import { formatDate, stageColors } from "../utils";

interface CaseDetailsProps {
  role: UserRole;
}

const CaseDetails: React.FC<CaseDetailsProps> = ({ role }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState<ICase | null>(null);
  const [caseLoading, setCaseLoading] = useState(true);
  const { tasks, loading: tasksLoading, refetch: refetchTasks } = useTasks(id!);
  const { toasts, addToast, removeToast } = useToast();
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [editTask, setEditTask] = useState<ITask | null>(null);
  const [deleteTask, setDeleteTask] = useState<ITask | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await casesApi.getById(id!);
        setCaseData(res.data.data);
      } catch {
        addToast("Case not found", "error");
        navigate("/cases");
      } finally {
        setCaseLoading(false);
      }
    };
    fetchCase();
  }, [id]);

  const handleCreateTask = async (data: any) => {
    try {
      setFormLoading(true);
      await tasksApi.create(id!, data);
      addToast("Task added successfully", "success");
      setCreateOpen(false);
      refetchTasks();
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateTask = async (data: any) => {
    if (!editTask) return;
    try {
      setFormLoading(true);
      await tasksApi.update(editTask._id, data);
      addToast("Task updated", "success");
      setEditTask(null);
      refetchTasks();
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!deleteTask) return;
    try {
      setDeleteLoading(true);
      await tasksApi.delete(deleteTask._id);
      addToast("Task deleted", "success");
      setDeleteTask(null);
      refetchTasks();
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggle = async (task: ITask) => {
    try {
      await tasksApi.toggleStatus(task._id);
      refetchTasks();
    } catch (err: any) {
      addToast(err.message, "error");
    }
  };

  const pendingCount = tasks.filter((t) => t.status === "Pending").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;

  if (caseLoading) {
    return (
      <div className="space-y-4">
        <SkeletonCard />
        <div className="grid grid-cols-1 gap-3">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!caseData) return null;

  return (
    <div>
      <PageHeader
        title={caseData.caseTitle}
        subtitle={`${caseData.clientName} · ${caseData.courtName}`}
        action={
          <Button variant="secondary" onClick={() => navigate("/cases")}>
            ← Back to Cases
          </Button>
        }
      />

      {/* Case details card */}
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-6 mb-6 animate-fade-in">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">
              Next Hearing
            </p>
            <p className="text-sm font-medium text-white">
              {formatDate(caseData.nextHearingDate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">
              Case Type
            </p>
            <p className="text-sm font-medium text-white">
              {caseData.caseType}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">
              Stage
            </p>
            <Badge className={stageColors[caseData.stage]}>
              {caseData.stage}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">
              Tasks
            </p>
            <p className="text-sm font-medium text-white">
              <span className="text-amber-400">{pendingCount} pending</span>
              <span className="text-slate-600 mx-1">·</span>
              <span className="text-emerald-400">{completedCount} done</span>
            </p>
          </div>
        </div>
        {caseData.notes && (
          <div className="pt-4 border-t border-navy-700">
            <p className="text-xs text-slate-600 uppercase tracking-wider mb-2">
              Notes
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              {caseData.notes}
            </p>
          </div>
        )}
      </div>

      {/* Tasks */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display font-semibold text-white text-lg">
            Hearing Tasks
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            {tasks.length} task{tasks.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          + Add Task
        </Button>
      </div>

      {tasksLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <EmptyState
          title="No tasks yet"
          description="Add hearing preparation tasks for this case."
          action={
            <Button size="sm" onClick={() => setCreateOpen(true)}>
              + Add Task
            </Button>
          }
          icon="⏳"
        />
      ) : (
        <div className="space-y-2">
          {tasks.map((task, i) => (
            <TaskItem
              key={task._id}
              task={task}
              role={role}
              index={i}
              onEdit={setEditTask}
              onDelete={setDeleteTask}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setCreateOpen(false)}
        title="New Task"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setCreateOpen(false)}
          loading={formLoading}
        />
      </Modal>
      <Modal
        isOpen={!!editTask}
        onClose={() => setEditTask(null)}
        title="Edit Task"
      >
        {editTask && (
          <TaskForm
            initial={editTask}
            onSubmit={handleUpdateTask}
            onCancel={() => setEditTask(null)}
            loading={formLoading}
          />
        )}
      </Modal>
      {/* <ConfirmDialog
        isOpen={!!deleteTask} onClose={() => setDeleteTask(null)} onConfirm={handleDeleteTask}
        title="Delete Task" message={`Delete "${deleteTask?.title}"?`} loading={deleteLoading}
      /> */}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default CaseDetails;
