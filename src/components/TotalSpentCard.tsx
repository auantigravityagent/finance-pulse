import React from 'react';
import { useCurrency } from '../hooks/useCurrency';

interface TotalSpentCardProps {
  total: number;
}

const TotalSpentCard: React.FC<TotalSpentCardProps> = ({ total }) => {
  const { rate, isLoading, error } = useCurrency();
  const convertedTotal = rate ? (total * rate).toFixed(2) : null;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col items-center justify-center transition-all duration-300 hover:border-slate-700 hover:shadow-sky-900/20">
      <h2 className="text-slate-400 font-medium tracking-wide uppercase text-sm mb-2">Total Spent</h2>
      <div className="text-5xl md:text-6xl font-extrabold text-slate-100 tabular-nums tracking-tight">
        ${total.toFixed(2)}
      </div>
      
      {isLoading && (
        <p className="animate-pulse text-slate-500 text-sm mt-2">Fetching live rates...</p>
      )}
      
      {error && (
        <p className="text-red-400/80 text-sm mt-2">Rates unavailable</p>
      )}
      
      {convertedTotal && !isLoading && !error && (
        <p className="text-slate-400 text-sm mt-2">
          ≈ €{convertedTotal} EUR
        </p>
      )}
    </div>
  );
};

export default TotalSpentCard;
