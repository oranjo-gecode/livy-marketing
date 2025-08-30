import React from 'react';
import CharacterIcon from '../components/CharacterIcon';
import Badge from '../components/Badge';
import LeafIcon from '../components/LeafIcon';
import BadgeSection from '../components/BadgeSection';
import SearchButton from '../components/SearchButton';

const Mobile: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main container with light gray side margins */}
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
        {/* Content container */}
        <div className="px-6 py-8">
          {/* Header with character icon and ID */}
          <div className="flex items-center gap-3 mb-6">
            <CharacterIcon />
            <span className="text-gray-600 font-medium">ID 5768</span>
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
                gradient="orange-purple"
                icon={<LeafIcon className="w-8 h-8" />}
              />
            </div>
          </div>

          {/* Coffee Afternoons section */}
          <BadgeSection
            title="Coffee Afternoons"
            description="Starbucks · Britt"
            badges={[
              { gradient: 'brown' },
              { gradient: 'brown' },
              { gradient: 'brown' }
            ]}
          />

          {/* Art City Tour section */}
          <BadgeSection
            title="Art City Tour"
            description="Museo Nacional · Museo de Jade · Museo de Oro"
            badges={[
              { gradient: 'red' },
              { gradient: 'red' }
            ]}
          />

          {/* Search button positioned at bottom right */}
          <div className="flex justify-end mt-8">
            <SearchButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
