// USGS Earthquake API Response Types
export interface EarthquakeGeometry {
  type: 'Point';
  coordinates: [number, number, number]; // [longitude, latitude, depth]
}

export interface EarthquakeProperties {
  mag: number;
  place: string;
  time: number;
  updated: number;
  tz?: number;
  url: string;
  detail: string;
  felt?: number;
  cdi?: number;
  mmi?: number;
  alert?: 'green' | 'yellow' | 'orange' | 'red' | null;
  status: string;
  tsunami: 0 | 1;
  sig: number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst?: number;
  dmin?: number;
  rms?: number;
  gap?: number;
  magType: string;
  type: string;
  title: string;
}

export interface Earthquake {
  type: 'Feature';
  properties: EarthquakeProperties;
  geometry: EarthquakeGeometry;
  id: string;
}

export interface EarthquakeAPIResponse {
  type: 'FeatureCollection';
  metadata: {
    generated: number;
    url: string;
    title: string;
    status: number;
    api: string;
    count: number;
  };
  features: Earthquake[];
}

// Application Types
export type TimeFrame = 'hour' | 'day' | 'week' | 'month';

export type AlertLevel = 'green' | 'yellow' | 'orange' | 'red';

export interface MarkerStyle {
  color: string;
  radius: number;
}

export interface FormattedEarthquake {
  magnitude: string;
  place: string;
  time: string;
  depth: string;
  alert: AlertLevel | null;
  tsunami: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface EarthquakeStatistics {
  total: number;
  avgMagnitude: number;
  maxMagnitude: number;
  minMagnitude: number;
  tsunamiWarnings: number;
  alertLevels: Record<AlertLevel, number>;
}

export interface MagnitudeCategory {
  category: string;
  description: string;
  effects: string;
}

export interface MagnitudeRange {
  min: number;
  max: number;
  label: string;
}

export const MAGNITUDE_RANGES: MagnitudeRange[] = [
  { min: 1.0, max: 2.4, label: "Micro (1.0–2.4)" },
  { min: 2.5, max: 3.9, label: "Minor (2.5–3.9)" },
  { min: 4.0, max: 4.9, label: "Light (4.0–4.9)" },
  { min: 5.0, max: 5.9, label: "Moderate (5.0–5.9)" },
  { min: 6.0, max: 6.9, label: "Strong (6.0–6.9)" },
  { min: 7.0, max: 7.9, label: "Major (7.0–7.9)" },
  { min: 8.0, max: 10.0, label: "Great (8.0+)" }
] as const;

// Hook Types
export interface UseEarthquakesReturn {
  earthquakes: Earthquake[];
  loading: boolean;
  error: string | null;
  lastFetch: Date | null;
  refetch: () => void;
}

// Component Props Types
export interface EarthquakeMapProps {
  earthquakes: Earthquake[];
  loading: boolean;
}

export interface ControlsProps {
  timeFrame: TimeFrame;
  setTimeFrame: (timeFrame: TimeFrame) => void;
  minMagnitude: number;
  setMinMagnitude: (magnitude: number) => void;
  onRefresh: () => void;
  loading: boolean;
}

export interface StatisticsProps {
  earthquakes: Earthquake[];
}

export interface LegendProps {}

// Utility Types
export type TimeFrameOption = {
  value: TimeFrame;
  label: string;
  description: string;
};

export type StatCardColor = 'primary' | 'info' | 'warning' | 'danger' | 'success';

export interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  description?: string;
  color?: StatCardColor;
}

// API Configuration
export type APIEndpoints = Record<TimeFrame, string>;

// Map Types
export interface MapBounds {
  lat: number;
  lng: number;
}[]

// Error Types
export interface EarthquakeError extends Error {
  code?: string;
  status?: number;
}