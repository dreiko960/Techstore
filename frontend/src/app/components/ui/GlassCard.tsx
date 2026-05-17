import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <motion.div
      className={`backdrop-blur-md bg-[rgba(30,41,59,0.3)] border border-[rgba(59,130,246,0.3)] rounded-xl ${className}`}
      whileHover={hover ? { scale: 1.02, borderColor: 'rgba(59,130,246,0.6)' } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
