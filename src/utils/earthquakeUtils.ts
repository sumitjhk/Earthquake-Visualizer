import type {
  Earthquake,
  MarkerStyle,
  FormattedEarthquake,
  EarthquakeStatistics,
  MagnitudeCategory,
  AlertLevel
} from '../types/earthquake.types';

/**
 * Get marker style based on earthquake magnitude
 */
export function getMarkerStyle(magnitude: number): MarkerStyle {
  if (magnitude >= 7) {
    return { color: '#8B0000', radius: 15 }; // Dark red
  } else if (magnitude >= 6) {
    return { color: '#FF0000', radius: 12 }; // Red
  } else if (magnitude >= 5) {
    return { color: '#FF4500', radius: 10 }; // Orange red
  } else if (magnitude >= 4) {
    return { color: '#FFA500', radius: 8 };  // Orange
  } else if (magnitude >= 3) {
    return { color: '#FFFF00', radius: 6 };  // Yellow
  } else {
    return { color: '#90EE90', radius: 4 };  // Light green
  }
}

/**
 * Format earthquake data for display
 */
export function formatEarthquakeData(earthquake: Earthquake): FormattedEarthquake {
  const { properties, geometry } = earthquake;
  const { mag, place, time, alert, tsunami } = properties;
  const [lng, lat, depth] = geometry.coordinates;
  
  return {
    magnitude: mag.toFixed(1),
    place: place || 'Unknown location',
    time: new Date(time).toLocaleString(),
    depth: depth ? depth.toFixed(1) : 'Unknown',
    alert: alert || null,
    tsunami: tsunami === 1,
    coordinates: { lat, lng }
  };
}

/**
 * Calculate statistics from earthquake array
 */
export function calculateStatistics(earthquakes: Earthquake[]): EarthquakeStatistics {
  if (!earthquakes || earthquakes.length === 0) {
    return {
      total: 0,
      avgMagnitude: 0,
      maxMagnitude: 0,
      minMagnitude: 0,
      tsunamiWarnings: 0,
      alertLevels: { green: 0, yellow: 0, orange: 0, red: 0 }
    };
  }

  const magnitudes = earthquakes.map(eq => eq.properties.mag);
  const tsunamiCount = earthquakes.filter(eq => eq.properties.tsunami === 1).length;
  
  const alertLevels = earthquakes.reduce<Record<AlertLevel, number>>((acc, eq) => {
    const alert: AlertLevel = eq.properties.alert || 'green';
    acc[alert] = (acc[alert] || 0) + 1;
    return acc;
  }, { green: 0, yellow: 0, orange: 0, red: 0 });

  return {
    total: earthquakes.length,
    avgMagnitude: magnitudes.reduce((sum, mag) => sum + mag, 0) / magnitudes.length,
    maxMagnitude: Math.max(...magnitudes),
    minMagnitude: Math.min(...magnitudes),
    tsunamiWarnings: tsunamiCount,
    alertLevels
  };
}

/**
 * Get magnitude category description
 */
export function getMagnitudeCategory(magnitude: number): MagnitudeCategory {
  if (magnitude < 2.5) {
    return {
      category: 'Micro',
      description: 'Not felt by people',
      effects: 'Detected only by seismographs'
    };
  } else if (magnitude < 4.0) {
    return {
      category: 'Minor',
      description: 'Felt by few people',
      effects: 'Often not noticed'
    };
  } else if (magnitude < 5.0) {
    return {
      category: 'Light',
      description: 'Felt by most people',
      effects: 'Dishes rattle, doors swing'
    };
  } else if (magnitude < 6.0) {
    return {
      category: 'Moderate',
      description: 'Felt by all',
      effects: 'Some damage to buildings'
    };
  } else if (magnitude < 7.0) {
    return {
      category: 'Strong',
      description: 'Damaging',
      effects: 'Considerable damage'
    };
  } else if (magnitude < 8.0) {
    return {
      category: 'Major',
      description: 'Highly damaging',
      effects: 'Serious damage over large areas'
    };
  } else {
    return {
      category: 'Great',
      description: 'Devastating',
      effects: 'Severe damage over vast areas'
    };
  }
}

/**
 * Format time difference for display
 */
export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

/**
 * Validate earthquake data structure
 */
export function isValidEarthquake(earthquake: any): earthquake is Earthquake {
  return !!(
    earthquake &&
    earthquake.geometry &&
    earthquake.geometry.coordinates &&
    Array.isArray(earthquake.geometry.coordinates) &&
    earthquake.geometry.coordinates.length >= 2 &&
    earthquake.properties &&
    typeof earthquake.properties.mag === 'number' &&
    !isNaN(earthquake.properties.mag)
  );
}

/**
 * Get alert level color
 */
export function getAlertColor(level: AlertLevel): string {
  const colors: Record<AlertLevel, string> = {
    green: '#28a745',
    yellow: '#ffc107', 
    orange: '#fd7e14',
    red: '#dc3545'
  };
  return colors[level];
}

/**
 * Convert magnitude to Richter scale description
 */
export function getRichterDescription(magnitude: number): string {
  if (magnitude < 2.0) return 'Typically not felt';
  if (magnitude < 3.0) return 'Weak - felt by few';
  if (magnitude < 4.0) return 'Light - felt by many';
  if (magnitude < 5.0) return 'Moderate - felt by most, some damage';
  if (magnitude < 6.0) return 'Strong - damage to poorly built structures';
  if (magnitude < 7.0) return 'Major - serious damage over large areas';
  if (magnitude < 8.0) return 'Great - severe damage, casualties';
  return 'Extreme - devastating damage, many casualties';
}

/**
 * Get earthquake depth category
 */
export function getDepthCategory(depth: number): { category: string; description: string } {
  if (depth < 70) {
    return {
      category: 'Shallow',
      description: 'More likely to cause damage'
    };
  } else if (depth < 300) {
    return {
      category: 'Intermediate',
      description: 'Moderate depth earthquake'
    };
  } else {
    return {
      category: 'Deep',
      description: 'Less likely to cause surface damage'
    };
  }
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export function calculateDistance(
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}