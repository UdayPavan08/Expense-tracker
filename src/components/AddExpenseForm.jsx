import { useState, useCallback } from "react";
import { useFinance } from "../context/FinanceContext";
import { EXPENSE_CATEGORIES } from "../constants";
import { today, getMonth } from "../utils/helpers";
import Section from "./Section";

const inputCls =
  "w-full text-sm px-3 py-2 rounded-xl border-2 border-purple-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-500 focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 bg-white text-gray-700 transition";

function AddExpenseForm() {
  const { dispatch } = useFinance();
  const [form, setForm] = useState({ name: "", amount: "", date: today(), category: "Food" });
  const [err, setErr]   = useState("");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = useCallback(() => {
    if (!form.name.trim())               return setErr("Name is required");
    if (!form.amount || +form.amount <= 0) return setErr("Enter a valid amount");
    if (!form.date)                      return setErr("Date is required");

    const selectedDate = new Date(form.date);
    const currentDate  = new Date(today());
    if (selectedDate > currentDate)      return setErr("Date cannot be in the future");

    setErr("");
    dispatch({
      type: "ADD_EXPENSE",
      payload: {
        id: crypto.randomUUID(),
        name: form.name.trim(),
        amount: +form.amount,
        date: form.date,
        month: getMonth(form.date),
        category: form.category,
      },
    });
    setForm({ name: "", amount: "", date: today(), category: "Food" });
  }, [form, dispatch]);

  return (
    <Section title="➕ Add Expense">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <input
          className={inputCls}
          placeholder="Description"
          value={form.name}
          onChange={e => set("name", e.target.value)}
        />
        <input
          className={inputCls}
          placeholder="Amount (₹)"
          type="number"
          min="0"
          value={form.amount}
          onChange={e => set("amount", e.target.value)}
        />
        <select
          className={inputCls}
          value={form.category}
          onChange={e => set("category", e.target.value)}
        >
          {EXPENSE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <input
          className={inputCls}
          type="date"
          value={form.date}
          max={today()}
          onChange={e => set("date", e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={submit}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-bold hover:opacity-90 transition"
        >
          + Add Expense
        </button>
        {err && <span className="text-xs text-red-500 dark:text-red-400">{err}</span>}
      </div>
    </Section>
  );
}

export default AddExpenseForm;