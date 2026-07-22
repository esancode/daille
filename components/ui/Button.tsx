type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  children,
  variant = "primary",
}: ButtonProps) {

  const styles = {
    primary:
      "bg-blue-700 text-white",

    secondary:
      "border border-gray-400 text-white",

    ghost:
      "text-white",
  };

  return (
    <button
      className={`
        ${styles[variant]}
        px-6
        py-3
        rounded-xl
        transition
        duration-300
      `}
    >
      {children}
    </button>
  );
}