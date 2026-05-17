import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'new' | 'discount';
  className?: string;
}

export function Badge({ children, variant = 'info', className = '' }: BadgeProps) {
  const variants = {
    success: 'bg-green-500/20 text-green-400 border-green-500/50',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    error: 'bg-red-500/20 text-red-400 border-red-500/50',
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    new: 'bg-[#0ea5e9]/20 text-[#0ea5e9] border-[#0ea5e9]/50',
    discount: 'bg-[#ec4899]/20 text-[#ec4899] border-[#ec4899]/50',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs border backdrop-blur-sm ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
