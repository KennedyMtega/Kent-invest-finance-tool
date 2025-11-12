import React, { useState } from 'react';
import InvestmentHeader from '../../components/investments/InvestmentHeader';
import InvestmentCard from '../../components/investments/InvestmentCard';
import AddFundsToGoalModal from '../../components/investments/AddFundsToGoalModal';
import ManageBasicNeedGoalModal from '../../components/investments/ManageBasicNeedGoalModal';
import Card from '../../components/ui/Card';
import { CATEGORIES } from '../../constants';
import { type PortfolioCategory, type BasicNeedItem } from '../../types';

interface BasicNeedsViewProps {
  items: BasicNeedItem[];
  portfolioAmount: number;
  unallocatedAmount: number;
  formatCurrency: (amount: number) => string;
  onAddFunds: (itemId: string, amount: number) => void;
  onAddItem: (item: Omit<BasicNeedItem, 'id' | 'value'>) => void;
  onUpdateItem: (item: BasicNeedItem) => void;
  onDeleteItem: (itemId: string) => void;
}

const BasicNeedsView: React.FC<BasicNeedsViewProps> = ({ 
  items,
  portfolioAmount, 
  unallocatedAmount,
  formatCurrency,
  onAddFunds,
  onAddItem,
  onUpdateItem,
  onDeleteItem
}) => {
  const categoryId: PortfolioCategory = 'basicNeeds';
  const category = CATEGORIES.find(c => c.id === categoryId)!;

  const [isAddFundsModalOpen, setAddFundsModalOpen] = useState(false);
  const [isManageGoalModalOpen, setManageGoalModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BasicNeedItem | null>(null);

  const openAddFundsModal = (item: BasicNeedItem) => {
    setSelectedItem(item);
    setAddFundsModalOpen(true);
  };

  const openManageGoalModal = (item: BasicNeedItem | null) => {
    setSelectedItem(item);
    setManageGoalModalOpen(true);
  }

  const handleDelete = (itemId: string) => {
    if(window.confirm('Are you sure you want to delete this goal? The contributed funds will become unallocated.')) {
      onDeleteItem(itemId);
    }
  };

  const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <p><span className="font-semibold">{label}:</span> {value}</p>
  );

  return (
    <div>
      <InvestmentHeader
        title={category.name}
        totalAmountFormatted={formatCurrency(portfolioAmount)}
        icon={<category.icon className="w-10 h-10 text-ksdm-deep-blue" />}
      />

      <Card className="mb-6 bg-blue-50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
                <h3 className="text-lg font-bold text-ksdm-deep-blue">Category Funds</h3>
                <p className="text-gray-600">Funds available to contribute to your goals.</p>
            </div>
            <div className="text-left sm:text-right mt-2 sm:mt-0">
                <p className="text-2xl font-bold text-green-600">{formatCurrency(unallocatedAmount)}</p>
                <p className="text-sm text-gray-500">Unallocated</p>
            </div>
        </div>
      </Card>

      <div className="flex justify-end mb-6">
          <button 
            onClick={() => openManageGoalModal(null)}
            className="px-6 py-2 font-medium text-white bg-ksdm-deep-blue rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
           >
            + Add Goal
           </button>
      </div>

      <div className="space-y-6">
        {items.map(item => (
          <InvestmentCard
            key={item.id}
            name={item.name}
            valueFormatted={formatCurrency(item.value)}
          >
            <DetailItem label="Description" value={item.description} />
            <DetailItem label="Goal" value={formatCurrency(item.goal)} />
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${(item.value / item.goal) * 100}%` }}
              ></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                <button 
                    onClick={() => openAddFundsModal(item)}
                    className="flex-grow px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                >
                    Add Funds
                </button>
                <button 
                    onClick={() => openManageGoalModal(item)}
                    className="flex-grow px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                    Edit
                </button>
                 <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-grow px-3 py-1.5 text-xs font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                 >
                    Delete
                </button>
            </div>
          </InvestmentCard>
        ))}
         {items.length === 0 && (
            <Card className="text-center py-10">
                <p className="text-gray-500">You haven't set any 'Basic Needs' goals yet.</p>
                <p className="text-gray-500">Click "+ Add Goal" to get started.</p>
            </Card>
        )}
      </div>

      {isAddFundsModalOpen && selectedItem && (
        <AddFundsToGoalModal 
            isOpen={isAddFundsModalOpen}
            onClose={() => setAddFundsModalOpen(false)}
            goalName={selectedItem.name}
            maxAmount={unallocatedAmount}
            formatCurrency={formatCurrency}
            onSubmit={(amount) => {
                onAddFunds(selectedItem.id, amount);
                setAddFundsModalOpen(false);
            }}
        />
      )}

      {isManageGoalModalOpen && (
        <ManageBasicNeedGoalModal
            isOpen={isManageGoalModalOpen}
            onClose={() => setManageGoalModalOpen(false)}
            onSubmit={(data) => {
                if(selectedItem) { // Editing
                    onUpdateItem({...selectedItem, ...data});
                } else { // Adding
                    onAddItem(data);
                }
                setManageGoalModalOpen(false);
            }}
            initialData={selectedItem}
        />
      )}
    </div>
  );
};

export default BasicNeedsView;