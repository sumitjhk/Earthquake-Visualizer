import React, { useState } from 'react';
import EarthquakeMap from './components/EarthquakeMap';
import Controls from './components/Controls';
import Statistics from './components/Statistics';
import Legend from './components/Legend';
import { useEarthquakes } from './hooks/useEarthquakes';
import type { TimeFrame } from './types/earthquake.types';
import './styles/index.css';
import 'leaflet/dist/leaflet.css';

const App: React.FC = () => {
  const [minMagnitude, setMinMagnitude] = useState<number>(2.5);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('day');
  
  const { earthquakes, loading, error, refetch } = useEarthquakes(timeFrame);

  // Filter earthquakes by magnitude
  const filteredEarthquakes = earthquakes.filter(eq => 
    eq.properties.mag >= minMagnitude
  );

  const handleRefresh = (): void => {
    refetch();
  };

  if (error) {
    return (
      <div className="app-container">
        <div className="error-container">
          <div className="error-card">
            <h2>⚠️ Error Loading Data</h2>
            <p>{error}</p>
            <p>Please check your internet connection and try again.</p>
            <button onClick={handleRefresh} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🌍 Earthquake Visualizer</h1>
        <p>Real-time seismic activity monitoring for geography research</p>
      </header>

      <Controls 
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
        minMagnitude={minMagnitude}
        setMinMagnitude={setMinMagnitude}
        onRefresh={handleRefresh}
        loading={loading}
      />

      <Statistics earthquakes={filteredEarthquakes} />

      <div className="map-section">
        <EarthquakeMap 
          earthquakes={filteredEarthquakes}
          loading={loading}
        />
      </div>

      <Legend />

      <footer className="app-footer">
        <p>
          Data provided by{' '}
          <a 
            href="https://earthquake.usgs.gov/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            USGS Earthquake Hazards Program
          </a>
        </p>
        <p>Last updated: {new Date().toLocaleString()}</p>
      </footer>
    </div>
  );
};

export default App;