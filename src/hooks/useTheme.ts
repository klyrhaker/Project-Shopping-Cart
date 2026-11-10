import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

type Theme = "light" | "dark";

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme(): void {
    if (theme === "light") return setTheme("dark");
    return setTheme("light");
  }

  return [theme, toggleTheme];
}

export default useTheme;
