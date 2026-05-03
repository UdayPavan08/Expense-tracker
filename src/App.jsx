import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import TotalAmount from "./components/TotalAmount";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [expenses, setExpenses] = useState([]);

  function handleAddExpense(newExpense) {
    setExpenses([...expenses, newExpense]);
  }

  function handleDeleteExpense(id) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
        💸 Expense Tracker
      </h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
        <TotalAmount expenses={expenses} />
        <ExpenseForm onAddExpense={handleAddExpense} />
        <ExpenseChart expenses={expenses} />
        <ExpenseList
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </div>
    </div>
  );
}

export default App;