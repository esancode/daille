type InputProps = {
  label: string;
  placeholder?: string;
};

export function Input({ label, placeholder }: InputProps) {
  return (
    <div>
      <label>{label}</label>

      <input
        placeholder={placeholder}
      />
    </div>
  );
}