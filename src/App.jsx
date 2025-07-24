import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Analytics from './pages/Analytics';
import Dashboard from './pages/Dashboard';
import MyBudgets from './pages/MyBudgets';
import BudgetDetails from './pages/BudgetDetails';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-budgets" element={<MyBudgets />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="/budget/:id" element={<BudgetDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}