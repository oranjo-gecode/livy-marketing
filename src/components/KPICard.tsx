import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  className?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm border border-gray-200 ${className}`}>
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-purple-600">{value}</p>
    </div>
  );
};

export default KPICard;
