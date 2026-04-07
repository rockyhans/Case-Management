import React from "react";
import { useNavigate } from "react-router-dom";
import type { ICase, UserRole } from "../../types";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { formatDate, isWithin7Days, stageColors } from "../../utils";

interface CaseCardProps {
  caseData: ICase;
  role: UserRole;
  onEdit: (c: ICase) => void;
  onDelete: (c: ICase) => void;
  index: number;
}

const CaseCard: React.FC<CaseCardProps> = ({
  caseData,
  role,
  onEdit,
  onDelete,
  index,
}) => {
  const navigate = useNavigate();
  const urgent = isWithin7Days(caseData.nextHearingDate);

  return (
    <div
      className={`group bg-navy-900 border border-navy-700 hover:border-gold-500/30 rounded-xl p-5 
    transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5  opacity-100
    stagger-${Math.min(index + 1, 6)} cursor-pointer fill-mode-forwards`}
      onClick={() => navigate(`/cases/${caseData._id}`)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-white text-base leading-snug line-clamp-2 group-hover:text-gold-400 transition-colors">
            {caseData.caseTitle}
          </h3>
          <p className="text-slate-500 text-xs mt-1">{caseData.clientName}</p>
        </div>
        {urgent && (
          <span className="flex-shrink-0 flex items-center gap-1 text-xs text-amber-400 bg-amber-900/20 border border-amber-700/30 px-2 py-0.5 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Soon
          </span>
        )}
      </div>

      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="text-slate-600">⚖</span>
          {caseData.courtName}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="text-slate-600">📅</span>
          {formatDate(caseData.nextHearingDate)}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Badge className={stageColors[caseData.stage]}>
            {caseData.stage}
          </Badge>
          <Badge className="bg-navy-800 text-slate-400 border-navy-600">
            {caseData.caseType}
          </Badge>
        </div>
        <div
          className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <Button variant="ghost" size="sm" onClick={() => onEdit(caseData)}>
            Edit
          </Button>
          {role === "admin" && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(caseData)}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseCard;
