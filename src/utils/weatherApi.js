const API_KEY = "be6c27ab3eee0751973bcb95c367d1e7";

export const getWeather = async (location) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${API_KEY}`
  );
  const data = await response.json();
  console.log(data);

  const temp = Math.round(data.current.temp);
  const weather = temp >= 86 ? "hot" : temp >= 66 ? "warm" : "cold";

  const weatherData = {
    temp: temp,
    weather: weather,
  };

  return weatherData;
};
