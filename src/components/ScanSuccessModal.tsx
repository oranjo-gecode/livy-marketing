import React from 'react';

interface ScanSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'qr' | 'invoice';
  data: any;
  pointsEarned: number;
  onViewBadge?: () => void;
}

const ScanSuccessModal: React.FC<ScanSuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  type, 
  data, 
  pointsEarned,
  onViewBadge 
}) => {
  if (!isOpen) return null;

  const isQR = type === 'qr';
  const isInvoice = type === 'invoice';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className={`${isQR ? 'bg-purple-600' : 'bg-green-600'} text-white p-4`}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {isQR ? 'Badge Earned!' : 'Points Added!'}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className={`w-20 h-20 mx-auto rounded-full ${isQR ? 'bg-purple-100' : 'bg-green-100'} flex items-center justify-center mb-4`}>
              <div className="text-4xl">
                {isQR ? '🎯' : '💰'}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {isQR ? 'Congratulations!' : 'Great Purchase!'}
            </h3>
            
            <p className="text-gray-600">
              {isQR 
                ? 'You\'ve successfully earned a new badge!' 
                : 'Your invoice has been processed and points added!'
              }
            </p>
          </div>

          {/* Details */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            {isQR && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Campaign:</span>
                  <span className="font-medium">{data?.campaign || 'Tech Meetups'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Badge Type:</span>
                  <span className="font-medium">{data?.badgeType || 'Participation'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Points Earned:</span>
                  <span className="font-bold text-purple-600">+{pointsEarned}</span>
                </div>
              </div>
            )}

            {isInvoice && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Merchant:</span>
                  <span className="font-medium">{data?.merchant || 'Unknown Store'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">${data?.total?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Points Earned:</span>
                  <span className="font-bold text-green-600">+{pointsEarned}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rate:</span>
                  <span className="text-sm text-gray-500">$1 = 2 points</span>
                </div>
              </div>
            )}
          </div>

          {/* Points Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="text-2xl">⭐</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">+{pointsEarned}</div>
                <div className="text-sm text-gray-600">Points Added to Your Account</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {isQR && onViewBadge && (
              <button
                onClick={onViewBadge}
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
              >
                View Badge Details
              </button>
            )}
            
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanSuccessModal;
