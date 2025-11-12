import React from 'react';
import Card from '../ui/Card';
import Skeleton from './Skeleton';

const PortfolioSkeleton: React.FC = () => {
  return (
    <div className="space-y-8">
      <Skeleton className="h-9 w-64" />

      <Card>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6 p-4 bg-gray-50 rounded-lg">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-8 w-40" />
            </div>
          ))}
        </div>

        <div className="space-y-8 mt-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-6 w-40 mb-3" />
              <div className="flex items-center space-x-4">
                <Skeleton className="w-full h-4" />
                <Skeleton className="h-8 w-40 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
            <Skeleton className="h-12 w-full md:w-48 mx-auto" />
        </div>
      </Card>
    </div>
  );
};

export default PortfolioSkeleton;
