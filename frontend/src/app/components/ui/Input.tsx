import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full px-4 ${icon ? 'pl-10' : ''} py-3 bg-[rgba(30,41,59,0.5)] border border-[rgba(59,130,246,0.3)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#0ea5e9] focus:shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
