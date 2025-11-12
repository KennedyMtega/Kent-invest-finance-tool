import React from 'react';
import InvestmentHeader from '../../components/investments/InvestmentHeader';
import InvestmentCard from '../../components/investments/InvestmentCard';
import { stocksData } from '../../data/investments';
import { CATEGORIES } from '../../constants';
import { type PortfolioCategory } from '../../types';

interface StocksViewProps {
  portfolioAmount: number;
  formatCurrency: (amount: number) => string;
}

const StocksView: React.FC<StocksViewProps> = ({ portfolioAmount, formatCurrency }) => {
  const categoryId: PortfolioCategory = 'stocks';
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
        {stocksData.map(stock => (
          <InvestmentCard
            key={stock.id}
            name={`${stock.name} (${stock.ticker})`}
            valueFormatted={formatCurrency(stock.value)}
          >
            <DetailItem label="Shares" value={stock.shares.toLocaleString()} />
            <DetailItem label="Price" value={formatCurrency(stock.price)} />
          </InvestmentCard>
        ))}
      </div>
    </div>
  );
};

export default StocksView;
