import { z } from 'zod';

export type Expense = {
  id: string;
  name: string;
  amount: number;
  date: string;
};

export const ExpenseSchema = z.object({
  name: z.string().min(1, "Expense name is required"),
  amount: z.number().positive("Amount must be greater than 0"),
});
