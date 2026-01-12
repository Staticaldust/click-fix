import { Loader2 } from 'lucide-react';
import { classNames } from '../../utils/helpers';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function Loader({ size = 'md', text, fullScreen = false }: LoaderProps) {
  const loader = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2
        className={classNames(
          'animate-spin text-primary-500',
          sizeStyles[size]
        )}
      />
      {text && (
        <p className="text-secondary-600 text-sm">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
        {loader}
      </div>
    );
  }

  return loader;
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader size="lg" text="טוען..." />
    </div>
  );
}
