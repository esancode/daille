import React from "react";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
};

export function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
  const styles = {
    primary: "bg-zinc-950 text-white",
    secondary: "bg-zinc-100 text-zinc-800",
    accent: "bg-[#0A1F5C] text-white",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        px-3
        py-1
        rounded-full
        text-[10px]
        font-sans
        font-semibold
        uppercase
        tracking-wider
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}