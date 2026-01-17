import { useState } from "react";
import { Theme } from "../types/types";

const AVAILABLE_THEMES: Theme[] = ["mountains", "forest", "neon", "minimal"];

export function useTheme(initialTheme: Theme = "mountains") {
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
