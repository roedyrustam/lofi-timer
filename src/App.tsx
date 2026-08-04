import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Square, Coffee, Brain, Music } from 'lucide-react';
import { useTimerStore, AUDIO_TRACKS } from './store/useTimerStore';
import { TodoList } from './components/TodoList';
import { Settings } from './components/Settings';
import './App.css';

function App() {
  const { timeLeft, isRunning, mode, backgroundAudioId, startTimer, pauseTimer, resetTimer, tick, setMode } = useTimerStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.5);

  const currentTrack = AUDIO_TRACKS.find(t => t.id === backgroundAudioId) || AUDIO_TRACKS[0];

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = window.setInterval(() => {
        tick();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  // Handle audio play/pause based on timer running state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; // Set initial volume
      if (isRunning) {
        audioRef.current.play().catch(e => console.warn("Audio autoplay prevented", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isRunning, volume, currentTrack.url]); // Re-run if track changes

  // Format time (MM:SS)
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <Settings />
      
      {/* Hidden Audio Player */}
      <audio ref={audioRef} src={currentTrack.url} loop />

      <main className="w-full max-w-sm bg-retro-light retro-border p-6 rounded-lg flex flex-col items-center gap-4">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1 tracking-wider uppercase">Lofi Focus</h1>
          <p className="text-sm font-sans">Pomodoro Timer</p>
        </div>

        {/* Mode Selector */}
        <div className="flex gap-4">
          <button 
            onClick={() => setMode('focus')}
            className={`px-4 py-2 flex items-center gap-2 text-sm uppercase ${mode === 'focus' ? 'bg-retro-pink retro-border-sm' : 'hover:bg-retro-pink/50 retro-border-sm bg-retro-light'}`}
          >
            <Brain size={16} /> Focus
          </button>
          <button 
            onClick={() => setMode('break')}
            className={`px-4 py-2 flex items-center gap-2 text-sm uppercase ${mode === 'break' ? 'bg-retro-mint retro-border-sm' : 'hover:bg-retro-mint/50 retro-border-sm bg-retro-light'}`}
          >
            <Coffee size={16} /> Break
          </button>
        </div>

        {/* Timer Display */}
        <div className="bg-retro-dark text-retro-light px-8 py-6 rounded-xl retro-border my-2">
          <div className="text-7xl font-pixel tracking-widest">{timeString}</div>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          {!isRunning ? (
            <button onClick={startTimer} className="retro-btn p-4 rounded-full bg-retro-mint hover:bg-green-200">
              <Play size={24} fill="currentColor" />
            </button>
          ) : (
            <button onClick={pauseTimer} className="retro-btn p-4 rounded-full bg-retro-yellow hover:bg-yellow-200">
              <Pause size={24} fill="currentColor" />
            </button>
          )}
          <button onClick={resetTimer} className="retro-btn p-4 rounded-full bg-retro-pink hover:bg-red-200">
            <Square size={24} fill="currentColor" />
          </button>
        </div>

        {/* Volume & Now Playing */}
        <div className="w-full mt-2 flex flex-col gap-2">
          <div className="flex items-center gap-4 text-sm font-sans">
            <span>Vol</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05"
              value={volume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
                if (audioRef.current) audioRef.current.volume = val;
              }}
              className="w-full h-2 bg-retro-dark rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="text-xs font-sans text-retro-dark/60 flex items-center justify-center gap-1 mt-1">
            <Music size={12} /> Playing: {currentTrack.name}
          </div>
        </div>

        <TodoList />
      </main>

      <footer className="mt-8 text-xs font-sans text-retro-dark/60 text-center">
        Created by Roedy Rustam
      </footer>
    </div>
  );
}

export default App;
