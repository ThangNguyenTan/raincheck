import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';
import { FALLBACK_LOCATIONS, type Coordinates } from '../hooks/useWeather';

interface ErrorScreenProps {
  errorMessage: string;
  onRetry: () => void;
  onSelectCity: (coords: Coordinates, name: string) => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  errorMessage,
  onRetry,
  onSelectCity,
}) => {
  return (
    <div className="w-full bg-[#FF4757] p-5 rounded-3xl border-4 border-black shadow-neo-lg text-black space-y-4 animate-pop">
      {/* Skull / Warning Icon */}
      <div className="flex items-center justify-between">
        <span className="text-4xl">⚠️</span>
        <span className="px-3 py-1 bg-black text-[#FFE600] font-display font-black text-xs uppercase tracking-wider rounded-lg border-2 border-black">
          RADAR FAILURE
        </span>
      </div>

      {/* Main Sarcastic Roast */}
      <div>
        <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight drop-shadow-sm">
          GEOLOCATION REJECTED
        </h2>
        <div className="mt-2 p-3 bg-white rounded-xl border-3 border-black shadow-neo-sm">
          <p className="font-body font-bold text-sm text-black italic">
            "{errorMessage}"
          </p>
        </div>
      </div>

      {/* Recovery instructions */}
      <p className="font-body font-semibold text-xs text-white/90 leading-tight">
        You can either face your fears and grant GPS permission, or select one of our curated emergency safehouses below:
      </p>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        <button
          onClick={onRetry}
          className="w-full py-2.5 px-4 bg-[#FFE600] hover:bg-[#ffd000] text-black font-display font-black text-sm uppercase rounded-xl border-3 border-black shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-black" />
          <span>RETRY SATELLITE LOCK</span>
        </button>

        <div className="pt-2">
          <span className="text-[11px] font-black uppercase text-white tracking-wider block mb-1.5">
            Or Jump to a Safehouse:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {FALLBACK_LOCATIONS.slice(0, 4).map((loc) => (
              <button
                key={loc.name}
                onClick={() => onSelectCity(loc.coords, loc.name)}
                className="p-2 bg-white hover:bg-neutral-100 text-black font-location font-bold text-xs rounded-xl border-2 border-black shadow-neo-sm active:translate-x-[1px] active:translate-y-[1px] transition-all truncate cursor-pointer flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-[#FF4757] shrink-0" />
                <span className="truncate">{loc.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
