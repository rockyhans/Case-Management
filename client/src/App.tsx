import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import CaseDetails from "./pages/CaseDetails";
import type { UserRole } from "./types";

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(
    (localStorage.getItem("userRole") as UserRole) || "intern",
  );

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem("userRole", newRole);
  };

  return (
    <BrowserRouter>
      <MainLayout role={role} onRoleChange={handleRoleChange}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cases" element={<Cases role={role} />} />
          <Route path="/cases/:id" element={<CaseDetails role={role} />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
