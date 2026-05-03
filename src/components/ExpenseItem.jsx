const categoryColors = {
  Food: "bg-orange-100 text-orange-600",
  Travel: "bg-blue-100 text-blue-600",
  Shopping: "bg-pink-100 text-pink-600",
  Bills: "bg-red-100 text-red-600",
  Other: "bg-gray-100 text-gray-600",
};

function ExpenseItem({ expense, onDeleteExpense }) {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-purple-100">
      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${categoryColors[expense.category]}`}>
          {expense.category}
        </span>
        <p className="font-medium text-gray-700">{expense.name}</p>
      </div>
      <div className="flex items-center gap-3">
        <p className="font-bold text-purple-600">₹{expense.amount}</p>
        <button
          onClick={() => onDeleteExpense(expense.id)}
          className="text-red-400 hover:text-red-600 font-bold text-lg transition"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;