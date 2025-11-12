import React from 'react';
import Card from '../ui/Card';
import Skeleton from './Skeleton';

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-8">
      <Skeleton className="h-9 w-48" />

      <Card>
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="text-right">
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-8 w-36" />
          </div>
        </div>
      </Card>
      
      <Card>
        <Skeleton className="h-8 w-64 mb-4" />
        <div className="flex justify-center items-center h-[350px]">
           <Skeleton className="h-64 w-64 rounded-full" />
        </div>
      </Card>

      <Card>
        <Skeleton className="h-8 w-56 mb-6" />
        <ul className="space-y-5">
          {Array.from({ length: 6 }).map((_, i) => (
             <li key={i} className="flex justify-between items-center">
                <div className="flex items-center w-1/2">
                    <Skeleton className="w-4 h-4 rounded-full mr-3" />
                    <Skeleton className="h-5 w-3/4" />
                </div>
                <Skeleton className="h-6 w-1/4" />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default DashboardSkeleton;
