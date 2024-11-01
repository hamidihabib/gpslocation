import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Mensa {
  id: number;
  name: string;
}

const Mensen: React.FC = () => {
  const [mensen, setMensen] = useState<Mensa[]>([]);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const fetchApiData = async (latitude: number, longitude: number) => {
    const res = await fetch(`https://openmensa.org/api/v2/canteens?near[lat]=${latitude}&near[lng]=${longitude}&near[dist]=50000`);
    const data = await res.json();
    setMensen(data);
  };

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

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchApiData(latitude, longitude);
    }
  }, [latitude, longitude]);

  return (
    <div>
      Latitude: {latitude}
      Longitude: {longitude}
    </div>
  );
};

export default Mensen;
