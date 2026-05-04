export const EXPENSE_CATEGORIES = [
  "Food", "Transport", "Housing", "Entertainment",
  "Health", "Shopping", "Utilities", "Education", "Other",
];

export const INCOME_SOURCES = [
  "Salary", "Freelance", "Investments", "Business", "Other",
];

export const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

export const CATEGORY_COLORS = {
  Food:          "#7C3AED",
  Transport:     "#EC4899",
  Housing:       "#8B5CF6",
  Entertainment: "#D946EF",
  Health:        "#A78BFA",
  Shopping:      "#F472B6",
  Utilities:     "#C084FC",
  Education:     "#E879F9",
  Other:         "#9CA3AF",
};

export const SOURCE_COLORS = {
  Salary:      "#7C3AED",
  Freelance:   "#EC4899",
  Investments: "#8B5CF6",
  Business:    "#D946EF",
  Other:       "#9CA3AF",
};

export const BUDGETS = {
  Food:          8000,
  Transport:     4000,
  Housing:       15000,
  Entertainment: 3000,
  Health:        2000,
  Shopping:      5000,
  Utilities:     2500,
};

export const SAMPLE_EXPENSES = [
  { id:1,  name:"Groceries",        amount:1200,  date:"2025-04-28", month:"Apr", category:"Food" },
  { id:2,  name:"Uber to office",   amount:350,   date:"2025-04-27", month:"Apr", category:"Transport" },
  { id:3,  name:"Netflix",          amount:499,   date:"2025-04-25", month:"Apr", category:"Entertainment" },
  { id:4,  name:"Dinner out",       amount:1800,  date:"2025-04-20", month:"Apr", category:"Food" },
  { id:5,  name:"Electricity bill", amount:1200,  date:"2025-04-15", month:"Apr", category:"Utilities" },
  { id:6,  name:"Medicine",         amount:600,   date:"2025-04-18", month:"Apr", category:"Health" },
  { id:7,  name:"Zara shirt",       amount:2500,  date:"2025-04-12", month:"Apr", category:"Shopping" },
  { id:8,  name:"House rent",       amount:12000, date:"2025-04-05", month:"Apr", category:"Housing" },
  { id:9,  name:"Metro pass",       amount:500,   date:"2025-03-10", month:"Mar", category:"Transport" },
  { id:10, name:"Lunch",            amount:320,   date:"2025-03-22", month:"Mar", category:"Food" },
];

export const SAMPLE_INCOMES = [
  { id:1, name:"Monthly salary",    amount:55000, date:"2025-04-01", month:"Apr", source:"Salary" },
  { id:2, name:"Freelance project", amount:8000,  date:"2025-04-14", month:"Apr", source:"Freelance" },
  { id:3, name:"March salary",      amount:55000, date:"2025-03-01", month:"Mar", source:"Salary" },
];