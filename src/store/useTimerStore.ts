import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TimerMode = 'focus' | 'break';

export const AUDIO_TRACKS = [
  { id: 'lofi', name: 'Lofi Beats', url: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3' },
  { id: 'rain', name: 'Rain', url: 'https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3' },
  { id: 'cafe', name: 'Cafe', url: 'https://cdn.pixabay.com/audio/2021/08/09/audio_d08620ba03.mp3' },
  { id: 'ocean', name: 'Ocean Waves', url: 'https://cdn.pixabay.com/audio/2021/08/09/audio_6e1e827a55.mp3' },
];

interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  mode: TimerMode;
  focusDuration: number;
  breakDuration: number;
  backgroundAudioId: string;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
  setMode: (mode: TimerMode) => void;
  updateDurations: (focusMinutes: number, breakMinutes: number) => void;
  setBackgroundAudioId: (id: string) => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      focusDuration: 25 * 60,
      breakDuration: 5 * 60,
      timeLeft: 25 * 60,
      isRunning: false,
      mode: 'focus',
      backgroundAudioId: 'lofi',
      
      startTimer: () => set({ isRunning: true }),
      
      pauseTimer: () => set({ isRunning: false }),
      
      resetTimer: () => set((state) => ({
        timeLeft: state.mode === 'focus' ? state.focusDuration : state.breakDuration,
        isRunning: false
      })),
      
      tick: () => set((state) => {
        if (state.timeLeft > 0) {
          return { timeLeft: state.timeLeft - 1 };
        }
        // Switch mode when timer reaches 0
        const nextMode = state.mode === 'focus' ? 'break' : 'focus';
        const nextTime = nextMode === 'focus' ? state.focusDuration : state.breakDuration;
        return {
          mode: nextMode,
          timeLeft: nextTime,
          isRunning: false // pause when switching
        };
      }),

      setMode: (mode) => set((state) => ({
        mode,
        timeLeft: mode === 'focus' ? state.focusDuration : state.breakDuration,
        isRunning: false
      })),

      updateDurations: (focusMinutes, breakMinutes) => set((state) => {
        const newFocus = focusMinutes * 60;
        const newBreak = breakMinutes * 60;
        // Update current time left if not running
        let newTimeLeft = state.timeLeft;
        if (!state.isRunning) {
          newTimeLeft = state.mode === 'focus' ? newFocus : newBreak;
        }
        return {
          focusDuration: newFocus,
          breakDuration: newBreak,
          timeLeft: newTimeLeft
        };
      }),

      setBackgroundAudioId: (id) => set({ backgroundAudioId: id })
    }),
    {
      name: 'lofi-timer-storage',
      // Persist durations and audio preference
      partialize: (state) => ({ 
        focusDuration: state.focusDuration, 
        breakDuration: state.breakDuration,
        backgroundAudioId: state.backgroundAudioId
      }),
    }
  )
);
