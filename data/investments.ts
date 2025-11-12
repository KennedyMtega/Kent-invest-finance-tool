import { BasicNeedItem, MutualFund, Bond, Stock, RealEstate, OtherInvestment } from '../types';

export const basicNeedsData: BasicNeedItem[] = [
  { id: 'bn1', name: 'Emergency Fund', value: 500000, goal: 2000000, description: '3-6 months of living expenses.' },
  { id: 'bn2', name: 'Education Savings', value: 300000, goal: 5000000, description: 'Savings for higher education.' },
  { id: 'bn3', name: 'Housing Fund', value: 200000, goal: 10000000, description: 'Down payment for a future home.' },
];

export const mutualFundsData: MutualFund[] = [
  { id: 'mf1', name: 'Umoja Fund', value: 250000, nav: 1250, oneYearReturn: 8.5, risk: 'Low' },
  { id: 'mf2', name: 'Watoto Fund', value: 150000, nav: 850, oneYearReturn: 12.1, risk: 'Medium' },
  { id: 'mf3', name: 'Jikimu Income Fund', value: 100000, nav: 2100, oneYearReturn: 7.2, risk: 'Low' },
];

export const bondsData: Bond[] = [
  { id: 'b1', name: 'Tanzania Gov. Bond 20-Year', value: 300000, couponRate: 15.49, maturityDate: '2042-08-15' },
  { id: 'b2', name: 'CRDB Corporate Bond', value: 200000, couponRate: 10.25, maturityDate: '2028-12-01' },
];

export const stocksData: Stock[] = [
  { id: 's1', name: 'Tanzania Breweries (TBL)', ticker: 'TBL', shares: 50, price: 11500, value: 575000 },
  { id: 's2', name: 'CRDB Bank Plc', ticker: 'CRDB', shares: 1000, price: 425, value: 425000 },
];

export const realEstateData: RealEstate[] = [
  { id: 're1', name: 'Masaki Apartment', value: 900000, location: 'Dar es Salaam', expectedRentalYield: 7, imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
  { id: 're2', name: 'Dodoma Land Plot', value: 600000, location: 'Dodoma', expectedRentalYield: 4, imageUrl: 'https://images.unsplash.com/photo-1599793594285-86161864472f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
];

export const otherData: OtherInvestment[] = [
  { id: 'o1', name: 'SME Loan - Kibaha Poultry Farm', value: 300000, description: 'Peer-to-peer lending for a local business.', purchaseDate: '2023-05-20' },
  { id: 'o2', name: 'Art Collection - Tingatinga Paintings', value: 200000, description: 'Investment in local art.', purchaseDate: '2022-11-10' },
];
