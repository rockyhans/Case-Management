import React, { useState } from "react";
import { useCases } from "../hooks/useCases";
import { casesApi } from "../api/cases";
import type { ICase, UserRole } from "../types";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import CaseCard from "../components/cases/CaseCard";
import CaseForm from "../components/cases/CaseForm";
import CaseFiltersPanel from "../components/cases/CaseFilters";
// import ConfirmDialog from "../components/common/ConfirmDialog";
import EmptyState from "../components/common/EmptyState";
import ToastContainer from "../components/common/ToastContainer";
import { SkeletonCard } from "../components/ui/Skeleton";
import { useToast } from "../hooks/useToast";
import type { CaseFilters } from "../api/cases";

interface CasesPageProps {
  role: UserRole;
}

const Cases: React.FC<CasesPageProps> = ({ role }) => {
  const { cases, loading, error, refetch } = useCases();
  const { toasts, addToast, removeToast } = useToast();
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [editCase, setEditCase] = useState<ICase | null>(null);
  const [deleteCase, setDeleteCase] = useState<ICase | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleFilter = (filters: CaseFilters) => {
    refetch(filters);
  };

  const handleCreate = async (data: any) => {
    try {
      setFormLoading(true);
      await casesApi.create(data);
      addToast("Case created successfully", "success");
      setCreateOpen(false);
      refetch();
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (data: any) => {
    if (!editCase) return;
    try {
      setFormLoading(true);
      await casesApi.update(editCase._id, data);
      addToast("Case updated successfully", "success");
      setEditCase(null);
      refetch();
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteCase) return;
    try {
      setDeleteLoading(true);
      await casesApi.delete(deleteCase._id);
      addToast("Case and tasks deleted", "success");
      setDeleteCase(null);
      refetch();
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Cases"
        subtitle={`${cases.length} case${cases.length !== 1 ? "s" : ""} total`}
        action={<Button onClick={() => setCreateOpen(true)}>+ New Case</Button>}
      />

      <CaseFiltersPanel onFilter={handleFilter} />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-800/40 rounded-xl p-4 text-red-400 text-sm">
          {error}
        </div>
      ) : cases.length === 0 ? (
        <EmptyState
          title="No cases found"
          description="Create your first case or adjust the filters."
          action={
            <Button onClick={() => setCreateOpen(true)}>+ New Case</Button>
          }
          icon="⚖"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {cases.map((c, i) => (
            <CaseCard
              key={c._id}
              caseData={c}
              role={role}
              index={i}
              onEdit={setEditCase}
              onDelete={setDeleteCase}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setCreateOpen(false)}
        title="New Case"
        size="lg"
      >
        <CaseForm
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
          loading={formLoading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editCase}
        onClose={() => setEditCase(null)}
        title="Edit Case"
        size="lg"
      >
        {editCase && (
          <CaseForm
            initial={editCase}
            onSubmit={handleUpdate}
            onCancel={() => setEditCase(null)}
            loading={formLoading}
          />
        )}
      </Modal>

      {/* Delete confirm */}
      {/* <ConfirmDialog
        isOpen={!!deleteCase}
        onClose={() => setDeleteCase(null)}
        onConfirm={handleDelete}
        title="Delete Case"
        message={`Are you sure you want to delete "${deleteCase?.caseTitle}"? This will also delete all associated tasks.`}
        loading={deleteLoading}
      /> */}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default Cases;
