import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export function NeonButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  icon,
  disabled = false,
  type = 'button',
}: NeonButtonProps) {
  const variants = {
    primary: 'bg-[#0ea5e9] hover:bg-[#0284c7] text-white shadow-[0_0_20px_rgba(14,165,233,0.5)] hover:shadow-[0_0_30px_rgba(14,165,233,0.8)]',
    secondary: 'bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]',
    outline: 'bg-transparent border-2 border-[#0ea5e9] text-[#0ea5e9] hover:bg-[rgba(14,165,233,0.1)] hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}
