import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      whileHover={hoverable ? { y: -2, transition: { duration: 0.15 } } : undefined}
      className={`bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs transition-shadow hover:shadow-md ${
        hoverable ? 'cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
