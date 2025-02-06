import {useState} from "react";

function Weather() {
    const [city, setCity] = useState<string>('');
  //  const [weather, setWeather] = useState<WeatherType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    return (<>...</>);
}

export default Weather;