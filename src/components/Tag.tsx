import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: 'purple' | 'gray' | 'green' | 'red';
  size?: 'sm' | 'md';
  className?: string;
}

const Tag: React.FC<TagProps> = ({ children, variant = 'purple', size = 'sm', className = '' }) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium';
  
  const variantClasses = {
    purple: 'bg-purple-100 text-purple-800',
    gray: 'bg-gray-100 text-gray-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800'
  };
  
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Tag;
