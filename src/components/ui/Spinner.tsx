// Spinner effect on button click to sign guestbook
interface SpinnerProps {
  size?: number;
  color?: string;
}

export default function Spinner({
  size = 32,
  color = "currentColor",
}: SpinnerProps) {
  const sizeClass = `w-[${size}px] h-[${size}px]`;

  return (
    <div
      className={`spinner inline-block animate-spin rounded-full border-4 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${sizeClass}`}
      style={
        {
          "--spinner-color": color,
          "--spinner-border-right": "transparent",
        } as React.CSSProperties
      }
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
