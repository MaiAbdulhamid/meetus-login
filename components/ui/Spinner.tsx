interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export function Spinner({
  size = "md",
  className = "",
}: Readonly<SpinnerProps>) {
  return (
    <output
      className={`
        block
        ${sizeClasses[size]}
        border-2 border-white/30 border-t-white
        rounded-full animate-spin
        ${className}
      `}
      aria-label="Loading"
    />
  );
}
