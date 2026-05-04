import { useState, useMemo, useCallback } from "react";
import { FinanceProvider, useFinance } from "./context/FinanceContext";
import { BUDGETS, CATEGORY_COLORS, SOURCE_COLORS } from "./constants";
import { fmt, exportCSV } from "./utils/helpers";
import StatCard from "./components/StatCard";
import ProgressBar from "./components/ProgressBar";
import Section from "./components/Section";
import Tabs from "./components/Tabs";
import AddExpenseForm from "./components/AddExpenseForm";
import AddIncomeForm from "./components/AddIncomeForm";
import TransactionTable from "./components/TransactionTable";
import CategoryDonut from "./components/CategoryDonut";
import MonthlyBar from "./components/MonthlyBar";
import MonthlyStats from "./components/MonthlyStats";

function App() {
  const { state, dispatch } = useFinance();
  const { expenses, incomes } = state;
  const [tab, setTab] = useState("Overview");

  const totalIncome   = useMemo(() => incomes.reduce((s, i) => s + i.amount, 0),  [incomes]);
  const totalExpenses = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const balance       = totalIncome - totalExpenses;

  const delExpense = useCallback(id => dispatch({ type: "DELETE_EXPENSE", id }), [dispatch]);
  const delIncome  = useCallback(id => dispatch({ type: "DELETE_INCOME",  id }), [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <div>
            <h1 className="text-2xl font-bold text-purple-700">💸 Finance Tracker</h1>
            <p className="text-xs text-gray-400 mt-0.5">Track expenses, income & budgets</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => exportCSV(expenses, "expenses.csv")}
              className="text-xs px-3 py-1.5 rounded-xl border-2 border-purple-200 text-purple-600 hover:bg-purple-50 transition font-medium"
            >
              ⬇ Expenses CSV
            </button>
            <button
              onClick={() => exportCSV(incomes, "incomes.csv")}
              className="text-xs px-3 py-1.5 rounded-xl border-2 border-purple-200 text-purple-600 hover:bg-purple-50 transition font-medium"
            >
              ⬇ Incomes CSV
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

        {/* Overview */}
        {tab === "Overview" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <Section title="Spending by Category">
                <CategoryDonut expenses={expenses} />
              </Section>
              <Section title="Monthly Trend">
                <MonthlyBar expenses={expenses} incomes={incomes} />
              </Section>
            </div>
            <Section title="Recent Expenses">
              <TransactionTable
                rows={expenses.slice(0, 5)}
                columns={["Date", "Name", "Month", "Category", "Amount"]}
                onDelete={delExpense}
                colorMap={CATEGORY_COLORS}
                typeKey="category"
              />
            </Section>
          </>
        )}

        {/* Expenses */}
        {tab === "Expenses" && (
          <>
            <AddExpenseForm />
            <Section
              title={`Expenses (${expenses.length})`}
              action={
                <button
                  onClick={() => exportCSV(expenses, "expenses.csv")}
                  className="text-xs px-3 py-1 rounded-xl border border-purple-200 text-purple-600 hover:bg-purple-50 transition"
                >
                  ⬇ CSV
                </button>
              }
            >
              <TransactionTable
                rows={expenses}
                columns={["Date", "Name", "Month", "Category", "Amount"]}
                onDelete={delExpense}
                colorMap={CATEGORY_COLORS}
                typeKey="category"
              />
            </Section>
          </>
        )}

        {/* Incomes */}
        {tab === "Incomes" && (
          <>
            <AddIncomeForm />
            <Section
              title={`Incomes (${incomes.length})`}
              action={
                <button
                  onClick={() => exportCSV(incomes, "incomes.csv")}
                  className="text-xs px-3 py-1 rounded-xl border border-purple-200 text-purple-600 hover:bg-purple-50 transition"
                >
                  ⬇ CSV
                </button>
              }
            >
              <TransactionTable
                rows={incomes}
                columns={["Date", "Name", "Month", "Source", "Amount"]}
                onDelete={delIncome}
                colorMap={SOURCE_COLORS}
                typeKey="source"
              />
            </Section>
          </>
        )}

        {/* Budget */}
        {tab === "Budget" && (
          <Section title="Budget Tracker">
            <p className="text-xs text-gray-400 mb-5">
              Tracking spending against your monthly budgets per category.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
              {Object.entries(BUDGETS).map(([cat, budget]) => {
                const spent = expenses
                  .filter(e => e.category === cat)
                  .reduce((s, e) => s + e.amount, 0);
                return <ProgressBar key={cat} label={cat} spent={spent} budget={budget} />;
              })}
            </div>
          </Section>
        )}

        {/* Monthly Stats */}
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