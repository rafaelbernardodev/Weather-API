import type { OpenMeteoResponse } from "../types/weather";

// ================================
// Tipos auxiliares
// ================================

interface GeocodingResult {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
}

interface GeocodingResponse {
  results?: GeocodingResult[];
}

// ================================
// Constantes da API
// ================================

const OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1/forecast";
const OPEN_METEO_GEOCODING_URL =
  "https://geocoding-api.open-meteo.com/v1/search";

// ================================
// Buscar coordenadas pela cidade
// ================================

export async function fetchCoordsByCity(
  city: string
): Promise<{ latitude: number; longitude: number } | null> {
  const url = `${OPEN_METEO_GEOCODING_URL}?name=${encodeURIComponent(
    city
  )}&count=1&language=pt&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar coordenadas");
  }

  const data: GeocodingResponse = await response.json();

  if (!data.results || data.results.length === 0) {
    return null;
  }

  const { latitude, longitude } = data.results[0];

  return { latitude, longitude };
}

// ================================
// Buscar clima pelas coordenadas
// ================================

export async function fetchWeatherByCoords(
  latitude: number,
  longitude: number
): Promise<OpenMeteoResponse> {
  const url = `${OPEN_METEO_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados meteorológicos");
  }

  const data: OpenMeteoResponse = await response.json();

  return data;
}
