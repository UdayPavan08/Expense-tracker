function Section({ title, children, action }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100 mb-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{title}</p>
        {action}
      </div>
      {children}
    </div>
  );
}

export default Section;