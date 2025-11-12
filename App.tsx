import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './views/Dashboard';
import PortfolioView from './views/Portfolio';
import AddFunds from './views/AddFunds';
import BasicNeedsView from './views/investments/BasicNeedsView';
import MutualFundsView from './views/investments/MutualFundsView';
import BondsView from './views/investments/BondsView';
import StocksView from './views/investments/StocksView';
import RealEstateView from './views/investments/RealEstateView';
import OtherView from './views/investments/OtherView';
import AdminLogin from './views/admin/AdminLogin';
import AdminDashboard from './views/admin/AdminDashboard';
import FeedbackModal from './components/feedback/FeedbackModal';
import DashboardSkeleton from './components/skeletons/DashboardSkeleton';
import PortfolioSkeleton from './components/skeletons/PortfolioSkeleton';
import InvestmentPageSkeleton from './components/skeletons/InvestmentPageSkeleton';
import { Page, Currency, Portfolio, PortfolioCategory, FeedbackQuestion, FeedbackAnswer, FeedbackSubmission, BasicNeedItem } from './types';
import { EXCHANGE_RATE_USD_TO_TZS } from './constants';
import { feedbackQuestionPool } from './data/feedbackQuestions';
import { basicNeedsData } from './data/investments';


const viewMap: Record<PortfolioCategory, React.FC<any>> = {
  basicNeeds: BasicNeedsView,
  mutualFunds: MutualFundsView,
  bonds: BondsView,
  stocks: StocksView,
  realEstate: RealEstateView,
  other: OtherView,
};

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [currency, setCurrency] = useState<Currency>(Currency.TZS);
  const [isLoading, setIsLoading] = useState(true);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackQuestions, setFeedbackQuestions] = useState<FeedbackQuestion[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [previousPage, setPreviousPage] = useState<Page>('dashboard');
  
  // All state is managed in TZS
  const [balanceInTzs, setBalanceInTzs] = useState(5000000);
  const [portfolioInTzs, setPortfolioInTzs] = useState<Portfolio>({
    basicNeeds: 1000000,
    mutualFunds: 500000,
    bonds: 500000,
    stocks: 1000000,
    realEstate: 1500000,
    other: 500000,
  });
  
  const [basicNeedsItems, setBasicNeedsItems] = useState<BasicNeedItem[]>(basicNeedsData);

  // Sync portfolio total for basic needs with the sum of individual items
  useEffect(() => {
    const totalBasicNeedsValue = basicNeedsItems.reduce((sum, item) => sum + item.value, 0);
    setPortfolioInTzs(prev => ({...prev, basicNeeds: totalBasicNeedsValue}));
  }, [basicNeedsItems]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate loading for 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  // Admin panel access via keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setCurrentPage('adminLogin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const formatCurrency = useCallback((amountInTzs: number) => {
    if (currency === Currency.USD) {
      const amountInUsd = amountInTzs / EXCHANGE_RATE_USD_TO_TZS;
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amountInUsd);
    }
    return `TSh ${new Intl.NumberFormat('en-TZ').format(amountInTzs)}`;
  }, [currency]);
  
  const addFunds = (amount: number) => {
    const amountInTzs = currency === Currency.TZS ? amount : amount * EXCHANGE_RATE_USD_TO_TZS;
    setBalanceInTzs(prev => prev + amountInTzs);
  };

  const updatePortfolio = (newPortfolio: Portfolio) => {
    const newPortfolioInTzs: Portfolio = { ...newPortfolio };
    if (currency === Currency.USD) {
      for(const key in newPortfolioInTzs) {
          newPortfolioInTzs[key as keyof Portfolio] *= EXCHANGE_RATE_USD_TO_TZS;
      }
    }
    setPortfolioInTzs(newPortfolioInTzs);
  };
  
  // --- Basic Needs Management ---
  const addFundsToBasicNeed = (itemId: string, amount: number) => {
    setBasicNeedsItems(prevItems => prevItems.map(item => 
      item.id === itemId ? { ...item, value: item.value + amount } : item
    ));
  };
  
  const addBasicNeedItem = (newItemData: Omit<BasicNeedItem, 'id' | 'value'>) => {
    const newItem: BasicNeedItem = {
      ...newItemData,
      id: `bn-${new Date().getTime()}`,
      value: 0
    };
    setBasicNeedsItems(prev => [...prev, newItem]);
  };
  
  const updateBasicNeedItem = (updatedItem: BasicNeedItem) => {
    setBasicNeedsItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };
  
  const deleteBasicNeedItem = (itemId: string) => {
    setBasicNeedsItems(prev => prev.filter(item => item.id !== itemId));
  };


  const selectRandomQuestions = () => {
    const shuffled = [...feedbackQuestionPool].sort(() => 0.5 - Math.random());
    setFeedbackQuestions(shuffled.slice(0, 4)); // Get 4 random questions
  };
  
  const handleSetCurrentPage = (page: Page) => {
    if (page === 'feedback') {
      selectRandomQuestions();
      setIsFeedbackModalOpen(true);
      // We don't change the current page, just open the modal on top
      // But we can mark 'feedback' as active in the sidebar
      setPreviousPage(currentPage); // store current page
      setCurrentPage('feedback'); // set to feedback to show active state
    } else {
      if(currentPage === 'feedback') {
          // if we were on feedback, restore previous page
          setCurrentPage(previousPage);
      } else {
          setCurrentPage(page);
      }
    }
  };
  
  const closeFeedbackModal = () => {
      setIsFeedbackModalOpen(false);
      // Restore the page that was active before opening feedback modal
      if (currentPage === 'feedback') {
          setCurrentPage(previousPage);
      }
  }

  const handleFeedbackSubmit = (answers: FeedbackAnswer[]) => {
    const newSubmission: FeedbackSubmission = {
      id: new Date().toISOString(),
      date: new Date().toISOString(),
      answers,
    };
    
    const existingFeedbackStr = localStorage.getItem('ksdmBankFeedback');
    const existingFeedback = existingFeedbackStr ? JSON.parse(existingFeedbackStr) : [];
    
    localStorage.setItem('ksdmBankFeedback', JSON.stringify([...existingFeedback, newSubmission]));
    
    closeFeedbackModal();
    alert('Thank you for your feedback!');
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setCurrentPage('adminDashboard');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('dashboard');
  };

  const getDisplayValues = () => {
      if(currency === Currency.USD) {
          const displayPortfolio: Portfolio = {...portfolioInTzs};
           for(const key in displayPortfolio) {
              displayPortfolio[key as keyof Portfolio] /= EXCHANGE_RATE_USD_TO_TZS;
          }
          return {
              balance: balanceInTzs / EXCHANGE_RATE_USD_TO_TZS,
              portfolio: displayPortfolio
          }
      }
      return { balance: balanceInTzs, portfolio: portfolioInTzs };
  }

  const { balance, portfolio } = getDisplayValues();

  const renderContent = () => {
    const activePage = currentPage === 'feedback' ? previousPage : currentPage;

    if (activePage === 'adminLogin') {
      return <AdminLogin onLoginSuccess={handleAdminLogin} />;
    }
    if (activePage === 'adminDashboard') {
      return isAdminAuthenticated ? <AdminDashboard onLogout={handleAdminLogout} /> : <AdminLogin onLoginSuccess={handleAdminLogin} />;
    }

    if (isLoading) {
      const ViewComponent = viewMap[activePage as PortfolioCategory];
      if (ViewComponent) return <InvestmentPageSkeleton />;
      switch (activePage) {
        case 'dashboard': return <DashboardSkeleton />;
        case 'portfolio': return <PortfolioSkeleton />;
        default: return <InvestmentPageSkeleton />;
      }
    }
    
    if (activePage === 'basicNeeds') {
        const totalAllocatedToCategory = portfolioInTzs.basicNeeds;
        const totalContributedToGoals = basicNeedsItems.reduce((sum, item) => sum + item.value, 0);
        // This is a guard. In the new model, this should not happen as portfolio total is derived.
        // Let's adjust logic. The portfolio value is the BUDGET.
        const portfolioBudget = portfolioInTzs.basicNeeds;
        const unallocatedInCategory = portfolioBudget - totalContributedToGoals;

        return <BasicNeedsView 
            items={basicNeedsItems} 
            portfolioAmount={portfolioBudget}
            unallocatedAmount={unallocatedInCategory < 0 ? 0 : unallocatedInCategory}
            formatCurrency={formatCurrency}
            onAddFunds={addFundsToBasicNeed}
            onAddItem={addBasicNeedItem}
            onUpdateItem={updateBasicNeedItem}
            onDeleteItem={deleteBasicNeedItem}
        />
    }

    const ViewComponent = viewMap[activePage as PortfolioCategory];
    if (ViewComponent) {
      return <ViewComponent portfolioAmount={portfolioInTzs[activePage as PortfolioCategory]} formatCurrency={formatCurrency} />;
    }

    switch (activePage) {
      case 'dashboard':
        return <Dashboard balance={balanceInTzs} portfolio={portfolioInTzs} currency={currency} formatCurrency={formatCurrency} />;
      case 'portfolio':
        // The portfolio view needs to know the total balance, but it also directly manipulates the portfolio object.
        // It needs the raw values in the current display currency to function.
        // The updatePortfolio function will handle conversion back to TZS.
        return <PortfolioView balance={balance} portfolio={portfolio} updatePortfolio={updatePortfolio} formatCurrency={formatCurrency} />;
      case 'addFunds':
        return <AddFunds addFunds={addFunds} currency={currency} />;
      default:
        return <Dashboard balance={balanceInTzs} portfolio={portfolioInTzs} currency={currency} formatCurrency={formatCurrency} />;
    }
  };
  
  const isNormalAppView = currentPage !== 'adminLogin' && currentPage !== 'adminDashboard';

  if (!isNormalAppView) {
    return renderContent();
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        currentPage={currentPage}
        setCurrentPage={handleSetCurrentPage}
        currency={currency}
        setCurrency={setCurrency}
        formatCurrency={formatCurrency}
        balance={balanceInTzs}
      />
      <div className="flex-1 flex flex-col">
        <Header 
          toggleSidebar={toggleSidebar} 
          currency={currency}
          setCurrency={setCurrency}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto lg:ml-64 no-scrollbar">
          {renderContent()}
        </main>
      </div>
      <FeedbackModal 
        isOpen={isFeedbackModalOpen}
        onClose={closeFeedbackModal}
        questions={feedbackQuestions}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};

export default App;