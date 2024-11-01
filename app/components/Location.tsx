"use client";

import { useState } from "react";

interface LocationProps {
  latitude: number | null;
  longitude: number | null;
}

const Location: React.FC = () => {
  const [location, setLocation] = useState<LocationProps>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <h2>GPS Information</h2>
      {location.latitude && location.longitude ? (
        <p>
          Latitude: {location.latitude} <br />
          Longitude: {location.longitude}
        </p>
      ) : (
        <button onClick={getLocation}>Get Location</button>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Location;
