import axios from "axios";
import { map } from "./Mapper";

class WeatherService {
  constructor(unit, apiKey, lang) {
    this.unit = unit;
    this.apiKey = apiKey;
    this.baseApiUrl = "//api.openweathermap.org/data/2.5";
    this.lang = lang;
  }
  getForecast(args) {
    const endpointForecast = this.baseApiUrl + "/forecast";
    const endPointToday = this.baseApiUrl + "/weather";
    const params = Object.assign(
      {
        appid: this.apiKey,
        lang: this.lang,
        unit: this.unit,
      },
      args
    );

    const promise = axios
      .all([
        axios.get(endpointForecast, { params }),
        axios.get(endPointToday, { params }),
      ])
      .then(
        axios.spread((forecastReponse, todayReponse) => {
          const forecastData = forecastReponse.data;
          const todayData = todayReponse.data;

          if (forecastData && todayData) {
            return map(forecastData, todayData, this.unit);
          }
          return {};
        })
      );

    return promise;
  }
}

export default WeatherService;
