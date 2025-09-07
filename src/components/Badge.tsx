import React from 'react';
import livyLogo from '../assets/livy_logo.svg';

interface BadgeProps {
  size?: 'small' | 'large';
  gradient?: 'orange-purple' | 'brown' | 'red' | 'white';
  icon?: React.ReactNode;
  iconColor?: 'white' | 'black' | 'gradient' | 'purple' | 'blue' | 'green' | 'red' | 'orange';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  size = 'small', 
  gradient = 'orange-purple',
  icon,
  iconColor = 'white',
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
      case 'white':
        return 'bg-white';
      default:
        return 'bg-gradient-to-r from-orange-400 to-purple-500';
    }
  };

  const getSizeClass = () => {
    return size === 'large' ? 'w-24 h-24' : 'w-12 h-12';
  };

  const getIconSizeClass = () => {
    return size === 'large' ? 'w-12 h-12' : 'w-6 h-6';
  };

  const getIconColorClass = () => {
    switch (iconColor) {
      case 'white':
        return 'brightness-0 invert';
      case 'black':
        return 'brightness-0';
      case 'gradient':
        return 'brightness-0 saturate-100';
      case 'purple':
        return 'brightness-0 saturate-100 hue-rotate-[280deg]';
      case 'blue':
        return 'brightness-0 saturate-100 hue-rotate-[240deg]';
      case 'green':
        return 'brightness-0 saturate-100 hue-rotate-[120deg]';
      case 'red':
        return 'brightness-0 saturate-100 hue-rotate-[0deg]';
      case 'orange':
        return 'brightness-0 saturate-100 hue-rotate-[30deg]';
      default:
        return 'brightness-0 invert';
    }
  };

  const getIconStyle = () => {
    if (iconColor === 'purple') {
      return {
        filter: 'brightness(0) saturate(100%) hue-rotate(280deg)',
      };
    }
    return {};
  };

  return (
    <div 
      className={`rounded-full ${getGradientClass()} ${getSizeClass()} flex items-center justify-center ${className}`}
    >
      {icon ? (
        <div className={`${getIconColorClass()}`} style={getIconStyle()}>
          {icon}
        </div>
      ) : (
        <img 
          src={livyLogo} 
          alt="Livy Logo" 
          className={`${getIconSizeClass()} ${getIconColorClass()}`}
          style={getIconStyle()}
        />
      )}
    </div>
  );
};

export default Badge;
