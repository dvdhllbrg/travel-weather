import { getDatesForecast } from "@api/forecast";
import { Data } from "@api/forecast.types";
import { Place, SearchResult } from "@api/geocoding.types";
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
    place: Place,
    fromDate: string,
    toDate: string
  ) => {
    const newForecast = { ...forecast };

    const dates = dateRange(new Date(fromDate), new Date(toDate));
    const datesForecastResult = await getDatesForecast(
      place.lat,
      place.lon,
      dates
    );
    datesForecastResult?.forEach((forecast, i) => {
      newForecast[dates[i].toISOString()] = {
        ...place,
        forecast,
      };
    });

    setForecast(newForecast);
  };

  const removeDay = (date: string) => {
    const newForecast = { ...forecast };
    delete newForecast[date];
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
        <p className="mb-4">
          Add your travel destinations (up to 10 days in advance) and see what
          the weather will be like when you&apos;re there!
        </p>
        <div className="flex gap-8 flex-col lg:flex-row">
          <div className="lg:w-1/4 mt-8">
            <TravelControls onForecastSearch={updateForecast} />
          </div>
          {forecast && (
            <div className="lg:w-3/4 flex md:flex-col">
              <div className="md:flex flex-col md:flex-row gap-4 italic text-sm mb-3 hidden">
                <span className="w-1/5"> </span>
                <span className="w-1/5">Night</span>
                <span className="w-1/5">Morning</span>
                <span className="w-1/5">Afternoon</span>
                <span className="w-1/5">Evening</span>
              </div>
              <div className="flex flex-col gap-4 w-full">
                {Object.keys(forecast)
                  .sort(dateSort)
                  .map((forecastDate) => (
                    <ForecastCard
                      key={forecastDate}
                      date={forecastDate}
                      day={forecast[forecastDate]}
                      onRemove={removeDay}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="container mx-auto p-6 pt-0 italic">
        Data comes from{" "}
        <a href="https://www.openstreetmap.org/">OpenStreetMap</a> (via{" "}
        <a href="https://photon.komoot.io/">Komoot</a>) and{" "}
        <a href="https://api.met.no/">MET norway</a>. Weather icons by MET
        Norway. Built by{" "}
        <a href="https://davidhallberg.design">David Hallberg Jönsson</a>.
        Feedback?{" "}
        <a href="https://github.com/dvdhllbrg/travel-weather">
          Get in touch on GitHub!
        </a>
      </footer>
    </>
  );
};

export default Home;
