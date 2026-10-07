import React from 'react';
import { MapPin, Navigation, Radio } from 'lucide-react';
import type { LocationInfo, Coordinates } from '../hooks/useWeather';

interface LocationBadgeProps {
  location: LocationInfo;
  coords: Coordinates | null;
  isGPS: boolean;
  onRequestGPS: () => void;
  isLoading: boolean;
}

export const LocationBadge: React.FC<LocationBadgeProps> = ({
  location,
  coords,
  isGPS,
  onRequestGPS,
  isLoading,
}) => {
  return (
    <div className="my-2 w-full">
      <div className="flex items-center justify-between gap-2 p-2 bg-white/95 rounded-2xl border-3 border-black shadow-neo-sm">
        {/* Left: Icon & Specific Location Hierarchy */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="p-1.5 bg-[#FF4757] rounded-xl border-2 border-black shrink-0 shadow-neo-active">
            <MapPin className="w-4 h-4 text-white" />
          </div>

          <div className="flex flex-col min-w-0 text-left">
            {/* Primary specific location (Ward, District, Street, or Suburb) */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className="font-display font-black text-xs sm:text-sm text-black truncate max-w-[200px] sm:max-w-[240px]"
                title={location.specific}
              >
                {location.specific}
              </span>

              {isGPS && (
                <span className="shrink-0 flex items-center gap-0.5 text-[9px] font-black uppercase bg-[#2ED573] text-black px-1.5 py-0.2 rounded border border-black">
                  <Radio className="w-2 h-2 animate-pulse text-black" /> GPS
                </span>
              )}
            </div>

            {/* Broader context (City, Province, Country) */}
            {location.area && (
              <span
                className="text-[10px] font-body font-bold text-neutral-500 truncate max-w-[220px]"
                title={location.area}
              >
                {location.area}
              </span>
            )}
          </div>
        </div>

        {/* Right: GPS Recalibrate Button */}
        <button
          onClick={onRequestGPS}
          disabled={isLoading}
          title={coords ? `Refresh GPS (${coords.lat.toFixed(3)}, ${coords.lon.toFixed(3)})` : 'Lock GPS Coordinates'}
          className="p-2 bg-[#00E5FF] hover:bg-[#18dcff] active:translate-x-[2px] active:translate-y-[2px] active:shadow-neo-active border-2 border-black rounded-xl shadow-neo-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
        >
          <Navigation className={`w-3.5 h-3.5 text-black ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};
