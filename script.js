document.addEventListener("DOMContentLoaded", function () {
  const cityInput = document.getElementById("city-input");
  const getWeatherButton = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const tempDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const windDisplay = document.getElementById("wind");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "e5203727b623d1f1349a8b6b4d45f58d";
  //env variables

  getWeatherButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (city === "") return;

    //fetching may throw error
    //servers/databases are in other continent

    try {
      const weatherData = await fetchWeatherData(city);
      displayCityData(weatherData);
    } catch (error) {
      showErrorMessage();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    //console.log(response);
    //console.log(typeof response);
    if (!response.ok) {
      throw new Error("City not found!");
    }

    const data = await response.json();
    return data;
  }

  function displayCityData(weatherData) {
    // console.log(weatherData);
    const { name, main, weather, wind } = weatherData;
    cityNameDisplay.textContent = name;
    tempDisplay.textContent = `Temperature : ${main.temp}°C`;
    descriptionDisplay.textContent = `Description : ${weather[0].description}`;
    windDisplay.textContent = `Wind speed : ${wind.speed}km/hr`;

    //unlock the display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showErrorMessage() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
