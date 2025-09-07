import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import CharacterIcon from '../components/CharacterIcon';
import Badge from '../components/Badge';
import BadgeSection from '../components/BadgeSection';
import SearchButton from '../components/SearchButton';
import SearchModal from '../components/SearchModal';
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

interface UserProfile {
  id: string;
  name: string;
  totalBadges: number;
  memberSince: string;
  latestBadge: {
    id: string;
    campaignId: string;
    campaignName: string;
    gradient: 'orange-purple' | 'brown' | 'red';
    earnedAt: string;
  };
}

const Mobile: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, getCampaigns, getUserProfile } = useApi();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Memoize the fetch functions to prevent infinite loops
  const fetchData = useCallback(async () => {
    if (hasLoaded) return; // Prevent multiple fetches
    
    console.log('🔄 Starting to fetch data...');
    try {
      console.log('📡 Fetching campaigns...');
      const campaignsData = await getCampaigns();
      console.log('✅ Campaigns fetched:', campaignsData);
      
      console.log('📡 Fetching user profile...');
      const profileData = await getUserProfile();
      console.log('✅ Profile fetched:', profileData);
      
      setCampaigns(campaignsData);
      setUserProfile(profileData);
      setHasLoaded(true);
    } catch (err) {
      console.error('❌ Error fetching data:', err);
      setHasLoaded(true); // Mark as loaded even on error
    }
  }, [getCampaigns, getUserProfile, hasLoaded]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCampaignSelect = (campaign: Campaign) => {
    navigate(`/mobile/campaign/${campaign.id}`);
  };

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  console.log('🎯 Mobile component render:', { loading, error, campaigns, userProfile, hasLoaded });

  // Show loading state
  if (loading && !hasLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your badges...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !hasLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Data</h2>
          <p className="text-gray-600 mb-4 max-w-md">
            There was an error loading your badges and campaigns. This might be due to a network issue or the mock service not being properly configured.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-sm text-gray-500">Error details: {error}</p>
            <p className="text-sm text-gray-500">Check the browser console for more information.</p>
          </div>
          <div className="space-x-3">
            <button 
              onClick={() => {
                setHasLoaded(false);
                fetchData();
              }} 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => window.location.href = '/'} 
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show content when data is loaded
  if (campaigns.length > 0 && userProfile) {
    return (
      <>
        <div className="min-h-screen bg-white">
          {/* Main container with light gray side margins */}
          <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
            {/* Content container */}
            <div className="px-6 py-8">
              {/* Header with character icon and ID */}
              <div className="flex items-center gap-3 mb-6">
                <CharacterIcon />
                <span className="text-gray-600 font-medium">ID {userProfile.id}</span>
              </div>

              {/* Main motto */}
              <h1 className="text-3xl font-bold text-purple-600 mb-8 text-center">
                Enjoy today, collect forever
              </h1>

              {/* Badge viewing section */}
              <div className="mb-8">
                <h2 className="text-black font-semibold text-lg mb-2">
                  View your claimed badges
                </h2>
                <p className="text-gray-600 mb-6">Your latest badge</p>
                
                {/* Large featured badge */}
                <div className="flex justify-center mb-8">
                  <Badge
                    size="large"
                    gradient={userProfile.latestBadge.gradient}
                  />
                </div>
              </div>

              {/* Campaign sections */}
              {campaigns.map((campaign) => (
                <div 
                  key={campaign.id}
                  onClick={() => handleCampaignSelect(campaign)}
                  className="cursor-pointer hover:bg-white hover:shadow-md transition-all duration-200 rounded-xl p-1 mb-6"
                >
                  <BadgeSection
                    title={campaign.name}
                    description={campaign.description}
                    badges={campaign.badges.map(badge => ({ gradient: badge.gradient }))}
                  />
                </div>
              ))}

              {/* Search button positioned at bottom right */}
              <div className="flex justify-end mt-8">
                <SearchButton onClick={handleSearchClick} />
              </div>
            </div>
          </div>
        </div>

        {/* Search Modal */}
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          onCampaignSelect={handleCampaignSelect}
        />
      </>
    );
  }

  // Show empty state if no data loaded
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-400 text-6xl mb-4">📱</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">No Data Available</h2>
        <p className="text-gray-600 mb-4">
          No campaigns or badges were loaded. Please check your connection and try again.
        </p>
        <button 
          onClick={() => {
            setHasLoaded(false);
            fetchData();
          }} 
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default Mobile;
