export type TimerMode = 'pomodoro' | 'short-break' | 'long-break';

export interface TimerState {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  sessionCount: number;
  intervalId: number | null;
}

export const TIMER_DURATIONS: Record<TimerMode, number> = {
  'pomodoro': 25 * 60,
  'short-break': 5 * 60,
  'long-break': 15 * 60,
};

export const COLORS: Record<TimerMode, string> = {
  'pomodoro': '#e74c3c',
  'short-break': '#3498db',
  'long-break': '#2ecc71',
};

export const state: TimerState = {
  mode: 'pomodoro',
  timeLeft: TIMER_DURATIONS['pomodoro'],
  isRunning: false,
  sessionCount: 1,
  intervalId: null,
};

let initialized = false;

export function setupPomodoro() {
  if (initialized) return;
  initialized = true;

  const timerDisplay = document.getElementById('timer')!;
  const startBtn = document.getElementById('start-btn') as HTMLButtonElement;
  const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;
  const modeBtns = document.querySelectorAll('.mode-btn');
  const sessionCountDisplay = document.getElementById('session-count')!;

  function updateDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    sessionCountDisplay.textContent = state.sessionCount.toString();

    startBtn.textContent = state.isRunning ? 'Pause' : 'Start';
  }

  function switchMode(mode: TimerMode) {
    if (state.isRunning) {
      stopTimer();
    }

    state.mode = mode;
    state.timeLeft = TIMER_DURATIONS[mode];

    modeBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-mode') === mode) {
        btn.classList.add('active');
      }
    });

    document.documentElement.style.setProperty('--accent-active', COLORS[mode]);
    updateDisplay();
  }

  function startTimer() {
    state.isRunning = true;
    startBtn.textContent = 'Pause';

    state.intervalId = window.setInterval(() => {
      if (state.timeLeft > 0) {
        state.timeLeft--;
        updateDisplay();
      } else {
        stopTimer();
        playNotificationSound();

        if (state.mode === 'pomodoro') {
          state.sessionCount++;
          const nextMode = state.sessionCount % 4 === 0 ? 'long-break' : 'short-break';
          switchMode(nextMode);
        } else {
          switchMode('pomodoro');
        }
      }
    }, 1000);
  }

  function stopTimer() {
    state.isRunning = false;
    if (state.intervalId !== null) {
      clearInterval(state.intervalId);
      state.intervalId = null;
    }
    startBtn.textContent = 'Start';
  }

  function toggleTimer() {
    if (state.isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  }

  function resetTimer() {
    stopTimer();
    state.timeLeft = TIMER_DURATIONS[state.mode];
    updateDisplay();
  }

  function playNotificationSound() {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }

  startBtn.addEventListener('click', toggleTimer);
  resetBtn.addEventListener('click', resetTimer);

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode') as TimerMode;
      switchMode(mode);
    });
  });

  updateDisplay();
}
