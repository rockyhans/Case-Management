import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import type { ICase, CaseStage } from "../../types";

const STAGES: CaseStage[] = [
  "Filing",
  "Evidence",
  "Arguments",
  "Order Reserved",
];
const CASE_TYPES = [
  "Civil",
  "Criminal",
  "Family",
  "Corporate",
  "Tax",
  "Constitutional",
  "Labor",
  "Other",
];

interface CaseFormProps {
  initial?: Partial<ICase>;
  onSubmit: (
    data: Omit<ICase, "_id" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

interface FormErrors {
  caseTitle?: string;
  clientName?: string;
  courtName?: string;
  caseType?: string;
  nextHearingDate?: string;
  stage?: string;
  notes?: string;
}

const CaseForm: React.FC<CaseFormProps> = ({
  initial,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [form, setForm] = useState({
    caseTitle: initial?.caseTitle || "",
    clientName: initial?.clientName || "",
    courtName: initial?.courtName || "",
    caseType: initial?.caseType || "",
    nextHearingDate: initial?.nextHearingDate
      ? new Date(initial.nextHearingDate).toISOString().split("T")[0]
      : "",
    stage: initial?.stage || ("Filing" as CaseStage),
    notes: initial?.notes || "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.caseTitle.trim()) newErrors.caseTitle = "Case title is required";
    else if (form.caseTitle.trim().length < 3)
      newErrors.caseTitle = "Minimum 3 characters";
    if (!form.clientName.trim())
      newErrors.clientName = "Client name is required";
    if (!form.courtName.trim()) newErrors.courtName = "Court name is required";
    if (!form.caseType) newErrors.caseType = "Case type is required";
    if (!form.nextHearingDate)
      newErrors.nextHearingDate = "Hearing date is required";
    if (!form.stage) newErrors.stage = "Stage is required";
    if (form.notes && form.notes.length > 1000)
      newErrors.notes = "Notes cannot exceed 1000 characters";
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
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field as keyof FormErrors])
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input
            label="Case Title"
            value={form.caseTitle}
            onChange={set("caseTitle")}
            error={errors.caseTitle}
            placeholder="e.g. Sharma vs State of Maharashtra"
          />
        </div>
        <Input
          label="Client Name"
          value={form.clientName}
          onChange={set("clientName")}
          error={errors.clientName}
          placeholder="Full legal name"
        />
        <Input
          label="Court Name"
          value={form.courtName}
          onChange={set("courtName")}
          error={errors.courtName}
          placeholder="e.g. Delhi High Court"
        />
        <Select
          label="Case Type"
          value={form.caseType}
          onChange={set("caseType")}
          error={errors.caseType}
          options={[
            { value: "", label: "Select type..." },
            ...CASE_TYPES.map((t) => ({ value: t, label: t })),
          ]}
        />
        <Select
          label="Stage"
          value={form.stage}
          onChange={set("stage")}
          error={errors.stage}
          options={STAGES.map((s) => ({ value: s, label: s }))}
        />
        <Input
          label="Next Hearing Date"
          type="date"
          value={form.nextHearingDate}
          onChange={set("nextHearingDate")}
          error={errors.nextHearingDate}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
          Notes{" "}
          <span className="text-slate-600 normal-case tracking-normal">
            (optional, max 1000 chars)
          </span>
        </label>
        <textarea
          className={`w-full bg-navy-800 border ${errors.notes ? "border-red-700" : "border-navy-600"} text-slate-200 rounded-lg px-3 py-2.5 text-sm placeholder:text-slate-600
            focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 transition-all resize-none`}
          rows={3}
          value={form.notes}
          onChange={set("notes")}
          placeholder="Additional case notes..."
        />
        <div className="flex justify-between">
          {errors.notes && (
            <p className="text-xs text-red-400">{errors.notes}</p>
          )}
          <p className="text-xs text-slate-600 ml-auto">
            {form.notes.length}/1000
          </p>
        </div>
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
          {initial?._id ? "Update Case" : "Create Case"}
        </Button>
      </div>
    </form>
  );
};

export default CaseForm;
