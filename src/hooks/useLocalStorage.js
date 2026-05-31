import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
      return initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  function setStoredValue(newValue) {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.error(err);
      setValue(initialValue);
    }
  }

  return [value, setStoredValue];
}

export default useLocalStorage;
