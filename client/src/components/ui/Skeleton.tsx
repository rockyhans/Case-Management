import React from "react";

const Skeleton: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`shimmer rounded-lg ${className}`} />
);

export const SkeletonCard = () => (
  <div className="bg-navy-900 border border-navy-700 rounded-xl p-5 space-y-3">
    <Skeleton className="h-5 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-4 w-2/3" />
    <div className="flex gap-2 pt-1">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-20" />
    </div>
  </div>
);

export const SkeletonStat = () => (
  <div className="bg-navy-900 border border-navy-700 rounded-xl p-6 space-y-3">
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-8 w-1/3" />
    <Skeleton className="h-3 w-2/3" />
  </div>
);

export default Skeleton;
