import React from 'react';

interface Prize {
  id: string;
  name: string;
  description: string;
  cost: number;
  image: string;
  available: boolean;
}

interface PrizesModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPoints: number;
}

const PrizesModal: React.FC<PrizesModalProps> = ({ isOpen, onClose, totalPoints }) => {
  const prizes: Prize[] = [
    {
      id: '1',
      name: 'Free Coffee',
      description: 'Any size coffee at participating locations',
      cost: 50,
      image: '☕',
      available: true,
    },
    {
      id: '2',
      name: 'Museum Pass',
      description: 'Free entry to all participating museums',
      cost: 100,
      image: '🏛️',
      available: true,
    },
    {
      id: '3',
      name: 'Tech Conference Ticket',
      description: 'VIP access to tech meetups and conferences',
      cost: 200,
      image: '🎫',
      available: true,
    },
    {
      id: '4',
      name: 'Gift Card $25',
      description: 'Redeemable at partner stores',
      cost: 250,
      image: '💳',
      available: true,
    },
    {
      id: '5',
      name: 'Exclusive Merchandise',
      description: 'Limited edition Livy branded items',
      cost: 300,
      image: '🎁',
      available: false,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Prizes & Rewards</h2>
              <p className="text-purple-100 text-sm">Your Points: {totalPoints}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Prizes List */}
        <div className="max-h-96 overflow-y-auto p-4">
          <div className="space-y-4">
            {prizes.map((prize) => (
              <div
                key={prize.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  prize.available
                    ? totalPoints >= prize.cost
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                    : 'border-gray-200 bg-gray-100 opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{prize.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{prize.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">⭐</span>
                        <span className="font-bold text-purple-600">{prize.cost}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{prize.description}</p>
                    
                    {prize.available ? (
                      totalPoints >= prize.cost ? (
                        <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                          Redeem Now
                        </button>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Need {prize.cost - totalPoints} more points
                          </span>
                          <button
                            disabled
                            className="bg-gray-300 text-gray-500 py-2 px-4 rounded-lg font-medium cursor-not-allowed"
                          >
                            Not Enough Points
                          </button>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Coming Soon</span>
                        <button
                          disabled
                          className="bg-gray-300 text-gray-500 py-2 px-4 rounded-lg font-medium cursor-not-allowed"
                        >
                          Unavailable
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Earn more points by completing campaigns and earning badges!
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-purple-600">
              <span>⭐</span>
              <span>1 Badge = 10 Points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizesModal;
