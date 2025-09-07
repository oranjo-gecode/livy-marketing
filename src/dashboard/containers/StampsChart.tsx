import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StampsData {
  month: string;
  livy1: number;
  livy2: number;
  livy3: number;
}

interface StampsChartProps {
  data: StampsData[];
}

const StampsChart: React.FC<StampsChartProps> = ({ data }) => {
  const colors = ['#8B5CF6', '#A855F7', '#C084FC']; // Different shades of purple

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">sellos reclamados por cada livy</h3>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                domain={[0, 1750]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="livy1" fill={colors[0]} name="livy 1" radius={[2, 2, 0, 0]} />
              <Bar dataKey="livy2" fill={colors[1]} name="livy 2" radius={[2, 2, 0, 0]} />
              <Bar dataKey="livy3" fill={colors[2]} name="livy 3" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4 space-x-6">
          {colors.map((color, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-gray-600">livy {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StampsChart;
