import React from 'react';

interface Prize {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  imageUrl?: string;
  isAvailable: boolean;
  category: 'discount' | 'freebie' | 'experience' | 'merchandise';
}

interface PrizesModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPoints: number;
  prizes: Prize[];
  availablePrizes: number;
}

const PrizesModal: React.FC<PrizesModalProps> = ({ isOpen, onClose, totalPoints, prizes, availablePrizes }) => {
  console.log('PrizesModal props:', { isOpen, totalPoints, prizes, availablePrizes });
  
  const getPrizeIcon = (category: string) => {
    switch (category) {
      case 'discount':
        return '💳';
      case 'freebie':
        return '🎁';
      case 'experience':
        return '🎫';
      case 'merchandise':
        return '👕';
      default:
        return '🎁';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Prizes & Rewards</h2>
              <p className="text-purple-100 text-sm">
                Your Points: {totalPoints} • {availablePrizes} Available
              </p>
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
            {prizes.length > 0 ? (
              prizes.map((prize) => (
                <div
                  key={prize.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    prize.isAvailable
                      ? totalPoints >= prize.pointsRequired
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                      : 'border-gray-200 bg-gray-100 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">
                      {prize.imageUrl ? (
                        <img src={prize.imageUrl} alt={prize.name} className="w-8 h-8 object-cover rounded" />
                      ) : (
                        getPrizeIcon(prize.category)
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{prize.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">⭐</span>
                          <span className="font-bold text-purple-600">{prize.pointsRequired}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{prize.description}</p>
                      
                      {prize.isAvailable ? (
                        totalPoints >= prize.pointsRequired ? (
                          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                            Redeem Now
                          </button>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Need {prize.pointsRequired - totalPoints} more points
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
              ))
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Prizes Available</h3>
                <p className="text-gray-600">Check back later for new prizes and rewards!</p>
              </div>
            )}
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
