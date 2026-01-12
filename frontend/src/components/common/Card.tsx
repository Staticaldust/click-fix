import { ReactNode } from 'react';
import { classNames } from '../../utils/helpers';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  className,
  padding = 'md',
  hover = false,
  onClick,
}: CardProps) {
  return (
    <div
      className={classNames(
        'bg-white border border-secondary-200 rounded-xl shadow-sm',
        paddingStyles[padding],
        hover && 'transition-shadow hover:shadow-md cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-secondary-800">{title}</h3>
        {subtitle && (
          <p className="text-sm text-secondary-500 mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
