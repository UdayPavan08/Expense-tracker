import { useState, useCallback } from "react";
import { useFinance } from "../context/FinanceContext";
import { INCOME_SOURCES } from "../constants";
import { today, getMonth } from "../utils/helpers";
import Section from "./Section";

const inputCls =
  "w-full text-sm px-3 py-2 rounded-xl border-2 border-purple-100 focus:outline-none focus:border-purple-400 bg-white text-gray-700 transition";

function AddIncomeForm() {
  const { dispatch } = useFinance();
  const [form, setForm] = useState({ name: "", amount: "", date: today(), source: "Salary" });
  const [err, setErr]   = useState("");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = useCallback(() => {
    if (!form.name.trim())                 return setErr("Name is required");
    if (!form.amount || +form.amount <= 0) return setErr("Enter a valid amount");
    if (!form.date)                        return setErr("Date is required");
    setErr("");
    dispatch({
      type: "ADD_INCOME",
      payload: {
        id: Date.now(),
        name: form.name.trim(),
        amount: +form.amount,
        date: form.date,
        month: getMonth(form.date),
        source: form.source,
      },
    });
    setForm({ name: "", amount: "", date: today(), source: "Salary" });
  }, [form, dispatch]);

  return (
    <Section title="➕ Add Income">
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
          value={form.amount}
          onChange={e => set("amount", e.target.value)}
        />
        <select
          className={inputCls}
          value={form.source}
          onChange={e => set("source", e.target.value)}
        >
          {INCOME_SOURCES.map(s => <option key={s}>{s}</option>)}
        </select>
        <input
          className={inputCls}
          type="date"
          value={form.date}
          onChange={e => set("date", e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={submit}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-bold hover:opacity-90 transition"
        >
          + Add Income
        </button>
        {err && <span className="text-xs text-red-500">{err}</span>}
      </div>
    </Section>
  );
}

export default AddIncomeForm;