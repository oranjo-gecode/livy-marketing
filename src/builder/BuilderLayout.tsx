import React from 'react';
import { Outlet, useLocation } from 'react-router';

const BuilderLayout: React.FC = () => {
  const location = useLocation();
  
  // Determine current step based on route
  const getCurrentStep = () => {
    if (location.pathname === '/builder') return 1;
    if (location.pathname === '/builder/map') return 2;
    if (location.pathname === '/builder/stamp') return 3;
    return 1;
  };

  const currentStep = getCurrentStep();

  const steps = [
    { id: 1, name: 'Configuración', path: '/builder' },
    { id: 2, name: 'Mapa', path: '/builder/map' },
    { id: 3, name: 'Sello', path: '/builder/stamp' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <div className="text-2xl font-bold text-purple-600">Livy.</div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">Maria Perez</div>
            <div className="text-xs text-gray-500">Restaurante 12/0.</div>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm">MP</span>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="flex justify-center py-8">
        <div className="flex items-center space-x-8">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${
                  step.id <= currentStep
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.id}
              </div>
              <span className="mt-2 text-sm text-gray-600">{step.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 pb-6">
        <Outlet />
      </main>
    </div>
  );
};

export default BuilderLayout;
