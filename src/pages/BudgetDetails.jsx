import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiTrash2, FiPrinter, FiDownload } from 'react-icons/fi';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import EditBudgetModal from '../components/EditBudgetModal';
import { toPng } from 'html-to-image';

const COLORS = ['#10B981', '#EF4444']; // green, red

const BudgetDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [budget, setBudget] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const chartRef = useRef();

    useEffect(() => {
        const budgets = JSON.parse(localStorage.getItem('budgie_budgets')) || [];
        const found = budgets.find((item) => item?.id?.toString() === id?.toString());
        setBudget(found);
    }, [id]);

    const handleDelete = () => {
        const budgets = JSON.parse(localStorage.getItem('budgie_budgets')) || [];
        const updated = budgets.filter((item) => item.id !== budget.id);
        localStorage.setItem('budgie_budgets', JSON.stringify(updated));
        setIsDeleteOpen(false);
        navigate('/my-budgets');
    };

    const handleDownload = () => {
        if (chartRef.current) {
            toPng(chartRef.current).then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `${budget.name}-details.png`;
                link.href = dataUrl;
                link.click();
            });
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (!budget) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center text-gray-500 dark:text-gray-300">
                Budget not found
            </div>
        );
    }

    const { name, amount, spent = 0, category, dueDate, status, notes } = budget;
    const remaining = amount - spent;
    const data = [
        { name: 'Spent', value: spent },
        { name: 'Remaining', value: remaining > 0 ? remaining : 0 },
    ];

    return (
        <div className="min-h-screen px-4 py-6 bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
            <button
                onClick={() => navigate('/my-budgets')}
                className="flex items-center text-sm text-emerald-600 dark:text-emerald-400 mb-4 hover:underline print:hidden"
            >
                <FiArrowLeft className="mr-1" /> Back
            </button>

            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg space-y-6" ref={chartRef}>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">{name}</h2>
                    <div className="flex gap-3">
                        <button onClick={() => setIsEditOpen(true)} title="Edit" className="text-blue-500 hover:text-blue-600">
                            <FiEdit size={18} />
                        </button>
                        <button onClick={() => setIsDeleteOpen(true)} title="Delete" className="text-red-500 hover:text-red-600">
                            <FiTrash2 size={18} />
                        </button>
                        <button onClick={handlePrint} title="Print" className="text-gray-500 hover:text-gray-700">
                            <FiPrinter size={18} />
                        </button>
                        <button onClick={handleDownload} title="Download" className="text-gray-500 hover:text-gray-700">
                            <FiDownload size={18} />
                        </button>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Amount Budgeted</p>
                        <p className="font-medium text-lg">₦{amount.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Amount Spent</p>
                        <p className="font-medium text-lg text-red-500">₦{spent.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Remaining</p>
                        <p className="font-medium text-lg text-green-600">₦{remaining.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Category</p>
                        <p className="font-medium">{category}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Due Date</p>
                        <p className="font-medium">{dueDate || 'Not set'}</p>
                    </div>
                    <p className="px-4 py-3">
                        <p className="text-gray-500 dark:text-gray-400">Status</p>
                        <span
                            className={`text-xs px-2 py-1 rounded-full font-semibold
                                                            ${status === 'expired'
                                    ? 'bg-red-200 text-red-600'
                                    : status === 'upcoming'
                                        ? 'bg-yellow-200 text-yellow-600'
                                        : 'bg-emerald-200 text-emerald-600'
                                }
                                `}
                        >
                            {status && status}
                        </span>
                    </p>
                </div>

                {notes && (
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 mb-1">Notes</p>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-3 text-sm">
                            {notes}
                        </div>
                    </div>
                )}

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                label
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {isDeleteOpen && (
                <DeleteConfirmModal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={handleDelete}
                    itemName={budget.name}
                />
            )}

            {isEditOpen && (
                <EditBudgetModal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    budget={budget}
                    onUpdate={(updated) => setBudget(updated)}
                />
            )}
        </div>
    );
};

export default BudgetDetails;
