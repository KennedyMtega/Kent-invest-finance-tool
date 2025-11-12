import React from 'react';
import InvestmentHeader from '../../components/investments/InvestmentHeader';
import InvestmentCard from '../../components/investments/InvestmentCard';
import { otherData } from '../../data/investments';
import { CATEGORIES } from '../../constants';
import { type PortfolioCategory } from '../../types';

interface OtherViewProps {
  portfolioAmount: number;
  formatCurrency: (amount: number) => string;
}

const OtherView: React.FC<OtherViewProps> = ({ portfolioAmount, formatCurrency }) => {
  const categoryId: PortfolioCategory = 'other';
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
        {otherData.map(item => (
          <InvestmentCard
            key={item.id}
            name={item.name}
            valueFormatted={formatCurrency(item.value)}
          >
            <DetailItem label="Description" value={item.description} />
            <DetailItem label="Purchase Date" value={item.purchaseDate} />
          </InvestmentCard>
        ))}
      </div>
    </div>
  );
};

export default OtherView;
