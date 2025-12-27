import { useEffect, useState } from 'react';

export function useDebounceValue(value: string, delay = 500): string {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}
