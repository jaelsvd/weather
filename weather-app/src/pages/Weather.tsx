import { useState } from "react";
import "./weather.scss";
import Search from "../components/Search/Search";
import axios, { AxiosResponse } from "axios";
import { WeatherResponse } from "../models/WeatherResponse.ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherResponse>();
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_APP_API_URL;

  const handleSearch = () => {
    setError(""); // Reset errors on new search

    if (!city) {
      setError("Please enter a city name");
      return;
    }

    axios
      .get<any, AxiosResponse<WeatherResponse>>(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric", // Get temperature in Celsius
          },
        }
      )
      .then((response: AxiosResponse<WeatherResponse>) => {
        setWeatherData(response.data);
      })
      .catch((err: any) => {
        console.log(err);
        setError("City not found");
        setWeatherData(undefined);
      });
  };

  return (
    <>
      <div className="weather_card">
        <div className={"weather_wrapper"}>
          <div className="search_wrapper">
            <Search
              value={city}
              onChange={(e: any) => setCity(e.target.value)}
              onClick={handleSearch}
            />
          </div>
          <div className="weather_content">
            <div className="weather_details">
              <div className="weather_location">
                <div>
                  <h2>{city} <FontAwesomeIcon icon={faCoffee} /></h2>
                </div>
                <div>
                  <p>{weatherData?.main.temp}</p>
                </div>
                <div>Dia: Domingo </div>
              </div>
              <div className="weather_details--current_details">
                <p>Humidity:{weatherData?.main.humidity}</p>
                <p>Feels like:{weatherData?.main.feels_like}</p>
                <p>Clouds{weatherData?.clouds.all}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
