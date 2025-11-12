import React from 'react';
import InvestmentHeader from '../../components/investments/InvestmentHeader';
import InvestmentCard from '../../components/investments/InvestmentCard';
import { mutualFundsData } from '../../data/investments';
import { CATEGORIES } from '../../constants';
import { type PortfolioCategory } from '../../types';

interface MutualFundsViewProps {
  portfolioAmount: number;
  formatCurrency: (amount: number) => string;
}

const MutualFundsView: React.FC<MutualFundsViewProps> = ({ portfolioAmount, formatCurrency }) => {
  const categoryId: PortfolioCategory = 'mutualFunds';
  const category = CATEGORIES.find(c => c.id === categoryId)!;
  
  const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <p><span className="font-semibold">{label}:</span> {value}</p>
  );
  
  const getRiskColor = (risk: 'Low' | 'Medium' | 'High') => {
    switch(risk) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
    }
  }

  return (
    <div>
      <InvestmentHeader
        title={category.name}
        totalAmountFormatted={formatCurrency(portfolioAmount)}
        icon={<category.icon className="w-10 h-10 text-ksdm-deep-blue" />}
      />
      <div className="space-y-6">
        {mutualFundsData.map(fund => (
          <InvestmentCard
            key={fund.id}
            name={fund.name}
            valueFormatted={formatCurrency(fund.value)}
          >
            <DetailItem label="NAV" value={formatCurrency(fund.nav)} />
            <DetailItem label="1Y Return" value={`${fund.oneYearReturn}%`} />
            <p><span className="font-semibold">Risk:</span> <span className={getRiskColor(fund.risk)}>{fund.risk}</span></p>
          </InvestmentCard>
        ))}
      </div>
    </div>
  );
};

export default MutualFundsView;
