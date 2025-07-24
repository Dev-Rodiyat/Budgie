import React, { useEffect, useState } from 'react';
import BudgetStats from '../components/BudgetStats';
import BudgetCharts from '../components/BudgetChart';

const Analytics = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('budgie_budgets')) || [];
    setBudgets(data);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-emerald-50 to-white pt-12 lg:px-24">
      <h1 className="text-2xl md:text-4xl font-semibold mb-6 md:mb-12 text-gray-800 dark:text-white">Budget Analytics</h1>
      <BudgetStats budgets={budgets} />
      <BudgetCharts budgets={budgets} />
    </div>
  );
};

export default Analytics;
