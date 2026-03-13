import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Expense } from '../types';

interface ExpenseChartProps {
  expenses: Expense[];
}

export default function ExpenseChart({ expenses }: ExpenseChartProps) {
  if (expenses.length === 0) {
    return null;
  }

  const data = expenses.map(expense => ({
    name: expense.name,
    amount: expense.amount
  }));

  return (
    <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-xl w-full h-[320px]">
      <h2 className="text-xl font-semibold mb-4 text-slate-200">Expense Breakdown</h2>
      <ResponsiveContainer width="100%" height="100%" style={{ backgroundColor: 'transparent' }}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 25 }} style={{ backgroundColor: 'transparent' }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          
          <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a',
              borderColor: '#1e293b',    
              color: '#f1f5f9',         
              borderRadius: '0.75rem'
            }}
            itemStyle={{ color: '#38bdf8' }}
          />
          
          <Bar dataKey="amount" fill="#38bdf8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
