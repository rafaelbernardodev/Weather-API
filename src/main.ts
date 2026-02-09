import { SearchForm } from "./components/SearchForm";
import { WeatherCard } from "./components/WeatherCard";
import { getWeatherByCity } from "./services/WeatherService";
import "./styles/main.css";

// ================================
// Bootstrap da aplicação
// ================================

const app = document.getElementById("app");

if (!app) {
  throw new Error("Elemento #app não encontrado");
}

// Containers
const searchContainer = document.createElement("div");
const weatherContainer = document.createElement("div");

app.append(searchContainer, weatherContainer);

// Componentes
const searchForm = new SearchForm(searchContainer);
const weatherCard = new WeatherCard(weatherContainer);

// ================================
// Eventos
// ================================

document.addEventListener("citySearch", async (event) => {
  const city = (event as CustomEvent<string>).detail;

  try {
    // 👉 AGORA o loading é responsabilidade do card
    weatherCard.renderLoading();

    const weather = await getWeatherByCity(city);

    weatherCard.render(weather);
  } catch (error) {
    weatherCard.renderError(
      error instanceof Error
        ? error.message
        : "Erro inesperado"
    );
  }
});

// ================================
// Mock
// ================================

// const container = document.getElementById("weather")!;
// const card = new WeatherCard(container);

// const mockData: WeatherData = {
//   city: "São Paulo",
//   temperature: 26,
//   description: "Céu limpo",
//   windSpeed: 12,
//   humidity: 55,
//   time: new Date(),
//   forecast: [
//     {
//       date: new Date(),
//       minTemp: 18,
//       maxTemp: 28,
//       description: "Ensolarado",
//     },
//     {
//       date: new Date(Date.now() + 86400000),
//       minTemp: 19,
//       maxTemp: 27,
//       description: "Parcialmente nublado",
//     },
//   ],
// };

// card.render(mockData);