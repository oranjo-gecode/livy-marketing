import React from 'react';

interface LeafIconProps {
  className?: string;
}

const LeafIcon: React.FC<LeafIconProps> = ({ className = '' }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={`w-6 h-6 ${className}`}
      fill="currentColor"
    >
      {/* Main T shape */}
      <path d="M12 2v16M8 2h8" stroke="currentColor" strokeWidth="2" fill="none"/>
      
      {/* Leaf shape on the left arm */}
      <path d="M8 2c0 0 2 1 4 1s4-1 4-1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      
      {/* Small dot above the vertical stem */}
      <circle cx="12" cy="1" r="0.5" fill="currentColor"/>
    </svg>
  );
};

export default LeafIcon;
