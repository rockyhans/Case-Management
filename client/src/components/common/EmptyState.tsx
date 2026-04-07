import React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon = "◈",
}) => (
  <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
    <div className="w-16 h-16 rounded-2xl bg-navy-800 border border-navy-700 flex items-center justify-center mb-4 text-3xl text-gold-500/40">
      {icon}
    </div>
    <h3 className="font-display font-semibold text-slate-300 text-lg mb-2">
      {title}
    </h3>
    {description && (
      <p className="text-slate-600 text-sm max-w-xs mb-6">{description}</p>
    )}
    {action}
  </div>
);

export default EmptyState;
