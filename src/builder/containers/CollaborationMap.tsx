import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const CollaborationMap: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Colabora con marcas afines</h1>
        <p className="text-gray-600 mb-4">Encuentra marcas colaboradoras en el mapa y empieza a coordinar tu campaña</p>
        <div className="text-left max-w-md mx-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ¿Con quién vas a colaborar?
          </label>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Label"
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Interactive Map Container */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        {/* Map Header */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">Mapa de Colaboración</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>

        {/* Map Content */}
        <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 p-6">
          {/* Street Names */}
          <div className="absolute top-4 left-4 text-xs text-gray-600 font-medium">
            <div className="mb-2">Av. 11</div>
            <div className="mb-2">C. 31</div>
            <div className="mb-2">C. 33</div>
          </div>

          {/* Purple Collaboration Markers */}
          <div className="absolute top-20 left-20">
            <div className="relative">
              <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Bacano Escalante ⭐
              </div>
            </div>
          </div>

          <div className="absolute top-32 right-32">
            <div className="relative">
              <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Colonia ●
              </div>
            </div>
          </div>

          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Restaurante Isolina ⭐
              </div>
            </div>
          </div>

          {/* Orange Restaurant Markers */}
          <div className="absolute top-16 right-16">
            <div className="relative">
              <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                🍴 Dulce Junio Café
              </div>
            </div>
          </div>

          <div className="absolute top-28 left-1/3">
            <div className="relative">
              <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                🍴 El Columpio Bistró
              </div>
            </div>
          </div>

          <div className="absolute bottom-32 right-1/4">
            <div className="relative">
              <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                🛒 Fresh Market
              </div>
            </div>
          </div>

          {/* Gray Business Markers */}
          <div className="absolute top-40 left-1/2">
            <div className="relative">
              <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-white shadow-md"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Tecniverde S.A
              </div>
            </div>
          </div>

          <div className="absolute bottom-16 left-16">
            <div className="relative">
              <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-white shadow-md"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Gracias Cowork Escalante
              </div>
            </div>
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Purple connections between collaboration markers */}
            <line x1="80" y1="80" x2="320" y2="128" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="5,5"/>
            <line x1="320" y1="128" x2="288" y2="304" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="5,5"/>
            
            {/* Gray connections for other businesses */}
            <line x1="256" y1="160" x2="320" y2="128" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3,3"/>
            <line x1="128" y1="160" x2="80" y2="80" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3,3"/>
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-md text-xs">
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-gray-700">Marcas colaboradoras</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <span className="text-gray-700">Restaurantes</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
              <span className="text-gray-700">Otros negocios</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate('/builder')}
          className="bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Anterior
        </button>
        <button
          onClick={() => navigate('/builder/stamp')}
          className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CollaborationMap;
