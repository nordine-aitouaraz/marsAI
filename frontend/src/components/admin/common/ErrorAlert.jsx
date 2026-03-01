export default function ErrorAlert({ message, className = '' }) {
  if (!message) return null;
  return (
    <p
      className={`rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200 ${className}`}
    >
      {message}
    </p>
  );
}
