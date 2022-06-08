import { searchPlaces } from "@api/geocoding";
import { Place } from "@api/geocoding.types";
import useDebounce from "@hooks/useDebounce";
import { useEffect, useState } from "react";
import { DateRangeInput } from "./DateRangeInput";

type Destination = {
  city: string;
  fromDate: string;
  toDate: string;
};

type TravelControlsProps = {
  onForecastSearch: (place: Place, fromDate: string, toDate: string) => void;
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
  const debouncedQuery = useDebounce(query, 50);

  const [fromDate, setFromDate] = useState<string>(minDate);
  const [toDate, setToDate] = useState<string>(minDate);
  const [place, setPlace] = useState<Place>();
  const [placesResults, setPlacesResults] = useState<Place[]>();

  const updatePlace = (newPlace: Place) => {
    setPlace(newPlace);
    setPlacesResults(undefined);
  };

  const searchForecast = () => {
    if (!place) {
      return;
    }
    setQuery("");
    onSearch(place, fromDate, toDate);
    setPlacesResults(undefined);
    setPlace(undefined);
  };

  const setDateRange = ([fromDate, toDate]: [string, string]) => {
    setFromDate(fromDate);
    setToDate(toDate);
  };

  useEffect(() => {
    const asyncSearchPlaces = async () => {
      const places = await searchPlaces(debouncedQuery);
      setPlacesResults(places);
    };
    if (debouncedQuery) {
      asyncSearchPlaces();
    } else {
      setPlacesResults(undefined);
    }
  }, [debouncedQuery]);

  const updateQuery = (newQuery: string) => {
    if (place) {
      setPlace(undefined);
    }
    setQuery(newQuery);
  };

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
            placeholder="Search for places"
            value={place?.name ?? query}
            onChange={(e) => updateQuery(e.target.value)}
          />
          {placesResults && (
            <div className="absolute w-full z-10 text-sm text-gray-900 bg-white border border-gray-200 border-t-0 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {placesResults.length === 0 && (
                <span className="w-full font-medium">No results found</span>
              )}
              {placesResults.length > 0 &&
                placesResults.map((res) => (
                  <button
                    key={res.id}
                    type="button"
                    className="flex w-full font-normal text-gray-900 dark:text-white px-4 py-2 text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                    onClick={() => updatePlace(res)}
                  >
                    {res.name}
                    <span className="text-gray-400 ml-auto italic">
                      {res.type}
                    </span>
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
      <button onClick={searchForecast} disabled={!place}>
        Add location
      </button>
    </div>
  );
};
