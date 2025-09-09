import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface Earthquake {
  id: string;
  properties: {
    mag: number;
    place: string;
    time: number;
  };
  geometry: {
    coordinates: [number, number, number]; // [longitude, latitude, depth]
  };
}

interface Props {
  earthquakes: Earthquake[];
  loading: boolean;
}

const EarthquakeMap: React.FC<Props> = ({ earthquakes, loading }) => {
  const position: [number, number] = [20, 0]; // Centered near equator

  // Fix default icon issue in React-Leaflet
  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  L.Marker.prototype.options.icon = defaultIcon;

  return (
    <div className="map-container" style={{ height: "70vh", width: "100%" }}>
      {loading && <p className="loading-text">Loading map...</p>}

      {!loading && earthquakes.length === 0 && (
        <p className="no-data-text">⚠️ No earthquake data available for this timeframe.</p>
      )}

      <MapContainer center={position} zoom={2} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {earthquakes.map((eq) => {
          const [lon, lat] = eq.geometry.coordinates;
          return (
            <Marker key={eq.id} position={[lat, lon]}>
              <Popup>
                <strong>Magnitude:</strong> {eq.properties.mag} <br />
                <strong>Location:</strong> {eq.properties.place} <br />
                <strong>Time:</strong>{" "}
                {new Date(eq.properties.time).toLocaleString()}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default EarthquakeMap;