import React from 'react';
import { formatTemp } from '../hooks/useWeather';

interface TempDisplayProps {
  temperatureC: number;
  apparentTempC: number;
  unit: 'C' | 'F';
  isExtreme?: boolean;
}

export const TempDisplay: React.FC<TempDisplayProps> = ({
  temperatureC,
  apparentTempC,
  unit,
  isExtreme,
}) => {
  const currentFormatted = formatTemp(temperatureC, unit);
  const apparentFormatted = formatTemp(apparentTempC, unit);

  // Snarky temperature observation
  const getTempFeeling = () => {
    if (temperatureC >= 35) return '🔥 Straight inferno';
    if (temperatureC >= 30) return '💦 Sweaty disaster';
    if (temperatureC >= 23) return '👌 Tolerable reality';
    if (temperatureC >= 15) return '🧥 Mild & suspicious';
    if (temperatureC >= 5) return '🧣 Chilly misery';
    if (temperatureC >= 0) return '❄️ Teeth chattering';
    return '🧊 Solid ice cube';
  };

  return (
    <div className="flex flex-col items-center justify-center my-1">
      <div className="flex items-baseline justify-center">
        <h1
          className={`font-display font-black text-7xl sm:text-8xl tracking-tight text-black drop-shadow-sm leading-none ${
            isExtreme ? 'animate-pulse text-red-600' : ''
          }`}
        >
          {currentFormatted}
        </h1>
      </div>

      {/* Feels like badge */}
      <div className="mt-1.5 flex items-center justify-center flex-wrap gap-2">
        <div className="inline-flex items-center px-3 py-1 rounded-xl bg-white border-2 border-black font-body text-xs font-bold text-neutral-900 shadow-neo-sm">
          <span className="text-neutral-700 font-semibold mr-1.5">Feels like:</span>
          <span className="text-black font-display font-black text-sm">{apparentFormatted}</span>
        </div>
        <div className="inline-flex items-center px-2.5 py-1 rounded-xl bg-black border-2 border-black font-body font-black text-[11px] text-white uppercase tracking-wide shadow-neo-sm">
          {getTempFeeling()}
        </div>
      </div>
    </div>
  );
};
