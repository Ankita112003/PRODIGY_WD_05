import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    const apiKey = 'd12fee5ed15a47bc966141546242107'; // Replace with your actual API key
    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
      const response = await fetch(weatherUrl);
      if (!response.ok) {
        throw new Error('Weather data not found.');
      }
      const data = await response.json();
      console.log('Weather data fetched successfully:', data); // Debugging log
      setWeather(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error); // Debugging log
      setWeather(null);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {error && <p className="error">{error}</p>}
      {weather && weather.location && weather.current && (
        <div id="weatherInfo">
          <h2 id="location">{`${weather.location.name}, ${weather.location.country}`}</h2>
          <p id="description">{`Weather: ${weather.current.condition.text}`}</p>
          <p id="temperature">{`Temperature: ${weather.current.temp_c}°C`}</p>
          <p id="humidity">{`Humidity: ${weather.current.humidity}%`}</p>
          <p id="wind">{`Wind Speed: ${weather.current.wind_kph} kph`}</p>
        </div>
      )}
    </div>
  );
};

export default App;
