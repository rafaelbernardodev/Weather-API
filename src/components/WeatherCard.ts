import type { ForecastDay, WeatherData } from "../types/weather";
import {
  formatDateTime,
  formatTemperature,
  formatWindSpeed,
} from "../utils/formatters";

// ================================
// Componente: WeatherCard
// ================================

export class WeatherCard {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.container.classList.add("weather-card");
  }

  // ================================
  // Render principal
  // ================================

  public render(data: WeatherData): void {
    this.container.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = data.city;

    const temp = document.createElement("p");
    temp.className = "temperature";
    temp.textContent = formatTemperature(data.temperature);

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = data.description;

    const wind = document.createElement("p");
    wind.className = "wind";
    wind.textContent = `Vento: ${formatWindSpeed(data.windSpeed)}`;

    const time = document.createElement("p");
    time.className = "time";
    time.textContent = `Atualizado em: ${formatDateTime(data.time)}`;

    this.container.append(
      title,
      temp,
      description,
      wind,
      time
    );

    if (data.humidity !== undefined) {
      this.container.appendChild(this.createHumidity(data.humidity));
    }

    if (data.forecast?.length) {
      this.container.appendChild(this.createForecast(data.forecast));
    }
  }

  // ================================
  // Partes opcionais
  // ================================

  private createHumidity(humidity: number): HTMLElement {
    const el = document.createElement("p");
    el.className = "humidity";
    el.textContent = `Umidade: ${humidity}%`;
    return el;
  }

  private createForecast(forecast: ForecastDay[]): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.className = "forecast";

    const title = document.createElement("h3");
    title.textContent = "Previsão";

    const list = document.createElement("ul");

    forecast.forEach((day) => {
      const item = document.createElement("li");
      item.textContent = `
      ${day.date.toLocaleDateString()} — ${formatTemperature(day.minTemp)} / ${formatTemperature(day.maxTemp)} — ${day.description}
      `;
      list.appendChild(item);
    });

    wrapper.append(title, list);
    return wrapper;
  }

  // ================================
  // Estado vazio / erro
  // ================================

  public renderError(message: string): void {
    this.container.innerHTML = "";

    const error = document.createElement("p");
    error.className = "error";
    error.textContent = message;

    this.container.appendChild(error);
  }

    public renderLoading(): void {
    this.container.innerHTML = "";

    const loading = document.createElement("p");
    loading.className = "loading";
    loading.textContent = "Carregando clima...";

    this.container.appendChild(loading);
  }
}
