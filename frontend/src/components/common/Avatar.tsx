import { User } from 'lucide-react';
import { classNames } from '../../utils/helpers';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-7 h-7',
  xl: 'w-10 h-10',
};

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function Avatar({ src, alt, name, size = 'md', className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={classNames(
          'rounded-full object-cover',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  if (name) {
    return (
      <div
        className={classNames(
          'rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium',
          sizeClasses[size],
          className
        )}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div
      className={classNames(
        'rounded-full bg-secondary-200 text-secondary-500 flex items-center justify-center',
        sizeClasses[size],
        className
      )}
    >
      <User className={iconSizeClasses[size]} />
    </div>
  );
}
