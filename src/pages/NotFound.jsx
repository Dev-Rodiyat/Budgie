import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();
  const hasHistory = useRef(false);

  useEffect(() => {
    hasHistory.current = window.history.length > 1;
  }, []);

  const handleBack = () => {
    if (hasHistory.current) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 dark:bg-slate-900 text-gray-900 dark:text-white px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl text-center"
      >
        <h1 className="text-6xl font-bold text-emerald-500 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>
        <button
          onClick={handleBack}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-medium transition"
        >
          Go Back
        </button>
      </motion.div>
    </div>
  );
}
