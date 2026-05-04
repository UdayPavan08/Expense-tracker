import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MONTHS } from "../constants";
import { fmt } from "../utils/helpers";

function MonthlyBar({ expenses, incomes }) {
  const data = useMemo(() => {
    const map = {};
    MONTHS.forEach(m => { map[m] = { month: m, expenses: 0, income: 0 }; });
    expenses.forEach(e => { if (map[e.month]) map[e.month].expenses += e.amount; });
    incomes.forEach(i  => { if (map[i.month]) map[i.month].income  += i.amount; });
    return Object.values(map).filter(d => d.expenses > 0 || d.income > 0);
  }, [expenses, incomes]);

  if (!data.length) {
    return <p className="text-gray-400 text-sm text-center py-8">No data yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barGap={2}>
        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
        <YAxis
          tick={{ fontSize: 11 }}
          tickFormatter={v => "₹" + Math.round(v / 1000) + "k"}
        />
        <Tooltip formatter={v => fmt(v)} />
        <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="income"   name="Income"   fill="#7C3AED" radius={[3,3,0,0]} />
        <Bar dataKey="expenses" name="Expenses" fill="#EC4899" radius={[3,3,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default MonthlyBar;