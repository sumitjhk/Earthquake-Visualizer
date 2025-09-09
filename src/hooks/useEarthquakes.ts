import { useState, useEffect, useCallback } from 'react';
import type { 
  Earthquake, 
  EarthquakeAPIResponse, 
  TimeFrame, 
  UseEarthquakesReturn,
  APIEndpoints
} from '../types/earthquake.types';

// API endpoints for different timeframes
const API_ENDPOINTS: APIEndpoints = {
  hour: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson',
  day: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
  week: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',
  month: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
} as const;

// Custom Error class
class EarthquakeFetchError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.name = 'EarthquakeFetchError';
    this.code = code;
    this.status = status;
  }
}

export function useEarthquakes(timeFrame: TimeFrame = 'day'): UseEarthquakesReturn {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const fetchEarthquakes = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS[timeFrame]);
      if (!response.ok) {
        throw new EarthquakeFetchError(
          `Failed to fetch earthquake data: ${response.status} ${response.statusText}`
        );
      }

      const data: EarthquakeAPIResponse = await response.json();
      console.log("Fetch data:", data);


      if (!data.features || !Array.isArray(data.features)) {
        throw new EarthquakeFetchError('Invalid data format received from API');
      }

      // Only keep valid earthquakes
      const validEarthquakes = data.features.filter(
        (eq): eq is Earthquake =>
          !!(
            eq.geometry?.coordinates &&
            Array.isArray(eq.geometry.coordinates) &&
            eq.geometry.coordinates.length >= 2 &&
            typeof eq.properties?.mag === 'number' &&
            !isNaN(eq.properties.mag)
          )
      );

      console.log("Valid earthquakes:", validEarthquakes.length);

      setEarthquakes(validEarthquakes);
      setLastFetch(new Date());
    } catch (err) {
      console.error('Error fetching earthquake data:', err);
      setError(err instanceof Error ? err.message : 'Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [timeFrame]);

  // Fetch data whenever the timeframe changes
  useEffect(() => {
    fetchEarthquakes();
  }, [timeFrame, fetchEarthquakes]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchEarthquakes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchEarthquakes]);

  return {
    earthquakes,
    loading,
    error,
    lastFetch,
    refetch: fetchEarthquakes
  };
}