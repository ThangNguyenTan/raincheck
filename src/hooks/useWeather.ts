import { useState, useEffect, useCallback, useTransition } from 'react';
import { resolveVibe, type WeatherVibe } from '../lib/wmoEngine';
import { triggerConfetti } from '../lib/confetti';

export interface WeatherData {
  temperature: number; // raw Celsius
  apparentTemperature: number; // raw Celsius
  humidity: number;
  windSpeed: number; // km/h
  weatherCode: number;
  isDay: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export const FALLBACK_LOCATIONS: { name: string; coords: Coordinates }[] = [
  { name: 'Ho Chi Minh City 🇻🇳', coords: { lat: 10.8231, lon: 106.6297 } },
  { name: 'Da Lat 🌲', coords: { lat: 11.9404, lon: 108.4583 } },
  { name: 'Tokyo 🗼', coords: { lat: 35.6762, lon: 139.6503 } },
  { name: 'Reykjavik 🧊', coords: { lat: 64.1466, lon: -21.9426 } },
  { name: 'Death Valley 🔥', coords: { lat: 36.5323, lon: -116.9325 } },
];

export function toFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

export function formatTemp(celsius: number, unit: 'C' | 'F'): string {
  if (unit === 'F') {
    return `${toFahrenheit(celsius)}°F`;
  }
  return `${Math.round(celsius)}°C`;
}

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState<string>('Detecting location...');
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [vibe, setVibe] = useState<WeatherVibe | null>(null);
  const [, startTransition] = useTransition();

  // Reverse Geocoding with OpenStreetMap Nominatim
  const fetchCityName = async (lat: number, lon: number): Promise<string> => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Raincheck-Weather-Roaster/1.0',
        },
      });

      if (!res.ok) {
        return 'Somewhere on Earth';
      }

      const json = await res.json();
      const addr = json.address;
      if (!addr) return 'Somewhere on Earth';

      return (
        addr.city ||
        addr.town ||
        addr.village ||
        addr.suburb ||
        addr.county ||
        addr.state ||
        'Somewhere on Earth'
      );
    } catch {
      return 'Somewhere on Earth';
    }
  };

  // Fetch Open-Meteo Weather
  const fetchWeather = useCallback(
    async (targetCoords: Coordinates, customCityName?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const [weatherRes, cityName] = await Promise.all([
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${targetCoords.lat}&longitude=${targetCoords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day,apparent_temperature&hourly=weather_code,temperature_2m&timezone=auto`
          ),
          customCityName ? Promise.resolve(customCityName) : fetchCityName(targetCoords.lat, targetCoords.lon),
        ]);

        if (!weatherRes.ok) {
          throw new Error('Open-Meteo sky satellites went on strike. Status: ' + weatherRes.status);
        }

        const weatherJson = await weatherRes.json();
        const current = weatherJson.current;

        const weatherPayload: WeatherData = {
          temperature: current.temperature_2m,
          apparentTemperature: current.apparent_temperature,
          humidity: current.relative_humidity_2m,
          windSpeed: current.wind_speed_10m,
          weatherCode: current.weather_code,
          isDay: current.is_day,
        };

        const resolvedVibe = resolveVibe(
          weatherPayload.weatherCode,
          weatherPayload.temperature,
          weatherPayload.isDay
        );

        startTransition(() => {
          setData(weatherPayload);
          setCoords(targetCoords);
          setLocationName(cityName);
          setVibe(resolvedVibe);
          setIsLoading(false);
        });

        triggerConfetti({ x: 0.5, y: 0.4 });
      } catch (err: unknown) {
        console.error('Weather fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown weather catastrophe');
        setIsLoading(false);
      }
    },
    []
  );

  // Geolocation request handler
  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Your browser is living in 1995. No Geolocation support.');
      // Auto fallback to Ho Chi Minh City
      fetchWeather(FALLBACK_LOCATIONS[0].coords, FALLBACK_LOCATIONS[0].name);
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: Coordinates = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        fetchWeather(coords);
      },
      (geoError) => {
        setIsLoading(false);
        switch (geoError.code) {
          case 1: // PERMISSION_DENIED
            setError('Did you deny location permission? Coward.');
            break;
          case 2: // POSITION_UNAVAILABLE
            setError('Satellites lost you. Are you underground?');
            break;
          case 3: // TIMEOUT
            setError('GPS timed out. The satellites fell asleep.');
            break;
          default:
            setError('GPS had an existential crisis.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, [fetchWeather]);

  // Apply textbook preset simulation
  const applyPreset = useCallback(
    (preset: { code: number; tempC: number; isDay: number; name: string }) => {
      setIsLoading(true);
      setError(null);

      // Simulated weather payload based on preset
      const mockData: WeatherData = {
        temperature: preset.tempC,
        apparentTemperature: preset.tempC >= 30 ? preset.tempC + 4 : preset.tempC - 2,
        humidity: preset.code >= 50 ? 92 : 45,
        windSpeed: preset.code >= 90 ? 42 : 12,
        weatherCode: preset.code,
        isDay: preset.isDay,
      };

      const resolvedVibe = resolveVibe(preset.code, preset.tempC, preset.isDay);

      startTransition(() => {
        setData(mockData);
        setLocationName(`Simulation: ${preset.name}`);
        setVibe(resolvedVibe);
        setIsLoading(false);
      });

      triggerConfetti({ x: 0.5, y: 0.35 });
    },
    []
  );

  // Manual fallback selection
  const selectFallbackCity = useCallback(
    (cityIndex: number) => {
      const city = FALLBACK_LOCATIONS[cityIndex] || FALLBACK_LOCATIONS[0];
      fetchWeather(city.coords, city.name);
    },
    [fetchWeather]
  );

  // Toggle °C and °F
  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  }, []);

  // Reroll roast title & quote
  const rerollRoast = useCallback(() => {
    if (!data) return;
    const freshVibe = resolveVibe(data.weatherCode, data.temperature, data.isDay);
    setVibe(freshVibe);
    triggerConfetti({ x: 0.5, y: 0.5 });
  }, [data]);

  // Auto-run geolocation on mount
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return {
    data,
    vibe,
    coords,
    locationName,
    isLoading,
    error,
    unit,
    requestLocation,
    applyPreset,
    selectFallbackCity,
    toggleUnit,
    rerollRoast,
    fetchWeather,
  };
}
