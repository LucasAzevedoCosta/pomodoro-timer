import { useState } from "react";
import { Theme } from "../types/types";

const AVAILABLE_THEMES: Theme[] = [ "dark-academia", "cyberpunk",  "midnight", "emerald"];

export function useTheme(initialTheme: Theme = "dark-academia") {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return {
    theme,
    themes: AVAILABLE_THEMES,
    changeTheme,
  };
}
