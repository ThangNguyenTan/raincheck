import React from 'react';
import { useWeather } from './hooks/useWeather';
import { WeatherCard } from './components/WeatherCard';
import { PresetDebugDrawer } from './components/PresetDebugDrawer';
import { ErrorScreen } from './components/ErrorScreen';
import { AtmosphericBackground } from './components/AtmosphericBackground';
import { Loader2 } from 'lucide-react';

export const App: React.FC = () => {
  const {
    data,
    vibe,
    coords,
    locationName,
    isLoading,
    error,
    unit,
    requestLocation,
    applyPreset,
    toggleUnit,
    rerollRoast,
    fetchWeather,
  } = useWeather();

  const handleConsultSky = () => {
    if (coords) {
      fetchWeather(coords);
    } else {
      requestLocation();
    }
  };

  return (
    <main className="relative min-h-screen text-white flex flex-col items-center justify-start sm:justify-center p-3 sm:p-4 select-none pb-[calc(1.5rem+env(safe-area-inset-bottom))] overflow-x-hidden">
      {/* Dynamic Animated Atmospheric Weather Background */}
      <AtmosphericBackground vibe={vibe} isDay={data ? data.isDay : 1} />

      {/* Mobile-locked viewport container */}
      <div className="relative z-10 w-full max-w-[420px] flex flex-col items-center">
        {/* Main Content Area */}
        {error ? (
          <div className="w-full">
            <ErrorScreen
              errorMessage={error}
              onRetry={requestLocation}
              onSelectCity={(targetCoords, name) => fetchWeather(targetCoords, name)}
            />
            {/* Still allow trying presets even on error */}
            <PresetDebugDrawer
              onSelectPreset={applyPreset}
              onSelectCity={(targetCoords, name) => fetchWeather(targetCoords, name)}
            />
          </div>
        ) : isLoading && !data ? (
          /* Initial loading state */
          <div className="w-full h-[520px] bg-[#FFE600] rounded-3xl border-4 border-black shadow-neo-lg p-6 flex flex-col items-center justify-center text-black space-y-4 animate-pulse">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-neo-sm">
              <Loader2 className="w-8 h-8 text-[#FFE600] animate-spin" />
            </div>
            <h2 className="font-display font-black text-2xl uppercase tracking-wider text-center">
              SCANNING THE STRATOSPHERE...
            </h2>
            <p className="font-body font-bold text-xs text-neutral-800 text-center max-w-[260px]">
              Locking satellite radar on your coordinates. Prepare to be judged by the clouds.
            </p>
          </div>
        ) : data && vibe ? (
          /* Primary Weather Card Display */
          <div className="w-full">
            <WeatherCard
              data={data}
              vibe={vibe}
              locationName={locationName}
              coords={coords}
              unit={unit}
              isLoading={isLoading}
              onToggleUnit={toggleUnit}
              onConsultSky={handleConsultSky}
              onRequestGPS={requestLocation}
              onRerollRoast={rerollRoast}
            />

            {/* Simulation Lab & Textbook Condition Presets Drawer */}
            <PresetDebugDrawer
              onSelectPreset={applyPreset}
              onSelectCity={(targetCoords, name) => fetchWeather(targetCoords, name)}
            />
          </div>
        ) : null}

        {/* Neo-brutalist Footer */}
        <footer className="mt-4 text-center">
          <p className="text-[11px] font-display font-black text-neutral-300 tracking-wider uppercase flex items-center justify-center gap-1.5 drop-shadow">
            <span>RAINCHECK</span>
            <span>•</span>
            <span className="text-[#FFE600]">ZERO BLUR</span>
            <span>•</span>
            <span>MAX ATTITUDE</span>
          </p>
          <p className="text-[9px] font-body font-bold text-neutral-400 mt-0.5">
            Open-Meteo & OpenStreetMap • Neo-Brutalist Weather Roaster
          </p>
        </footer>
      </div>
    </main>
  );
};

export default App;
