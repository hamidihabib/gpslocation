"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Location {
  latitude: number;
  longitude: number;
}

interface Mensa {
  id: number;
  name: string;
}

const Mensen: React.FC = () => {
  const [mensen, setMensen] = useState<Mensa[]>([]);
  const [location, setLocation] = useState<Location | null>(null);

  const fetchApiData = async ({ latitude, longitude }: Location) => {
    const res = await fetch(`https://openmensa.org/api/v2/canteens?near[lat]=${latitude}&near[lng]=${longitude}&near[dist]=50000`);
    const data = await res.json();
    setMensen(data);
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Geolocation error:", error.message);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchApiData(location);
    }
  }, [location]);

  return (
    <div>
      <h1>Alle Mensen</h1>
      <p>Alle Mensen</p>
      {mensen.length > 0 && mensen.map((mensa) => (
        <Link href={`/mensen/${mensa.id}`} key={mensa.id}>
          <a>
            <h3>{mensa.name}</h3>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Mensen;
