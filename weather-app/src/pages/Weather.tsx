import {useState} from "react";
import './weather.scss';
import Search from "../components/Search/Search";

function Weather() {
    const [city, setCity] = useState<string>('');
  //  const [weather, setWeather] = useState<WeatherType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    return (<>
      <div className="weather_card">
       <div className="search_wrapper">
        <Search />
       </div>
       <div className="weather_content">
        <div className="weather_details">
          <div className="weather_details--current">
            <h2>City Name</h2>
            <p>Weather Description</p>
            <p>Temperature</p>
            <p>Humidity</p>
            <p>Wind Speed</p>
          </div>
        </div>
        <div className="weather_details weather_details--daily">
          <h2>5 Day Forecast</h2>
          <div className="weather_details--daily__item">
            <p>Day of the week</p>
            <p>Weather Description</p>
            <p>Temperature</p>
            <p>Humidity</p>
            <p>Wind Speed</p>
          </div>
        </div>
       </div>
      </div>
    </>);
}

export default Weather;