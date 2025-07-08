import { API_KEY } from "./constants";
import { getTimeOfDay } from "./utils";
import { handleResponse } from "./api";

export const getWeather = async (location) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${API_KEY}`
  );
  const data = await handleResponse(response);

  const weatherString = data.current.weather[0].main;
  const weather = weatherString.toLowerCase();

  const sunrise = data.current.sunrise;
  const sunset = data.current.sunset;
  const timeOfDay = getTimeOfDay(sunrise, sunset);

  const heatLevel =
    data.current.temp >= 86 ? "hot" : data.current.temp >= 66 ? "warm" : "cold";

  const temp = {
    F: Math.round(data.current.temp),
    C: Math.round(((data.current.temp - 32) * 5) / 9),
  };

  const city = data.timezone.split("/").pop().replace(/_/g, " ");

  const weatherData = {
    temp: temp,
    heatLevel: heatLevel,
    weather: weather,
    timeOfDay: timeOfDay,
    city: city,
  };

  return weatherData;
};
