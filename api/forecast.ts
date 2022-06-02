import { Forecast } from "./forecast.types";

const FORECAST_URL =
  "https://api.met.no/weatherapi/locationforecast/2.0/compact";

const getForecast = async (lat: string, lon: string) => {
  try {
    const res = await fetch(`${FORECAST_URL}?lat=${lat}&lon=${lon}`);
    const forecast: Forecast = await res.json();
    return forecast.properties.timeseries;
  } catch (err) {
    console.error(err);
  }
};

const getDateForecast = async (lat: string, lon: string, date: Date) => {
  try {
    const res = await fetch(`${FORECAST_URL}?lat=${lat}&lon=${lon}`);
    const forecast: Forecast = await res.json();
    return forecast.properties.timeseries.find(({ time }) => {
      const fDate = new Date(time);
      return (
        fDate.getUTCHours() >= 12 &&
        fDate.getUTCFullYear() === date.getUTCFullYear() &&
        fDate.getUTCMonth() === date.getUTCMonth() &&
        fDate.getUTCDate() === date.getUTCDate()
      );
    })?.data;
  } catch (err) {
    console.error(err);
  }
};

const getDatesForecast = async (lat: string, lon: string, dates: Date[]) => {
  try {
    const res = await fetch(`${FORECAST_URL}?lat=${lat}&lon=${lon}`);
    const forecast: Forecast = await res.json();
    return dates.map(
      (date) =>
        forecast.properties.timeseries.find(({ time }) => {
          const fDate = new Date(time);
          return (
            fDate.getUTCHours() >= 12 &&
            fDate.getUTCFullYear() === date.getUTCFullYear() &&
            fDate.getUTCMonth() === date.getUTCMonth() &&
            fDate.getUTCDate() === date.getUTCDate()
          );
        })?.data
    );
  } catch (err) {
    console.error(err);
  }
};

export { getForecast, getDateForecast, getDatesForecast };
