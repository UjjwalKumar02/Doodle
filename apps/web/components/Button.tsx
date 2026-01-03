"use client";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  name: string;
  onClick: () => void;
  fullWidth?: boolean;
  className?: string;
  loading?: boolean;
}

export const Button = ({
  variant,
  size,
  name,
  onClick,
  fullWidth,
  className,
  loading,
}: ButtonProps) => {
  const variantStyles = {
    primary: "bg-sky-500 text-white",
    secondary: "bg-black text-gray-100",
  };

  const sizeStyles = {
    sm: "px-3 py-1",
    md: "px-5 py-1.5",
    lg: "px-7 py-2",
  };

  const defaultStyles = "rounded-lg cursor-pointer";

  return (
    <button
      className={`${defaultStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""}  ${className}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "loading..." : name}
    </button>
  );
};
