import { CATEGORY_COLORS } from "../../constants";
import { exportCSV } from "../../utils/helpers";
import Section from "../Section";
import AddExpenseForm from "../AddExpenseForm";
import TransactionTable from "../TransactionTable";

function ExpensesTab({ expenses, onDelete }) {
  return (
    <>
      <AddExpenseForm />
      <Section
        title={`Expenses (${expenses.length})`}
        action={
          <button
            onClick={() => exportCSV(expenses, "expenses.csv")}
            className="text-xs px-3 py-1 rounded-xl border border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-900/30 transition"
          >
            ⬇ CSV
          </button>
        }
      >
        <TransactionTable
          rows={expenses}
          columns={["Date", "Name", "Month", "Category", "Amount"]}
          onDelete={onDelete}
          colorMap={CATEGORY_COLORS}
          typeKey="category"
        />
      </Section>
    </>
  );
}

export default ExpensesTab;
