// src/pages/About.jsx
import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Is Budgie free to use?",
    answer: "Yes! Budgie is completely free for individual users. Premium features may be added in the future.",
  },
  {
    question: "Can I use Budgie without creating an account?",
    answer: "Yes, data is securely stored on your browser easing the stress of creating an account",
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely. We take data privacy seriously and do not have any access to any of your data.",
  },
];

export default function About() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-6 py-16 bg-emerald-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-emerald-600">About Budgie</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Budgie is a modern, minimalist budgeting tool that helps you take control of your finances with clarity and ease. Whether you're tracking daily expenses or managing monthly budgets, Budgie makes it effortless.
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-emerald-600">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            We believe everyone deserves simple, powerful tools to manage money without being overwhelmed. Our mission is to empower individuals to build better financial habits through intuitive design and useful insights.
          </p>
        </motion.section>

        {/* Why Budgie Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-emerald-600">Why Budgie?</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-lg space-y-2">
            <li>Simple and clutter-free budgeting experience</li>
            <li>Real-time insights into your spending habits</li>
            <li>Built with privacy and ease-of-use in mind</li>
          </ul>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-emerald-600">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-emerald-300 dark:border-slate-700 rounded-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-4 py-3 flex justify-between items-center font-medium"
                >
                  <span>{faq.question}</span>
                  <span>{openIndex === index ? "−" : "+"}</span>
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 text-gray-600 dark:text-gray-300"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
