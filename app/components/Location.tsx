"use client"

import { useEffect, useState } from 'react';


const Location: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);



  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setLatitude(coords.latitude);
          setLongitude(coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error.message);
        }
      );
    }
  }, []);

  return (
    <div>
      Latitude: {latitude}
      Longitude: {longitude}
    </div>
  );
};

export default Location;
