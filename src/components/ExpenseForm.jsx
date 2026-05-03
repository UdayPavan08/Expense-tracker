import { useState } from "react";

function ExpenseForm({ onAddExpense }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !amount) {
      alert("Please fill all fields!");
      return;
    }
    const newExpense = {
      id: Date.now(),
      name,
      amount: Number(amount),
      category,
    };
    onAddExpense(newExpense);
    setName("");
    setAmount("");
    setCategory("Food");
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-purple-700 mb-4">➕ Add Expense</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Expense name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-purple-200 rounded-xl p-3 focus:outline-none focus:border-purple-500"
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border-2 border-purple-200 rounded-xl p-3 focus:outline-none focus:border-purple-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-2 border-purple-200 rounded-xl p-3 focus:outline-none focus:border-purple-500"
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Other</option>
        </select>
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;