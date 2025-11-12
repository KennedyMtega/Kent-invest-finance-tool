import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { Currency } from '../types';

interface AddFundsProps {
  addFunds: (amount: number) => void;
  currency: Currency;
}

const AddFunds: React.FC<AddFundsProps> = ({ addFunds, currency }) => {
  const [amount, setAmount] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      addFunds(numericAmount);
      setFeedback(`Successfully added ${numericAmount.toLocaleString()} ${currency} to your account!`);
      setAmount('');
      setTimeout(() => setFeedback(''), 3000);
    } else {
      setFeedback('Please enter a valid, positive amount.');
       setTimeout(() => setFeedback(''), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Add Funds</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount ({currency})
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* FIX: Compare with enum member `Currency.TZS`. */}
                <span className="text-gray-500 sm:text-sm">{currency === Currency.TZS ? 'TSh' : '$'}</span>
              </div>
              <input
                type="number"
                name="amount"
                id="amount"
                className="bg-white text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-4 py-3 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="any"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ksdm-deep-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Add to Balance
          </button>

          {feedback && <p className="text-center text-green-600 font-medium">{feedback}</p>}
        </form>
      </Card>
    </div>
  );
};

export default AddFunds;