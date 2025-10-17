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
                <h1 className={"weather_title"}>Weather App</h1>
                <br />
                <p className={"weather_text"}>Please enter a city in the United States, to look for the weather, at the moment this version only
                    shows the weather in <strong>Celsius!</strong> </p>
                <div className="search_wrapper">
                    <Search value={city}
                            onChange={(e: any) => setCity(e.target.value)} onClick={handleSearch}/>
                </div>
                {weatherData && (<>
                        <br />
                        <div className="weather_pill">
                            <p><strong>Temperature: {weatherData.main.temp}  C</strong> </p>
                        </div>
                        <br />
                        <div className="weather_content">
                            <div className="weather_details">
                                <div className="weather_details--current">        
                                    <p><strong>🌡️ Min Temp:</strong>  {weatherData.main.temp_min}</p>
                                    <p><strong>🔥 Max Temp:</strong>   {weatherData.main.temp_max}</p>
                                    <p><strong>💧 Humidity:</strong>   {weatherData.main.humidity}</p>
                                    <p><strong>🥶 Feels Like:</strong>   {weatherData.main.feels_like}</p>
                                    <label>{error}</label>
                                </div>
                            </div>
                            <br />
                            <div className="weather_details weather_details--daily">
                                <div className="weather_details--daily__item">
                                    <p><strong>☀️ Clouds:</strong>   {weatherData.clouds.all}</p>
                                    <p><strong>⚖️ Pressure:</strong>   {weatherData.main.pressure}</p>
                                    <p><strong>🌎 Ground Level:</strong>   {weatherData.main.grnd_level}</p>
                                    <p><strong>🌊 Sea Level:</strong>   {weatherData.main.sea_level}</p>
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