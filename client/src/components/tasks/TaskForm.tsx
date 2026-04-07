import React, { useState } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import type { ITask, TaskPriority, TaskStatus } from "../../types";

interface TaskFormProps {
  initial?: Partial<ITask>;
  onSubmit: (
    data: Omit<ITask, "_id" | "caseId" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

interface FormErrors {
  title?: string;
  dueDate?: string;
  ownerName?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initial,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [form, setForm] = useState({
    title: initial?.title || "",
    dueDate: initial?.dueDate
      ? new Date(initial.dueDate).toISOString().split("T")[0]
      : "",
    ownerName: initial?.ownerName || "",
    priority: initial?.priority || ("Medium" as TaskPriority),
    status: initial?.status || ("Pending" as TaskStatus),
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.title.trim()) newErrors.title = "Task title is required";
    if (!form.dueDate) newErrors.dueDate = "Due date is required";
    if (!form.ownerName.trim()) newErrors.ownerName = "Owner name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(form as any);
  };

  const set =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field as keyof FormErrors])
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Task Title"
        value={form.title}
        onChange={set("title")}
        error={errors.title}
        placeholder="e.g. Prepare affidavit"
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Due Date"
          type="date"
          value={form.dueDate}
          onChange={set("dueDate")}
          error={errors.dueDate}
        />
        <Input
          label="Owner Name"
          value={form.ownerName}
          onChange={set("ownerName")}
          error={errors.ownerName}
          placeholder="Assigned to"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Priority"
          value={form.priority}
          onChange={set("priority")}
          options={[
            { value: "Low", label: "Low" },
            { value: "Medium", label: "Medium" },
            { value: "High", label: "High" },
          ]}
        />
        <Select
          label="Status"
          value={form.status}
          onChange={set("status")}
          options={[
            { value: "Pending", label: "Pending" },
            { value: "Completed", label: "Completed" },
          ]}
        />
      </div>
      <div className="flex gap-3 justify-end pt-2">
        <Button
          variant="ghost"
          type="button"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initial?._id ? "Update Task" : "Add Task"}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
