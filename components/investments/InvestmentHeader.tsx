import React from 'react';

interface InvestmentHeaderProps {
  title: string;
  totalAmountFormatted: string;
  icon: React.ReactNode;
}

const InvestmentHeader: React.FC<InvestmentHeaderProps> = ({ title, totalAmountFormatted, icon }) => {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <div className="p-3 bg-white rounded-full shadow-md">
        {icon}
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h1>
        <p className="text-md sm:text-lg text-gray-600">Total Invested: <span className="font-bold">{totalAmountFormatted}</span></p>
      </div>
    </div>
  );
};

export default InvestmentHeader;