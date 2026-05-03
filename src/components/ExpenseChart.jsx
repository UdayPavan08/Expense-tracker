import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

function ExpenseChart({ expenses }) {
  // group expenses by category
  const data = expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  if (expenses.length === 0) {
    return <p>Add expenses to see chart!</p>;
  }

  return (
    <div>
      <h2>Spending by Category</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `₹${value}`} />
        <Legend />
      </PieChart>
    </div>
  );
}

export default ExpenseChart;