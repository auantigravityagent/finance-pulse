import React, { useState } from 'react';
import { ExpenseSchema } from '../types';

interface AddExpenseFormProps {
  onAddExpense: (name: string, amount: number) => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onAddExpense }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState<{ name?: string; amount?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = ExpenseSchema.safeParse({
      name,
      amount: parseFloat(amount),
    });

    if (!result.success) {
      const fieldErrors: { name?: string; amount?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === 'name') fieldErrors.name = issue.message;
        if (issue.path[0] === 'amount') fieldErrors.amount = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    
    onAddExpense(name, parseFloat(amount));
    setName('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="expenseName" className="block text-sm font-medium text-slate-400 mb-1">Expense Name</label>
          <input
            type="text"
            id="expenseName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Groceries"
            className={`w-full bg-slate-950/50 border ${errors.name ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 ${errors.name ? 'focus:ring-red-500/50' : 'focus:ring-sky-500/50'} focus:border-sky-500 transition-all duration-200`}
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div className="flex-1">
          <label htmlFor="expenseAmount" className="block text-sm font-medium text-slate-400 mb-1">Amount ($)</label>
          <input
            type="number"
            id="expenseAmount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            className={`w-full bg-slate-950/50 border ${errors.amount ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 ${errors.amount ? 'focus:ring-red-500/50' : 'focus:ring-sky-500/50'} focus:border-sky-500 transition-all duration-200`}
          />
          {errors.amount && <p className="text-red-400 text-sm mt-1">{errors.amount}</p>}
        </div>
      </div>
      
      <button
        type="submit"
        className="mt-2 w-full bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg shadow-sky-500/20 transition-all duration-200 transform active:scale-[0.98]"
      >
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;
