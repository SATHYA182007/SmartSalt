import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer select-none';

  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200 border border-blue-600',
    secondary: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 shadow-xs',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white border border-red-600 shadow-sm',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.01 }}
      transition={{ duration: 0.15 }}
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </motion.button>
  );
};
