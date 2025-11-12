import React from 'react';
import Card from '../ui/Card';
import Skeleton from './Skeleton';

const InvestmentCardSkeleton: React.FC = () => (
  <Card className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
    <Skeleton className="w-full md:w-32 h-32 rounded-lg flex-shrink-0" />
    <div className="flex-grow w-full">
      <Skeleton className="h-7 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
    <div className="text-right flex-shrink-0 w-full md:w-40 space-y-2">
      <Skeleton className="h-4 w-24 ml-auto" />
      <Skeleton className="h-8 w-36 ml-auto" />
      <Skeleton className="h-10 w-full md:w-28 ml-auto" />
    </div>
  </Card>
);

const InvestmentPageSkeleton: React.FC = () => {
  return (
    <div>
      <div className="flex items-center space-x-4 mb-8">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div>
          <Skeleton className="h-9 w-48 mb-2" />
          <Skeleton className="h-6 w-64" />
        </div>
      </div>
      <div className="space-y-6">
        <InvestmentCardSkeleton />
        <InvestmentCardSkeleton />
        <InvestmentCardSkeleton />
      </div>
    </div>
  );
};

export default InvestmentPageSkeleton;
