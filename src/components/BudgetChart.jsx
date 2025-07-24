import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis,
  ResponsiveContainer, Legend
} from 'recharts';

// Define a color palette to use for the charts
const COLORS = ['#10B981', '#F97316', '#3B82F6', '#EF4444', '#8B5CF6', '#14B8A6'];

const BudgetCharts = ({ budgets }) => {
  // Group budget data by category and accumulate total budgeted and spent amounts
  const categoryData = budgets.reduce((acc, curr) => {
    const cat = curr.category || 'Other';  // Fallback to 'Other' if category is missing
    const existing = acc.find((item) => item.name === cat);

    if (existing) {
      // If category already exists in accumulator, add to totals
      existing.budgeted += parseFloat(curr.amount);
      existing.spent += parseFloat(curr.spent || 0);
    } else {
      // Otherwise, add new category object
      acc.push({
        name: cat,
        budgeted: parseFloat(curr.amount),
        spent: parseFloat(curr.spent || 0)
      });
    }

    return acc;
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Pie Chart - Shows only the amount spent per category */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
        <h4 className="text-center font-semibold mb-2">Spending by Category</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="spent"        // Total spent is visualized
              nameKey="name"        // Label by category name
              cx="50%" cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Compares budgeted vs spent for each category */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
        <h4 className="text-center font-semibold mb-2">Budgeted vs Spent per Category</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <XAxis dataKey="name" />    {/* Category names on the x-axis */}
            <YAxis />                   {/* Amounts on the y-axis */}
            <Tooltip />
            <Legend />
            <Bar dataKey="budgeted" fill="#3B82F6" name="Budgeted" />
            <Bar dataKey="spent" fill="#EF4444" name="Spent" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetCharts;
