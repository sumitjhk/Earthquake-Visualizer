import React from 'react';
import type { ControlsProps, TimeFrameOption } from '../types/earthquake.types';

const Controls: React.FC<ControlsProps> = ({ 
  timeFrame, 
  setTimeFrame, 
  minMagnitude, 
  setMinMagnitude, 
  onRefresh, 
  loading 
}) => {
  const timeFrameOptions: TimeFrameOption[] = [
    { value: 'hour', label: 'Past Hour', description: 'Most recent earthquakes' },
    { value: 'day', label: 'Past Day', description: 'Last 24 hours' },
    { value: 'week', label: 'Past Week', description: 'Last 7 days' },
    { value: 'month', label: 'Past Month', description: 'Last 30 days' }
  ] as const;

  const magnitudeLabels: Record<string, string> = {
    1.0: 'Micro',
    2.5: 'Minor', 
    4.0: 'Light',
    5.0: 'Moderate',
    6.0: 'Strong',
    7.0: 'Major',
    8.0: 'Great'
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-4">
      {/* Timeframe Selection */}
      <div>
        <h3 className="font-semibold mb-2">Timeframe</h3>
        <div className="flex gap-2 flex-wrap">
          {timeFrameOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setTimeFrame(option.value)}
              className={`px-3 py-1 rounded-lg text-sm border ${
                timeFrame === option.value 
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Magnitude Filter */}
      <div>
        <h3 className="font-semibold mb-2">Minimum Magnitude</h3>
        <input
          type="range"
          min={1.0}
          max={8.0}
          step={0.5}
          value={minMagnitude}
          onChange={(e) => setMinMagnitude(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-sm text-gray-600 mt-1">
          ≥ {minMagnitude} ({magnitudeLabels[minMagnitude.toString()] || 'Custom'})
        </p>
      </div>

      {/* Refresh Button */}
      <button
        onClick={onRefresh}
        disabled={loading}
        className={`px-4 py-2 rounded-lg font-semibold ${
          loading 
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
            : 'bg-green-500 text-white hover:bg-green-600'
        }`}
      >
        {loading ? 'Refreshing...' : 'Refresh Data'}
      </button>
    </div>
  );
};

export default Controls;