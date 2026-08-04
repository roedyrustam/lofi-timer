import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, X, Save } from 'lucide-react';
import { useTimerStore, AUDIO_TRACKS } from '../store/useTimerStore';

export function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const { focusDuration, breakDuration, updateDurations, backgroundAudioId, setBackgroundAudioId } = useTimerStore();
  
  // Local state for the form inputs
  const [focusMins, setFocusMins] = useState(focusDuration / 60);
  const [breakMins, setBreakMins] = useState(breakDuration / 60);
  const [audioId, setAudioId] = useState(backgroundAudioId);

  // Sync when store changes
  useEffect(() => {
    setFocusMins(Math.floor(focusDuration / 60));
    setBreakMins(Math.floor(breakDuration / 60));
    setAudioId(backgroundAudioId);
  }, [focusDuration, breakDuration, backgroundAudioId, isOpen]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateDurations(focusMins, breakMins);
    setBackgroundAudioId(audioId);
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="retro-btn-sm p-2 rounded bg-retro-light hover:bg-gray-200 absolute top-4 right-4"
        title="Settings"
      >
        <SettingsIcon size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-retro-lavender retro-border w-full max-w-sm rounded-lg p-6 relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 retro-btn-sm p-1 bg-retro-pink hover:bg-red-300"
            >
              <X size={16} />
            </button>

            <h2 className="text-xl font-bold uppercase tracking-wider mb-6">Settings</h2>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold uppercase">Focus Duration (m)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="120"
                  value={focusMins}
                  onChange={(e) => setFocusMins(Number(e.target.value))}
                  className="retro-input"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold uppercase">Break Duration (m)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="60"
                  value={breakMins}
                  onChange={(e) => setBreakMins(Number(e.target.value))}
                  className="retro-input"
                />
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <label className="text-sm font-bold uppercase">Ambience Sound</label>
                <select 
                  value={audioId}
                  onChange={(e) => setAudioId(e.target.value)}
                  className="retro-input cursor-pointer"
                >
                  {AUDIO_TRACKS.map(track => (
                    <option key={track.id} value={track.id}>
                      {track.name}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                className="retro-btn mt-4 p-3 bg-retro-mint flex justify-center items-center gap-2 uppercase font-bold"
              >
                <Save size={18} /> Save Settings
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
