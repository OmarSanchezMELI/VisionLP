"use client";

import { useState, useEffect } from 'react';
import { getWeather, type WeatherOutput } from '@/ai/flows/weather-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { Thermometer } from 'lucide-react';

export function WeatherDisplay() {
  const [weather, setWeather] = useState<WeatherOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Coordinates for Tultepec, Mexico
        const result = await getWeather({ latitude: 19.665556, longitude: -99.115833 });
        setWeather(result);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar el clima.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (isLoading) {
    return <Skeleton className="h-5 w-48" />;
  }

  if (error) {
    return <div className="text-sm font-medium text-destructive">{error}</div>;
  }

  if (weather) {
    return (
      <div className="text-sm font-medium text-muted-foreground flex items-center">
        <Thermometer className="mr-2 h-4 w-4 text-primary" />
        <span>En Tultepec: {weather.temperature}°C, {weather.description}</span>
      </div>
    );
  }

  return null;
}
