import { useMemo } from "react";
import { MONTHS } from "../constants";
import { fmt } from "../utils/helpers";

function MonthlyStats({ expenses, incomes }) {
  const stats = useMemo(() => {
    const map = {};
    MONTHS.forEach(m => { map[m] = { month: m, income: 0, expenses: 0 }; });
    expenses.forEach(e => { if (map[e.month]) map[e.month].expenses += e.amount; });
    incomes.forEach(i  => { if (map[i.month]) map[i.month].income  += i.amount; });
    return Object.values(map).filter(d => d.expenses > 0 || d.income > 0).reverse();
  }, [expenses, incomes]);

  if (!stats.length) {
    return <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-8">No data yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {["Month", "Income", "Expenses", "Balance", "Savings Rate"].map(h => (
              <th key={h} className="text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide pb-2 border-b border-purple-100 dark:border-gray-700 px-2">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stats.map(s => {
            const bal  = s.income - s.expenses;
            const rate = s.income > 0 ? Math.round((bal / s.income) * 100) : 0;
            return (
              <tr key={s.month} className="border-b border-purple-50 dark:border-gray-700 hover:bg-purple-50/40 dark:hover:bg-gray-700/40 transition">
                <td className="px-2 py-3 font-semibold text-gray-700 dark:text-gray-200">{s.month}</td>
                <td className="px-2 py-3 font-bold text-purple-600 dark:text-purple-400">{fmt(s.income)}</td>
                <td className="px-2 py-3 font-bold text-pink-500">{fmt(s.expenses)}</td>
                <td className="px-2 py-3 font-bold" style={{ color: bal >= 0 ? "#7C3AED" : "#EF4444" }}>
                  {fmt(bal)}
                </td>
                <td className="px-2 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    rate >= 20
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                      : rate >= 0
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {rate}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MonthlyStats;