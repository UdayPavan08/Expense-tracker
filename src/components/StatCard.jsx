function StatCard({ label, value, color, sub }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-purple-100 dark:border-gray-700 flex flex-col gap-1 transition-colors">
      <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold" style={{ color: color || "#7C3AED" }}>{value}</p>
      {sub && <p className="text-xs text-gray-400 dark:text-gray-500">{sub}</p>}
    </div>
  );
}

export default StatCard;