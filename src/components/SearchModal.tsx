import React, { useState, useEffect } from 'react';

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

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignSelect: (campaign: Campaign) => void;
  campaigns: Campaign[];
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onCampaignSelect, campaigns }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Campaign[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const timeoutId = setTimeout(() => {
        try {
          // Local filtering instead of API call
          const results = campaigns.filter(
            (campaign) =>
              campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchResults(results);
        } catch (error) {
          console.error('Search failed:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      }, 300); // Debounce search

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, campaigns]);

  const handleCampaignSelect = (campaign: Campaign) => {
    onCampaignSelect(campaign);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Search Livys</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              autoFocus
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
              </div>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {searchQuery.trim() && (
            <>
              {isSearching ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="divide-y">
                  {searchResults.map((campaign) => (
                    <button
                      key={campaign.id}
                      onClick={() => handleCampaignSelect(campaign)}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${
                          campaign.gradient === 'orange-purple' ? 'from-orange-400 to-purple-500' :
                          campaign.gradient === 'brown' ? 'from-amber-700 to-orange-600' :
                          'from-red-400 to-red-600'
                        }`}></div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                          <p className="text-sm text-gray-600">{campaign.description}</p>
                          <p className="text-xs text-purple-600 font-medium">
                            {campaign.badgeCount} badge{campaign.badgeCount !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <div className="text-4xl mb-2">🔍</div>
                  <p>No campaigns found</p>
                  <p className="text-sm">Try a different search term</p>
                </div>
              )}
            </>
          )}
          
          {!searchQuery.trim() && (
            <div className="p-8 text-center text-gray-500">
              <div className="text-4xl mb-2">💡</div>
              <p>Start typing to search campaigns</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
