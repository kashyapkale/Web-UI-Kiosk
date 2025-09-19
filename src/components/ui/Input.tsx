import React, { forwardRef } from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  fullWidth = false,
  icon,
  className = '',
  ...props
}, ref) => {
  const inputClasses = `
      px-4 py-3 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'}
      focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
      bg-white text-gray-900 placeholder-gray-400
      transition duration-200
      ${fullWidth ? 'w-full' : ''}
      ${icon ? 'pl-10' : ''}
      ${className}
    `;
  return <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && <label className="block text-gray-700 font-medium mb-1.5">
            {label}
          </label>}
        <div className="relative">
          {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>}
          <input ref={ref} className={inputClasses} {...props} />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>;
});
Input.displayName = 'Input';