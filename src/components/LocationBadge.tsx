import React from 'react';
import { MapPin, Navigation, Radio } from 'lucide-react';

interface LocationBadgeProps {
  locationName: string;
  isGPS: boolean;
  onRequestGPS: () => void;
  isLoading: boolean;
}

export const LocationBadge: React.FC<LocationBadgeProps> = ({
  locationName,
  isGPS,
  onRequestGPS,
  isLoading,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 my-2 w-full">
      <div className="flex items-center gap-1.5 px-3 py-1 bg-white/95 rounded-xl border-3 border-black shadow-neo-sm max-w-[280px] overflow-hidden">
        <MapPin className="w-4 h-4 text-[#FF4757] shrink-0" />
        <span
          className="font-body font-bold text-xs sm:text-sm text-black truncate"
          title={locationName}
        >
          {locationName}
        </span>
        {isGPS && (
          <span className="shrink-0 flex items-center gap-0.5 text-[10px] font-black uppercase bg-[#2ED573] text-black px-1.5 py-0.2 rounded border border-black">
            <Radio className="w-2.5 h-2.5 animate-pulse text-black" /> GPS
          </span>
        )}
      </div>

      {/* Recalibrate button */}
      <button
        onClick={onRequestGPS}
        disabled={isLoading}
        title="Refresh GPS location"
        className="p-1.5 bg-[#00E5FF] hover:bg-[#18dcff] active:translate-x-[2px] active:translate-y-[2px] active:shadow-neo-active border-3 border-black rounded-xl shadow-neo-sm transition-all cursor-pointer disabled:opacity-50"
      >
        <Navigation className={`w-4 h-4 text-black ${isLoading ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
};
