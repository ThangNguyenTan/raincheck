import React, { useMemo } from 'react';
import type { WeatherVibe } from '../lib/wmoEngine';

interface AtmosphericBackgroundProps {
  vibe: WeatherVibe | null;
  isDay?: number;
}

export const AtmosphericBackground: React.FC<AtmosphericBackgroundProps> = ({ vibe, isDay = 1 }) => {
  // Determine weather category for targeted animation layers
  const weatherType = useMemo<'heat' | 'thunder' | 'rain' | 'snow' | 'clear-day' | 'clear-night' | 'fog'>(() => {
    if (!vibe) return 'clear-day';

    if (vibe.isExtremeTemp && vibe.hazardLevel === 'MELTING') return 'heat';
    if (vibe.isExtremeTemp && vibe.hazardLevel === 'FREEZING') return 'snow';

    const code = vibe.code;
    if (code >= 95) return 'thunder';
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snow';
    if (code === 45 || code === 48 || code === 3) return 'fog';
    if (isDay === 0) return 'clear-night';
    return 'clear-day';
  }, [vibe, isDay]);

  // Harmonized background color schemes matching the weather aesthetic
  const ambientTheme = useMemo(() => {
    switch (weatherType) {
      case 'heat':
        return {
          baseBg: 'bg-[#180505]',
          gradient: 'radial-gradient(ellipse at 50% 20%, #4a0d0d 0%, #1f0606 60%, #0d0202 100%)',
          glowColor: '#FF3838',
          accentColor: '#FFA502',
          gridDotColor: '#FF4757',
        };
      case 'thunder':
        return {
          baseBg: 'bg-[#120417]',
          gradient: 'radial-gradient(ellipse at 50% 20%, #350b42 0%, #17041f 60%, #09010d 100%)',
          glowColor: '#FF4757',
          accentColor: '#FFE600',
          gridDotColor: '#FF7979',
        };
      case 'rain':
        return {
          baseBg: 'bg-[#04121c]',
          gradient: 'radial-gradient(ellipse at 50% 30%, #092c42 0%, #041421 60%, #01080e 100%)',
          glowColor: '#00E5FF',
          accentColor: '#2E86DE',
          gridDotColor: '#48DBFB',
        };
      case 'snow':
        return {
          baseBg: 'bg-[#06121e]',
          gradient: 'radial-gradient(ellipse at 50% 20%, #12283d 0%, #081726 60%, #020910 100%)',
          glowColor: '#70A1FF',
          accentColor: '#C7ECEE',
          gridDotColor: '#A8D8EA',
        };
      case 'clear-night':
        return {
          baseBg: 'bg-[#080718]',
          gradient: 'radial-gradient(ellipse at 50% 15%, #18153b 0%, #0b0921 60%, #03030a 100%)',
          glowColor: '#2ED573',
          accentColor: '#00E5FF',
          gridDotColor: '#70A1FF',
        };
      case 'fog':
        return {
          baseBg: 'bg-[#12151a]',
          gradient: 'radial-gradient(ellipse at 50% 30%, #252b36 0%, #15181f 60%, #0a0c0f 100%)',
          glowColor: '#A4B0BE',
          accentColor: '#747D8C',
          gridDotColor: '#CED6E0',
        };
      case 'clear-day':
      default:
        return {
          baseBg: 'bg-[#1a1402]',
          gradient: 'radial-gradient(ellipse at 50% 15%, #3d2f04 0%, #1f1802 60%, #0d0a01 100%)',
          glowColor: '#FFE600',
          accentColor: '#FF9F43',
          gridDotColor: '#FFE600',
        };
    }
  }, [weatherType]);

  // Rain drop positions (pre-generated for stable rendering)
  const raindrops = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: `${(i * 4.3 + (i % 3) * 2.1) % 100}%`,
        delay: `${(i * 0.17) % 2.5}s`,
        duration: `${0.8 + (i % 4) * 0.25}s`,
        opacity: 0.35 + (i % 5) * 0.12,
        height: `${28 + (i % 6) * 14}px`,
      })),
    []
  );

  // Snow flakes
  const snowflakes = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        left: `${(i * 3.9 + 2) % 100}%`,
        delay: `${(i * 0.32) % 4}s`,
        duration: `${3.5 + (i % 5) * 1.2}s`,
        size: `${7 + (i % 4) * 5}px`,
        opacity: 0.3 + (i % 4) * 0.18,
      })),
    []
  );

  // Night stars
  const stars = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: `${(i * 4.7 + 3) % 96}%`,
        top: `${(i * 5.3 + 4) % 85}%`,
        delay: `${(i * 0.27) % 3}s`,
        duration: `${1.8 + (i % 3) * 0.8}s`,
        size: `${6 + (i % 3) * 4}px`,
      })),
    []
  );

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700 ${ambientTheme.baseBg}`}
      style={{
        background: ambientTheme.gradient,
      }}
      aria-hidden="true"
    >
      {/* 1. Animated Neo-Brutalist Dot Grid Texture */}
      <div
        className="absolute inset-0 opacity-25 animate-grid-pan"
        style={{
          backgroundImage: `radial-gradient(${ambientTheme.gridDotColor} 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* 2. Massive Atmospheric Ambient Glow (Behind Card) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[480px] rounded-full filter blur-[100px] sm:blur-[130px] opacity-40 transition-all duration-1000"
        style={{
          backgroundColor: ambientTheme.glowColor,
        }}
      />

      {/* 3. WEATHER-SPECIFIC INTERACTIVE ANIMATION LAYERS */}

      {/* Layer A: Clear Sun / Radiant Rays */}
      {weatherType === 'clear-day' && (
        <div className="absolute top-0 right-0 w-[420px] h-[420px] -mr-28 -mt-28 opacity-30">
          {/* Rotating brutalist sun rays disc */}
          <div className="w-full h-full animate-sun-rays flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full fill-[#FFE600]">
              {Array.from({ length: 12 }).map((_, i) => (
                <polygon
                  key={i}
                  points="100,100 92,20 108,20"
                  transform={`rotate(${i * 30} 100 100)`}
                  opacity="0.8"
                />
              ))}
              <circle cx="100" cy="100" r="42" fill="#FFA502" />
            </svg>
          </div>
        </div>
      )}

      {/* Layer B: Extreme Heatwave / Molten Shimmer */}
      {weatherType === 'heat' && (
        <>
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-red-600/30 to-transparent animate-heat-shimmer" />
          <div className="absolute top-10 left-6 text-3xl animate-float opacity-30 select-none">
            🔥
          </div>
          <div className="absolute top-36 right-8 text-2xl animate-wiggle opacity-25 select-none">
            ☀️
          </div>
          <div className="absolute bottom-24 left-10 text-4xl animate-pulse opacity-20 select-none">
            ♨️
          </div>
        </>
      )}

      {/* Layer C: Thunderstorm Lightning Flash & Sparks */}
      {weatherType === 'thunder' && (
        <>
          {/* Atmospheric lightning strobe flash */}
          <div className="absolute inset-0 bg-[#FFE600] animate-lightning mix-blend-screen" />
          <div className="absolute top-16 left-8 text-3xl font-display font-black text-[#FFE600] animate-bounce opacity-40">
            ⚡
          </div>
          <div className="absolute top-44 right-10 text-4xl font-display font-black text-[#FF4757] animate-wiggle opacity-40">
            ⚡
          </div>
          <div className="absolute bottom-32 left-12 text-2xl font-display font-black text-[#00E5FF] animate-pulse opacity-30">
            ⚡
          </div>
        </>
      )}

      {/* Layer D: Diagonal Neo-Brutalist Rain Streaks */}
      {weatherType === 'rain' && (
        <div className="absolute inset-0">
          {raindrops.map((drop) => (
            <div
              key={drop.id}
              className="absolute w-[2px] bg-gradient-to-b from-transparent via-[#00E5FF] to-white rounded-full pointer-events-none"
              style={{
                left: drop.left,
                top: '-40px',
                height: drop.height,
                opacity: drop.opacity,
                animation: `rainDrop ${drop.duration} linear infinite`,
                animationDelay: drop.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Layer E: Drifting Pixel Snowflakes */}
      {weatherType === 'snow' && (
        <div className="absolute inset-0">
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="absolute text-white pointer-events-none select-none"
              style={{
                left: flake.left,
                top: '-30px',
                fontSize: flake.size,
                opacity: flake.opacity,
                animation: `snowDrift ${flake.duration} ease-in-out infinite`,
                animationDelay: flake.delay,
              }}
            >
              ❄
            </div>
          ))}
        </div>
      )}

      {/* Layer F: Clear Night Shimmering Stars */}
      {weatherType === 'clear-night' && (
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute text-[#FFE600] pointer-events-none select-none font-display"
              style={{
                left: star.left,
                top: star.top,
                fontSize: star.size,
                animation: `starPulse ${star.duration} ease-in-out infinite`,
                animationDelay: star.delay,
              }}
            >
              ✦
            </div>
          ))}
          {/* Subtle moon halo */}
          <div className="absolute top-12 right-12 w-28 h-28 rounded-full bg-cyan-300/15 filter blur-xl animate-pulse" />
        </div>
      )}

      {/* Layer G: Layered Rolling Fog Mist */}
      {weatherType === 'fog' && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-x-32 top-1/4 h-64 bg-gradient-to-r from-transparent via-neutral-300/20 to-transparent filter blur-3xl animate-mist" />
          <div
            className="absolute -inset-x-32 bottom-1/4 h-72 bg-gradient-to-r from-transparent via-neutral-400/20 to-transparent filter blur-3xl animate-mist"
            style={{ animationDirection: 'reverse', animationDuration: '22s' }}
          />
        </div>
      )}

      {/* 4. Brutalist Corner Glyph Accents */}
      <div className="absolute top-4 left-4 text-xs font-mono font-black text-white/30 tracking-widest uppercase select-none">
        [SYS.ATMOS // {vibe ? vibe.hazardLevel : 'INITIALIZING'}]
      </div>
      <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/30 tracking-widest uppercase select-none">
        {weatherType.toUpperCase()}
      </div>
      <div className="absolute bottom-4 left-4 text-xs font-mono font-bold text-white/20 select-none">
        ▲ + ■ + ●
      </div>
      <div className="absolute bottom-4 right-4 text-xs font-mono font-bold text-white/20 select-none">
        RADAR ACTIVE ⚡
      </div>
    </div>
  );
};
