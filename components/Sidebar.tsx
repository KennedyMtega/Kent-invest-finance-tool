import React from 'react';
import { DashboardIcon, PortfolioIcon, AddFundsIcon, CloseIcon, FeedbackIcon } from './icons/Icons';
import CurrencyToggle from './CurrencyToggle';
// FIX: Import the Currency type to use for props.
import { type Page, type Currency } from '../types';
import { CATEGORIES } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  // FIX: Changed type from string to the Currency enum for type safety.
  currency: Currency;
  // FIX: Changed type from string to the Currency enum for type safety.
  setCurrency: (currency: Currency) => void;
  formatCurrency: (amount: number) => string;
  balance: number;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li
    onClick={onClick}
    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
      isActive
        ? 'bg-blue-700 text-white'
        : 'text-blue-200 hover:bg-blue-800 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-4 font-medium">{label}</span>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  toggleSidebar, 
  currentPage, 
  setCurrentPage, 
  currency, 
  setCurrency,
  formatCurrency,
  balance
}) => {
  
  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    if(isOpen) {
      toggleSidebar();
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-ksdm-deep-blue text-white flex flex-col z-50 transform transition-transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-blue-800">
          <h1 className="text-2xl font-bold">KSDM Bank</h1>
          <button onClick={toggleSidebar} className="lg:hidden text-blue-300 hover:text-white">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-grow p-4 overflow-y-auto no-scrollbar">
          <ul className="space-y-2">
            <NavItem
              icon={<DashboardIcon className="h-6 w-6" />}
              label="Dashboard"
              isActive={currentPage === 'dashboard'}
              onClick={() => handlePageChange('dashboard')}
            />
            <NavItem
              icon={<AddFundsIcon className="h-6 w-6" />}
              label="Add Funds"
              isActive={currentPage === 'addFunds'}
              onClick={() => handlePageChange('addFunds')}
            />
            <NavItem
              icon={<PortfolioIcon className="h-6 w-6" />}
              label="Manage Portfolio"
              isActive={currentPage === 'portfolio'}
              onClick={() => handlePageChange('portfolio')}
            />
             <NavItem
              icon={<FeedbackIcon className="h-6 w-6" />}
              label="Feedback"
              isActive={currentPage === 'feedback'}
              onClick={() => handlePageChange('feedback')}
            />
          </ul>
          <hr className="my-4 border-blue-800" />
          <h2 className="px-3 text-sm font-semibold text-blue-300 uppercase tracking-wider">Investments</h2>
          <ul className="space-y-2 mt-2">
            {CATEGORIES.map(category => (
              <NavItem
                key={category.id}
                icon={<category.icon className="h-6 w-6" />}
                label={category.name}
                isActive={currentPage === category.id}
                onClick={() => handlePageChange(category.id)}
              />
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-800 space-y-4">
            <div className="hidden lg:block">
                <CurrencyToggle currency={currency} setCurrency={setCurrency} />
            </div>
            <div className="text-center">
                <p className="text-sm text-blue-300">Your Balance</p>
                <p className="font-bold text-xl">{formatCurrency(balance)}</p>
            </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;