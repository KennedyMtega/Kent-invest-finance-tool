import React from 'react';

export enum Currency {
  TZS = 'TZS',
  USD = 'USD',
}

export type PortfolioCategory =
  | 'basicNeeds'
  | 'mutualFunds'
  | 'bonds'
  | 'stocks'
  | 'realEstate'
  | 'other';

export type Page = 
  | 'dashboard' 
  | 'portfolio' 
  | 'addFunds' 
  | 'feedback'
  | 'adminLogin'
  | 'adminDashboard'
  | PortfolioCategory;

export type Portfolio = Record<PortfolioCategory, number>;

export interface Category {
  id: PortfolioCategory;
  name: string;
  color: string;
  icon: React.FC<{ className?: string }>;
}

// Detailed types for individual investments
export interface InvestmentBase {
  id: string;
  name: string;
  value: number;
}

export interface BasicNeedItem extends InvestmentBase {
  goal: number;
  description: string;
}

export interface MutualFund extends InvestmentBase {
  nav: number;
  oneYearReturn: number;
  risk: 'Low' | 'Medium' | 'High';
}

export interface Bond extends InvestmentBase {
  couponRate: number;
  maturityDate: string;
}

export interface Stock extends InvestmentBase {
  ticker: string;
  shares: number;
  price: number;
}

export interface RealEstate extends InvestmentBase {
  location: string;
  expectedRentalYield: number;
  imageUrl: string;
}

export interface OtherInvestment extends InvestmentBase {
  description: string;
  purchaseDate: string;
}

// Feedback System Types
export interface FeedbackQuestion {
  id: string;
  text: string;
  type: 'rating' | 'text';
}

export interface FeedbackAnswer {
  questionId: string;
  questionText: string;
  answer: string | number;
}

export interface FeedbackSubmission {
  id: string;
  date: string;
  answers: FeedbackAnswer[];
}