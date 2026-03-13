import TotalSpentCard from './components/TotalSpentCard';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import { useExpenses } from './hooks/useExpenses';

function App() {
  const { expenses, addExpense, deleteExpense } = useExpenses();

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      <header className="mb-8 text-center w-full max-w-2xl">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">Finance Pulse</h1>
        <p className="text-slate-400 mt-2">Track your spending, ignite your savings.</p>
      </header>
      
      <main className="w-full max-w-2xl flex flex-col gap-6">
        <TotalSpentCard total={totalSpent} />
        
        <ExpenseChart expenses={expenses} />

        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-slate-200">Add New Expense</h2>
          <AddExpenseForm onAddExpense={addExpense} />
        </div>
        
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-xl flex-1 max-h-[500px] flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-slate-200">Recent Expenses</h2>
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
        </div>
      </main>
    </div>
  );
}

export default App;
