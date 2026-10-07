import React from 'react';
import { Sparkles, MessageSquareQuote } from 'lucide-react';
import type { WeatherVibe } from '../lib/wmoEngine';

interface RoastBoxProps {
  vibe: WeatherVibe;
  onReroll?: () => void;
}

export const RoastBox: React.FC<RoastBoxProps> = ({ vibe, onReroll }) => {
  return (
    <div className="relative my-2.5 w-full bg-white rounded-2xl border-4 border-black shadow-neo overflow-hidden transition-all">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-black text-white">
        <div className="flex items-center gap-1.5">
          <MessageSquareQuote className="w-4 h-4 text-[#FFE600]" />
          <span className="font-display font-black text-xs uppercase tracking-wider text-[#FFE600]">
            DAILY WEATHER ROAST
          </span>
        </div>

        {onReroll && (
          <button
            onClick={onReroll}
            title="Generate new sarcastic roast"
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white text-black text-[10px] font-black uppercase hover:bg-[#FFE600] active:scale-95 transition-all cursor-pointer border border-black"
          >
            <Sparkles className="w-3 h-3 text-[#FF4757]" />
            REROLL
          </button>
        )}
      </div>

      {/* Main content body */}
      <div className="p-3.5 sm:p-4 bg-amber-50/50">
        {/* Dynamic sarcastic title */}
        <h2 className="font-display font-black text-lg sm:text-xl text-black leading-tight flex items-start gap-1.5">
          <span>“</span>
          <span>{vibe.roastTitle}</span>
          <span>”</span>
        </h2>

        {/* Rotating quote */}
        <p className="mt-2 font-body font-semibold text-neutral-800 text-xs sm:text-sm leading-relaxed italic border-l-3 border-[#FF4757] pl-2.5 py-0.5">
          {vibe.roastQuote}
        </p>

        {/* Unsolicited snarky advice */}
        <div className="mt-3 pt-2.5 border-t-2 border-dashed border-neutral-300 flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded bg-[#FF4757] text-white font-display font-black text-[10px] uppercase shrink-0">
            ADVICE
          </span>
          <span className="font-body font-bold text-[11px] sm:text-xs text-neutral-900 leading-tight">
            {vibe.advice}
          </span>
        </div>
      </div>
    </div>
  );
};
