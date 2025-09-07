import React from 'react';
import { useNavigate, useLocation } from 'react-router';

interface LivyItem {
  id: string;
  name: string;
}

interface SideNavigationProps {
  livys?: LivyItem[];
  onLivySelect?: (livyId: string) => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({ 
  livys = [], 
  onLivySelect 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDashboardClick = () => {
    navigate('/');
  };

  const handleLivyClick = (livyId: string) => {
    if (onLivySelect) {
      onLivySelect(livyId);
    } else {
      navigate(`/livy/${livyId}`);
    }
  };

  const isDashboardActive = location.pathname === '/';

  return (
    <div className="w-64 bg-gray-100 min-h-screen p-6">
      {/* General Section */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
          General
        </h2>
        <button
          onClick={handleDashboardClick}
          className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isDashboardActive 
              ? 'bg-gray-200 text-gray-900' 
              : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
          }`}
        >
          Dashboard
        </button>
      </div>

      {/* Livy's Section */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
          Livy's
        </h2>
        <div className="space-y-1">
          {livys.map((livy) => (
            <button
              key={livy.id}
              onClick={() => handleLivyClick(livy.id)}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
            >
              {livy.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;
