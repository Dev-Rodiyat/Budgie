import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2, FiSearch, FiX, FiDownload, FiPrinter } from 'react-icons/fi';
import CreateBudgetForm from '../components/CreateBudgetForm';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import EditBudgetModal from '../components/EditBudgetModal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyBudgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedBudget, setSelectedBudget] = useState(null);
    const printRef = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('budgie_budgets') || '[]');
        setBudgets(saved);
    }, []);

    useEffect(() => {
        let filteredData = budgets;

        if (search) {
            filteredData = filteredData.filter(b =>
                b.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (categoryFilter) {
            filteredData = filteredData.filter(b => b.category === categoryFilter);
        }
        if (dateFilter) {
            filteredData = filteredData.filter(b => b.dueDate === dateFilter);
        }
        if (statusFilter) {
            filteredData = filteredData.filter(b => b.status === statusFilter);
        }

        filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setFiltered(filteredData);
    }, [search, categoryFilter, dateFilter, statusFilter, budgets]);

    const handleNewBudget = (newBudget) => {
        const updated = [...budgets, newBudget];
        setBudgets(updated);
        localStorage.setItem('budgie_budgets', JSON.stringify(updated));
    };

    const handleUpdateBudget = (updatedBudget) => {
        setBudgets((prev) =>
            prev.map((b) => (b.id === updatedBudget.id ? updatedBudget : b))
        );
    };

    const handleConfirmDelete = () => {
        const updatedBudgets = budgets.filter(b => b.id !== selectedBudget.id);
        setBudgets(updatedBudgets);
        localStorage.setItem('budgie_budgets', JSON.stringify(updatedBudgets));
        setIsDeleteModalOpen(false);
        setSelectedBudget(null);
        toast.success('Budget deleted successfully!')
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        const csv = filtered.map(b =>
            `${b.name},${b.category},${b.amount},${b.spent},${b.amount - b.spent},${b.dueDate}`
        );
        const csvContent = [
            'Name,Category,Amount,Spent,Remaining,Due Date',
            ...csv,
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'budgets.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const categories = [...new Set(budgets.map(b => b.category))];

    return (
        <section className="min-h-screen px-6 py-12 bg-gradient-to-br from-emerald-50 to-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 print:bg-white print:text-black">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-3xl font-bold mb-8 text-center"
                >
                    My Budgets
                </motion.h2>

                <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search budgets..."
                                className="pl-10 pr-8 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                            />
                            {search && (
                                <FiX
                                    onClick={() => setSearch('')}
                                    className="absolute right-2 top-2.5 cursor-pointer text-gray-400 hover:text-gray-600"
                                />
                            )}
                        </div>

                        <select
                            value={categoryFilter}
                            onChange={e => setCategoryFilter(e.target.value)}
                            className="px-3 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat, i) => (
                                <option key={i} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                        >
                            <option value="">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="expired">Expired</option>
                        </select>

                        <input
                            type="date"
                            value={dateFilter}
                            onChange={e => setDateFilter(e.target.value)}
                            className="px-3 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button onClick={handlePrint} className="flex items-center gap-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-sm">
                            <FiPrinter /> Print
                        </button>
                        <button onClick={handleDownload} className="flex items-center gap-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-sm">
                            <FiDownload /> CSV
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium"
                        >
                            + New Budget
                        </button>
                    </div>
                </div>

                <div className="flex justify-end mb-4 gap-2 text-sm">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-1 rounded-md border ${viewMode === 'list'
                            ? 'bg-emerald-500 text-white border-emerald-500'
                            : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                            }`}
                    >
                        List
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`px-3 py-1 rounded-md border ${viewMode === 'grid'
                            ? 'bg-emerald-500 text-white border-emerald-500'
                            : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                            }`}
                    >
                        Grid
                    </button>
                </div>

                <div ref={printRef}>
                    {filtered.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            No budgets found.
                        </p>
                    ) : viewMode === 'list' ? (
                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <table className="min-w-full text-sm text-left">
                                <thead className="bg-emerald-100 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Name</th>
                                        <th className="px-6 py-4 font-semibold">Category</th>
                                        <th className="px-6 py-4 font-semibold">Amount</th>
                                        <th className="px-6 py-4 font-semibold">Spent</th>
                                        <th className="px-6 py-4 font-semibold">Remaining</th>
                                        <th className="px-6 py-4 font-semibold">Due</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {filtered.map((b) => {
                                        const remaining = b.amount - b.spent;
                                        return (
                                            <tr
                                                key={b.id}
                                                onClick={() => navigate(`/budget/${b?.id}`)}
                                                className="hover:bg-emerald-50/50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                                            >
                                                <td className="px-6 py-4">{b.name}</td>
                                                <td className="px-6 py-4">{b.category}</td>
                                                <td className="px-6 py-4 font-medium text-emerald-600 dark:text-emerald-400">
                                                    ₦{b.amount.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-yellow-600 dark:text-yellow-400">
                                                    ₦{b.spent.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-green-600 dark:text-green-400">
                                                    ₦{remaining.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4">{b.dueDate}</td>
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
                                                        {b?.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-3 items-center">
                                                        <button
                                                            title={b.status === 'expired' ? 'Budget expired' : 'Edit'}
                                                            disabled={b.status === 'expired'}
                                                            className={`text-blue-500 hover:text-blue-600 transition ${b.status === 'expired' ? 'opacity-40 cursor-not-allowed' : ''}`}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (b.status !== 'expired') {
                                                                    setSelectedBudget(b);
                                                                    setIsEditOpen(true);
                                                                }
                                                            }}
                                                        >
                                                            <FiEdit size={18} />
                                                        </button>

                                                        <button
                                                            title="Delete"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedBudget(b);
                                                                setIsDeleteModalOpen(true);
                                                            }}
                                                            className="text-red-500 hover:text-red-600"
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filtered.map((b) => {
                                const remaining = b.amount - b.spent;
                                return (
                                    <div
                                        key={b.id}
                                        onClick={() => navigate(`/budget/${b?.id}`)}
                                        className="border rounded-xl p-4 bg-emerald-100 dark:bg-gray-800 shadow cursor-pointer"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-bold text-lg">{b.name}</h3>
                                            <div className="flex gap-2">
                                                <button
                                                    title="Edit"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedBudget(b);
                                                        setIsEditOpen(true);
                                                    }}
                                                    className="text-blue-500 hover:text-blue-600 transition"
                                                >
                                                    <FiEdit size={18} />
                                                </button>
                                                <button
                                                    title="Delete"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedBudget(b);
                                                        setIsDeleteModalOpen(true);
                                                    }}
                                                    className="text-red-500 hover:text-red-600"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500">Category: {b.category}</p>
                                        <p className="text-sm">Amount: ₦{b.amount.toLocaleString()}</p>
                                        <p className="text-sm">Spent: ₦{b.spent.toLocaleString()}</p>
                                        <p className="text-sm">Remaining: ₦{remaining.toLocaleString()}</p>
                                        {b.dueDate && <p className="text-xs text-gray-500 mt-2">Due: {b.dueDate}</p>}
                                        <p className="px-4 py-3">
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full font-semibold
                                                            ${b.status === 'expired'
                                                        ? 'bg-red-200 text-red-600'
                                                        : b.status === 'upcoming'
                                                            ? 'bg-yellow-200 text-yellow-600'
                                                            : 'bg-emerald-200 text-emerald-600'
                                                    }
                                `}
                                            >
                                                {b?.status && b?.status}
                                            </span>
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <EditBudgetModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                budget={selectedBudget}
                onUpdate={handleUpdateBudget}
            />
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                itemName={selectedBudget?.name}
            />
            {isModalOpen && (
                <CreateBudgetForm
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleNewBudget}
                />
            )}
        </section>
    );
};

export default MyBudgets;
