import React, { InputHTMLAttributes, forwardRef } from 'react';

interface AppTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const AppTextField = forwardRef<HTMLInputElement, AppTextFieldProps>(
  ({ label, error, leftIcon, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              block w-full rounded-lg border 
              ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}
              ${leftIcon ? 'pl-10' : 'pl-4'}
              ${rightIcon ? 'pr-10' : 'pr-4'}
              py-3 text-gray-900 placeholder-gray-400 shadow-sm sm:text-sm
              transition-colors
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

AppTextField.displayName = 'AppTextField';

export default AppTextField;
