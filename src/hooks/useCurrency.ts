import { useState, useEffect } from 'react';

export function useCurrency() {
  const [rate, setRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=EUR');
        if (!response.ok) throw new Error('Failed to fetch exchange rates');
        const data = await response.json();
        setRate(data.rates.EUR);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown network error');
      } finally {
        setIsLoading(false);
      }
    }
    fetchRate();
  }, []);

  return { rate, isLoading, error };
}
