import React from 'react';
import Badge from './Badge';

interface BadgeSectionProps {
  title: string;
  description: string;
  badges: Array<{
    gradient: 'orange-purple' | 'brown' | 'red';
    size?: 'small' | 'large';
  }>;
  className?: string;
}

const BadgeSection: React.FC<BadgeSectionProps> = ({ 
  title, 
  description, 
  badges, 
  className = '' 
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="font-bold text-black text-lg mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-3">{description}</p>
      <div className="flex gap-3">
        {badges.map((badge, index) => (
          <Badge
            key={index}
            gradient={badge.gradient}
            size={badge.size || 'small'}
          />
        ))}
      </div>
    </div>
  );
};

export default BadgeSection;
