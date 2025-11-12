import { type Category } from './types';
import { BasicNeedsIcon, MutualFundsIcon, BondsIcon, StocksIcon, RealEstateIcon, OtherIcon } from './components/icons/Icons';

export const EXCHANGE_RATE_USD_TO_TZS = 2600;

export const CATEGORIES: Category[] = [
  { id: 'basicNeeds', name: 'Basic Needs', color: '#1f77b4', icon: BasicNeedsIcon },
  { id: 'mutualFunds', name: 'Mutual Funds', color: '#ff7f0e', icon: MutualFundsIcon },
  { id: 'bonds', name: 'Bonds', color: '#2ca02c', icon: BondsIcon },
  { id: 'stocks', name: 'Stocks', color: '#d62728', icon: StocksIcon },
  { id: 'realEstate', name: 'Real Estate', color: '#9467bd', icon: RealEstateIcon },
  { id: 'other', name: 'Other', color: '#8c564b', icon: OtherIcon },
];
