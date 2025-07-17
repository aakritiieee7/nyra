import React, { useState } from 'react';
import Navigation from './components/Layout/Navigation';
import HomePage from './components/Pages/HomePage';
import ScanPage from './components/Pages/ScanPage';
import InsightsPage from './components/Pages/InsightsPage';
import TeamPage from './components/Pages/TeamPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'scan':
        return <ScanPage />;
      case 'insights':
        return <InsightsPage />;
      case 'team':
        return <TeamPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;