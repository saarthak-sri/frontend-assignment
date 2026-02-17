export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-surface-muted dark:bg-zinc-700/50 ${className}`}
      aria-hidden
    />
  );
}
