import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg text-center text-gray-400">
        No expenses yet! Add one above. 💰
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-purple-700 mb-4">📋 Expenses</h2>
      <div className="flex flex-col gap-3">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDeleteExpense={onDeleteExpense}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;