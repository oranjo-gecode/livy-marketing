import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Badge from '../components/Badge';
import PrizesModal from '../components/PrizesModal';
import ScanModal from '../components/ScanModal';
import QRScanner from '../components/QRScanner';
import InvoiceScanner from '../components/InvoiceScanner';
import ScanSuccessModal from '../components/ScanSuccessModal';
import { useApi } from '../hooks/useApi';

interface Prize {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  imageUrl?: string;
  isAvailable: boolean;
  category: 'discount' | 'freebie' | 'experience' | 'merchandise';
}

interface CampaignPrizes {
  campaignId: string;
  totalPrizes: number;
  availablePrizes: number;
  userPoints: number;
  prizes: Prize[];
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  badgeCount: number;
  gradient: 'orange-purple' | 'brown' | 'red';
  badges: Array<{
    id: string;
    gradient: 'orange-purple' | 'brown' | 'red';
    earnedAt: string;
  }>;
}

interface CampaignRanking {
  campaignId: string;
  position: number;
  totalParticipants: number;
  userBadges: number;
  topParticipantBadges: number;
}

const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCampaign, getCampaignRanking, getCampaignPrizes } = useApi();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [prizes, setPrizes] = useState<CampaignPrizes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPrizesModalOpen, setIsPrizesModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [isInvoiceScannerOpen, setIsInvoiceScannerOpen] = useState(false);
  const [isScanSuccessOpen, setIsScanSuccessOpen] = useState(false);
  const [scanResult, setScanResult] = useState<{ campaign?: string; badgeType?: string; qrData?: string; merchant?: string; total?: number; points?: number } | null>(null);
  const [scanType, setScanType] = useState<'qr' | 'invoice'>('qr');
  const [ranking, setRanking] = useState<CampaignRanking | null>(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Fetch campaign data first (required)
        const campaignData = await getCampaign(id);
        setCampaign(campaignData);
        
        // Fetch ranking and prizes data in parallel (optional)
        const rankingPromise = getCampaignRanking(id).catch(() => null);
        const prizesPromise = getCampaignPrizes(id).catch(() => null);
        
        const [rankingData, prizesData] = await Promise.all([rankingPromise, prizesPromise]);
        
        if (rankingData) {
          setRanking(rankingData);
        }
        
        if (prizesData) {
          console.log('Prizes data received:', prizesData);
          setPrizes(prizesData);
        } else {
          console.log('No prizes data received for campaign:', id);
        }
      } catch (err) {
        console.error('Error fetching campaign data:', err);
        setError('Failed to load campaign details');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignData();
  }, [id, getCampaign, getCampaignRanking, getCampaignPrizes]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getGradientClass = (gradient: string) => {
    switch (gradient) {
      case 'orange-purple':
        return 'from-orange-400 to-purple-500';
      case 'brown':
        return 'from-amber-700 to-orange-600';
      case 'red':
        return 'from-red-400 to-red-600';
      default:
        return 'from-orange-400 to-purple-500';
    }
  };

  // Calculate total points (10 points per badge)
  const totalPoints = campaign ? campaign.badgeCount * 10 : 0;

  const handleQRScan = () => {
    setIsScanModalOpen(false);
    setIsQRScannerOpen(true);
  };

  const handleInvoiceScan = () => {
    setIsScanModalOpen(false);
    setIsInvoiceScannerOpen(true);
  };

  const handleQRScanSuccess = (data: string) => {
    setIsQRScannerOpen(false);
    setScanResult({ campaign: campaign?.name, badgeType: 'Participation', qrData: data });
    setScanType('qr');
    setIsScanSuccessOpen(true);
  };

  const handleInvoiceScanSuccess = (data: { merchant: string; total: number; points: number }) => {
    setIsInvoiceScannerOpen(false);
    setScanResult(data);
    setScanType('invoice');
    setIsScanSuccessOpen(true);
  };

  const handleScanSuccessClose = () => {
    setIsScanSuccessOpen(false);
    setScanResult(null);
  };

  const handleViewBadge = () => {
    setIsScanSuccessOpen(false);
    // Navigate to badge success page or show badge details
    navigate('/mobile/badge-success');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading campaign details...</p>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Campaign Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The campaign you are looking for does not exist.'}</p>
          <button 
            onClick={() => navigate('/mobile')} 
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Badges
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white p-6 pt-12">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/mobile')}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            ←
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{campaign.name}</h1>
            <p className="text-gray-600 text-sm">{campaign.description}</p>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="flex gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⭐</span>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalPoints}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => {
              console.log('Prizes button clicked, opening modal');
              console.log('Current prizes state:', prizes);
              setIsPrizesModalOpen(true);
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all w-1/5"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">🎁</span>
              <div className="text-center">
                <div className="text-sm font-semibold">Redeem</div>
                <div className="text-xs text-purple-100">
                  {prizes ? `${prizes.availablePrizes} prizes` : 'Prizes'}
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Campaign Progress</h2>
            <span className="text-sm text-gray-600">
              {campaign.badgeCount} of {campaign.badges.length} badges
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              style={{ width: `${(campaign.badgeCount / campaign.badges.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{Math.round((campaign.badgeCount / campaign.badges.length) * 100)}% Complete</span>
            {ranking && (
              <span>Ranked #{ranking.position} of {ranking.totalParticipants}</span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
        <div className="px-6 py-8">
          {/* Progress Section */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h2>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{campaign.badgeCount} of {campaign.badges.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full bg-gradient-to-r ${getGradientClass(campaign.gradient)}`}
                  style={{ width: `${(campaign.badgeCount / campaign.badges.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              You're making great progress! Keep earning badges to complete this campaign.
            </p>
            
            {/* Scan Button */}
            <button
              onClick={() => setIsScanModalOpen(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
            >
              <div className="text-xl">📱</div>
              <span>Scan to Earn Points</span>
            </button>
          </div>

          {/* Ranking Section */}
          {ranking && (
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span>🏆</span>
                <span>Campaign Ranking</span>
              </h2>
              
              <div className="space-y-4">
                {/* Your Position */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Your Position</h3>
                      <p className="text-sm text-gray-600">
                        You're ranked #{ranking.position} out of {ranking.totalParticipants} participants
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-purple-600">#{ranking.position}</div>
                      <div className="text-sm text-gray-500">out of {ranking.totalParticipants}</div>
                    </div>
                  </div>
                </div>

                {/* Progress to Next Position */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress to next position</span>
                    <span>{ranking.userBadges} / {ranking.topParticipantBadges} badges</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      style={{ width: `${Math.min((ranking.userBadges / ranking.topParticipantBadges) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {ranking.topParticipantBadges - ranking.userBadges} more badges to reach the top!
                  </p>
                </div>

                {/* Ranking Stats */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-900">{ranking.userBadges}</div>
                    <div className="text-xs text-gray-600">Your Badges</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-900">{ranking.topParticipantBadges}</div>
                    <div className="text-xs text-gray-600">Top Player</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Badges Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Campaign Badges</h2>
            <div className="space-y-4">
              {campaign.badges.map((badge, index) => (
                <div key={badge.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Badge
                    gradient={badge.gradient}
                    size="small"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {campaign.name} Badge #{index + 1}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Earned on {formatDate(badge.earnedAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Points</div>
                    <div className="text-lg font-bold text-purple-600">
                      {Math.floor(Math.random() * 50) + 10}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Info */}
          <div className="bg-white rounded-xl p-6 mt-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Campaign Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Campaign ID:</span>
                <span className="font-medium">{campaign.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Badges:</span>
                <span className="font-medium">{campaign.badges.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Your Badges:</span>
                <span className="font-medium text-purple-600">{campaign.badgeCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completion Rate:</span>
                <span className="font-medium text-purple-600">
                  {Math.round((campaign.badgeCount / campaign.badges.length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prizes Modal */}
      <PrizesModal
        isOpen={isPrizesModalOpen}
        onClose={() => setIsPrizesModalOpen(false)}
        totalPoints={totalPoints}
        prizes={prizes?.prizes || []}
        availablePrizes={prizes?.availablePrizes || 0}
      />

      {/* Scan Modal */}
      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onQRScan={handleQRScan}
        onInvoiceScan={handleInvoiceScan}
      />

      {/* QR Scanner */}
      <QRScanner
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScanSuccess={handleQRScanSuccess}
      />

      {/* Invoice Scanner */}
      <InvoiceScanner
        isOpen={isInvoiceScannerOpen}
        onClose={() => setIsInvoiceScannerOpen(false)}
        onScanSuccess={handleInvoiceScanSuccess}
      />

      {/* Scan Success Modal */}
      <ScanSuccessModal
        isOpen={isScanSuccessOpen}
        onClose={handleScanSuccessClose}
        type={scanType}
        data={scanResult}
        pointsEarned={scanType === 'qr' ? 10 : scanResult?.points || 0}
        onViewBadge={scanType === 'qr' ? handleViewBadge : undefined}
      />
    </div>
  );
};

export default CampaignDetails;
