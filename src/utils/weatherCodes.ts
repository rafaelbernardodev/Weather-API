import type { WeatherCodeMap } from "../types/weather";

// ================================
// Mapeamento de códigos da Open-Meteo
// https://open-meteo.com/en/docs
// ================================

export const WEATHER_CODE_MAP: WeatherCodeMap = {
  0: "Céu limpo",

  1: "Principalmente limpo",
  2: "Parcialmente nublado",
  3: "Nublado",

  45: "Neblina",
  48: "Neblina com gelo",

  51: "Garoa leve",
  53: "Garoa moderada",
  55: "Garoa intensa",

  56: "Garoa congelante leve",
  57: "Garoa congelante intensa",

  61: "Chuva fraca",
  63: "Chuva moderada",
  65: "Chuva forte",

  66: "Chuva congelante leve",
  67: "Chuva congelante forte",

  71: "Neve fraca",
  73: "Neve moderada",
  75: "Neve intensa",

  77: "Grãos de neve",

  80: "Pancadas de chuva fracas",
  81: "Pancadas de chuva moderadas",
  82: "Pancadas de chuva fortes",

  85: "Pancadas de neve fracas",
  86: "Pancadas de neve fortes",

  95: "Tempestade",
  96: "Tempestade com granizo leve",
  99: "Tempestade com granizo forte",
};
