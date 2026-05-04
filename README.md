# 💸 Finance Tracker

A personal finance management app built with React. Track your expenses, income, budgets, and monthly savings — all in one place.

## 🖥️ Live Demo
[\[Add your deployed link here\]](https://expense-tracker-uday.vercel.app/)

## 📸 Screenshot
(./Finance-Tracker.png)

## ✨ Features

- **Expense & Income Tracking** — Add, view, and delete transactions with category and date
- **Budget Tracker** — Set monthly budgets per category with visual progress bars
- **Charts** — Spending by category (donut chart) and monthly income vs expenses (bar chart)
- **Monthly Stats** — Month-by-month breakdown with savings rate
- **Search, Filter & Sort** — Find transactions instantly
- **Pagination** — Clean table view with 7 entries per page
- **CSV Export** — Download expenses and incomes as CSV
- **LocalStorage** — Data persists across page refreshes

## 🛠️ Tech Stack

- **React** — UI library
- **Vite** — Build tool
- **Tailwind CSS** — Styling
- **Recharts** — Charts and data visualization
- **Context API + useReducer** — Global state management
- **localStorage** — Client-side data persistence

## ⚛️ React Concepts Used

- `useState` — Local component state
- `useEffect` — Syncing state to localStorage
- `useReducer` — Managing complex expense/income state with actions
- `useContext` + Context API — Global state without prop drilling
- `useMemo` — Memoizing filtered/sorted data for performance
- `useCallback` — Memoizing form submit handlers

## 📁 Project Structure


src/
├── components/
│   ├── AddExpenseForm.jsx
│   ├── AddIncomeForm.jsx
│   ├── Badge.jsx
│   ├── CategoryDonut.jsx
│   ├── MonthlyBar.jsx
│   ├── MonthlyStats.jsx
│   ├── ProgressBar.jsx
│   ├── Section.jsx
│   ├── StatCard.jsx
│   ├── Tabs.jsx
│   └── TransactionTable.jsx
├── constants/
│   └── index.js
├── context/
│   └── FinanceContext.jsx
├── utils/
│   └── helpers.js
└── App.jsx


## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/UdayPavan08/Expense-tracker.git

# Navigate into the project
cd Expense-tracker

# Install dependencies
npm install

# Run the development server
npm run dev
```

