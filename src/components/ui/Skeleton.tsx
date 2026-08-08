import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return <div className={`animate-pulse bg-slate-100 rounded-xl ${className}`} />;
};
