import { fetchCoordsByCity, fetchWeatherByCoords } from "../api/weatherAPI";
import type { ForecastDay, OpenMeteoResponse, WeatherData } from "../types/weather";
import { WEATHER_CODE_MAP } from "../utils/weatherCodes";


// ================================
// Service principal
// ================================

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  // 1️⃣ Converter cidade → coordenadas
  const coords = await fetchCoordsByCity(city);

  if (!coords) {
    throw new Error("Cidade não encontrada");
  }

  // 2️⃣ Buscar clima usando latitude e longitude
  const apiResponse = await fetchWeatherByCoords(
    coords.latitude,
    coords.longitude
  );

  // 3️⃣ Transformar resposta da API em algo amigável
  return transformApiResponse(apiResponse, city);
}

// ================================
// Transformação de dados
// ================================

function transformApiResponse(
  response: OpenMeteoResponse,
  city: string
): WeatherData {
  const current = response.current_weather;

  const weatherData: WeatherData = {
    city,
    temperature: current.temperature,
    description: WEATHER_CODE_MAP[current.weathercode] ?? "Desconhecido",
    windSpeed: current.windspeed,
    time: new Date(current.time),
  };

  // Umidade (opcional)
  if (response.hourly?.relativehumidity_2m?.length) {
    weatherData.humidity = response.hourly.relativehumidity_2m[0];
  }

  // Previsão diária (opcional)
  if (response.daily) {
    weatherData.forecast = buildForecast(response);
  }

  return weatherData;
}

// ================================
// Forecast
// ================================

function buildForecast(response: OpenMeteoResponse): ForecastDay[] {
  const { time, temperature_2m_min, temperature_2m_max, weathercode } =
    response.daily!;

  return time.map((date, index) => ({
    date: new Date(date),
    minTemp: temperature_2m_min[index],
    maxTemp: temperature_2m_max[index],
    description:
      WEATHER_CODE_MAP[weathercode[index]] ?? "Desconhecido",
  }));
}
