import { ForecastTimePeriod, NextXHours } from "@api/forecast.types";
import Image from "next/image";

export type ForecastDays = {
  [key: string]: ForecastDay;
};

type period = "night" | "morning" | "afternoon" | "evening";

export type ForecastDay = {
  city?: string;
  country: string;
  symbol_code?: string;
  forecast: {
    [key in period]: NextXHours | undefined;
  };
};

type ForecastCardProps = {
  day: ForecastDay;
  date: string;
};
export const ForecastCard = ({ day, date }: ForecastCardProps) => {
  console.log({ day });
  const {
    city,
    country,
    forecast: { night, morning, afternoon, evening },
  } = day;
  const dateString = new Date(date).toLocaleDateString();
  return (
    <div className="flex gap-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg items-center">
      <div className="w-1/5">
        <h2>
          {city}, {country}
        </h2>
        <span>{dateString}</span>
      </div>
      {night ? <PeriodForecast period={night} /> : <NoForecast />}
      {morning ? <PeriodForecast period={morning} /> : <NoForecast />}
      {afternoon ? <PeriodForecast period={afternoon} /> : <NoForecast />}
      {evening ? <PeriodForecast period={evening} /> : <NoForecast />}
    </div>
  );
};

const NoForecast = () => <span className="w-1/5"> </span>;

type PeriodForecastProps = {
  period: NextXHours;
};
const PeriodForecast = ({
  period: { summary, details },
}: PeriodForecastProps) => {
  const { air_temperature_max, air_temperature_min, precipitation_amount } =
    details;
  return (
    <div className="w-1/5 flex flex-col items-center">
      <Image
        src={`/icons/${summary.symbol_code}.svg`}
        alt=""
        width={48}
        height={48}
      />
      <div>
        <span className="text-lg" title="Highest temperature">
          &uarr;{round(air_temperature_max)}&deg;C
        </span>
        <span className="text-lg" title="Lowest temperature">
          {" "}
          &darr;{round(air_temperature_min)}&deg;C
        </span>
      </div>
      <div>
        <span className="text-lg" title="precipitation amount">
          ☂️ {precipitation_amount} mm
        </span>
      </div>
    </div>
  );
};

const round = (n?: number) => (n ? Math.round(n) : "-");
