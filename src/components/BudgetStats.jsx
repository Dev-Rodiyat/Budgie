import React from 'react';

const BudgetStats = ({ budgets }) => {
  const totalBudget = budgets.reduce((sum, b) => sum + (b.amount || 0), 0);
  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
  const remaining = totalBudget - totalSpent;

  return (
    <div className="grid sm:grid-cols-3 gap-4 mb-6 md:mb-12">
      <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900 text-center">
        <h4 className="text-lg font-semibold">Total Budget</h4>
        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">₦{totalBudget.toLocaleString()}</p>
      </div>
      <div className="p-4 rounded-xl bg-red-100 dark:bg-red-900 text-center">
        <h4 className="text-lg font-semibold">Total Spent</h4>
        <p className="text-2xl font-bold text-red-600 dark:text-red-300">₦{totalSpent.toLocaleString()}</p>
      </div>
      <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-900 text-center">
        <h4 className="text-lg font-semibold">Remaining</h4>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">₦{remaining.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default BudgetStats;
