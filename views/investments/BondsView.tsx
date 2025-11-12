import React from 'react';
import InvestmentHeader from '../../components/investments/InvestmentHeader';
import InvestmentCard from '../../components/investments/InvestmentCard';
import { bondsData } from '../../data/investments';
import { CATEGORIES } from '../../constants';
import { type PortfolioCategory } from '../../types';

interface BondsViewProps {
  portfolioAmount: number;
  formatCurrency: (amount: number) => string;
}

const BondsView: React.FC<BondsViewProps> = ({ portfolioAmount, formatCurrency }) => {
  const categoryId: PortfolioCategory = 'bonds';
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
        {bondsData.map(bond => (
          <InvestmentCard
            key={bond.id}
            name={bond.name}
            valueFormatted={formatCurrency(bond.value)}
          >
            <DetailItem label="Coupon Rate" value={`${bond.couponRate}%`} />
            <DetailItem label="Maturity Date" value={bond.maturityDate} />
          </InvestmentCard>
        ))}
      </div>
    </div>
  );
};

export default BondsView;
