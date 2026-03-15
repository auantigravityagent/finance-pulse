import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Expense } from '../types';
import { useAuth } from '../features/auth/AuthProvider';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch initial data from Supabase Postgres
  useEffect(() => {
    async function fetchExpenses() {
      if (!user) {
        setExpenses([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching expenses:', error);
      } else if (data) {
        setExpenses(data);
      }
      setIsLoading(false);
    }

    fetchExpenses();
  }, [user]);

  // Insert into Supabase
  const addExpense = async (name: string, amount: number) => {
    if (!user) return;

    const newExpense = {
      name,
      amount,
      date: new Date().toLocaleDateString(),
      user_id: user.id,
    };

    const { data, error } = await supabase
      .from('expenses')
      .insert([newExpense])
      .select()
      .single();

    if (error) {
      console.error('Error adding expense:', error);
      return;
    }

    // Optimistically update local state with the newly created DB record
    if (data) {
       setExpenses([data, ...expenses]);
    }
  };

  // Delete from Supabase
  const deleteExpense = async (id: string) => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) {
       console.error('Error deleting expense:', error);
       return;
    }

    // Update local state by filtering out the deleted ID
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return { expenses, addExpense, deleteExpense, isLoading };
}
