import React, { useState } from 'react';
import { Clock, Droplet } from 'lucide-react';
import { formatTemp, type HourlyForecastItem } from '../hooks/useWeather';
import { getWMOCondition } from '../lib/wmoEngine';

interface HourlyForecastProps {
  items: HourlyForecastItem[];
  unit: 'C' | 'F';
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ items, unit }) => {
  const [selectedHour, setSelectedHour] = useState<HourlyForecastItem | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full my-2.5 bg-white/95 rounded-2xl border-3 border-black shadow-neo-sm overflow-hidden text-black transition-all">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-900 text-white">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#FFE600]" />
          <span className="font-display font-black text-xs uppercase tracking-wider text-[#FFE600]">
            HOURLY RADAR // 24-HOUR TIMELINE
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold text-neutral-400">
          SCROLL ➔
        </span>
      </div>

      {/* Selected Hour Snark Callout */}
      {selectedHour && (
        <div className="px-3 py-1.5 bg-[#FFE600] border-b-2 border-black flex items-center justify-between animate-pop">
          <div className="flex items-center gap-1.5 text-xs font-bold font-body">
            <span>{selectedHour.time}:</span>
            <span className="font-display font-black">{formatTemp(selectedHour.tempC, unit)}</span>
            <span>•</span>
            <span className="text-neutral-900">{getWMOCondition(selectedHour.weatherCode, selectedHour.isDay).condition}</span>
            {selectedHour.precipitationProb > 0 && (
              <span className="ml-1 text-[10px] bg-black text-[#00E5FF] px-1.5 py-0.2 rounded font-mono font-bold">
                💧 {selectedHour.precipitationProb}% RAIN
              </span>
            )}
          </div>
          <button
            onClick={() => setSelectedHour(null)}
            className="text-[10px] font-black uppercase text-neutral-800 hover:text-black cursor-pointer ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Horizontal Scrollable Timeline */}
      <div className="flex items-stretch gap-2 overflow-x-auto p-2.5 scrollbar-thin scroll-smooth snap-x">
        {items.map((item, idx) => {
          const wmoInfo = getWMOCondition(item.weatherCode, item.isDay);
          const isSelected = selectedHour?.rawTime === item.rawTime;
          const isNow = idx === 0;

          return (
            <button
              key={item.rawTime || idx}
              onClick={() => setSelectedHour(item)}
              title={`${item.time}: ${wmoInfo.condition}, ${formatTemp(item.tempC, unit)}`}
              className={`shrink-0 flex flex-col items-center justify-between p-2 rounded-xl border-2 border-black cursor-pointer transition-all duration-150 snap-start min-w-[62px] select-none ${
                isNow
                  ? 'bg-[#FFE600] shadow-neo-sm scale-100 font-black'
                  : isSelected
                  ? 'bg-amber-100 shadow-neo-sm border-dashed'
                  : 'bg-white hover:bg-neutral-100 shadow-neo-sm'
              } active:translate-x-[1px] active:translate-y-[1px] active:shadow-none`}
            >
              {/* Time Label */}
              <span
                className={`font-display text-[11px] uppercase tracking-tight ${
                  isNow ? 'font-black text-black' : 'font-bold text-neutral-700'
                }`}
              >
                {item.time}
              </span>

              {/* Weather Emoji */}
              <span className="text-2xl my-1 filter drop-shadow-sm transform hover:scale-125 transition-transform" role="img" aria-label={wmoInfo.condition}>
                {wmoInfo.emoji}
              </span>

              {/* Temperature */}
              <span className="font-display font-black text-xs text-black">
                {formatTemp(item.tempC, unit)}
              </span>

              {/* Precipitation chance badge */}
              {item.precipitationProb > 0 ? (
                <div className="mt-1 flex items-center gap-0.5 px-1 py-0.2 bg-[#00E5FF]/20 border border-black/40 rounded text-[9px] font-bold text-blue-900">
                  <Droplet className="w-2.5 h-2.5 text-blue-600 shrink-0" />
                  <span>{item.precipitationProb}%</span>
                </div>
              ) : (
                <div className="h-3" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
