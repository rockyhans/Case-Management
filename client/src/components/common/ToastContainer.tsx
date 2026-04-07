import React from "react";
import Toast, { type ToastType } from "./Toast";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
}) => (
  <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
    {toasts.map((t) => (
      <Toast
        key={t.id}
        message={t.message}
        type={t.type}
        onClose={() => onRemove(t.id)}
      />
    ))}
  </div>
);

export default ToastContainer;
