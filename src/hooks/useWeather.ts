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

export interface LocationInfo {
  specific: string; // Detailed locality: neighborhood, street, district, ward
  area: string;     // Broad region: city, province/state, country
  full: string;     // Combined readable string
}

export interface HourlyForecastItem {
  time: string;           // "NOW", "9 PM", "10 PM"
  rawTime: string;        // ISO timestamp
  tempC: number;
  weatherCode: number;
  isDay: number;
  precipitationProb: number;
}

export const FALLBACK_LOCATIONS: { name: string; location: LocationInfo; coords: Coordinates }[] = [
  {
    name: 'Ho Chi Minh City 🇻🇳',
    location: {
      specific: 'Bến Nghé, District 1',
      area: 'Ho Chi Minh City, Vietnam',
      full: 'Bến Nghé, District 1, Ho Chi Minh City',
    },
    coords: { lat: 10.8231, lon: 106.6297 },
  },
  {
    name: 'Da Lat 🌲',
    location: {
      specific: 'Ward 1, Xuan Huong Lake',
      area: 'Da Lat, Lam Dong, Vietnam',
      full: 'Ward 1, Xuan Huong Lake, Da Lat',
    },
    coords: { lat: 11.9404, lon: 108.4583 },
  },
  {
    name: 'Tokyo 🗼',
    location: {
      specific: 'Shibuya Crossing, Shibuya Ward',
      area: 'Tokyo, Japan',
      full: 'Shibuya Crossing, Shibuya, Tokyo',
    },
    coords: { lat: 35.6762, lon: 139.6503 },
  },
  {
    name: 'Reykjavik 🧊',
    location: {
      specific: 'Miðborg (Downtown)',
      area: 'Reykjavik, Capital Region, Iceland',
      full: 'Miðborg, Reykjavik, Iceland',
    },
    coords: { lat: 64.1466, lon: -21.9426 },
  },
  {
    name: 'Death Valley 🔥',
    location: {
      specific: 'Furnace Creek Visitor Basin',
      area: 'Inyo County, California, USA',
      full: 'Furnace Creek Basin, Death Valley, CA',
    },
    coords: { lat: 36.5323, lon: -116.9325 },
  },
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
  const [location, setLocation] = useState<LocationInfo>({
    specific: 'Detecting...',
    area: 'Triangulating radar',
    full: 'Detecting precise coordinates...',
  });
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastItem[]>([]);
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [vibe, setVibe] = useState<WeatherVibe | null>(null);
  const [, startTransition] = useTransition();

  // Reverse Geocoding with OpenStreetMap Nominatim for granular location detection
  const fetchDetailedLocation = async (lat: number, lon: number): Promise<LocationInfo> => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Raincheck-Weather-Roaster/2.0',
        },
      });

      if (!res.ok) {
        return {
          specific: 'Local Sector',
          area: 'Somewhere on Earth',
          full: 'Somewhere on Earth',
        };
      }

      const json = await res.json();
      const addr = json.address;
      if (!addr) {
        return {
          specific: 'Local Sector',
          area: 'Somewhere on Earth',
          full: 'Somewhere on Earth',
        };
      }

      // Detailed local components: street / amenity + neighborhood / ward / district
      const roadOrLandmark = addr.road || addr.pedestrian || addr.amenity || addr.building;
      const districtOrWard = addr.suburb || addr.quarter || addr.neighbourhood || addr.city_district || addr.hamlet;

      let specific = [roadOrLandmark, districtOrWard].filter(Boolean).join(', ');

      // Broader components: city / town + state / country
      const cityOrTown = addr.city || addr.town || addr.village || addr.municipality || addr.county;
      const stateOrCountry = addr.state || addr.country;

      let area = [cityOrTown, stateOrCountry].filter(Boolean).join(', ');

      // Fallbacks if specific is still empty
      if (!specific) {
        specific = cityOrTown || 'Local Sector';
        area = stateOrCountry || 'Earth';
      }

      const full = [specific, area].filter(Boolean).join(' • ');

      return { specific, area, full };
    } catch {
      return {
        specific: 'Satellite Blindspot',
        area: 'Somewhere on Earth',
        full: 'Somewhere on Earth',
      };
    }
  };

  // Fetch Open-Meteo Weather with 24h Hourly Forecast
  const fetchWeather = useCallback(
    async (targetCoords: Coordinates, customLoc?: string | LocationInfo) => {
      setIsLoading(true);
      setError(null);

      try {
        const [weatherRes, locInfo] = await Promise.all([
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${targetCoords.lat}&longitude=${targetCoords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day,apparent_temperature&hourly=weather_code,temperature_2m,precipitation_probability,is_day&timezone=auto`
          ),
          customLoc
            ? Promise.resolve(
                typeof customLoc === 'string'
                  ? { specific: customLoc, area: '', full: customLoc }
                  : customLoc
              )
            : fetchDetailedLocation(targetCoords.lat, targetCoords.lon),
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

        // Extract next 24-hour timeline from hourly data
        const rawHourly = weatherJson.hourly;
        let next24Hours: HourlyForecastItem[] = [];

        if (rawHourly && Array.isArray(rawHourly.time)) {
          const now = new Date();
          // Find closest current hour
          const currentHourPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}`;
          let startIndex = rawHourly.time.findIndex((t: string) => t.startsWith(currentHourPrefix));
          if (startIndex === -1) {
            startIndex = rawHourly.time.findIndex((t: string) => new Date(t) >= now);
            if (startIndex === -1) startIndex = 0;
          }

          next24Hours = rawHourly.time.slice(startIndex, startIndex + 24).map((timeStr: string, idx: number) => {
            const actualIndex = startIndex + idx;
            const itemDate = new Date(timeStr);
            const isNow = idx === 0;
            const timeLabel = isNow ? 'NOW' : itemDate.toLocaleTimeString([], { hour: 'numeric', hour12: true });

            return {
              time: timeLabel,
              rawTime: timeStr,
              tempC: rawHourly.temperature_2m[actualIndex] ?? 0,
              weatherCode: rawHourly.weather_code[actualIndex] ?? 0,
              isDay: rawHourly.is_day ? rawHourly.is_day[actualIndex] ?? 1 : (itemDate.getHours() >= 6 && itemDate.getHours() < 18 ? 1 : 0),
              precipitationProb: rawHourly.precipitation_probability ? rawHourly.precipitation_probability[actualIndex] ?? 0 : 0,
            };
          });
        }

        const resolvedVibe = resolveVibe(
          weatherPayload.weatherCode,
          weatherPayload.temperature,
          weatherPayload.isDay
        );

        startTransition(() => {
          setData(weatherPayload);
          setCoords(targetCoords);
          setLocation(locInfo);
          setHourlyForecast(next24Hours);
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
      fetchWeather(FALLBACK_LOCATIONS[0].coords, FALLBACK_LOCATIONS[0].location);
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

  // Apply textbook preset simulation with synthesized 24h hourly curve
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

      // Generate 24 hours of simulated progression matching the preset
      const simulatedHourly: HourlyForecastItem[] = Array.from({ length: 24 }).map((_, idx) => {
        const hourOffset = idx;
        const currentH = (new Date().getHours() + hourOffset) % 24;
        const isDaytime = currentH >= 6 && currentH < 18 ? 1 : 0;
        // Diurnal temperature variation
        const tempVariation = isDaytime ? Math.sin((currentH - 6) / 12 * Math.PI) * 4 : -2;

        return {
          time: idx === 0 ? 'NOW' : `${currentH % 12 || 12} ${currentH >= 12 ? 'PM' : 'AM'}`,
          rawTime: new Date(Date.now() + idx * 3600000).toISOString(),
          tempC: Math.round(preset.tempC + tempVariation),
          weatherCode: preset.code,
          isDay: isDaytime,
          precipitationProb: preset.code >= 50 ? Math.min(95, 40 + idx * 2) : 5,
        };
      });

      const resolvedVibe = resolveVibe(preset.code, preset.tempC, preset.isDay);

      startTransition(() => {
        setData(mockData);
        setLocation({
          specific: `Simulation Matrix: ${preset.name}`,
          area: 'Virtual Atmosphere Lab',
          full: `Simulation: ${preset.name}`,
        });
        setHourlyForecast(simulatedHourly);
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
      fetchWeather(city.coords, city.location);
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
    location,
    locationName: location.full,
    hourlyForecast,
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
