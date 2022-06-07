import { getDatesForecast } from "@api/forecast";
import { Data } from "@api/forecast.types";
import { SearchResult } from "@api/geocoding.types";
import { ForecastCard, ForecastDays } from "@components/ForecastCard";
import { TravelControls } from "@components/TravelControls";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(date.getDate() + days);
  return result;
};

const dateRange = (fromDate: Date, toDate: Date) => {
  var dateArray = [];
  var currentDate = fromDate;
  while (currentDate <= toDate) {
    dateArray.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
};

const Home: NextPage = () => {
  const [forecast, setForecast] = useState<ForecastDays>();

  const updateForecast = async (
    search: SearchResult,
    fromDate: string,
    toDate: string
  ) => {
    const newForecast = { ...forecast };

    const dates = dateRange(new Date(fromDate), new Date(toDate));
    const datesForecastResult = await getDatesForecast(
      search.lat,
      search.lon,
      dates
    );
    datesForecastResult?.forEach((forecast, i) => {
      const { city, suburb, town, village, hamlet, isolated_dwelling } =
        search.address;
      newForecast[dates[i].toISOString()] = {
        city: city ?? suburb ?? town ?? village ?? hamlet ?? isolated_dwelling,
        country: search.address.country,
        forecast,
      };
    });

    setForecast(newForecast);
  };

  const dateSort = (a: string, b: string) =>
    new Date(a).getTime() - new Date(b).getTime();

  return (
    <>
      <Head>
        <title>Travel Weahter</title>
        <meta name="description" content="Travel, but also weather" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-6">
        <h1>Travel weather</h1>
        <div className="flex gap-8 flex-col lg:flex-row">
          <div className="lg:w-1/4 mt-8">
            <TravelControls onForecastSearch={updateForecast} />
          </div>
          {forecast && (
            <div className="lg:w-3/4 flex flex-col">
              <div className="flex gap-4 italic text-sm mb-3 text-center">
                <span className="w-1/5"> </span>
                <span className="w-1/5">Night</span>
                <span className="w-1/5">Morning</span>
                <span className="w-1/5">Afternoon</span>
                <span className="w-1/5">Evening</span>
              </div>
              <div className="flex flex-col gap-4">
                {Object.keys(forecast)
                  .sort(dateSort)
                  .map((forecastDate) => (
                    <ForecastCard
                      key={forecastDate}
                      date={forecastDate}
                      day={forecast[forecastDate]}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="container mx-auto p-6 pt-0 italic">
        Data comes from{" "}
        <a href="https://www.openstreetmap.org/">OpenStreetMap</a> and{" "}
        <a href="https://api.met.no/">MET norway</a>. Icons by MET Norway.
      </footer>
    </>
  );
};

export default Home;
