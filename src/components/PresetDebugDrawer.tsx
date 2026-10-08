import React, { useState } from 'react';
import { ChevronUp, ChevronDown, SlidersHorizontal, MapPin } from 'lucide-react';
import { PRESET_CONDITIONS } from '../lib/wmoEngine';
import { FALLBACK_LOCATIONS, type Coordinates } from '../hooks/useWeather';

interface PresetDebugDrawerProps {
  onSelectPreset: (preset: typeof PRESET_CONDITIONS[0]) => void;
  onSelectCity: (coords: Coordinates, name: string) => void;
}

export const PresetDebugDrawer: React.FC<PresetDebugDrawerProps> = ({
  onSelectPreset,
  onSelectCity,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mt-4 bg-white/95 rounded-2xl border-4 border-black shadow-neo overflow-hidden transition-all">
      {/* Drawer Toggle Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-neutral-900 text-white font-display font-black text-xs sm:text-sm tracking-wider uppercase cursor-pointer hover:bg-black transition-colors"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#FFE600]" />
          <span>SIMULATION LAB & PRESETS</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-300">
          <span>{isOpen ? 'COLLAPSE' : 'EXPAND'}</span>
          {isOpen ? <ChevronDown className="w-4 h-4 text-[#FFE600]" /> : <ChevronUp className="w-4 h-4 text-[#FFE600]" />}
        </div>
      </button>

      {/* Drawer Content */}
      {isOpen && (
        <div className="p-3.5 bg-amber-50/40 space-y-3 animate-pop">
          {/* Quick Condition Presets */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-neutral-600 mb-2 flex items-center justify-between">
              <span>Textbook WMO Conditions:</span>
              <span className="text-[10px] text-neutral-400 font-mono">10 presets</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {PRESET_CONDITIONS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => onSelectPreset(preset)}
                  className="px-2.5 py-1 bg-white hover:bg-[#FFE600] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none text-black font-body font-bold text-xs rounded-lg border-2 border-black shadow-neo-sm transition-all cursor-pointer truncate"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Real-World Cities */}
          <div className="pt-2 border-t-2 border-dashed border-neutral-300">
            <div className="text-[11px] font-black uppercase tracking-wider text-neutral-600 mb-2 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#FF4757]" />
              <span>Test Real-World Locations:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {FALLBACK_LOCATIONS.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => onSelectCity(loc.coords, loc.name)}
                  className="px-2.5 py-1 bg-neutral-100 hover:bg-[#00E5FF] active:translate-x-[1px] active:translate-y-[1px] text-black font-location font-bold text-xs rounded-lg border-2 border-black shadow-neo-sm transition-all cursor-pointer"
                >
                  {loc.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
