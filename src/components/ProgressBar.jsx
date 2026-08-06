import { fmt } from "../utils/helpers";

function ProgressBar({ label, spent, budget }) {
  const pct   = Math.min(100, Math.round((spent / budget) * 100));
  const color = pct > 90 ? "#EF4444" : pct > 70 ? "#F59E0B" : "#7C3AED";

  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1">
        <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="font-semibold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-purple-100 dark:bg-gray-700">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
        <span>{fmt(spent)} spent</span>
        <span>Budget {fmt(budget)}</span>
      </div>
    </div>
  );
}

export default ProgressBar;