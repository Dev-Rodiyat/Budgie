import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const categories = ['Food', 'Rent', 'Utilities', 'Savings', 'Entertainment'];

const EditBudgetModal = ({ isOpen, onClose, budget, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    spent: '',
    category: '',
    dueDate: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (budget) {
      setFormData({
        name: budget.name || '',
        amount: budget.amount || '',
        spent: budget.spent || 0,
        category: budget.category || '',
        dueDate: budget.dueDate || '',
        notes: budget.notes || '',
      });
    }
  }, [budget]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, amount, spent, category } = formData;

    if (!name || !amount || !category) {
      toast.error('Please fill all required fields');
      return;
    }

    if (parseFloat(spent) > parseFloat(amount)) {
      toast.error('Spent amount cannot exceed budgeted amount');
      return;
    }

    try {
      setLoading(true);
      const existing = JSON.parse(localStorage.getItem('budgie_budgets')) || [];

      const updatedBudgets = existing.map((item) =>
        item.id === budget.id
          ? {
              ...item,
              ...formData,
              amount: parseFloat(amount),
              spent: parseFloat(spent),
            }
          : item
      );

      const updatedBudget = updatedBudgets.find((b) => b.id === budget.id);

      localStorage.setItem('budgie_budgets', JSON.stringify(updatedBudgets));

      toast.success('Budget updated successfully');

      onUpdate?.(updatedBudget);
      onClose?.();
    } catch (err) {
      toast.error('Failed to update budget');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !budget) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-gradient-to-b from-emerald-50 to-white dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 p-6 rounded-xl w-full max-w-md shadow-xl">
        <h3 className="text-lg font-semibold mb-4">Edit Budget</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Budget name"
            className="w-full border dark:border-gray-600 px-3 py-2 rounded-lg bg-transparent focus:outline-none"
            required
          />

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Budgeted Amount"
            min="0"
            className="w-full border dark:border-gray-600 px-3 py-2 rounded-lg bg-transparent focus:outline-none"
            required
          />

          <input
            type="number"
            name="spent"
            value={formData.spent}
            onChange={handleChange}
            placeholder="Spent Amount"
            min="0"
            max={formData.amount || undefined}
            className="w-full border dark:border-gray-600 px-3 py-2 rounded-lg bg-transparent focus:outline-none"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 px-3 py-2 rounded-lg bg-transparent focus:outline-none"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 px-3 py-2 rounded-lg bg-transparent focus:outline-none"
          />

          <div className="relative">
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes (optional)"
              rows={3}
              maxLength={200}
              className="w-full border dark:border-gray-600 px-3 py-2 rounded-lg bg-transparent focus:outline-none"
            />
            <div className="text-sm text-right mt-1 text-gray-500 dark:text-gray-400">
              {formData.notes.length}/200 characters
            </div>
            {formData.notes.length >= 180 && (
              <div className="mt-1 text-xs text-red-500 dark:text-red-400">
                You're approaching the 200 character limit
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center min-w-[100px]"
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBudgetModal;
