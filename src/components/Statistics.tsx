import React from 'react';
import { calculateStatistics, getAlertColor } from '../utils/earthquakeUtils';
import type { StatisticsProps, AlertLevel } from '../types/earthquake.types';

interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  description?: string;
  color?: 'primary' | 'info' | 'warning' | 'danger' | 'success';
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  value, 
  label, 
  description, 
  color = 'primary' 
}) => (
  <div className={`stat-card stat-card-${color}`}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <span className="stat-number">{value}</span>
      <span className="stat-label">{label}</span>
      {description && <span className="stat-description">{description}</span>}
    </div>
  </div>
);

const Statistics: React.FC<StatisticsProps> = ({ earthquakes }) => {
  const stats = calculateStatistics(earthquakes);

  return (
    <div className="statistics-container">
      
      {/* Main Statistics */}
      <div className="stats-grid">
        <StatCard 
          icon="🌍"
          value={stats.total}
          label="Total Earthquakes"
          description={stats.total === 0 ? "No data available" : "Matching filters"}
          color="primary"
        />
        
        <StatCard 
          icon="📊"
          value={stats.total > 0 ? stats.avgMagnitude.toFixed(1) : '0.0'}
          label="Average Magnitude"
          description={stats.total > 0 ? "Mean intensity" : "No data"}
          color="info"
        />
        
        <StatCard 
          icon="⚠️"
          value={stats.total > 0 ? stats.maxMagnitude.toFixed(1) : '0.0'}
          label="Strongest Earthquake"
          description={stats.total > 0 ? "Maximum recorded" : "No data"}
          color="warning"
        />
        
        <StatCard 
          icon="🌊"
          value={stats.tsunamiWarnings}
          label="Tsunami Warnings"
          description={stats.tsunamiWarnings > 0 ? "Active alerts" : "No warnings"}
          color={stats.tsunamiWarnings > 0 ? "danger" : "success"}
        />
      </div>

      {/* Alert Levels Breakdown */}
      {stats.total > 0 && (
        <div className="alert-levels-container">
          <h3 className="section-title">📋 Alert Level Distribution</h3>
          <div className="alert-levels-grid">
            {(Object.entries(stats.alertLevels) as [AlertLevel, number][]).map(([level, count]) => (
              count > 0 && (
                <div key={level} className="alert-level-item">
                  <div 
                    className="alert-level-indicator"
                    style={{ backgroundColor: getAlertColor(level) }}
                  />
                  <span className="alert-level-label">
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </span>
                  <span className="alert-level-count">{count}</span>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Magnitude Distribution */}
      {stats.total > 0 && (
        <div className="magnitude-distribution">
          <h3 className="section-title">📈 Magnitude Range</h3>
          <div className="magnitude-range-display">
            <div className="range-item">
              <span className="range-label">Minimum:</span>
              <span className="range-value">{stats.minMagnitude.toFixed(1)}</span>
            </div>
            <div className="range-separator">—</div>
            <div className="range-item">
              <span className="range-label">Maximum:</span>
              <span className="range-value">{stats.maxMagnitude.toFixed(1)}</span>
            </div>
          </div>
        </div>
      )}

      {/* No Data Message */}
      {stats.total === 0 && (
        <div className="no-data-message">
          <div className="no-data-icon">🔍</div>
          <h3>No Earthquakes Found</h3>
          <p>Try adjusting your filters to see more data.</p>
          <ul>
            <li>Lower the minimum magnitude</li>
            <li>Expand the time frame</li>
            <li>Check your internet connection</li>
          </ul>
        </div>
      )}

    </div>
  );
};

export default Statistics;