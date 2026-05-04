function StatCard({ label, value, color, sub }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100 flex flex-col gap-1">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold" style={{ color: color || "#7C3AED" }}>{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

export default StatCard;