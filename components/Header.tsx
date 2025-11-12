
import React from 'react';
import { MenuIcon } from './icons/Icons';
import CurrencyToggle from './CurrencyToggle';
import { type Currency } from '../types';

interface HeaderProps {
  toggleSidebar: () => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, currency, setCurrency }) => {
  return (
    <header className="bg-white shadow-sm lg:hidden p-4 flex justify-between items-center sticky top-0 z-30">
      <button onClick={toggleSidebar} className="text-gray-600 hover:text-ksdm-deep-blue">
        <MenuIcon className="h-6 w-6" />
      </button>
      <div className="text-xl font-bold text-ksdm-deep-blue">KSDM Bank</div>
      <CurrencyToggle currency={currency} setCurrency={setCurrency} />
    </header>
  );
};

export default Header;
