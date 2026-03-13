import React from 'react';
import type { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  if (expenses.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <p>No expenses recorded yet.</p>
        <p className="text-sm mt-1">Start tracking to see them here.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
      {expenses.map((expense) => (
        <div 
          key={expense.id}
          className="group bg-slate-950/40 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex justify-between items-center transition-all duration-200"
        >
          <div className="flex flex-col">
            <span className="font-medium text-slate-200">{expense.name}</span>
            <span className="text-xs text-slate-500">{expense.date}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-bold text-sky-400 tabular-nums group-hover:scale-105 transition-transform duration-200">
              ${expense.amount.toFixed(2)}
            </div>
            <button
              onClick={() => onDeleteExpense(expense.id)}
              className="text-slate-500 hover:text-slate-200 active:scale-95 transition-all duration-200"
              aria-label="Delete expense"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
