import React, { useState, useEffect } from 'react';
import "./App.css"


const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [city, setCity] = useState('New York');
  const [unit, setUnit] = useState('metric');

  // Mock weather data - replace with actual API call
  const mockWeatherData = {
    name: city,
    main: {
      temp: Math.floor(Math.random() * 35) + 5,
      feels_like: Math.floor(Math.random() * 35) + 5,
      humidity: Math.floor(Math.random() * 100),
      pressure: 1013
    },
    weather: [
      {
        main: ['Clear', 'Clouds', 'Rain', 'Snow'][Math.floor(Math.random() * 4)],
        description: 'moderate rain',
        icon: '10d'
      }
    ],
    wind: {
      speed: Math.floor(Math.random() * 20)
    },
    sys: {
      country: 'US'
    }
  };

  const fetchWeather = async (cityName = city) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would use:
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=YOUR_API_KEY`);
      // const data = await response.json();
      
      setWeather(mockWeatherData);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const getWeatherIcon = (weatherMain) => {
    const icons = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Snow: '❄️',
      Thunderstorm: '⛈️',
      Drizzle: '🌦️',
      Mist: '🌫️'
    };
    return icons[weatherMain] || '🌈';
  };

  const getBackgroundClass = (weatherMain) => {
    const backgrounds = {
      Clear: 'clear-bg',
      Clouds: 'clouds-bg',
      Rain: 'rain-bg',
      Snow: 'snow-bg',
      Thunderstorm: 'storm-bg',
      default: 'default-bg'
    };
    return backgrounds[weatherMain] || backgrounds.default;
  };

  if (loading && !weather) {
    return (
      <div className="weather-app loading-bg">
        <div className="loading-container">
          <div className="weather-loader"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`weather-app ${weather ? getBackgroundClass(weather.weather[0].main) : 'default-bg'}`}>
      <div className="weather-container">
        <header className="weather-header">
          <h1 className="app-title">Weather Forecast</h1>
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-group">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="search-input"
              />
              <button type="submit" className="search-btn">
                🔍
              </button>
            </div>
          </form>
          <button onClick={toggleUnit} className="unit-toggle">
            °{unit === 'metric' ? 'C' : 'F'}
          </button>
        </header>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {weather && (
          <div className="weather-content">
            <div className="current-weather">
              <div className="location">
                <h2 className="city-name">{weather.name}</h2>
                <span className="country">{weather.sys.country}</span>
              </div>
              
              <div className="weather-main">
                <div className="temperature-section">
                  <div className="weather-icon">
                    {getWeatherIcon(weather.weather[0].main)}
                  </div>
                  <div className="temperature">
                    {Math.round(weather.main.temp)}°
                    <span className="unit">{unit === 'metric' ? 'C' : 'F'}</span>
                  </div>
                </div>
                
                <div className="weather-info">
                  <p className="weather-description">
                    {weather.weather[0].main}
                  </p>
                  <p className="feels-like">
                    Feels like {Math.round(weather.main.feels_like)}°
                  </p>
                </div>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-card">
                <div className="detail-icon">💧</div>
                <div className="detail-info">
                  <span className="detail-label">Humidity</span>
                  <span className="detail-value">{weather.main.humidity}%</span>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="detail-icon">💨</div>
                <div className="detail-info">
                  <span className="detail-label">Wind</span>
                  <span className="detail-value">{weather.wind.speed} m/s</span>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="detail-icon">📊</div>
                <div className="detail-info">
                  <span className="detail-label">Pressure</span>
                  <span className="detail-value">{weather.main.pressure} hPa</span>
                </div>
              </div>
            </div>

            <div className="forecast">
              <h3 className="forecast-title">5-Day Forecast</h3>
              <div className="forecast-cards">
                {[1, 2, 3, 4, 5].map(day => (
                  <div key={day} className="forecast-card">
                    <div className="forecast-day">Day {day}</div>
                    <div className="forecast-icon">{
                      getWeatherIcon(['Clear', 'Clouds', 'Rain', 'Snow'][day % 4])
                    }</div>
                    <div className="forecast-temp">
                      {Math.round(weather.main.temp + day - 3)}°
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;