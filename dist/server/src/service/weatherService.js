import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
// TODO: Define the baseURL, API key, and city name properties
const API_KEY = process.env.OPENWEATHER_API_KEY;
const GEO_API_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';
// TODO: Complete the WeatherService class
class WeatherService {
    // TODO: Create fetchLocationData method
    async fetchLocationData(cityName) {
        const response = await axios.get(GEO_API_URL, {
            params: {
                q: cityName,
                limit: 1,
                appid: API_KEY,
            },
        });
        const { lat, lon } = response.data[0];
        return { lat, lon };
    }
    // TODO: Create fetchWeatherData method
    async fetchWeatherData({ lat, lon }) {
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                lat,
                lon,
                units: 'imperial', // For Fahrenheit
                appid: API_KEY,
            },
        });
        return response.data;
    }
    // TODO: Build parseCurrentWeather method
    parseCurrentWeather(data) {
        const { name: city } = data.city;
        const current = data.list[0];
        return {
            city,
            date: new Date(current.dt * 1000).toLocaleDateString(),
            icon: current.weather[0].icon,
            iconDescription: current.weather[0].description,
            tempF: current.main.temp,
            windSpeed: current.wind.speed,
            humidity: current.main.humidity,
        };
    }
    // TODO: Complete buildForecastArray method
    buildForecastArray(data) {
        return data.list
            .filter((_entry, index) => index % 8 === 0) // Get daily data
            .map((forecast) => ({
            city: data.city.name,
            date: new Date(forecast.dt * 1000).toLocaleDateString(),
            icon: forecast.weather[0].icon,
            iconDescription: forecast.weather[0].description,
            tempF: forecast.main.temp,
            windSpeed: forecast.wind.speed,
            humidity: forecast.main.humidity,
        }));
    }
    // TODO: Complete getWeatherForCity method
    async getWeatherForCity(city) {
        const coordinates = await this.fetchLocationData(city);
        const weatherData = await this.fetchWeatherData(coordinates);
        const currentWeather = this.parseCurrentWeather(weatherData);
        const forecast = this.buildForecastArray(weatherData);
        return [currentWeather, ...forecast];
    }
}
export default new WeatherService();
