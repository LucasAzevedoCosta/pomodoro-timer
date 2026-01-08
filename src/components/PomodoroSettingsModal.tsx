import { useState } from "react";
import styles from "./PomodoroSettingsModal.module.css";
import { PomodoroSettings, Props } from "../types";



export function PomodoroSettingsModal({ settings, onSave, onCancel }: Props) {
  const [tempSettings, setTempSettings] = useState(settings);

  const handleChange = (key: keyof PomodoroSettings, value: number) => {
    setTempSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Configurações</h2>

        <div className={styles.field}>
          <label>Foco (min)</label>
          <input
            className={styles.input}
            type="number"
            value={tempSettings.focusDuration}
            onChange={(e) =>
              handleChange("focusDuration", Number(e.target.value))
            }
          />
        </div>

        <div className={styles.field}>
          <label>Pausa Curta (min)</label>
          <input
            className={styles.input}
            type="number"
            value={tempSettings.shortBreakDuration}
            onChange={(e) =>
              handleChange("shortBreakDuration", Number(e.target.value))
            }
          />
        </div>

        <div className={styles.field}>
          <label>Pausa Longa (min)</label>
          <input
            className={styles.input}
            type="number"
            value={tempSettings.longBreakDuration}
            onChange={(e) =>
              handleChange("longBreakDuration", Number(e.target.value))
            }
          />
        </div>

        <div className={styles.field}>
          <label>Ciclos</label>
          <input
            className={styles.input}
            type="number"
            value={tempSettings.cyclesBeforeLongBreak}
            onChange={(e) =>
              handleChange("cyclesBeforeLongBreak", Number(e.target.value))
            }
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.save} onClick={() => onSave(tempSettings)}>
            Salvar
          </button>
          <button className={styles.cancel} onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
