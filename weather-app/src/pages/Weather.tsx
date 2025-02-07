import {useState} from "react";
import './weather.scss';
import Search from "../components/Search/Search";
import axios, { AxiosResponse } from "axios";
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
            .then((response:AxiosResponse<WeatherResponse>) => {
                setWeatherData(response.data);
            })
            .catch((err:any) => {
                console.log(err);
                setError('City not found');
                setWeatherData(undefined);
            });
    };

    return (<>
      <div className="weather_card">
          <div className={"weather_wrapper"}>
              <div className="search_wrapper">
                  <Search  value={city}
                           onChange={(e:any) => setCity(e.target.value)} onClick={handleSearch} />
              </div>
              <div className="weather_content">
                  <div className="weather_details">
                      <div className="weather_details--current">
                          <h2>{city}</h2>
                          <p>{weatherData?.main.humidity}</p>
                          <p>{weatherData?.main.feels_like}</p>
                          <p>{weatherData?.main.temp}</p>
                          <p>{weatherData?.clouds.all}</p>
                          <label>{error}</label>
                      </div>
                  </div>
                  <div className="weather_details weather_details--daily">
                      <h2>5 Day Forecast</h2>
                      <div className="weather_details--daily__item">
                          <h2>{city}</h2>
                          <p>{weatherData?.main.humidity}</p>
                          <p>{weatherData?.main.feels_like}</p>
                          <p>{weatherData?.main.temp}</p>
                          <p>{weatherData?.clouds.all}</p>
                          <label>{error}</label>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>);
}

export default Weather;