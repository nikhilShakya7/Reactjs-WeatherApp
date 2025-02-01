import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useEffect, useState, useCallback } from "react";

const App = () => {
  const [city, setCity] = useState("Patan");
  const [inputCity, setInputCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "16cf71b238debc55a78b25f571f94bd3";

  const fetchWeatherData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`City "${city}" not found`);
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(error.message);
      setWeather(null); // Reset weather on failure
    }
  }, [city]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const handleInputChange = (event) => {
    setInputCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedCity = inputCity.trim();
    if (trimmedCity) {
      setCity(trimmedCity);
    } else {
      console.warn("City name cannot be empty!");
    }
  };

  const getIcon = (main) => {
    switch (main) {
      case "Clouds":
        return "/images/thunder.webp";
      case "Rain":
        return "/images/rain_with_cloud.webp";
      case "Mist":
      case "Clear":
        return "/images/sun.webp";
      case "Haze":
        return "/images/Tornado.webp";
      default:
        return "/images/default.webp"; // Default weather icon
    }
  };

  return (
    <div className="d-flex p-2">
      <div className="container">
        <h1>How's The Weather</h1>
        <h2>Weather in {city}</h2>

        {weather ? (
          <div>
            <p>🌡 Temperature: {weather.main.temp}°C</p>
            <p>☁️ Condition: {weather.weather[0].main}</p>
            <img
              className="img"
              src={getIcon(weather.weather[0].main)}
              width="180px"
              alt="weather icon"
            />
          </div>
        ) : (
          <p style={{ color: "red" }}>City not found. Please try again.</p>
        )}

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter location"
            value={inputCity}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
