import { getDateForecast, getDatesForecast } from "@api/forecast";
import { Data } from "@api/forecast.types";
import { searchCity } from "@api/geocoding";
import { SearchResult } from "@api/geocoding.types";
import { ForecastCard, ForecastDay } from "@components/ForecastCard";
import useDebounce from "@hooks/useDebounce";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

type ForecastDays = {
  [key: string]: ForecastDay;
};

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
  const today = new Date();
  const inTenDays = new Date(today);
  inTenDays.setDate(today.getDate() + 10);

  const [minDate] = today.toISOString().split("T");
  const [maxDate] = inTenDays.toISOString().split("T");

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [fromDate, setFromDate] = useState<string>(minDate);
  const [toDate, setToDate] = useState<string>(minDate);
  const [cityResults, setCityResults] = useState<SearchResult[]>();
  const [forecast, setForecast] = useState<ForecastDays>();

  useEffect(() => {
    const searchCities = async () => {
      const cities = await searchCity(debouncedQuery);
      setCityResults(cities);
    };
    if (debouncedQuery) {
      searchCities();
    } else {
      setCityResults(undefined);
    }
  }, [debouncedQuery]);

  const searchForecast = async (search: SearchResult) => {
    const newForecast = { ...forecast };

    const dates = dateRange(new Date(fromDate), new Date(toDate));
    const datesForecastResult = await getDatesForecast(
      search.lat,
      search.lon,
      dates
    );
    datesForecastResult
      ?.filter((o): o is Data => typeof o !== "undefined")
      .forEach((result, i) => {
        newForecast[dates[i].toISOString()] = {
          city: search.address.city,
          country: search.address.country,
          symbol_code: result.next_6_hours?.summary.symbol_code,
          ...result.instant.details,
        };
      });

    setForecast(newForecast);
    setCityResults(undefined);
  };

  return (
    <>
      <Head>
        <title>Travel Weahter</title>
        <meta name="description" content="Travel, but also weather" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-6">
        <h1 className="font-semibold text-3xl mb-4">Travel weather</h1>
        <div className="flex w-full">
          <input
            type="date"
            className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            value={fromDate}
            min={minDate}
            max={maxDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            value={toDate}
            min={fromDate}
            max={maxDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <input
            type="search"
            className="block p-2.5 grow text-sm text-gray-900 bg-gray-50 border-l-gray-50 border-l-2 border border-gray-300 rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search for city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {cityResults && (
          <div className="text-sm font-medium text-gray-900 bg-white border border-gray-200 border-t-0 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {cityResults.length === 0 && <span>No results found</span>}
            {cityResults.length > 0 &&
              cityResults.map((res) => (
                <button
                  key={res.place_id}
                  type="button"
                  className="w-full px-4 py-2 text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                  onClick={() => searchForecast(res)}
                >
                  {res.display_name}
                </button>
              ))}
          </div>
        )}
        {forecast &&
          Object.keys(forecast).map((forecastDate) => (
            <ForecastCard
              key={forecastDate}
              date={forecastDate}
              day={forecast[forecastDate]}
            />
          ))}
      </main>
    </>
  );
};

export default Home;
