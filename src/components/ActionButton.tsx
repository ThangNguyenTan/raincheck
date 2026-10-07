import React from 'react';
import { Loader2, Zap } from 'lucide-react';
import { triggerBurst } from '../lib/confetti';

interface ActionButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, isLoading }) => {
  const handleClick = () => {
    if (isLoading) return;
    triggerBurst();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      aria-label="Consult the sky"
      className="w-full relative group mt-1 py-3 px-6 bg-[#FFE600] hover:bg-[#ffd000] text-black font-display font-black text-lg sm:text-xl uppercase tracking-wider rounded-2xl border-4 border-black shadow-neo hover:shadow-neo-lg active:translate-x-1 active:translate-y-1 active:shadow-neo-active transition-all cursor-pointer select-none flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin text-black" />
          <span>INTERROGATING SATELLITES...</span>
        </>
      ) : (
        <>
          <Zap className="w-5 h-5 fill-black group-hover:scale-125 transition-transform" />
          <span>CONSULT THE SKY</span>
          <span className="text-xl">💥</span>
        </>
      )}
    </button>
  );
};
