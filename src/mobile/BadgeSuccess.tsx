import React from 'react';
import { useNavigate } from 'react-router';
import Badge from '../components/Badge';

interface BadgeSuccessProps {
  campaignName: string;
  badgeGradient: 'orange-purple' | 'brown' | 'red';
  onClose: () => void;
}

const BadgeSuccess: React.FC<BadgeSuccessProps> = ({ 
  campaignName, 
  badgeGradient, 
  onClose 
}) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    onClose();
    navigate('/mobile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center">
        {/* User ID */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-700 font-medium">ID 5768</span>
        </div>

        {/* Badge Icon */}
        <div className="mb-8">
            <Badge 
              gradient={badgeGradient} 
              size="large"
              className="w-32 h-32 mx-auto shadow-lg"
            />
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-600 mb-3">Congrats!</h1>
          <p className="text-gray-700 leading-relaxed">
            You've claimed your badge and unlocked new experiences
          </p>
        </div>

        {/* Campaign Info */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-8">
          <p className="text-sm text-gray-600 mb-1">Campaign</p>
          <p className="font-semibold text-gray-800">{campaignName}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleContinue}
            className="w-full bg-purple-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-purple-700 transition-colors"
          >
            Continue
          </button>
          
          <button
            onClick={() => navigate('/mobile')}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
          >
            Back to Campaigns
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadgeSuccess;
