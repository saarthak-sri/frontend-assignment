import { forwardRef } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', padding = 'md', children, ...props }, ref) => {
    const base =
      'rounded-2xl bg-surface-elevated transition-all duration-200 ' +
      (variant === 'bordered'
        ? 'border-2 border-border shadow-none'
        : 'border border-border shadow-card hover:shadow-card-hover');
    const pad =
      padding === 'none'
        ? 'p-0'
        : padding === 'sm'
          ? 'p-4'
          : padding === 'lg'
            ? 'p-8'
            : 'p-6';
    return (
      <div ref={ref} className={`${base} ${pad} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export function CardHeader({
  title,
  subtitle,
  action,
  className = '',
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-start justify-between gap-3 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-stone-900 dark:text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 text-sm text-muted">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mt-4 border-t border-border pt-4 ${className}`}>
      {children}
    </div>
  );
}
