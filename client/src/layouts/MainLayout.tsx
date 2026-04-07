import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { UserRole } from "../types";

const navLinks = [
  { path: "/", label: "Dashboard", icon: "⬡" },
  { path: "/cases", label: "Cases", icon: "◈" },
];

interface MainLayoutProps {
  children: React.ReactNode;
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  role,
  onRoleChange,
}) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-navy-900 border-r border-gold-500/10 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 ">
          <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center">
            <span className="text-navy-950 font-display font-bold text-sm">
              CI
            </span>
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-lg leading-none">
              Case Intake
            </h1>
            <p className="text-gold-500/70 text-xs font-body mt-0.5">
              Legal Operations
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="px-3 py-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body font-medium transition-all duration-200 group
                ${
                  location.pathname === link.path
                    ? "bg-gold-500/10 text-gold-400 border border-gold-500/20"
                    : "text-slate-400 hover:text-white hover:bg-navy-800"
                }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
              {location.pathname === link.path && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold-400" />
              )}
            </Link>
          ))}
        </nav>

        {/* Role switcher */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gold-500/10">
          <p className="text-xs text-slate-500 mb-2 px-1">Role</p>
          <div className="flex rounded-lg overflow-hidden border border-navy-700">
            {(["admin", "intern"] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => onRoleChange(r)}
                className={`flex-1 py-2 text-xs font-medium capitalize transition-all duration-200
                  ${
                    role === r
                      ? "bg-gold-500 text-navy-950"
                      : "bg-navy-800 text-slate-400 hover:text-white"
                  }`}
              >
                {r}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-2 px-1">
            {role === "admin" ? "✓ Can delete records" : "⚬ View & edit only"}
          </p>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-navy-950/80 backdrop-blur-sm border-b border-gold-500/10 px-4 lg:px-8 py-4 flex items-center gap-4">
          <button
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="hhfhf"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${role === "admin" ? "bg-gold-400" : "bg-slate-500"} animate-pulse`}
            />
            <span className="text-xs text-slate-400 capitalize">{role}</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
