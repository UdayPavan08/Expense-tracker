import { useState, useMemo, useCallback } from "react";
import { FinanceProvider, useFinance } from "./context/FinanceContext";
import { fmt, exportCSV } from "./utils/helpers";
import StatCard from "./components/StatCard";
import Tabs from "./components/Tabs";
import OverviewTab from "./components/tabs/OverviewTab";
import ExpensesTab from "./components/tabs/ExpensesTab";
import IncomesTab from "./components/tabs/IncomesTab";
import BudgetTab from "./components/tabs/BudgetTab";
import MonthlyStats from "./components/MonthlyStats";
import Section from "./components/Section";

function App() {
  const { state, dispatch } = useFinance();
  const { expenses, incomes } = state;
  const [tab, setTab] = useState("Overview");
  const [dark, setDark] = useState(() => localStorage.getItem("ft_dark") === "true");

  // Sync dark mode with the <html> element and localStorage
  const toggleDark = useCallback(() => {
    setDark(prev => {
      const next = !prev;
      localStorage.setItem("ft_dark", String(next));
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  }, []);

  // Apply dark class on first render
  useMemo(() => {
    if (dark) document.documentElement.classList.add("dark");
  }, []);

  const totalIncome   = useMemo(() => incomes.reduce((s, i)  => s + i.amount, 0), [incomes]);
  const totalExpenses = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const balance       = totalIncome - totalExpenses;

  const delExpense = useCallback(id => dispatch({ type: "DELETE_EXPENSE", id }), [dispatch]);
  const delIncome  = useCallback(id => dispatch({ type: "DELETE_INCOME",  id }), [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 transition-colors">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <div>
            <h1 className="text-2xl font-bold text-purple-700 dark:text-purple-400">💸 Finance Tracker</h1>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Track expenses, income &amp; budgets</p>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <button
              onClick={() => exportCSV(expenses, "expenses.csv")}
              className="text-xs px-3 py-1.5 rounded-xl border-2 border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition font-medium"
            >
              ⬇ Expenses CSV
            </button>
            <button
              onClick={() => exportCSV(incomes, "incomes.csv")}
              className="text-xs px-3 py-1.5 rounded-xl border-2 border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition font-medium"
            >
              ⬇ Incomes CSV
            </button>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              title={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="text-lg px-2.5 py-1.5 rounded-xl border-2 border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition"
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard
            label="Balance"
            value={fmt(balance)}
            color={balance >= 0 ? "#7C3AED" : "#EF4444"}
            sub={balance >= 0 ? "You're doing great!" : "Overspending!"}
          />
          <StatCard label="Total Income"   value={fmt(totalIncome)}   color="#7C3AED" />
          <StatCard label="Total Expenses" value={fmt(totalExpenses)} color="#EC4899" />
          <StatCard label="Transactions"   value={expenses.length + incomes.length} sub="all time" />
        </div>

        {/* Tabs */}
        <Tabs
          tabs={["Overview", "Expenses", "Incomes", "Budget", "Monthly Stats"]}
          active={tab}
          onChange={setTab}
        />

        {/* Tab Content */}
        {tab === "Overview"      && <OverviewTab expenses={expenses} incomes={incomes} onDeleteExpense={delExpense} />}
        {tab === "Expenses"      && <ExpensesTab expenses={expenses} onDelete={delExpense} />}
        {tab === "Incomes"       && <IncomesTab  incomes={incomes}   onDelete={delIncome} />}
        {tab === "Budget"        && <BudgetTab   expenses={expenses} />}
        {tab === "Monthly Stats" && (
          <Section title="Monthly Stats">
            <MonthlyStats expenses={expenses} incomes={incomes} />
          </Section>
        )}

      </div>
    </div>
  );
}

export default function Root() {
  return (
    <FinanceProvider>
      <App />
    </FinanceProvider>
  );
}