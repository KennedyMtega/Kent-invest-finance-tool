import React from 'react';
import InvestmentHeader from '../../components/investments/InvestmentHeader';
import InvestmentCard from '../../components/investments/InvestmentCard';
import { realEstateData } from '../../data/investments';
import { CATEGORIES } from '../../constants';
import { type PortfolioCategory } from '../../types';

interface RealEstateViewProps {
  portfolioAmount: number;
  formatCurrency: (amount: number) => string;
}

const RealEstateView: React.FC<RealEstateViewProps> = ({ portfolioAmount, formatCurrency }) => {
  const categoryId: PortfolioCategory = 'realEstate';
  const category = CATEGORIES.find(c => c.id === categoryId)!;

  const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <p><span className="font-semibold">{label}:</span> {value}</p>
  );

  return (
    <div>
      <InvestmentHeader
        title={category.name}
        totalAmountFormatted={formatCurrency(portfolioAmount)}
        icon={<category.icon className="w-10 h-10 text-ksdm-deep-blue" />}
      />
      <div className="space-y-6">
        {realEstateData.map(property => (
          <InvestmentCard
            key={property.id}
            name={property.name}
            valueFormatted={formatCurrency(property.value)}
            imageUrl={property.imageUrl}
          >
            <DetailItem label="Location" value={property.location} />
            <DetailItem label="Est. Rental Yield" value={`${property.expectedRentalYield}%`} />
          </InvestmentCard>
        ))}
      </div>
    </div>
  );
};

export default RealEstateView;
