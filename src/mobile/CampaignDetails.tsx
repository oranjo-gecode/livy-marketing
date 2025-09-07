import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Badge from '../components/Badge';
import { useApi } from '../hooks/useApi';

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

const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCampaign } = useApi();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const campaignData = await getCampaign(id);
        setCampaign(campaignData);
      } catch (err) {
        console.error('Error fetching campaign:', err);
        setError('Failed to load campaign details');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id, getCampaign]);

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
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate('/mobile')}
            className="text-white hover:text-gray-200 text-2xl font-bold"
          >
            ←
          </button>
          <div>
            <h1 className="text-2xl font-bold">{campaign.name}</h1>
            <p className="text-purple-100">{campaign.description}</p>
          </div>
        </div>
        
        {/* Campaign Stats */}
        <div className="bg-white bg-opacity-20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold">{campaign.badgeCount}</div>
              <div className="text-sm text-purple-100">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{campaign.badges.length}</div>
              <div className="text-sm text-purple-100">Total Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Math.round((campaign.badgeCount / campaign.badges.length) * 100)}%
              </div>
              <div className="text-sm text-purple-100">Completion</div>
            </div>
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
            <p className="text-sm text-gray-600">
              You're making great progress! Keep earning badges to complete this campaign.
            </p>
          </div>

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
    </div>
  );
};

export default CampaignDetails;
