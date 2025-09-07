import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import Header from '../../components/Header';
import SideNavigation from '../../components/SideNavigation';
import KPICard from '../../components/KPICard';
import Table from '../../components/Table';
import Tag from '../../components/Tag';
import { useApi } from '../../hooks/useApi';

interface LivyKPIs {
  totalClaimedStamps: number;
  lastWeekStamps: number;
  mostPopularStamp: {
    name: string;
    count: number;
    gradient: string;
  };
}

interface MapLocation {
  id: string;
  name: string;
  nftsGenerated: number;
  lastWeekNfts: number;
  coordinates: { x: number; y: number };
}

interface Collaborator {
  id: string;
  name: string;
  status: 'activo' | 'en proceso' | 'inactivo';
}

interface LocationRanking {
  id: string;
  name: string;
  nftsGenerated: number;
}

interface BuyerRanking {
  id: string;
  position: number;
  address: string;
  nftsClaimed: number;
  trend?: 'up' | 'down';
}

interface LivyData {
  id: string;
  name: string;
  kpis: LivyKPIs;
  mapLocations: MapLocation[];
  collaborators: Collaborator[];
  locationRanking: LocationRanking[];
  buyerRanking: BuyerRanking[];
  allLivys: Array<{ id: string; name: string }>;
}

const LivyDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading, error, getLivyData } = useApi();
  const [livyData, setLivyData] = useState<LivyData | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchLivyData = useCallback(async () => {
    if (!id) return;
    
    console.log('🔄 Starting to fetch Livy data for:', id);
    try {
      console.log('📡 Fetching Livy data...');
      const data = await getLivyData(id);
      console.log('✅ Livy data fetched:', data);
      
      setLivyData(data);
      setHasLoaded(true);
    } catch (err) {
      console.error('❌ Error fetching Livy data:', err);
      setHasLoaded(true);
    }
  }, [getLivyData, id]);

  useEffect(() => {
    fetchLivyData();
  }, [fetchLivyData]);

  // Reset loading state when ID changes
  useEffect(() => {
    setHasLoaded(false);
    setLivyData(null);
  }, [id]);

  const handleLivySelect = (livyId: string) => {
    console.log('Selected Livy:', livyId);
    navigate(`/dashboard/livy/${livyId}`);
  };

  // Show loading state
  if (loading && !hasLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Livy dashboard...</p>
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
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Livy Dashboard</h2>
          <p className="text-gray-600 mb-4 max-w-md">
            There was an error loading the Livy data. This might be due to a network issue or the mock service not being properly configured.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-sm text-gray-500">Error details: {error}</p>
            <p className="text-sm text-gray-500">Check the browser console for more information.</p>
          </div>
          <button 
            onClick={() => {
              setHasLoaded(false);
              fetchLivyData();
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
  if (livyData) {
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
            livys={livyData.allLivys}
            onLivySelect={handleLivySelect}
            selectedLivyId={id}
          />
          
          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">{livyData.name}</h1>
              <p className="text-gray-600 mt-1">Un vistazo al progreso de tu Livy</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <KPICard
                title="total de sellos reclamados"
                value={livyData.kpis.totalClaimedStamps.toLocaleString()}
              />
              <KPICard
                title="sellos reclamados la última semana"
                value={livyData.kpis.lastWeekStamps.toLocaleString()}
              />
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">sello más popular</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                    <span className="text-white text-lg">🎨</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{livyData.kpis.mostPopularStamp.count}</p>
                    <p className="text-sm text-gray-600">{livyData.kpis.mostPopularStamp.name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">visualización del rendimiento</h3>
              <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
                  {/* Street Names */}
                  <div className="absolute top-4 left-4 text-xs font-medium text-gray-600">Av. 11</div>
                  <div className="absolute top-4 right-4 text-xs font-medium text-gray-600">C. 31</div>
                  <div className="absolute bottom-4 left-4 text-xs font-medium text-gray-600">C. 33</div>
                  
                  {/* Map Locations */}
                  {livyData.mapLocations.map((location) => (
                    <div
                      key={location.id}
                      className="absolute w-4 h-4 bg-purple-600 rounded-full transform -translate-x-2 -translate-y-2"
                      style={{ left: `${location.coordinates.x}%`, top: `${location.coordinates.y}%` }}
                    >
                      {/* Popup Card */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-48 z-10">
                        <h4 className="font-semibold text-gray-900 text-sm">{location.name}</h4>
                        <p className="text-xs text-gray-600">{location.nftsGenerated.toLocaleString()} NFTs generados</p>
                        <p className="text-xs text-gray-600">{location.lastWeekNfts.toLocaleString()} la última semana</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Section - Three Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Collaborator Status */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">estado de los colaboradores</h3>
                <Table
                  columns={[
                    { key: 'name', label: 'nombre de la marca' },
                    { key: 'status', label: 'estado' }
                  ]}
                  data={livyData.collaborators.map(collaborator => ({
                    name: collaborator.name,
                    status: (
                      <Tag 
                        key={collaborator.id}
                        variant={collaborator.status === 'activo' ? 'green' : collaborator.status === 'en proceso' ? 'purple' : 'red'}
                      >
                        {collaborator.status}
                      </Tag>
                    )
                  }))}
                />
              </div>

              {/* Location Ranking */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ranking por ubicación</h3>
                <Table
                  columns={[
                    { key: 'name', label: 'nombre de la marca' },
                    { key: 'nfts', label: 'NFTs generados' }
                  ]}
                  data={livyData.locationRanking.map(location => ({
                    name: location.name,
                    nfts: location.nftsGenerated.toLocaleString()
                  }))}
                />
              </div>

              {/* Buyer Ranking */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ranking por comprador</h3>
                <Table
                  columns={[
                    { key: 'position', label: 'posición' },
                    { key: 'address', label: 'dirección' },
                    { key: 'nfts', label: 'NFTs reclamados' }
                  ]}
                  data={livyData.buyerRanking.map(buyer => ({
                    position: `#${buyer.position}`,
                    address: (
                      <div key={buyer.id} className="flex items-center space-x-2">
                        <span>ID{buyer.address}</span>
                        <span className="text-purple-600">🏴</span>
                        {buyer.trend === 'up' && <span className="text-purple-600">↗</span>}
                        {buyer.trend === 'down' && <span className="text-purple-600">↘</span>}
                      </div>
                    ),
                    nfts: buyer.nftsClaimed.toString()
                  }))}
                />
              </div>
            </div>
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
        <h2 className="text-xl font-semibold text-gray-800 mb-2">No Livy Data Available</h2>
        <p className="text-gray-600 mb-4">
          No Livy data was loaded. Please check your connection and try again.
        </p>
        <button 
          onClick={() => {
            setHasLoaded(false);
            fetchLivyData();
          }} 
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default LivyDashboard;
