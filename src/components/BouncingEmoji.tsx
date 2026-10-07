import React, { useState } from 'react';
import { triggerConfetti } from '../lib/confetti';

interface BouncingEmojiProps {
  emoji: string;
  condition: string;
  onTap?: () => void;
}

export const BouncingEmoji: React.FC<BouncingEmojiProps> = ({ emoji, condition, onTap }) => {
  const [isRecoiling, setIsRecoiling] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsRecoiling(true);

    // Compute click coordinates for particle burst origin
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    triggerConfetti({ x, y });
    if (onTap) onTap();

    setTimeout(() => {
      setIsRecoiling(false);
    }, 400);
  };

  return (
    <div className="relative my-2 flex flex-col items-center justify-center">
      {/* Click-to-recoil interactive button */}
      <button
        onClick={handleClick}
        title="Tap for chaos!"
        className={`group relative p-4 rounded-3xl bg-white/70 backdrop-blur-sm border-4 border-black shadow-neo transition-all duration-200 cursor-pointer select-none active:scale-90 active:rotate-6 ${
          isRecoiling ? 'scale-75 -rotate-12 bg-amber-100' : 'hover:scale-105'
        }`}
      >
        <span
          className={`block text-7xl sm:text-8xl transition-transform duration-300 filter drop-shadow-md ${
            isRecoiling ? 'animate-none scale-90' : 'animate-float'
          }`}
          role="img"
          aria-label={condition}
        >
          {emoji}
        </span>

        {/* Playful 'TAP ME' sticker tag */}
        <span className="absolute -bottom-2 -right-2 bg-[#FF4757] text-white text-[11px] font-display font-black tracking-wider px-2 py-0.5 rounded-md border-2 border-black shadow-neo-sm transform rotate-6 group-hover:rotate-12 transition-transform">
          TAP! 💥
        </span>
      </button>

      {/* Condition description pill */}
      <div className="mt-3 px-3.5 py-1 bg-black text-white font-display font-black text-sm tracking-wide rounded-full uppercase border-2 border-white shadow-neo-sm">
        {condition}
      </div>
    </div>
  );
};
