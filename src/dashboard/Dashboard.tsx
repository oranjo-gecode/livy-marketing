import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';
import SideNavigation from '../components/SideNavigation';
import KPISection from './containers/KPISection';
import LivyStatusTable from './containers/LivyStatusTable';
import StampsChart from './containers/StampsChart';
import BuyerRankingTable from './containers/BuyerRankingTable';
import { useApi } from '../hooks/useApi';

interface DashboardKPIs {
  activeLivys: number;
  claimedStamps: number;
}

interface LivyStatus {
  id: string;
  name: string;
  status: 'activo' | 'inactivo' | 'finalizado';
  collaborators: string[];
  startDate: string;
  endDate: string;
}

interface StampsData {
  month: string;
  livy1: number;
  livy2: number;
  livy3: number;
}

interface Buyer {
  id: string;
  position: number;
  address: string;
  location: string;
  nftsClaimed: number;
  trend?: 'up' | 'down';
}

interface DashboardData {
  kpis: DashboardKPIs;
  livys: LivyStatus[];
  chartData: StampsData[];
  buyers: Buyer[];
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, getDashboardData } = useApi();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    if (hasLoaded) return; // Prevent multiple fetches
    
    console.log('🔄 Starting to fetch dashboard data...');
    try {
      console.log('📡 Fetching dashboard data...');
      const data = await getDashboardData();
      console.log('✅ Dashboard data fetched:', data);
      
      setDashboardData(data);
      setHasLoaded(true);
    } catch (err) {
      console.error('❌ Error fetching dashboard data:', err);
      setHasLoaded(true); // Mark as loaded even on error
    }
  }, [getDashboardData, hasLoaded]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleLivySelect = (livyId: string) => {
    console.log('Selected Livy:', livyId);
    navigate(`/dashboard/livy/${livyId}`);
  };

  const handleDownloadCSV = () => {
    console.log('Downloading CSV...');
    // Implement CSV download functionality
  };

  // Show loading state
  if (loading && !hasLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !hasLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Dashboard</h2>
          <p className="text-gray-600 mb-4 max-w-md">
            There was an error loading the dashboard data. This might be due to a network issue or the mock service not being properly configured.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-sm text-gray-500">Error details: {error}</p>
            <p className="text-sm text-gray-500">Check the browser console for more information.</p>
          </div>
          <button 
            onClick={() => {
              setHasLoaded(false);
              fetchDashboardData();
            }} 
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show content when data is loaded
  if (dashboardData) {
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
            livys={dashboardData.livys.map((livy: LivyStatus) => ({ id: livy.id, name: livy.name }))}
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
              activeLivys={dashboardData.kpis.activeLivys}
              claimedStamps={dashboardData.kpis.claimedStamps}
            />

            {/* Livy Status Table */}
            <LivyStatusTable livys={dashboardData.livys} />

            {/* Stamps Chart */}
            <StampsChart data={dashboardData.chartData} />

            {/* Buyer Ranking Table */}
            <BuyerRankingTable 
              buyers={dashboardData.buyers}
              onDownloadCSV={handleDownloadCSV}
            />
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no data loaded
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-400 text-6xl mb-4">📊</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">No Dashboard Data Available</h2>
        <p className="text-gray-600 mb-4">
          No dashboard data was loaded. Please check your connection and try again.
        </p>
        <button 
          onClick={() => {
            setHasLoaded(false);
            fetchDashboardData();
          }} 
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
