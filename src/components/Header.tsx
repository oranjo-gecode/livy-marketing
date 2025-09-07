import React from 'react';

interface HeaderProps {
  userName: string;
  businessName: string;
  userInitials: string;
}

const Header: React.FC<HeaderProps> = ({ userName, businessName, userInitials }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-600">Livy.</div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{userName}</div>
            <div className="text-xs text-gray-500">{businessName}</div>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm">{userInitials}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
