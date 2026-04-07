import React from "react";
import { Link } from "react-router-dom";
import { useDashboard } from "../hooks/useDashboard";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/ui/Button";
import { SkeletonStat } from "../components/ui/Skeleton";
import EmptyState from "../components/common/EmptyState";

const StatCard: React.FC<{
  label: string;
  value: number;
  icon: string;
  accent: string;
  subtitle: string;
  index: number;
}> = ({ label, value, icon, accent, subtitle, index }) => (
  <div
    className={`relative overflow-hidden bg-navy-900 border border-navy-700 rounded-xl p-6 
       opacity-100 stagger-${index + 1} hover:border-opacity-100 transition-all duration-300 hover:shadow-card`}
    style={{ animationFillMode: "forwards", borderColor: `${accent}20` }}
  >
    <div
      className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5 blur-xl"
      style={{ background: accent, transform: "translate(30%, -30%)" }}
    />
    <div className="flex items-start justify-between mb-4">
      <span className="text-2xl">{icon}</span>
      <div
        className="w-2 h-2 rounded-full mt-1"
        style={{ background: accent }}
      />
    </div>
    <div className="text-4xl font-display font-bold text-white mb-1">
      {value}
    </div>
    <div className="text-sm font-medium text-slate-300 mb-1">{label}</div>
    <div className="text-xs text-slate-600">{subtitle}</div>
  </div>
);

const Dashboard: React.FC = () => {
  const { summary, loading, error, refetch } = useDashboard();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Legal operations overview"
        action={
          <Button variant="secondary" size="sm" onClick={refetch}>
            ↻ Refresh
          </Button>
        }
      />

      {/* Stats grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[...Array(4)].map((_, i) => (
            <SkeletonStat key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-800/40 rounded-xl p-4 mb-6 text-red-400 text-sm">
          {error}
        </div>
      ) : summary ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            index={0}
            label="Total Cases"
            value={summary.totalCases}
            icon="⚖"
            accent="#d4a017"
            subtitle="All active cases"
          />
          <StatCard
            index={1}
            label="Hearings (7 days)"
            value={summary.upcomingHearings}
            icon="📅"
            accent="#f97316"
            subtitle="Upcoming hearings"
          />
          <StatCard
            index={2}
            label="Pending Tasks"
            value={summary.pendingTasks}
            icon="⏳"
            accent="#f59e0b"
            subtitle="Tasks awaiting action"
          />
          <StatCard
            index={3}
            label="Completed Tasks"
            value={summary.completedTasks}
            icon="✓"
            accent="#10b981"
            subtitle="Tasks resolved"
          />
        </div>
      ) : (
        <EmptyState
          title="No data yet"
          description="Create your first case to get started."
        />
      )}

      {/* Quick actions */}
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-6 animate-fade-in">
        <h2 className="font-display font-semibold text-white mb-1">
          Quick Actions
        </h2>
        <p className="text-slate-500 text-sm mb-5">Jump to what matters most</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link to="/cases">
            <div className="flex items-center gap-4 p-4 bg-navy-800 border border-navy-600 hover:border-gold-500/30 rounded-xl transition-all duration-200 hover:shadow-card group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 text-xl group-hover:scale-110 transition-transform">
                ◈
              </div>
              <div>
                <p className="text-white text-sm font-medium">Manage Cases</p>
                <p className="text-slate-500 text-xs">
                  View, create & edit cases
                </p>
              </div>
              <span className="ml-auto text-slate-600 group-hover:text-gold-400 transition-colors">
                →
              </span>
            </div>
          </Link>
          <div
            className="flex items-center gap-4 p-4 bg-navy-800 border border-navy-600 hover:border-gold-500/30 rounded-xl transition-all duration-200 hover:shadow-card group cursor-pointer"
            onClick={refetch}
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl group-hover:scale-110 transition-transform">
              ↻
            </div>
            <div>
              <p className="text-white text-sm font-medium">Refresh Metrics</p>
              <p className="text-slate-500 text-xs">Sync with latest data</p>
            </div>
            <span className="ml-auto text-slate-600 group-hover:text-emerald-400 transition-colors">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
