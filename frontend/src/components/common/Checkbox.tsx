import { InputHTMLAttributes, forwardRef } from 'react';
import { classNames } from '../../utils/helpers';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const checkboxId = id || props.name;

    return (
      <div className="w-full">
        <div className="flex items-start gap-3">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={classNames(
              'mt-1 w-5 h-5 rounded border-secondary-300 text-primary-500',
              'focus:ring-2 focus:ring-primary-500/20',
              error && 'border-error',
              props.disabled && 'bg-secondary-100 cursor-not-allowed',
              className
            )}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className={classNames(
                'text-sm text-secondary-700 cursor-pointer',
                props.disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
