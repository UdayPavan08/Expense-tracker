import { SOURCE_COLORS } from "../../constants";
import { exportCSV } from "../../utils/helpers";
import Section from "../Section";
import AddIncomeForm from "../AddIncomeForm";
import TransactionTable from "../TransactionTable";

function IncomesTab({ incomes, onDelete }) {
  return (
    <>
      <AddIncomeForm />
      <Section
        title={`Incomes (${incomes.length})`}
        action={
          <button
            onClick={() => exportCSV(incomes, "incomes.csv")}
            className="text-xs px-3 py-1 rounded-xl border border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-900/30 transition"
          >
            ⬇ CSV
          </button>
        }
      >
        <TransactionTable
          rows={incomes}
          columns={["Date", "Name", "Month", "Source", "Amount"]}
          onDelete={onDelete}
          colorMap={SOURCE_COLORS}
          typeKey="source"
        />
      </Section>
    </>
  );
}

export default IncomesTab;
