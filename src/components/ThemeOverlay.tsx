import { Theme } from "../types";

interface ThemeOverlayProps {
  theme: Theme;
}

const ThemeOverlay = ({ theme }: ThemeOverlayProps) => {
  if (theme === "mountains") return <div className="mountain-overlay" />;
  if (theme === "forest") return <div className="forest-overlay" />;
  if (theme === "neon") return <div className="neon-particles" />;

  return null;
};

export default ThemeOverlay;
