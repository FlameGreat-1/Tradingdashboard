
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm text-text-secondary mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`search-input ${icon ? 'pl-10' : ''} ${error ? 'border-error' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-error mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;