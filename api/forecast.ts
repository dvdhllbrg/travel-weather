import { Forecast } from "./forecast.types";

const FORECAST_URL =
  "https://api.met.no/weatherapi/locationforecast/2.0/complete";

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

const getDatesForecast = async (lat: number, lon: number, dates: Date[]) => {
  try {
    const res = await fetch(`${FORECAST_URL}?lat=${lat}&lon=${lon}`);
    const forecast: Forecast = await res.json();
    return dates.map((date) => ({
      night: getForecastAtHour(forecast, date, 0)?.next_6_hours,
      morning: getForecastAtHour(forecast, date, 6)?.next_6_hours,
      afternoon: getForecastAtHour(forecast, date, 12)?.next_6_hours,
      evening: getForecastAtHour(forecast, date, 18)?.next_6_hours,
    }));
  } catch (err) {
    console.error(err);
  }
};

const getForecastAtHour = (forecast: Forecast, date: Date, hour: number) =>
  forecast.properties.timeseries.find(({ time }) => {
    const fDate = new Date(time);
    return (
      fDate.getUTCHours() === hour &&
      fDate.getUTCFullYear() === date.getUTCFullYear() &&
      fDate.getUTCMonth() === date.getUTCMonth() &&
      fDate.getUTCDate() === date.getUTCDate()
    );
  })?.data;

export { getForecast, getDateForecast, getDatesForecast };
