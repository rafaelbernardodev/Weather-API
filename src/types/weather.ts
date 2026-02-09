// ================================
// Tipos vindos da Open-Meteo
// ================================

// Resposta básica da API de clima atual
export interface OpenMeteoCurrentWeather {
  temperature: number;        // °C
  windspeed: number;          // km/h
  winddirection: number;      // graus
  weathercode: number;        // código do clima
  time: string;               // ISO string
}

export interface OpenMeteoHourly {
  time: string[];
  relativehumidity_2m: number[];
}

export interface OpenMeteoDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current_weather: OpenMeteoCurrentWeather;
  hourly?: OpenMeteoHourly;
  daily?: OpenMeteoDaily;
}

// ================================
// Tipos internos do aplicativo
// ================================

// Dados que o app realmente consome
export interface ForecastDay {
  date: Date;
  minTemp: number;
  maxTemp: number;
  description: string;
}

export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  windSpeed: number;
  time: Date;
  humidity?: number;
  forecast?: ForecastDay[];
}


// ================================
// Tipos auxiliares
// ================================

// Mapeamento de códigos da Open-Meteo para descrições legíveis
export type WeatherCodeMap = {
  [code: number]: string;
};
