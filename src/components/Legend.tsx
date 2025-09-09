import React, { useState } from 'react';
import { getMarkerStyle, getMagnitudeCategory } from '../utils/earthquakeUtils';
import { MAGNITUDE_RANGES } from '../types/earthquake.types';
import type { MagnitudeRange } from '../types/earthquake.types';

interface LegendItemProps {
  magnitude: number;
  range: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ magnitude, range }) => {
  const { color, radius } = getMarkerStyle(magnitude);
  const category = getMagnitudeCategory(magnitude);
  
  return (
    <div className="legend-item">
      <div 
        className="legend-marker"
        style={{ 
          backgroundColor: color,
          width: `${Math.max(radius * 2, 20)}px`,
          height: `${Math.max(radius * 2, 20)}px`
        }}
      />
      <div className="legend-info">
        <span className="legend-range">{range}</span>
        <span className="legend-category">{category.category}</span>
        <span className="legend-description">{category.description}</span>
      </div>
    </div>
  );
};

interface SymbolItemProps {
  symbol: string;
  description: string;
}

const SymbolItem: React.FC<SymbolItemProps> = ({ symbol, description }) => (
  <div className="symbol-item">
    <span className="symbol">{symbol}</span>
    <span>{description}</span>
  </div>
);

const Legend: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const toggleExpansion = (): void => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleExpansion();
    }
  };

  return (
    <div className="legend-container">
      <div 
        className="legend-header" 
        onClick={toggleExpansion}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls="legend-content"
      >
        <h3>🗺️ Magnitude Scale</h3>
        <button 
          className={`legend-toggle ${isExpanded ? 'expanded' : ''}`}
          aria-label={isExpanded ? 'Collapse legend' : 'Expand legend'}
          type="button"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="legend-content" id="legend-content">
          <div className="legend-grid">
            {MAGNITUDE_RANGES.map((range: MagnitudeRange, index: number) => (
              <LegendItem 
                key={index}
                magnitude={range.min}
                range={range.label}
              />
            ))}
          </div>
          
          <div className="legend-notes">
            <h4>📝 Understanding Earthquake Magnitudes</h4>
            <ul>
              <li><strong>Size of markers</strong> represents earthquake magnitude</li>
              <li><strong>Color intensity</strong> indicates severity level</li>
              <li><strong>Click markers</strong> for detailed information</li>
              <li><strong>Magnitude scale</strong> is logarithmic (each unit is 10x stronger)</li>
            </ul>
          </div>

          <div className="legend-symbols">
            <h4>🔍 Map Symbols</h4>
            <div className="symbol-grid">
              <SymbolItem symbol="⚠️" description="Alert Level Active" />
              <SymbolItem symbol="🌊" description="Tsunami Warning" />
              <SymbolItem symbol="📍" description="Earthquake Location" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Legend;