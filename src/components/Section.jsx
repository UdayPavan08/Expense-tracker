function Section({ title, children, action }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-purple-100 dark:border-gray-700 mb-4 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{title}</p>
        {action}
      </div>
      {children}
    </div>
  );
}

export default Section;