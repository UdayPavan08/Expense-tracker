function TotalAmount({ expenses }) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center shadow-lg">
      <p className="text-lg font-medium opacity-80">Total Spent</p>
      <h2 className="text-5xl font-bold mt-1">₹{total}</h2>
    </div>
  );
}

export default TotalAmount;