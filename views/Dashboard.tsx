import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Card from '../components/ui/Card';
import { type Portfolio, type Currency } from '../types';
import { CATEGORIES } from '../constants';

interface DashboardProps {
  balance: number;
  portfolio: Portfolio;
  currency: Currency;
  formatCurrency: (amount: number) => string;
}

const Dashboard: React.FC<DashboardProps> = ({ balance, portfolio, currency, formatCurrency }) => {
  const allocatedFunds = Object.values(portfolio).reduce((sum, amount) => sum + amount, 0);
  const unallocatedFunds = balance - allocatedFunds;

  const chartData = CATEGORIES.map(cat => ({
    name: cat.name,
    value: portfolio[cat.id],
    color: cat.color,
  }));
  
  if (unallocatedFunds > 0) {
    chartData.push({
      name: 'Unallocated',
      value: unallocatedFunds,
      color: '#a0aec0',
    });
  }
  
  const totalDisplayBalance = formatCurrency(balance);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>

      <Card className="bg-gradient-to-r from-ksdm-deep-blue to-blue-800 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg text-blue-200">Total Balance</p>
            <p className="text-3xl sm:text-4xl font-bold">{totalDisplayBalance}</p>
          </div>
          <div className="text-right">
            <p className="text-lg text-blue-200">Allocated</p>
            <p className="text-xl sm:text-2xl font-semibold">{formatCurrency(allocatedFunds)}</p>
          </div>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Portfolio Distribution</h2>
        <div className="w-full h-[350px] sm:h-[400px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Investment Summary</h2>
        <ul className="space-y-4">
          {CATEGORIES.map(cat => (
            <li key={cat.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: cat.color }}></span>
                <span className="text-gray-700">{cat.name}</span>
              </div>
              <span className="font-semibold text-gray-800">{formatCurrency(portfolio[cat.id])}</span>
            </li>
          ))}
           <li className="flex justify-between items-center border-t pt-4 mt-4">
              <div className="flex items-center">
                 <span className="w-4 h-4 rounded-full mr-3 bg-gray-400"></span>
                 <span className="text-gray-700 font-bold">Unallocated Funds</span>
              </div>
              <span className="font-bold text-gray-800">{formatCurrency(unallocatedFunds)}</span>
            </li>
        </ul>
      </Card>
    </div>
  );
};

export default Dashboard;