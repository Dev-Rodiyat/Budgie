// src/components/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Track Your Spending",
    desc: "Log income and expenses with ease and clarity.",
  },
  {
    title: "Visualize Budgets",
    desc: "Set goals and watch your progress with intuitive charts.",
  },
  {
    title: "Stay in Control",
    desc: "Get alerts and insights to stay on track financially.",
  },
];

export default function Home() {
  return (
    <div className="bg-emerald-50 dark:bg-slate-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* HERO */}
      <section className="min-h-[50vh] flex flex-col justify-center items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Take Control of Your Finances
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-6"
        >
          Budgie helps you track, budget, and manage your money - all in one
          place.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/create-budget"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 bg-white dark:bg-slate-800 transition-colors">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((f, idx) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-emerald-100 dark:bg-slate-700 p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-emerald-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {["Add transactions", "Manage your budget", "View Analytics"].map(
              (step, idx) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="p-6 rounded-lg bg-white dark:bg-slate-800 shadow"
                >
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-emerald-100 dark:bg-emerald-700 text-emerald-700 dark:text-white font-bold rounded-full text-xl">
                    {idx + 1}
                  </div>
                  <h4 className="text-lg font-semibold">{step}</h4>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-emerald-500 text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Ready to Master Your Budget?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg mb-8"
        >
          Join Budgie today and make every naira counts.
        </motion.p>
        <Link
          to="/create-budget"
          className="bg-white text-emerald-600 font-semibold px-6 py-3 rounded-full hover:bg-emerald-100 transition"
        >
          Get Started for Free
        </Link>
      </section>
    </div>
  );
}
