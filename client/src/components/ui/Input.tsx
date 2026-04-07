import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-navy-800 border ${
          error ? "border-red-700" : "border-navy-600"
        } text-slate-200 rounded-lg px-3 py-2.5 text-sm placeholder:text-slate-600
          focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 
          transition-all duration-200 ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default Input;
