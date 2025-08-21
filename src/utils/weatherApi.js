import { API_KEY } from "./constants";
import { getTimeOfDay } from "./utils";
import { request } from "./api";

export const getWeather = async (location) => {
  const data = await request(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${API_KEY}`
  );

  const weatherString = data.weather[0].main;
  let weather = weatherString.toLowerCase();

  // Map similar weather conditions to match weatherImages
  const weatherMap = {
    mist: "fog",
    haze: "fog",
    smoke: "fog",
    dust: "fog",
    sand: "fog",
    ash: "fog",
    squall: "thunderstorm",
    tornado: "thunderstorm",
    drizzle: "rain",
  };

  weather = weatherMap[weather] || weather;

  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;
  const timeOfDay = getTimeOfDay(sunrise, sunset);

  const heatLevel =
    data.main.temp >= 86 ? "hot" : data.main.temp >= 66 ? "warm" : "cold";

  const temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };

  const city = data.name;

  const weatherData = {
    temp: temp,
    heatLevel: heatLevel,
    weather: weather,
    timeOfDay: timeOfDay,
    city: city,
  };

  return weatherData;
};
