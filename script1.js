// script.js

document.addEventListener("DOMContentLoaded", () => {
  const inputCity = document.getElementById("city-input");
  const btnGetWeather = document.getElementById("get-weather-btn");
  const weatherBox = document.getElementById("weather-info");
  const cityEl = document.getElementById("city-name");
  const tempEl = document.getElementById("temperature");
  const descEl = document.getElementById("description");
  const windEl = document.getElementById("wind");
  const errorEl = document.getElementById("error-message");

  const API_KEY = "e5203727b623d1f1349a8b6b4d45f58d";

  btnGetWeather.addEventListener("click", async () => {
    const city = inputCity.value.trim();

    if (!city) {
      showError("Please enter a city name.");
      return;
    }

    try {
      const data = await fetchWeather(city);
      displayWeather(data);
    } catch (err) {
      showError("City not found or network error.");
      console.error(err);
    }
  });

  async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch weather.");
    }

    return await res.json();
  }

  function displayWeather(data) {
    const { name, main, weather, wind } = data;

    cityEl.textContent = `📍 City: ${name}`;
    tempEl.textContent = `🌡️ Temp: ${main.temp} °C`;
    descEl.textContent = `🌤️ Description: ${weather[0].description}`;
    windEl.textContent = `💨 Wind: ${wind.speed} m/s`;

    weatherBox.classList.remove("hidden");
    errorEl.classList.add("hidden");
  }

  function showError(message) {
    weatherBox.classList.add("hidden");
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
  }
});
