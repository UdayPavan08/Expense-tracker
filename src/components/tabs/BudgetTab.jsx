import { useMemo } from "react";
import { BUDGETS } from "../../constants";
import { today, getMonth } from "../../utils/helpers";
import Section from "../Section";
import ProgressBar from "../ProgressBar";

function BudgetTab({ expenses }) {
  const currentMonth = useMemo(() => getMonth(today()), []);

  const budgetData = useMemo(() =>
    Object.entries(BUDGETS).map(([cat, budget]) => {
      const spent = expenses
        .filter(e => e.category === cat && e.month === currentMonth)
        .reduce((s, e) => s + e.amount, 0);
      return { cat, budget, spent };
    }),
    [expenses, currentMonth]
  );

  return (
    <Section title="Budget Tracker">
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
        Tracking spending against your monthly budgets for <strong>{currentMonth}</strong>.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
        {budgetData.map(({ cat, budget, spent }) => (
          <ProgressBar key={cat} label={cat} spent={spent} budget={budget} />
        ))}
      </div>
    </Section>
  );
}

export default BudgetTab;
