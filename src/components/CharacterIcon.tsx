import React from 'react';

interface CharacterIconProps {
  className?: string;
}

const CharacterIcon: React.FC<CharacterIconProps> = ({ className = '' }) => {
  return (
    <div className={`w-8 h-8 bg-green-300 rounded-full flex items-center justify-center ${className}`}>
      <div className="w-4 h-4 bg-green-400 rounded-full"></div>
    </div>
  );
};

export default CharacterIcon;
