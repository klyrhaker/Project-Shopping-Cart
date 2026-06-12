import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

function useTheme() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  function toggleTheme() {
    if (theme === "light") return setTheme("dark");
    return setTheme("light");
  }
  return [theme, toggleTheme];
}
export default useTheme;
