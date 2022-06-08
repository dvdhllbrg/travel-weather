import { NextXHours } from "@api/forecast.types";
import { Place } from "@api/geocoding.types";
import Image from "next/image";

export type ForecastDays = {
  [key: string]: ForecastDay;
};

type Period = "night" | "morning" | "afternoon" | "evening";
export type Unit = "C" | "F";

export type ForecastDay = Place & {
  symbol_code?: string;
  forecast: {
    [key in Period]: NextXHours | undefined;
  };
};

type ForecastCardProps = {
  day: ForecastDay;
  date: string;
  onRemove: (date: string) => void;
  unit: Unit;
};
export const ForecastCard = ({
  day,
  date,
  onRemove,
  unit,
}: ForecastCardProps) => {
  const {
    name,
    forecast: { night, morning, afternoon, evening },
  } = day;
  const dateString = new Date(date).toLocaleDateString();
  return (
    <div className="flex flex-col md:flex-row gap-4 p-3">
      <div className="md:w-1/5">
        <h2>{name}</h2>
        <span>{dateString}</span>
      </div>
      {night ? (
        <PeriodForecast periodName="Night" period={night} unit={unit} />
      ) : (
        <NoForecast />
      )}
      {morning ? (
        <PeriodForecast periodName="Morning" period={morning} unit={unit} />
      ) : (
        <NoForecast />
      )}
      {afternoon ? (
        <PeriodForecast periodName="Afternoon" period={afternoon} unit={unit} />
      ) : (
        <NoForecast />
      )}
      {evening ? (
        <PeriodForecast periodName="Evening" period={evening} unit={unit} />
      ) : (
        <NoForecast />
      )}
      <button
        onClick={() => onRemove(date)}
        title={`Remove ${name} on ${dateString}.`}
        className="absolute right-0 p-2 w-8 text-center text-gray-900 bg-transparent dark:text-white cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
      >
        {" "}
        &times;
      </button>
    </div>
  );
};

const NoForecast = () => <span className="w-1/5 hidden md:block"> </span>;

type PeriodForecastProps = {
  periodName: string;
  period: NextXHours;
  unit: Unit;
};
const PeriodForecast = ({
  periodName,
  period: { summary, details },
  unit,
}: PeriodForecastProps) => {
  const { air_temperature_max, air_temperature_min, precipitation_amount } =
    details;
  const maxTemp =
    unit === "F" ? cToF(air_temperature_max) : air_temperature_max;
  const minTemp =
    unit === "F" ? cToF(air_temperature_min) : air_temperature_min;
  return (
    <div className="md:w-1/5 flex flex-col items-center p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <span className="text-sm italic md:hidden">{periodName}</span>
      <Image
        src={`/icons/${summary.symbol_code}.svg`}
        alt=""
        width={48}
        height={48}
      />
      <div>
        <span className="text-lg" title="Highest temperature">
          &uarr;{round(maxTemp)}&deg;{unit}
        </span>{" "}
        <span className="text-lg" title="Lowest temperature">
          &darr;{round(minTemp)}&deg;{unit}
        </span>
      </div>
      <div>
        <span className="text-lg" title="precipitation amount">
          ☂️&nbsp;{precipitation_amount}&nbsp;mm
        </span>
      </div>
    </div>
  );
};

const round = (n?: number) => (typeof n === "undefined" ? "" : Math.round(n));

const cToF = (c?: number) =>
  typeof c === "undefined" ? undefined : (c * 9) / 5 + 32;
