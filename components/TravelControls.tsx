import { searchCity } from "@api/geocoding";
import { SearchResult } from "@api/geocoding.types";
import useDebounce from "@hooks/useDebounce";
import { useEffect, useState } from "react";
import { DateRangeInput } from "./DateRangeInput";

type Destination = {
  city: string;
  fromDate: string;
  toDate: string;
};

type TravelControlsProps = {
  onForecastSearch: (
    search: SearchResult,
    fromDate: string,
    toDate: string
  ) => void;
};

export const TravelControls = ({
  onForecastSearch: onSearch,
}: TravelControlsProps) => {
  const today = new Date();
  const inTenDays = new Date(today);
  inTenDays.setDate(today.getDate() + 10);

  const [minDate] = today.toISOString().split("T");
  const [maxDate] = inTenDays.toISOString().split("T");

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [fromDate, setFromDate] = useState<string>(minDate);
  const [toDate, setToDate] = useState<string>(minDate);
  const [city, setCity] = useState<SearchResult>();
  const [cityResults, setCityResults] = useState<SearchResult[]>();

  const updateCity = (newCity: SearchResult) => {
    setCity(newCity);
    setCityResults(undefined);
  };

  const searchForecast = () => {
    if (!city) {
      return;
    }
    setQuery("");
    onSearch(city, fromDate, toDate);
    setCityResults(undefined);
    setCity(undefined);
  };

  const setDateRange = ([fromDate, toDate]: [string, string]) => {
    setFromDate(fromDate);
    setToDate(toDate);
  };

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

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col">
        <DateRangeInput
          minDate={minDate}
          maxDate={maxDate}
          onChange={setDateRange}
        />
        <div className="relative w-full">
          <input
            type="search"
            className="w-full block p-2.5 grow text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg rounded-t-none border-t-0 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search for city"
            value={city?.display_name ?? query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {cityResults && (
            <div className="absolute w-full z-10 text-sm text-gray-900 bg-white border border-gray-200 border-t-0 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {cityResults.length === 0 && (
                <span className="w-full font-medium">No results found</span>
              )}
              {cityResults.length > 0 &&
                cityResults.map((res) => (
                  <button
                    key={res.place_id}
                    type="button"
                    className="w-full font-normal text-gray-900 dark:text-white px-4 py-2 text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                    onClick={() => updateCity(res)}
                  >
                    {res.display_name}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
      <button onClick={searchForecast} disabled={!city}>
        Add location
      </button>
    </div>
  );
};
