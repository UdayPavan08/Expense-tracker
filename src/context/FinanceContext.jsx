import { createContext, useContext, useReducer, useEffect } from "react";
import { SAMPLE_EXPENSES, SAMPLE_INCOMES } from "../constants";

// ─── Local Storage Helper ─────────────────────────────────────────────────────

function getSaved(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState = {
  expenses: getSaved("ft_expenses", SAMPLE_EXPENSES),
  incomes:  getSaved("ft_incomes",  SAMPLE_INCOMES),
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE":
      return { ...state, expenses: [action.payload, ...state.expenses] };
    case "DELETE_EXPENSE":
      return { ...state, expenses: state.expenses.filter(e => e.id !== action.id) };
    case "ADD_INCOME":
      return { ...state, incomes: [action.payload, ...state.incomes] };
    case "DELETE_INCOME":
      return { ...state, incomes: state.incomes.filter(i => i.id !== action.id) };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const FinanceContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Split effects so only the changed collection is written to localStorage
  useEffect(() => {
    localStorage.setItem("ft_expenses", JSON.stringify(state.expenses));
  }, [state.expenses]);

  useEffect(() => {
    localStorage.setItem("ft_incomes", JSON.stringify(state.incomes));
  }, [state.incomes]);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
}

// ─── Custom Hook ──────────────────────────────────────────────────────────────

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within <FinanceProvider>");
  return ctx;
}