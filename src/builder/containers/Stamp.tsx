import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Stamp: React.FC = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('gradient');

  const colorOptions = [
    { id: 'purple', color: 'bg-purple-500', name: 'Purple' },
    { id: 'orange', color: 'bg-orange-500', name: 'Orange' },
    { id: 'green', color: 'bg-green-500', name: 'Green' },
    { id: 'gradient', color: 'bg-gradient-to-r from-orange-500 to-purple-500', name: 'Gradient' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Define el sello que te represente</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Elige una plantilla que se ajuste al estilo de tu campaña y personalízala con tus colores y logos
        </p>
      </div>

      {/* Visual Stamp Preview */}
      <div className="flex justify-center mb-12">
        <div className="relative">
          {/* Large Blurred Stamp Preview */}
          <div className="w-80 h-80 rounded-full overflow-hidden relative">
            <div className={`w-full h-full ${selectedColor === 'gradient' ? 'bg-gradient-to-r from-orange-400 via-red-400 to-purple-500' : 
              selectedColor === 'purple' ? 'bg-purple-500' : 
              selectedColor === 'orange' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
            
            {/* Blur effect overlay */}
            <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm"></div>
            
            {/* Stamp texture overlay */}
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-full bg-gradient-to-br from-transparent via-white to-transparent"></div>
            </div>
            
            {/* Subtle shadow */}
            <div className="absolute inset-0 rounded-full shadow-2xl"></div>
          </div>
          
          {/* Stamp label */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500 font-medium">Vista previa del sello</span>
          </div>
        </div>
      </div>

      {/* Color Palette Selection */}
      <div className="mb-12">
        <h3 className="text-lg font-medium text-gray-900 text-center mb-6">Selecciona tu paleta de colores</h3>
        
        <div className="flex justify-center space-x-6">
          {colorOptions.map((option) => (
            <div key={option.id} className="text-center">
              <button
                onClick={() => setSelectedColor(option.id)}
                className={`w-16 h-16 rounded-full ${option.color} border-2 transition-all duration-200 ${
                  selectedColor === option.id 
                    ? 'border-white shadow-lg scale-110' 
                    : 'border-gray-300 hover:scale-105'
                }`}
                aria-label={`Select ${option.name} color`}
              >
                {option.id === 'gradient' && (
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-orange-500 to-purple-500"></div>
                )}
              </button>
              <span className="block text-sm text-gray-600 mt-2 font-medium">{option.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Customization Options */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 text-center mb-4">Personalización adicional</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <span className="text-sm text-gray-700">Logo personalizado</span>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <span className="text-sm text-gray-700">Tipografía</span>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <span className="text-sm text-gray-700">Patrones</span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => navigate('/builder/map')}
          className="bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Anterior
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Stamp;
