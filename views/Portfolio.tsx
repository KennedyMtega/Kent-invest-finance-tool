import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import { type Portfolio, type Currency } from '../types';
import { CATEGORIES } from '../constants';

interface PortfolioProps {
  balance: number;
  portfolio: Portfolio;
  updatePortfolio: (newPortfolio: Portfolio) => void;
  formatCurrency: (amount: number) => string;
}

const PortfolioView: React.FC<PortfolioProps> = ({ balance, portfolio, updatePortfolio, formatCurrency }) => {
  const [localPortfolio, setLocalPortfolio] = useState(portfolio);
  const [error, setError] = useState('');

  useEffect(() => {
    setLocalPortfolio(portfolio);
  }, [portfolio]);

  const totalAllocated = Object.values(localPortfolio).reduce((sum, val) => sum + val, 0);
  const remainingToAllocate = balance - totalAllocated;

  const handleSliderChange = (id: keyof Portfolio, value: string) => {
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      setLocalPortfolio(prev => ({ ...prev, [id]: numericValue }));
    }
  };

  const handleSave = () => {
    if (totalAllocated > balance) {
      setError('Total allocation cannot exceed your balance.');
      return;
    }
    setError('');
    updatePortfolio(localPortfolio);
    alert('Portfolio updated successfully!');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Portfolio</h1>

      <Card>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6 p-4 bg-blue-50 rounded-lg">
          <div>
            <p className="text-gray-600">Total Balance</p>
            <p className="text-xl sm:text-2xl font-bold text-ksdm-deep-blue">{formatCurrency(balance)}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Allocated</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600">{formatCurrency(totalAllocated)}</p>
          </div>
          <div>
            <p className="text-gray-600">Remaining to Allocate</p>
            <p className={`text-xl sm:text-2xl font-bold ${remainingToAllocate < 0 ? 'text-red-600' : 'text-gray-800'}`}>{formatCurrency(remainingToAllocate)}</p>
          </div>
        </div>

        <div className="space-y-6">
          {CATEGORIES.map(cat => (
            <div key={cat.id}>
              <label htmlFor={cat.id} className="block text-lg font-medium text-gray-700">{cat.name}</label>
              <div className="flex items-center space-x-4 mt-2">
                <input
                  type="range"
                  id={cat.id}
                  min="0"
                  max={balance}
                  step={balance / 1000}
                  value={localPortfolio[cat.id]}
                  onChange={(e) => handleSliderChange(cat.id, e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="font-semibold text-ksdm-deep-blue w-28 md:w-36 text-right">{formatCurrency(localPortfolio[cat.id])}</span>
              </div>
            </div>
          ))}
        </div>

        {error && <p className="text-center text-red-500 mt-6">{error}</p>}
        
        <div className="mt-8 text-center">
          <button
            onClick={handleSave}
            className="w-full md:w-auto px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-ksdm-deep-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Save Allocation
          </button>
        </div>
      </Card>
    </div>
  );
};

export default PortfolioView;