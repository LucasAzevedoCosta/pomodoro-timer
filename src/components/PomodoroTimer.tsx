import { useState } from "react";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { usePomodoro } from "../hooks/pomodoro";
import { PomodoroSettingsModal } from "./PomodoroSettingsModal";
import styles from "./PomodoroTimer.module.css";

export function PomodoroTimer() {
  const pomodoro = usePomodoro();
  const [showSettings, setShowSettings] = useState(false);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const modeClass = styles[pomodoro.mode];

  if (showSettings) {
    return (
      <PomodoroSettingsModal
        settings={pomodoro.settings}
        onSave={(s) => {
          pomodoro.updateSettings(s);
          setShowSettings(false);
        }}
        onCancel={() => setShowSettings(false)}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Pomodoro</h1>
          <button onClick={() => setShowSettings(true)}>
            <Settings />
          </button>
        </div>

        <div className={`${styles.timer} ${modeClass}`}>
          <p>{pomodoro.mode}</p>
          <div className={styles.time}>{formatTime(pomodoro.timeLeft)}</div>
          <p>Ciclo {pomodoro.cycleCount + 1}</p>

          <div className={styles.controls}>
            <button
              className={styles.button}
              onClick={pomodoro.isRunning ? pomodoro.pause : pomodoro.start}
            >
              {pomodoro.isRunning ? <Pause /> : <Play />}
              {pomodoro.isRunning ? "Pausar" : "Iniciar"}
            </button>

            <button className={styles.button} onClick={pomodoro.reset}>
              <RotateCcw />
              Resetar
            </button>
          </div>
        </div>

        <div className={styles.modes}>
          <button
            className={`${styles.modeButton} ${
              pomodoro.mode === "focus" ? styles.active : ""
            }`}
            onClick={() => pomodoro.switchMode("focus")}
          >
            Foco
          </button>

          <button
            className={`${styles.modeButton} ${
              pomodoro.mode === "shortBreak" ? styles.active : ""
            }`}
            onClick={() => pomodoro.switchMode("shortBreak")}
          >
            Pausa Curta
          </button>

          <button
            className={`${styles.modeButton} ${
              pomodoro.mode === "longBreak" ? styles.active : ""
            }`}
            onClick={() => pomodoro.switchMode("longBreak")}
          >
            Pausa Longa
          </button>
        </div>
      </div>
    </div>
  );
}
