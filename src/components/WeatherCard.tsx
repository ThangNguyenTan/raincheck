import React from 'react';
import { BrandPill } from './BrandPill';
import { BouncingEmoji } from './BouncingEmoji';
import { TempDisplay } from './TempDisplay';
import { LocationBadge } from './LocationBadge';
import { HourlyForecast } from './HourlyForecast';
import { TelemetryGrid } from './TelemetryGrid';
import { RoastBox } from './RoastBox';
import { ActionButton } from './ActionButton';
import type { WeatherData, Coordinates, LocationInfo, HourlyForecastItem } from '../hooks/useWeather';
import type { WeatherVibe } from '../lib/wmoEngine';

interface WeatherCardProps {
  data: WeatherData;
  vibe: WeatherVibe;
  location: LocationInfo;
  hourlyForecast: HourlyForecastItem[];
  coords: Coordinates | null;
  unit: 'C' | 'F';
  isLoading: boolean;
  onToggleUnit: () => void;
  onConsultSky: () => void;
  onRequestGPS: () => void;
  onRerollRoast: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  data,
  vibe,
  location,
  hourlyForecast,
  coords,
  unit,
  isLoading,
  onToggleUnit,
  onConsultSky,
  onRequestGPS,
  onRerollRoast,
}) => {
  return (
    <div
      className="w-full rounded-3xl border-4 border-black shadow-neo-lg p-4 sm:p-5 transition-colors duration-500 relative overflow-hidden text-black"
      style={{
        backgroundColor: vibe.bgColor,
      }}
    >
      {/* Decorative Neo-Brutalist Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-black/20" />

      {/* 1. Brand Pill + Unit Toggle */}
      <BrandPill unit={unit} onToggleUnit={onToggleUnit} />

      {/* 2. Interactive Bouncing Emoji */}
      <BouncingEmoji
        emoji={vibe.emoji}
        condition={vibe.condition}
        onTap={onRerollRoast}
      />

      {/* 3. Massive Temperature Display */}
      <TempDisplay
        temperatureC={data.temperature}
        apparentTempC={data.apparentTemperature}
        unit={unit}
        isExtreme={vibe.isExtremeTemp}
      />

      {/* 4. Granular Location Badge & GPS Refresh */}
      <LocationBadge
        location={location}
        coords={coords}
        isGPS={!!coords}
        onRequestGPS={onRequestGPS}
        isLoading={isLoading}
      />

      {/* 5. 24-Hour Timeline / Hourly Radar */}
      <HourlyForecast items={hourlyForecast} unit={unit} />

      {/* 6. Telemetry Grid (Wind, Humidity, Hazard Level) */}
      <TelemetryGrid
        windSpeed={data.windSpeed}
        humidity={data.humidity}
        hazardLevel={vibe.hazardLevel}
      />

      {/* 7. Dynamic Sarcastic Roast Box */}
      <RoastBox vibe={vibe} onReroll={onRerollRoast} />

      {/* 8. Action Button ("CONSULT THE SKY") */}
      <ActionButton onClick={onConsultSky} isLoading={isLoading} />
    </div>
  );
};
