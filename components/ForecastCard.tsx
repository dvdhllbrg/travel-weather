import { Details } from "@api/forecast.types";
import Image from "next/image";

export type ForecastDay = Details & {
  city?: string;
  country: string;
  symbol_code?: string;
};

type ForecastCardProps = {
  day: ForecastDay;
  date: string;
};
export const ForecastCard = ({ day, date }: ForecastCardProps) => {
  const { city, country, symbol_code, air_temperature, wind_speed } = day;
  const dateString = new Date(date).toLocaleDateString();
  return (
    <div className="flex">
      <div>
        <h2 className="font-semibold text-lg">
          {city}, {country}
        </h2>
        <span>{dateString}</span>
      </div>
      <div className="flex flex-col">
        {symbol_code && (
          <Image
            src={`/icons/${symbol_code}.svg`}
            alt=""
            width={48}
            height={48}
          />
        )}
        <span>
          {air_temperature}&deg;C &middot; {wind_speed} m/s
        </span>
      </div>
    </div>
  );
};
