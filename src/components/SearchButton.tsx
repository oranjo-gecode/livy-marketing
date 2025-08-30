import React from 'react';

interface SearchButtonProps {
  onClick?: () => void;
  className?: string;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gray-700 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200 ${className}`}
    >
      Search Livys
    </button>
  );
};

export default SearchButton;
