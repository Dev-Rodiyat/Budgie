import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateBudgetForm from '../components/CreateBudgetForm';
import { FaArrowsRotate } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'framer-motion';

const tips = [
    "Track every naira you spend - awareness is power.",
    "Don't save what is left after spending. Spend what is left after saving.",
    "A budget tells your money where to go instead of wondering where it went.",
    "Set financial goals - short-term and long-term.",
    "Avoid impulse purchases. Always pause and think first.",
    "Separate your needs from your wants.",
    "Review your budget every week - consistency wins.",
    "Try the 50/30/20 rule for budgeting.",
];

const Dashboard = () => {
    const [budgets, setBudgets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('budgie_budgets');
        setBudgets(stored ? JSON.parse(stored) : []);
    }, []);

    const todayIndex = new Date().getDate() % tips.length;
    const dailyTip = tips[todayIndex];

    const [tipIndex, setTipIndex] = useState(todayIndex);

    const handleNextTip = () => {
        setTipIndex((prev) => (prev + 1) % tips.length);
    };

    const handleNewBudget = (newBudget) => {
        setBudgets((prev) => [...prev, newBudget]);
    };

    const latestBudgets = [...budgets].slice(-3).reverse();

    const totalBudget = budgets.reduce((acc, b) => acc + b.amount, 0);
    const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
    const totalRemaining = totalBudget - totalSpent;

    return (
        <section className="min-h-screen px-4 md:px-6 py-10 bg-gradient-to-br from-emerald-50 to-white text-gray-800">
            <div className="max-w-6xl mx-auto space-y-10">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium"
                    >
                        + New Budget
                    </button>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-emerald-100 p-6 rounded-xl shadow">
                        <p className="text-sm mb-1">Total Budget</p>
                        <p className="text-2xl font-bold">${totalBudget.toLocaleString()}</p>
                    </div>
                    <div className="bg-red-100 p-6 rounded-xl shadow">
                        <p className="text-sm mb-1">Total Spent</p>
                        <p className="text-2xl font-bold">${totalSpent.toLocaleString()}</p>
                    </div>
                    <div className="bg-blue-100 p-6 rounded-xl shadow">
                        <p className="text-sm mb-1">Remaining</p>
                        <p className="text-2xl font-bold">${totalRemaining.toLocaleString()}</p>
                    </div>
                </div>

                <div className="bg-emerald-50 rounded-xl p-6 shadow border">
                    <h2 className="text-lg font-semibold mb-3">💡 Budgeting Tip of the Day</h2>
                    <div className="flex justify-between items-start w-full gap-2">
                        <div className="flex-1 min-h-[2.5rem]">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={tipIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-sm italic text-gray-700"
                                >
                                    "{tips[tipIndex]}"
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={handleNextTip}
                            className="text-emerald-600 text-sm hover:rotate-180 transition-transform duration-300"
                            aria-label="Next Tip"
                        >
                            <FaArrowsRotate />
                        </button>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-xl font-semibold mb-4">Latest Budgets</h2>
                    {latestBudgets.length === 0 ? (
                        <p className="text-gray-500">No budgets yet.</p>
                    ) : (
                        <div className="overflow-x-auto rounded-lg shadow border border-emerald-200">
                            <table className="w-full text-sm">
                                <thead className="bg-emerald-100 text-gray-600 uppercase text-left">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Category</th>
                                        <th className="px-4 py-3">Amount</th>
                                        <th className="px-4 py-3">Spent</th>
                                        <th className="px-4 py-3">Remaining</th>
                                        <th className="px-4 py-3">Due</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-emerald-100">
                                    {latestBudgets.map((b) => (
                                        <tr key={b.id} className="hover:bg-emerald-50">
                                            <td className="px-4 py-3 font-medium">{b.name}</td>
                                            <td className="px-4 py-3">{b.category}</td>
                                            <td className="px-4 py-3">${b.amount.toFixed(2)}</td>
                                            <td className="px-4 py-3">${b.spent.toFixed(2)}</td>
                                            <td className="px-4 py-3">${(b.amount - b.spent).toFixed(2)}</td>
                                            <td className="px-4 py-3">{b.dueDate || '-'}</td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full font-semibold
                                    ${b.status === 'expired'
                                                            ? 'bg-red-100 text-red-600'
                                                            : b.status === 'upcoming'
                                                                ? 'bg-yellow-100 text-yellow-600'
                                                                : 'bg-emerald-100 text-emerald-600'
                                                        }
                                `}
                                                >
                                                    {b.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {budgets.length > 3 && (
                        <div className="mt-4 text-right">
                            <Link to="/my-budgets" className="text-emerald-600 hover:underline font-medium">
                                View All Budgets →
                            </Link>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Create Budget Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white text-gray-800 p-6 rounded-xl w-full max-w-md shadow-xl"
                    >
                        <h3 className="text-lg font-semibold mb-4">Create New Budget</h3>
                        <CreateBudgetForm
                            onClose={() => setIsModalOpen(false)}
                            onSuccess={handleNewBudget}
                        />
                    </motion.div>
                </div>
            )}
        </section>
    );
};

export default Dashboard;
