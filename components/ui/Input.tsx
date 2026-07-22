import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
};

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-[12px] font-sans font-medium uppercase tracking-wider text-zinc-500">
          {label}
        </label>
      )}
      <input
        className={`
          w-full
          px-5
          py-3.5
          bg-zinc-50
          border
          border-zinc-200
          rounded-[4px]
          text-zinc-900
          font-sans
          text-[14px]
          placeholder-zinc-400
          transition-all
          duration-200
          focus:bg-white
          focus:border-zinc-500
          focus:outline-none
          ${className}
        `}
        {...props}
      />
    </div>
  );
}