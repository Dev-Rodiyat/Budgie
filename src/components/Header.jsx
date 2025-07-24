import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { Dialog } from '@headlessui/react';
import TrackFi from './../assets/Budgie.png'

export default function Header() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav className="bg-white shadow-md py-4 lg:px-28 px-6 flex justify-between items-center fixed top-0 w-full z-50 print:hidden">
                <Link to="/" className="text-2xl font-bold text-emerald-600">
                    <img src={TrackFi} alt="TrackFi" className="h-10 w-auto" />
                </Link>
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className={`font-medium ${isActive('/') ? 'text-emerald-500' : 'text-gray-600 hover:text-emerald-600'}`}>Home</Link>
                    <Link to="/about" className={`font-medium ${isActive('/about') ? 'text-emerald-500' : 'text-gray-600 hover:text-emerald-600'}`}>About</Link>
                    <Link to="/dashboard" className={`font-medium ${isActive('/dashboard') ? 'text-emerald-500' : 'text-gray-600 hover:text-emerald-600'}`}>Dashboard</Link>
                    <Link to="/my-budgets" className={`font-medium ${isActive('/my-budgets') ? 'text-emerald-500' : 'text-gray-600 hover:text-emerald-600'}`}>My budgets</Link>
                    <Link to="/analytics" className={`font-medium ${isActive('/analytics') ? 'text-emerald-500' : 'text-gray-600 hover:text-emerald-600'}`}>Analytics</Link>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(true)}>
                        <FiMenu className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
            </nav>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 md:hidden">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-start justify-end p-4">
                    <Dialog.Panel className="bg-white w-2/3 p-6 shadow-lg rounded-lg space-y-4 relative">
                        {/* Close Icon */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                        >
                            <FiX className="w-6 h-6" />
                        </button>

                        <Link to="/" className={`block ${isActive('/') ? 'text-emerald-500' : 'text-gray-800 hover:text-emerald-600'}`} onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/about" className={`block ${isActive('/about') ? 'text-emerald-500' : 'text-gray-800 hover:text-emerald-600'}`} onClick={() => setIsOpen(false)}>About</Link>
                        <Link to="/dashboard" className={`block ${isActive('/dashboard') ? 'text-emerald-500' : 'text-gray-600 hover:text-emerald-600'}`} onClick={() => setIsOpen(false)}>Dashboard</Link>
                        <Link to="/my-budgets" className={`block ${isActive('/my-budgets') ? 'text-emerald-500' : 'text-gray-600 hover:text-emerald-600'}`} onClick={() => setIsOpen(false)}>My budgets</Link>
                        <Link to="/analytics" className={`block ${isActive('/analytics') ? 'text-emerald-500' : 'text-gray-800 hover:text-emerald-600'}`} onClick={() => setIsOpen(false)}>Analytics</Link>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}
