import { useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);

      if (stored !== null) return JSON.parse(stored) as T;

      return initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  function setStoredValue(newValue: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (err) {
      console.error(err);
    }
  }

  return [value, setStoredValue];
}

export default useLocalStorage;
