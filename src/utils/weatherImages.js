const weatherImages = [
  {
    url: new URL("../assets/weather/clear-day.svg", import.meta.url).href,
    condition: "clear",
    timeOfDay: "day",
  },
  {
    url: new URL("../assets/weather/clouds-day.svg", import.meta.url).href,
    condition: "clouds",
    timeOfDay: "day",
  },
  {
    url: new URL("../assets/weather/rain-day.svg", import.meta.url).href,
    condition: "rain",
    timeOfDay: "day",
  },
  {
    url: new URL("../assets/weather/thunderstorm-day.svg", import.meta.url)
      .href,
    condition: "thunderstorm",
    timeOfDay: "day",
  },
  {
    url: new URL("../assets/weather/snow-day.svg", import.meta.url).href,
    condition: "snow",
    timeOfDay: "day",
  },
  {
    url: new URL("../assets/weather/fog-day.svg", import.meta.url).href,
    condition: "fog",
    timeOfDay: "day",
  },
  {
    url: new URL("../assets/weather/clear-night.svg", import.meta.url).href,
    condition: "clear",
    timeOfDay: "night",
  },
  {
    url: new URL("../assets/weather/clouds-night.svg", import.meta.url).href,
    condition: "clouds",
    timeOfDay: "night",
  },
  {
    url: new URL("../assets/weather/rain-night.svg", import.meta.url).href,
    condition: "rain",
    timeOfDay: "night",
  },
  {
    url: new URL("../assets/weather/thunderstorm-night.svg", import.meta.url)
      .href,
    condition: "thunderstorm",
    timeOfDay: "night",
  },
  {
    url: new URL("../assets/weather/snow-night.svg", import.meta.url).href,
    condition: "snow",
    timeOfDay: "night",
  },
  {
    url: new URL("../assets/weather/fog-night.svg", import.meta.url).href,
    condition: "fog",
    timeOfDay: "night",
  },
];

export default weatherImages;
