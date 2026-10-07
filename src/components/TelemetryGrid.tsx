import React from 'react';
import { Wind, Droplets, ShieldAlert } from 'lucide-react';
import type { WeatherVibe } from '../lib/wmoEngine';

interface TelemetryGridProps {
  windSpeed: number; // km/h
  humidity: number; // %
  hazardLevel: WeatherVibe['hazardLevel'];
}

export const TelemetryGrid: React.FC<TelemetryGridProps> = ({
  windSpeed,
  humidity,
  hazardLevel,
}) => {
  // Snarky wind commentary
  const getWindTag = (speed: number) => {
    if (speed > 40) return 'Tornado Lite';
    if (speed > 25) return 'Haircut Ruiner';
    if (speed > 10) return 'Gentle Gust';
    return 'Dead Calm';
  };

  // Snarky humidity commentary
  const getHumidityTag = (hum: number) => {
    if (hum > 85) return 'Swamp Protocol';
    if (hum > 65) return 'Sticky Soup';
    if (hum > 40) return 'Tolerable Air';
    return 'Skin Dehydrator';
  };

  // Hazard color mapping
  const getHazardStyles = (lvl: WeatherVibe['hazardLevel']) => {
    switch (lvl) {
      case 'SAFE':
        return { bg: 'bg-[#2ED573]', text: 'text-black' };
      case 'SWEATY':
        return { bg: 'bg-[#FFA502]', text: 'text-black' };
      case 'SLIPPERY':
        return { bg: 'bg-[#70A1FF]', text: 'text-black' };
      case 'SOAKED':
        return { bg: 'bg-[#00E5FF]', text: 'text-black' };
      case 'FREEZING':
        return { bg: 'bg-[#74B9FF]', text: 'text-black' };
      case 'MELTING':
        return { bg: 'bg-[#FF4757]', text: 'text-white' };
      case 'DANGER':
        return { bg: 'bg-[#FF3838]', text: 'text-white' };
      case 'APOCALYPTIC':
        return { bg: 'bg-[#9C27B0]', text: 'text-white' };
      default:
        return { bg: 'bg-[#FFE600]', text: 'text-black' };
    }
  };

  const hazardStyle = getHazardStyles(hazardLevel);

  return (
    <div className="grid grid-cols-3 gap-2 my-2 w-full">
      {/* Box 1: Wind */}
      <div className="flex flex-col items-center justify-between p-2.5 bg-white/95 rounded-2xl border-3 border-black shadow-neo-sm hover:shadow-neo transition-all">
        <div className="flex items-center gap-1 text-neutral-600 mb-1">
          <Wind className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-display font-bold text-[11px] uppercase tracking-wider text-black">Wind</span>
        </div>
        <div className="font-display font-black text-lg sm:text-xl text-black">
          {Math.round(windSpeed)} <span className="text-xs font-bold text-neutral-600">km/h</span>
        </div>
        <div className="mt-1 px-1.5 py-0.5 bg-neutral-100 border border-black rounded text-[10px] font-bold text-neutral-800 text-center truncate max-w-full">
          {getWindTag(windSpeed)}
        </div>
      </div>

      {/* Box 2: Humidity */}
      <div className="flex flex-col items-center justify-between p-2.5 bg-white/95 rounded-2xl border-3 border-black shadow-neo-sm hover:shadow-neo transition-all">
        <div className="flex items-center gap-1 text-neutral-600 mb-1">
          <Droplets className="w-3.5 h-3.5 text-cyan-600" />
          <span className="font-display font-bold text-[11px] uppercase tracking-wider text-black">Humid</span>
        </div>
        <div className="font-display font-black text-lg sm:text-xl text-black">
          {Math.round(humidity)}<span className="text-xs font-bold text-neutral-600">%</span>
        </div>
        <div className="mt-1 px-1.5 py-0.5 bg-neutral-100 border border-black rounded text-[10px] font-bold text-neutral-800 text-center truncate max-w-full">
          {getHumidityTag(humidity)}
        </div>
      </div>

      {/* Box 3: Hazard Level */}
      <div className="flex flex-col items-center justify-between p-2.5 bg-white/95 rounded-2xl border-3 border-black shadow-neo-sm hover:shadow-neo transition-all">
        <div className="flex items-center gap-1 text-neutral-600 mb-1">
          <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
          <span className="font-display font-bold text-[11px] uppercase tracking-wider text-black">Hazard</span>
        </div>
        <div className={`font-display font-black text-xs sm:text-sm px-2 py-0.5 rounded-lg border-2 border-black ${hazardStyle.bg} ${hazardStyle.text} text-center truncate max-w-full`}>
          {hazardLevel}
        </div>
        <div className="mt-1 text-[10px] font-bold text-neutral-500 uppercase tracking-tighter">
          Threat Rating
        </div>
      </div>
    </div>
  );
};
