import { SelectHTMLAttributes, forwardRef } from 'react';
import { classNames } from '../../utils/helpers';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-secondary-700 mb-2"
          >
            {label}
            {props.required && <span className="text-error mr-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={classNames(
            'w-full px-4 py-3 border rounded-lg text-base transition-colors duration-200 bg-white',
            'focus:outline-none focus:ring-2',
            error
              ? 'border-error focus:border-error focus:ring-error/20'
              : 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500/20',
            props.disabled && 'bg-secondary-100 cursor-not-allowed',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
