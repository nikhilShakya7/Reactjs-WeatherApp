import React, { useEffect, useState } from "react";

const App = () => {
  const [city, setCity] = useState("Patan");
  const [inputCity, setInputCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "16cf71b238debc55a78b25f571f94bd3";

  const fetchWeatherData = async () => {
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
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

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

  return (
    <div>
      <h1>Weather App</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter location"
          value={inputCity}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      <h2>Weather in {city}</h2>
      {weather ? (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      ) : (
        <p style={{ color: "red" }}>City not found. Please try again.</p>
      )}
    </div>
  );
};

export default App;
