import {
  utilsGetIcon,
  utilsGetDayOfWeek,
  utilsGetFormattedTime,
  utilsCapitalizeFirstLetter,
  utilsGetUnitsIndicator,
} from "./Utils";

export function map(forecastData, todayData, unit) {
  const mapped = {};

  mapped.city = forecastData.city;
  mapped.city.googleUrl =
    "https://www.google.co.uk/maps/place/" + forecastData.city.name;
  mapped.city.wikiUrl =
    "https://en.wikipedia.org/wiki/" + forecastData.city.name;
  mapped.now = {
    description: utilsCapitalizeFirstLetter(todayData.weather[0].description),
    icon: utilsGetIcon(todayData.weather[0].icon),
    temperature: {
      min: todayData.main.temp_min.toFixed(0),
      max: todayData.main.temp_max.toFixed(0),
      current: todayData.main.temp.toFixed(0),
    },
    wind: todayData.wind.speed.toFixed(0),
    humidity: todayData.main.humidity,
    sunrise: utilsGetFormattedTime(todayData.sys.sunrise),
    sunset: utilsGetFormattedTime(todayData.sys.sunset),
    unitIndicator: utilsGetUnitsIndicator(unit),
    unit: unit,
  };

  mapped.forecasts = mapForecasts(forecastData.list);

  return mapped;
}

function mapForecasts(forecastData) {
  var forecasts = [];

  var arrayLength = forecastData.length;

  for (var i = 0; i < arrayLength; i++) {
    var forecast = {};

    forecast.day = utilsGetDayOfWeek(forecastData[i].dt);
    forecast.time = utilsGetFormattedTime(forecastData[i].dt);
    forecast.temperature = forecastData[i].main.temp.toFixed(0);
    forecast.description = utilsCapitalizeFirstLetter(
      forecastData[i].weather[0].description
    );
    forecast.icon = utilsGetIcon(forecastData[i].weather[0].icon);

    forecasts.push(forecast);
  }

  return forecasts;
}
