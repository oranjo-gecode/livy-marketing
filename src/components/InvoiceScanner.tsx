import React, { useState, useRef, useEffect } from 'react';

interface InvoiceScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (invoiceData: InvoiceData) => void;
}

interface InvoiceData {
  total: number;
  merchant: string;
  date: string;
  points: number;
}

const InvoiceScanner: React.FC<InvoiceScannerProps> = ({ isOpen, onScanSuccess, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setError(null);
      setIsScanning(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions.');
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const handleScan = () => {
    // Simulate invoice scanning for demo purposes
    // In a real app, you would use OCR to extract text from the invoice
    const mockInvoiceData: InvoiceData = {
      total: 25.50,
      merchant: 'Starbucks Coffee',
      date: new Date().toISOString(),
      points: Math.floor(25.50 * 2) // 2 points per dollar
    };
    
    onScanSuccess(mockInvoiceData);
    stopCamera();
  };

  const handleManualEntry = () => {
    setPreviewMode(true);
  };

  const handleManualSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const invoiceData: InvoiceData = {
      total: parseFloat(formData.get('total') as string),
      merchant: formData.get('merchant') as string,
      date: new Date().toISOString(),
      points: Math.floor(parseFloat(formData.get('total') as string) * 2)
    };
    
    onScanSuccess(invoiceData);
    onClose();
  };

  if (!isOpen) return null;

  if (previewMode) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Manual Invoice Entry</h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleManualSubmit} className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Merchant Name
                </label>
                <input
                  type="text"
                  name="merchant"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="e.g., Starbucks Coffee"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Amount ($)
                </label>
                <input
                  type="number"
                  name="total"
                  step="0.01"
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setPreviewMode(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Back to Camera
              </button>
              <button
                type="submit"
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Submit Invoice
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-black text-white p-4 flex items-center justify-between">
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 text-2xl font-bold"
        >
          ×
        </button>
        <h2 className="text-lg font-semibold">Scan Invoice</h2>
        <button
          onClick={handleManualEntry}
          className="text-purple-400 hover:text-purple-300 text-sm font-medium"
        >
          Manual
        </button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />
        
        {/* Scanning Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-48 border-2 border-white rounded-lg relative">
            {/* Corner indicators */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>
            
            {/* Scanning line animation */}
            <div className="absolute top-0 left-0 w-full h-1 bg-green-400 animate-pulse"></div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-20 left-0 right-0 text-center text-white px-4">
          <p className="text-lg font-medium mb-2">Position invoice within the frame</p>
          <p className="text-sm opacity-80">Make sure the total amount is clearly visible</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-black p-6">
        {error ? (
          <div className="text-center">
            <div className="text-red-400 mb-4">{error}</div>
            <button
              onClick={startCamera}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleScan}
              disabled={!isScanning}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isScanning ? 'Scan Invoice' : 'Starting Camera...'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceScanner;
