"use client";
import { useEffect, useState } from "react";

interface Coords {
  latitude: number | null;
  longitude: number | null;
}

const Location: React.FC = () => {
  const [location, setLocation] = useState<Coords>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error.message);
        }
      );
    }
  }, []);

  return (
    <div>
      Latitude: {location.latitude}
      <br />
      Longitude: {location.longitude}
    </div>
  );
};

export default Location;
