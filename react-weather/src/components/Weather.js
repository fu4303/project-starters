import React, { useState } from "react";
import SearchBar from "./SearchBar";
import ErrorMessage from "./ErrorMessage";
import City from "./City";
import Now from "./Now";
import Forecasts from "./Forecasts";
import WeatherService from "../WeatherService";

const Weather = ({ apiKey }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [units, setUnits] = useState("metric");
  const [city, setCity] = useState(null);
  const [now, setNow] = useState(null);
  const [forecasts, setForecasts] = useState(null);

  /// google key is protected in the google console to asudbury websites
  const [googleKey] = useState("AIzaSyBQJ5nuBEu18372atNGIXPVPEMmske2CQM");

  const citySearch = (citySearch) => {
    console.log("citySearch=" + citySearch);

    if (citySearch && citySearch.length > 2) {
      const params = { q: citySearch, units: units };

      doSearch(params);
    }
  };

  const coordinatesSearchSuccess = (position) => {
    const params = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      units: units,
    };
    doSearch(params);
  };

  function coordinatesSearchError(error) {
    setErrorMessage(error.message);
  }

  const coordinatesSearch = () => {
    navigator.geolocation.getCurrentPosition(
      coordinatesSearchSuccess,
      coordinatesSearchError
    );
  };

  const doSearch = (params) => {
    setErrorMessage("");

    const weatherService = new WeatherService(units, apiKey, "en");

    let promise = weatherService.getForecast(params);

    promise.then((data) => {
      if (typeof data != "undefined") {
        setCity(data.city);
        setNow(data.now);

        setForecasts(data.forecasts);
      }
    });

    promise.catch((error) => {
      if (error.response.status === 401) {
        setErrorMessage("API key not valid");
      } else if (error.response.status === 404) {
        setErrorMessage("Location not found");
      } else {
        setErrorMessage("An error has occured");
      }

      setCity(null);
      setNow(null);
      setForecasts(null);
    });
  };

  return (
    <div>
      <SearchBar
        units={units}
        setUnits={setUnits}
        citySearch={citySearch}
        coordinatesSearch={coordinatesSearch}
        googleKey={googleKey}
      ></SearchBar>

      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

      {city && <City city={city} />}

      {now && <Now now={now} />}

      {forecasts && <Forecasts forecasts={forecasts} />}
    </div>
  );
};

export default Weather;
