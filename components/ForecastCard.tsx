import { NextXHours } from "@api/forecast.types";
import { Place } from "@api/geocoding.types";
import Image from "next/image";

export type ForecastDays = {
  [key: string]: ForecastDay;
};

type period = "night" | "morning" | "afternoon" | "evening";

export type ForecastDay = Place & {
  symbol_code?: string;
  forecast: {
    [key in period]: NextXHours | undefined;
  };
};

type ForecastCardProps = {
  day: ForecastDay;
  date: string;
  onRemove: (date: string) => void;
};
export const ForecastCard = ({ day, date, onRemove }: ForecastCardProps) => {
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
        <PeriodForecast periodName="Night" period={night} />
      ) : (
        <NoForecast />
      )}
      {morning ? (
        <PeriodForecast periodName="Morning" period={morning} />
      ) : (
        <NoForecast />
      )}
      {afternoon ? (
        <PeriodForecast periodName="Afternoon" period={afternoon} />
      ) : (
        <NoForecast />
      )}
      {evening ? (
        <PeriodForecast periodName="Evening" period={evening} />
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
};
const PeriodForecast = ({
  periodName,
  period: { summary, details },
}: PeriodForecastProps) => {
  const { air_temperature_max, air_temperature_min, precipitation_amount } =
    details;
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
          &uarr;{round(air_temperature_max)}&deg;C
        </span>{" "}
        <span className="text-lg" title="Lowest temperature">
          &darr;{round(air_temperature_min)}&deg;C
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

const round = (n?: number) =>
  typeof n !== "undefined" ? Math.round(n) : "boop";
