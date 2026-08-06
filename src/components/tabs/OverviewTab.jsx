import { CATEGORY_COLORS } from "../../constants";
import Section from "../Section";
import CategoryDonut from "../CategoryDonut";
import MonthlyBar from "../MonthlyBar";
import TransactionTable from "../TransactionTable";

function OverviewTab({ expenses, incomes, onDeleteExpense }) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Section title="Spending by Category">
          <CategoryDonut expenses={expenses} />
        </Section>
        <Section title="Monthly Trend">
          <MonthlyBar expenses={expenses} incomes={incomes} />
        </Section>
      </div>
      <Section title="Recent Expenses">
        <TransactionTable
          rows={expenses.slice(0, 5)}
          columns={["Date", "Name", "Month", "Category", "Amount"]}
          onDelete={onDeleteExpense}
          colorMap={CATEGORY_COLORS}
          typeKey="category"
        />
      </Section>
    </>
  );
}

export default OverviewTab;
