import { useState, useEffect } from 'react';
import type { Expense } from '../types';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('finance_pulse_expenses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse expenses from local storage", e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('finance_pulse_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (name: string, amount: number) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      name,
      amount,
      date: new Date().toLocaleDateString(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return { expenses, addExpense, deleteExpense };
}
