import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CATEGORY_COLORS } from "../constants";
import { fmt } from "../utils/helpers";

function CategoryDonut({ expenses }) {
  const data = useMemo(() => {
    const totals = {};
    expenses.forEach(e => {
      totals[e.category] = (totals[e.category] || 0) + e.amount;
    });
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  if (!data.length) {
    return <p className="text-gray-400 text-sm text-center py-8">No data yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={2}
        >
          {data.map(d => (
            <Cell key={d.name} fill={CATEGORY_COLORS[d.name] || "#888"} />
          ))}
        </Pie>
        <Tooltip formatter={v => fmt(v)} />
        <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CategoryDonut;