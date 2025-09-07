import React from 'react';
import KPICard from '../../components/KPICard';

interface KPISectionProps {
  activeLivys: number;
  claimedStamps: number;
}

const KPISection: React.FC<KPISectionProps> = ({ activeLivys, claimedStamps }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <KPICard 
        title="livy's activos" 
        value={activeLivys}
      />
      <KPICard 
        title="sellos reclamados" 
        value={claimedStamps.toLocaleString()}
      />
    </div>
  );
};

export default KPISection;
