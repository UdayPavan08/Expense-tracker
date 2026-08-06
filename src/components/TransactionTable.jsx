import { useState, useMemo } from "react";
import Badge from "./Badge";
import { fmt } from "../utils/helpers";

const PAGE_SIZE = 7;

function DeleteBtn({ onClick }) {
  return (
    <button
      aria-label="Delete transaction"
      onClick={() => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
          onClick();
        }
      }}
      className="text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 transition-colors font-bold text-sm px-1"
    >
      ✕
    </button>
  );
}

function TransactionTable({ rows, columns, onDelete, colorMap, typeKey }) {
  const [search, setSearch] = useState("");
  const [sort, setSort]     = useState("date-desc");
  const [filter, setFilter] = useState("All");
  const [page, setPage]     = useState(1);

  const tags = useMemo(() => ["All", ...new Set(rows.map(r => r[typeKey]))], [rows, typeKey]);

  const filtered = useMemo(() => {
    let data = [...rows];
    if (filter !== "All") data = data.filter(r => r[typeKey] === filter);
    if (search) data = data.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === "date-desc")   data.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === "date-asc")    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sort === "amount-desc") data.sort((a, b) => b.amount - a.amount);
    if (sort === "amount-asc")  data.sort((a, b) => a.amount - b.amount);
    return data;
  }, [rows, filter, search, sort, typeKey]);

  const pages  = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const sliced = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <input
          className="text-sm px-3 py-1.5 rounded-xl border-2 border-purple-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-500 focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 w-40 transition-colors"
          placeholder="Search…"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <select
          className="text-sm px-3 py-1.5 rounded-xl border-2 border-purple-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 transition-colors"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amount-desc">Highest amount</option>
          <option value="amount-asc">Lowest amount</option>
        </select>
        <div className="flex gap-1 flex-wrap">
          {tags.map(t => (
            <button
              key={t}
              onClick={() => { setFilter(t); setPage(1); }}
              className={`text-xs px-3 py-1 rounded-full border transition font-medium ${
                filter === t
                  ? "bg-purple-600 border-purple-600 text-white"
                  : "border-purple-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-purple-400 dark:hover:border-purple-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              {columns.map(c => (
                <th key={c} className="text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide pb-2 border-b border-purple-100 dark:border-gray-700 px-2">
                  {c}
                </th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {sliced.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl">🔍</span>
                    <span>No entries found.</span>
                  </div>
                </td>
              </tr>
            )}
            {sliced.map(r => (
              <tr key={r.id} className="border-b border-purple-50 dark:border-gray-700 hover:bg-purple-50/40 dark:hover:bg-gray-700/40 transition">
                <td className="px-2 py-3 text-gray-400 dark:text-gray-500 whitespace-nowrap">{r.date}</td>
                <td className="px-2 py-3 font-medium text-gray-700 dark:text-gray-200">{r.name}</td>
                <td className="px-2 py-3 text-gray-500 dark:text-gray-400">{r.month}</td>
                <td className="px-2 py-3">
                  <Badge
                    label={r[typeKey]}
                    color={colorMap[r[typeKey]] || "#888"}
                    bg={(colorMap[r[typeKey]] || "#888") + "22"}
                  />
                </td>
                <td className="px-2 py-3 text-right font-bold text-purple-700 dark:text-purple-400">{fmt(r.amount)}</td>
                <td className="px-2 py-3"><DeleteBtn onClick={() => onDelete(r.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex gap-1 justify-center mt-4 flex-wrap">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`text-xs px-3 py-1 rounded-full border transition font-medium ${
                page === i + 1
                  ? "bg-purple-600 border-purple-600 text-white"
                  : "border-purple-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-purple-400"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default TransactionTable;