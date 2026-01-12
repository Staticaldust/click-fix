import { InputHTMLAttributes, forwardRef } from 'react';
import { classNames } from '../../utils/helpers';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-secondary-700 mb-2"
          >
            {label}
            {props.required && <span className="text-error mr-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={classNames(
            'w-full px-4 py-3 border rounded-lg text-base transition-colors duration-200',
            'focus:outline-none focus:ring-2',
            error
              ? 'border-error focus:border-error focus:ring-error/20'
              : 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500/20',
            props.disabled && 'bg-secondary-100 cursor-not-allowed',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
