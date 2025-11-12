import React from 'react';
import Card from '../ui/Card';

interface InvestmentCardProps {
  name: string;
  valueFormatted: string;
  children: React.ReactNode;
  imageUrl?: string;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ name, valueFormatted, children, imageUrl }) => {
  return (
    <Card className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 hover:shadow-lg transition-shadow">
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full md:w-32 h-32 object-cover rounded-lg flex-shrink-0" 
        />
      )}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-ksdm-deep-blue">{name}</h3>
        <div className="mt-2 text-sm text-gray-600 space-y-1">{children}</div>
      </div>
      <div className="text-right flex-shrink-0 w-full md:w-auto">
        <p className="text-sm text-gray-500">Current Value</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-800">{valueFormatted}</p>
        <button className="mt-2 w-full md:w-auto px-4 py-2 text-sm font-medium text-white bg-ksdm-deep-blue rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Manage
        </button>
      </div>
    </Card>
  );
};

export default InvestmentCard;