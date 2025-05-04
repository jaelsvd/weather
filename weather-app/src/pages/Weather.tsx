import {useState} from "react";
import './weather.scss';
import Search from "../components/Search/Search";
import axios, {AxiosResponse} from "axios";
import {WeatherResponse} from "../models/WeatherResponse.ts";

function Weather() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState<WeatherResponse>();
    const [error, setError] = useState("");

    const API_KEY = import.meta.env.VITE_APP_API_URL

    const handleSearch = () => {
        setError(""); // Reset errors on new search

        if (!city) {
            setError('Please enter a city name');
            return;
        }

        axios.get<any, AxiosResponse<WeatherResponse>>(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric', // Get temperature in Celsius
            },
        })
            .then((response: AxiosResponse<WeatherResponse>) => {
                setWeatherData(response.data);
            })
            .catch((err: any) => {
                console.log(err);
                setError('City not found');
                setWeatherData(undefined);
            });
    };

    return (<>
        <div className="weather_card">
            <div className={"weather_wrapper"}>
                <h1>Weather App</h1>
                <p>Please enter a city in the United States, to look for the weather, at the moment this version only
                    shows the weather in Celsius!</p>
                <div className="search_wrapper">
                    <Search value={city}
                            onChange={(e: any) => setCity(e.target.value)} onClick={handleSearch}/>
                </div>
                {weatherData && (<>
                        <h2>{weatherData.name}</h2>
                        <div className="weather_content">
                            <div className="weather_details">
                                <div className="weather_details--current">
                                    <p>Temperature: {weatherData.main.temp}</p>
                                    <p>Min Temp: {weatherData.main.temp_min}</p>
                                    <p>Max Temp: {weatherData.main.temp_max}</p>
                                    <p>Humidity: {weatherData.main.humidity}</p>
                                    <p>Feels Like: {weatherData.main.feels_like}</p>
                                    <label>{error}</label>
                                </div>
                            </div>
                            <div className="weather_details weather_details--daily">
                                <div className="weather_details--daily__item">
                                    <p>Clouds: {weatherData.clouds.all}</p>
                                    <p>Pressure: {weatherData.main.pressure}</p>
                                    <p>Ground Level: {weatherData.main.grnd_level}</p>
                                    <p>Sea Level: {weatherData.main.sea_level}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {error && (
                    <>
                        <label className="weather-warning">{error}!</label>
                    </>
                )}
            </div>
        </div>
    </>);
}

export default Weather;