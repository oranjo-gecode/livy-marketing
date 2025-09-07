import React from 'react';
import Table from '../../components/Table';
import Button from '../../components/Button';

interface Buyer {
  id: string;
  position: number;
  address: string;
  location: string;
  nftsClaimed: number;
  trend?: 'up' | 'down';
}

interface BuyerRankingTableProps {
  buyers: Buyer[];
  onDownloadCSV?: () => void;
}

const BuyerRankingTable: React.FC<BuyerRankingTableProps> = ({ buyers, onDownloadCSV }) => {
  const columns = [
    { key: 'position', label: 'posición' },
    { key: 'address', label: 'dirección' },
    { key: 'location', label: 'ubicación' },
    { key: 'nftsClaimed', label: 'NFTs reclamados' }
  ];

  const data = buyers.map(buyer => ({
    position: `#${buyer.position}`,
    address: buyer.address,
    location: buyer.location,
    nftsClaimed: (
      <div className="flex items-center">
        <span>{buyer.nftsClaimed}</span>
        {buyer.trend && (
          <svg 
            className={`w-4 h-4 ml-1 ${buyer.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {buyer.trend === 'up' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            )}
          </svg>
        )}
      </div>
    )
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">ranking de los compradores</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onDownloadCSV}
        >
          Descargar CSV
        </Button>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default BuyerRankingTable;
