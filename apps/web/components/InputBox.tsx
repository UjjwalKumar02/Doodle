interface InputBoxProps {
  size: "sm" | "md" | "lg";
  type: string;
  placeholder: string;
  reference?: React.Ref<HTMLInputElement>;
}

export default function InputBox({
  size,
  type,
  placeholder,
  reference,
}: InputBoxProps) {
  const sizeStyles = {
    sm: "w-fit text-xs",
    md: "w-58 py-2 text-sm",
    lg: "w-80 py-2 text-md",
  };

  const defaultStyles =
    "px-2 rounded-lg outline-none border border-gray-200 bg-sky-50 text-gray-800";

  return (
    <input
      ref={reference}
      type={type}
      placeholder={placeholder}
      className={`${defaultStyles} ${sizeStyles[size]}`}
    />
  );
}
