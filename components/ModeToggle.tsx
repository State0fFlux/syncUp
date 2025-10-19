
import React from 'react';
import { AppMode } from '../types';

interface ModeToggleProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ currentMode, onModeChange }) => {
  const modes = [AppMode.Friends, AppMode.Community];

  return (
    <div className="bg-white/70 backdrop-blur-sm p-1 rounded-full shadow-md flex items-center space-x-1">
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => onModeChange(mode)}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ease-in-out
            ${currentMode === mode 
              ? 'bg-brand-primary text-white shadow' 
              : 'text-slate-600 hover:bg-indigo-100'
            }`}
        >
          {mode}
        </button>
      ))}
    </div>
  );
};

export default ModeToggle;
