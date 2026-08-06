function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 border-b border-purple-100 dark:border-gray-700 mb-5 overflow-x-auto scrollbar-none">
      {tabs.map(t => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
            active === t
              ? "border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400"
              : "border-transparent text-gray-400 hover:text-purple-400 dark:text-gray-500 dark:hover:text-purple-400"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export default Tabs;