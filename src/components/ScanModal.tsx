import React from 'react';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQRScan: () => void;
  onInvoiceScan: () => void;
}

const ScanModal: React.FC<ScanModalProps> = ({ isOpen, onClose, onQRScan, onInvoiceScan }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Earn Points</h2>
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
          <p className="text-gray-600 text-center mb-6">
            Choose how you want to earn points and badges
          </p>

          <div className="space-y-4">
            {/* QR Code Option */}
            <button
              onClick={onQRScan}
              className="w-full p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200 hover:border-purple-300 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <div className="text-2xl">📱</div>
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Scan QR Code
                  </h3>
                  <p className="text-sm text-gray-600">
                    Scan a QR code to earn a specific badge
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      +1 Badge
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      +10 Points
                    </span>
                  </div>
                </div>
                <div className="text-purple-400 text-xl">→</div>
              </div>
            </button>

            {/* Invoice Option */}
            <button
              onClick={onInvoiceScan}
              className="w-full p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:border-green-300 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <div className="text-2xl">🧾</div>
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Scan Invoice
                  </h3>
                  <p className="text-sm text-gray-600">
                    Scan your receipt to earn points based on amount
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      $1 = 2 Points
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Auto Calculate
                    </span>
                  </div>
                </div>
                <div className="text-green-400 text-xl">→</div>
              </div>
            </button>
          </div>

          {/* Info Section */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 text-xl">💡</div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">How it works</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• QR codes give you specific campaign badges</li>
                  <li>• Invoices earn points based on your purchase amount</li>
                  <li>• Use points to redeem rewards in the prizes section</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanModal;
