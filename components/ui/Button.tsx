import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const styles = {
    primary: "bg-zinc-950 text-white border border-transparent hover:bg-zinc-900 active:bg-zinc-800",
    secondary: "bg-white text-zinc-900 border border-zinc-300 hover:bg-zinc-50 active:bg-zinc-100",
    ghost: "bg-transparent text-zinc-800 hover:bg-zinc-50 active:bg-zinc-100",
  };

  return (
    <button
      className={`
        ${styles[variant]}
        px-8
        py-3.5
        rounded-[4px]
        font-sans
        text-[14px]
        font-semibold
        tracking-wider
        uppercase
        transition-all
        duration-200
        focus:outline-none
        disabled:opacity-50
        disabled:cursor-not-allowed
        cursor-pointer
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}