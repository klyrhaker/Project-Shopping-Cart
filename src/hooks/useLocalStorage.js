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
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (err) {
      console.error(err);
    }
  }

  return [value, setStoredValue];
}

export default useLocalStorage;
