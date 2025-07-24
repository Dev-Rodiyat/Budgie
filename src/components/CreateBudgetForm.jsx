import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const categories = ['Food', 'Rent', 'Utilities', 'Savings', 'Entertainment'];

const CreateBudgetForm = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: '',
        dueDate: '',
        notes: '', // ✅ Add notes field
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, amount, category, dueDate } = formData;
        if (!name || !amount || !category) {
            toast.error('Please fill all required fields.');
            return;
        }

        try {
            setLoading(true);

            // ✅ Calculate budget status
            const today = new Date();
            const due = new Date(dueDate);
            let status = 'active';

            if (!dueDate) {
                status = 'active';
            } else if (due < today.setHours(0, 0, 0, 0)) {
                status = 'expired';
            } else if (due.toDateString() === new Date().toDateString()) {
                status = 'active';
            } else {
                status = 'upcoming';
            }

            const newBudget = {
                id: Date.now(),
                ...formData,
                amount: parseFloat(amount),
                spent: 0,
                status, // ✅ Add calculated status
            };

            const existing = JSON.parse(localStorage.getItem('budgie_budgets')) || [];
            const updated = [...existing, newBudget];
            localStorage.setItem('budgie_budgets', JSON.stringify(updated));

            toast.success('Budget created successfully!');
            onSuccess?.(newBudget);
            onClose?.();
        } catch (error) {
            toast.error('Failed to create budget.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-xl w-full max-w-md shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Create New Budget</h3>
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
                        placeholder="Amount"
                        min="0"
                        className="w-full border dark:border-gray-600 px-3 py-2 rounded-lg bg-transparent focus:outline-none"
                        required
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

                    <div className="flex justify-end gap-3">
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
                            {loading ? <ClipLoader size={20} color="#fff" /> : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBudgetForm;
