import { useState } from "react";

export const useLocalStorage = <T = any>(keyName: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value) as T;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error(`Error reading localStorage key "${keyName}":`, err);
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
      setStoredValue(newValue);
    } catch (err) {
      console.error(`Error setting localStorage key "${keyName}":`, err);
    }
  };

  return [storedValue, setValue] as const;
};

