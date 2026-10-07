import React from 'react';

interface BrandPillProps {
  unit: 'C' | 'F';
  onToggleUnit: () => void;
}

export const BrandPill: React.FC<BrandPillProps> = ({ unit, onToggleUnit }) => {
  return (
    <div className="flex items-center justify-between w-full mb-3">
      {/* Neo-brutalist badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFE600] border-3 border-black rounded-xl shadow-neo-sm transform -rotate-1 hover:rotate-0 transition-transform">
        <span className="text-sm font-black tracking-wider uppercase font-display text-black flex items-center gap-1">
          <span className="inline-block animate-wiggle">⚡</span> RAINCHECK <span className="inline-block animate-wiggle">⚡</span>
        </span>
      </div>

      {/* Unit Toggle Button */}
      <button
        onClick={onToggleUnit}
        aria-label="Toggle Temperature Unit"
        className="group relative flex items-center bg-white text-black font-display font-black text-sm px-3.5 py-1.5 rounded-xl border-3 border-black shadow-neo-sm hover:shadow-neo active:translate-x-[2px] active:translate-y-[2px] active:shadow-neo-active transition-all cursor-pointer"
      >
        <span className="text-xs uppercase tracking-wider text-neutral-500 mr-1.5 group-hover:text-black">UNIT:</span>
        <span className={`px-1.5 py-0.5 rounded font-black ${unit === 'C' ? 'bg-[#FF4757] text-white' : 'text-black'}`}>
          °C
        </span>
        <span className="mx-0.5 text-neutral-400">/</span>
        <span className={`px-1.5 py-0.5 rounded font-black ${unit === 'F' ? 'bg-[#2ED573] text-black' : 'text-black'}`}>
          °F
        </span>
      </button>
    </div>
  );
};
