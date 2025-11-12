import React, { useState } from 'react';
import Card from '../ui/Card';
import { CloseIcon } from '../icons/Icons';

interface AddFundsToGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
  goalName: string;
  maxAmount: number;
  formatCurrency: (amount: number) => string;
}

const AddFundsToGoalModal: React.FC<AddFundsToGoalModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  goalName,
  maxAmount,
  formatCurrency,
}) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }
    if (numericAmount > maxAmount) {
      setError(`Amount cannot exceed unallocated funds of ${formatCurrency(maxAmount)}.`);
      return;
    }
    onSubmit(numericAmount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <Card className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-ksdm-deep-blue">Add Funds to "{goalName}"</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <CloseIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
            <p className="text-sm text-gray-600 mb-4">
                Available to contribute: <span className="font-bold text-green-600">{formatCurrency(maxAmount)}</span>
            </p>
            <div>
                <label htmlFor="fundAmount" className="block text-sm font-medium text-gray-700">
                    Contribution Amount
                </label>
                <input
                    type="number"
                    id="fundAmount"
                    value={amount}
                    onChange={(e) => {
                        setAmount(e.target.value);
                        setError('');
                    }}
                    className="mt-1 bg-white text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border-gray-300 rounded-md shadow-sm"
                    placeholder="0.00"
                    step="any"
                    autoFocus
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-6 text-right">
                <button
                    type="submit"
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-ksdm-deep-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    Contribute
                </button>
            </div>
        </form>
      </Card>
    </div>
  );
};

export default AddFundsToGoalModal;
