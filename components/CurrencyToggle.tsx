
import React from 'react';
import { Currency } from '../types';

interface CurrencyToggleProps {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyToggle: React.FC<CurrencyToggleProps> = ({ currency, setCurrency }) => {
  const isTzs = currency === Currency.TZS;

  const toggleCurrency = () => {
    setCurrency(isTzs ? Currency.USD : Currency.TZS);
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 rounded-full p-1 cursor-pointer" onClick={toggleCurrency}>
      <span className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${isTzs ? 'bg-white text-ksdm-deep-blue shadow' : 'text-gray-600'}`}>
        TZS
      </span>
      <span className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${!isTzs ? 'bg-white text-ksdm-deep-blue shadow' : 'text-gray-600'}`}>
        USD
      </span>
    </div>
  );
};

export default CurrencyToggle;
