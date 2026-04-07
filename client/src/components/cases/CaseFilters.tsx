import React, { useState } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import type { CaseFilters } from "../../api/cases";

interface CaseFiltersProps {
  onFilter: (filters: CaseFilters) => void;
}

const STAGE_OPTIONS = [
  { value: "", label: "All Stages" },
  { value: "Filing", label: "Filing" },
  { value: "Evidence", label: "Evidence" },
  { value: "Arguments", label: "Arguments" },
  { value: "Order Reserved", label: "Order Reserved" },
];

const CaseFiltersPanel: React.FC<CaseFiltersProps> = ({ onFilter }) => {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleApply = () => {
    onFilter({
      search: search || undefined,
      stage: stage || undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
    });
  };

  const handleClear = () => {
    setSearch("");
    setStage("");
    setDateFrom("");
    setDateTo("");
    onFilter({});
  };

  return (
    <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 mb-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <Input
          placeholder="Search by title or client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
        />
        <Select
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          options={STAGE_OPTIONS}
        />
        <Input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <Input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="sm" onClick={handleClear}>
          Clear
        </Button>
        <Button size="sm" onClick={handleApply}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default CaseFiltersPanel;
