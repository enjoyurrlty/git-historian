import { useState, useEffect } from 'react';

export function useSessionStorage(key: string, defaultValue: any) {
  const storageValue = sessionStorage.getItem(key);
  const [value, setValue] = useState(
    storageValue ? JSON.parse(storageValue) : defaultValue
  );

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
