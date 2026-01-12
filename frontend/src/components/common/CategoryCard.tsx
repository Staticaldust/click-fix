import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { classNames } from '../../utils/helpers';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  professionalCount?: number;
  className?: string;
}

export function CategoryCard({
  id,
  name,
  icon: Icon,
  professionalCount,
  className,
}: CategoryCardProps) {
  return (
    <Link
      to={`/search?category=${id}`}
      className={classNames(
        'group flex flex-col items-center p-6 bg-white rounded-xl border border-secondary-200',
        'hover:border-primary-300 hover:shadow-md transition-all duration-200',
        className
      )}
    >
      <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors">
        <Icon className="w-7 h-7 text-primary-600" />
      </div>
      <h3 className="text-base font-medium text-secondary-800 mb-1">{name}</h3>
      {professionalCount !== undefined && (
        <span className="text-sm text-secondary-500">
          {professionalCount} בעלי מקצוע
        </span>
      )}
    </Link>
  );
}
