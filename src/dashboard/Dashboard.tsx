import React from 'react';
import Header from '../components/Header';
import SideNavigation from '../components/SideNavigation';
import KPISection from './containers/KPISection';
import LivyStatusTable from './containers/LivyStatusTable';
import StampsChart from './containers/StampsChart';
import BuyerRankingTable from './containers/BuyerRankingTable';

// Mock data - in a real app, this would come from an API
const mockData = {
  kpis: {
    activeLivys: 3,
    claimedStamps: 13075
  },
  livys: [
    {
      id: '1',
      name: 'Sip & Paint vol.2',
      status: 'activo' as const,
      collaborators: ['Bacano Escalante', 'Jogo'],
      startDate: '2024-01-15',
      endDate: '2024-02-15'
    },
    {
      id: '2', 
      name: 'Sip & Paint vol.1',
      status: 'inactivo' as const,
      collaborators: ['Rosti Spoon'],
      startDate: '2023-12-01',
      endDate: '2023-12-31'
    },
    {
      id: '3',
      name: 'Summer Pass',
      status: 'activo' as const,
      collaborators: ['Bacano Escalante', 'Jogo', 'Rosti Spoon'],
      startDate: '2024-01-01',
      endDate: '2024-03-31'
    },
    {
      id: '4',
      name: 'Hola Navidad!',
      status: 'finalizado' as const,
      collaborators: ['Bacano Escalante'],
      startDate: '2023-12-01',
      endDate: '2023-12-25'
    }
  ],
  chartData: [
    { month: 'jul', livy1: 1200, livy2: 800, livy3: 600 },
    { month: 'ago', livy1: 1400, livy2: 900, livy3: 700 },
    { month: 'set', livy1: 1600, livy2: 1100, livy3: 800 },
    { month: 'oct', livy1: 1800, livy2: 1300, livy3: 900 }
  ],
  buyers: [
    { id: '1', position: 1, address: 'ID123', location: 'Restaurante 12/0', nftsClaimed: 98, trend: 'up' as const },
    { id: '2', position: 2, address: 'ID124', location: 'Plaza del sol', nftsClaimed: 94, trend: 'down' as const },
    { id: '3', position: 3, address: 'ID125', location: 'Galería x', nftsClaimed: 91, trend: 'up' as const },
    { id: '4', position: 4, address: 'ID126', location: 'Restaurante 12/0', nftsClaimed: 87 },
    { id: '5', position: 5, address: 'ID127', location: 'Plaza del sol', nftsClaimed: 82, trend: 'up' as const },
    { id: '6', position: 6, address: 'ID128', location: 'Galería x', nftsClaimed: 78 },
    { id: '7', position: 7, address: 'ID129', location: 'Restaurante 12/0', nftsClaimed: 75, trend: 'down' as const },
    { id: '8', position: 8, address: 'ID130', location: 'Plaza del sol', nftsClaimed: 72 },
    { id: '9', position: 9, address: 'ID131', location: 'Galería x', nftsClaimed: 69, trend: 'up' as const },
    { id: '10', position: 10, address: 'ID132', location: 'Restaurante 12/0', nftsClaimed: 65 }
  ]
};

const Dashboard: React.FC = () => {
  const handleLivySelect = (livyId: string) => {
    console.log('Selected Livy:', livyId);
    // Navigate to individual Livy page
  };

  const handleDownloadCSV = () => {
    console.log('Downloading CSV...');
    // Implement CSV download functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        userName="Maria Perez"
        businessName="Restaurante 12/0."
        userInitials="MP"
      />
      
      <div className="flex">
        {/* Side Navigation */}
        <SideNavigation 
          livys={mockData.livys.map(livy => ({ id: livy.id, name: livy.name }))}
          onLivySelect={handleLivySelect}
        />
        
        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Resumen de Restaurante 12/0</h1>
            <p className="text-gray-600 mt-1">Un vistazo global de tu rendimiento</p>
          </div>

          {/* KPI Cards */}
          <KPISection 
            activeLivys={mockData.kpis.activeLivys}
            claimedStamps={mockData.kpis.claimedStamps}
          />

          {/* Livy Status Table */}
          <LivyStatusTable livys={mockData.livys} />

          {/* Stamps Chart */}
          <StampsChart data={mockData.chartData} />

          {/* Buyer Ranking Table */}
          <BuyerRankingTable 
            buyers={mockData.buyers}
            onDownloadCSV={handleDownloadCSV}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
