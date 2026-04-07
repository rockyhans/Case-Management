import React, { useEffect } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const icons = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

const colors = {
  success: "border-emerald-500/30 bg-emerald-900/20 text-emerald-300",
  error: "border-red-500/30 bg-red-900/20 text-red-300",
  info: "border-gold-500/30 bg-gold-900/10 text-gold-300",
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm shadow-card
        ${colors[type]} animate-slide-in-right text-sm font-medium`}
    >
      <span className="text-base">{icons[type]}</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
        ✕
      </button>
    </div>
  );
};

export default Toast;
