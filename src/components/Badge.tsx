import React from 'react';

interface BadgeProps {
  size?: 'small' | 'large';
  gradient?: 'orange-purple' | 'brown' | 'red';
  icon?: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  size = 'small', 
  gradient = 'orange-purple',
  icon,
  className = ''
}) => {
  const getGradientClass = () => {
    switch (gradient) {
      case 'orange-purple':
        return 'bg-gradient-to-r from-orange-400 to-purple-500';
      case 'brown':
        return 'bg-gradient-to-r from-amber-700 to-orange-600';
      case 'red':
        return 'bg-gradient-to-r from-red-400 to-red-600';
      default:
        return 'bg-gradient-to-r from-orange-400 to-purple-500';
    }
  };

  const getSizeClass = () => {
    return size === 'large' ? 'w-24 h-24' : 'w-12 h-12';
  };

  return (
    <div 
      className={`rounded-full ${getGradientClass()} ${getSizeClass()} flex items-center justify-center ${className}`}
    >
      {icon && (
        <div className="text-white">
          {icon}
        </div>
      )}
    </div>
  );
};

export default Badge;
