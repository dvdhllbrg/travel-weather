export interface Forecast {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  meta: Meta;
  timeseries: Series[];
}

export interface Meta {
  updated_at: string;
  units: Units;
}

export interface Units {
  air_pressure_at_sea_level: string;
  air_temperature: string;
  air_temperature_max: string;
  air_temperature_min: string;
  air_temperature_percentile_10: string;
  air_temperature_percentile_90: string;
  cloud_area_fraction: string;
  cloud_area_fraction_high: string;
  cloud_area_fraction_low: string;
  cloud_area_fraction_medium: string;
  dew_point_temperature: string;
  fog_area_fraction: string;
  precipitation_amount: string;
  precipitation_amount_max: string;
  precipitation_amount_min: string;
  probability_of_precipitation: string;
  probability_of_thunder: string;
  relative_humidity: string;
  ultraviolet_index_clear_sky: string;
  wind_from_direction: string;
  wind_speed: string;
  wind_speed_of_gust: string;
  wind_speed_percentile_10: string;
  wind_speed_percentile_90: string;
}

export interface Series {
  time: string;
  data: Data;
}

export interface Data {
  instant: Instant;
  next_12_hours?: NextXHours;
  next_1_hours?: NextXHours;
  next_6_hours?: NextXHours;
}

export interface Instant {
  details: ForecastTimeInstant;
}

/** @description Weather parameters valid for a specific point in time. */
export type ForecastTimeInstant = {
  /**
   * @description Air pressure at sea level
   * @example 1017.23
   */
  air_pressure_at_sea_level?: number;
  /**
   * @description Air temperature
   * @example 17.1
   */
  air_temperature?: number;
  /**
   * @description Amount of sky covered by clouds.
   * @example 95.2
   */
  cloud_area_fraction?: number;
  /**
   * @description Amount of sky covered by clouds at high elevation.
   * @example 95.2
   */
  cloud_area_fraction_high?: number;
  /**
   * @description Amount of sky covered by clouds at low elevation.
   * @example 95.2
   */
  cloud_area_fraction_low?: number;
  /**
   * @description Amount of sky covered by clouds at medium elevation.
   * @example 95.2
   */
  cloud_area_fraction_medium?: number;
  /**
   * @description Dew point temperature at sea level
   * @example 8.1
   */
  dew_point_temperature?: number;
  /**
   * @description Amount of area covered by fog.
   * @example 95.2
   */
  fog_area_fraction?: number;
  /**
   * @description Amount of humidity in the air.
   * @example 81.1
   */
  relative_humidity?: number;
  /**
   * @description The directon which moves towards
   * @example 121.3
   */
  wind_from_direction?: number;
  /**
   * @description Speed of wind
   * @example 5.9
   */
  wind_speed?: number;
  /**
   * @description Speed of wind gust
   * @example 15.9
   */
  wind_speed_of_gust?: number;
};

export type NextXHours = {
  summary: ForecastSummary;
  details: ForecastTimePeriod;
};

/** @description Summary of weather conditions. */
type ForecastSummary = {
  symbol_code: WeatherSymbol;
};
/** @description Weather parameters valid for a specified time period. */
export type ForecastTimePeriod = {
  /**
   * @description Maximum air temperature in period
   * @example 17.1
   */
  air_temperature_max?: number;
  /**
   * @description Minimum air temperature in period
   * @example 11.1
   */
  air_temperature_min?: number;
  /**
   * @description Best estimate for amount of precipitation for this period
   * @example 1.71
   */
  precipitation_amount?: number;
  /**
   * @description Maximum amount of precipitation for this period
   * @example 4.32
   */
  precipitation_amount_max?: number;
  /**
   * @description Minimum amount of precipitation for this period
   * @example 4.32
   */
  precipitation_amount_min?: number;
  /**
   * @description Probability of any precipitation coming for this period
   * @example 37
   */
  probability_of_precipitation?: number;
  /**
   * @description Probability of any thunder coming for this period
   * @example 54.32
   */
  probability_of_thunder?: number;
  /**
   * @description Maximum ultraviolet index if sky is clear
   * @example 1
   */
  ultraviolet_index_clear_sky_max?: number;
};

/**
 * @description A identifier that sums up the weather condition for this time period. May be used with https://api.met.no/weatherapi/weathericon/2.0/.
 * @example clearsky_day
 * @enum {undefined}
 */
export type WeatherSymbol =
  | "clearsky_day"
  | "clearsky_night"
  | "clearsky_polartwilight"
  | "fair_day"
  | "fair_night"
  | "fair_polartwilight"
  | "lightssnowshowersandthunder_day"
  | "lightssnowshowersandthunder_night"
  | "lightssnowshowersandthunder_polartwilight"
  | "lightsnowshowers_day"
  | "lightsnowshowers_night"
  | "lightsnowshowers_polartwilight"
  | "heavyrainandthunder"
  | "heavysnowandthunder"
  | "rainandthunder"
  | "heavysleetshowersandthunder_day"
  | "heavysleetshowersandthunder_night"
  | "heavysleetshowersandthunder_polartwilight"
  | "heavysnow"
  | "heavyrainshowers_day"
  | "heavyrainshowers_night"
  | "heavyrainshowers_polartwilight"
  | "lightsleet"
  | "heavyrain"
  | "lightrainshowers_day"
  | "lightrainshowers_night"
  | "lightrainshowers_polartwilight"
  | "heavysleetshowers_day"
  | "heavysleetshowers_night"
  | "heavysleetshowers_polartwilight"
  | "lightsleetshowers_day"
  | "lightsleetshowers_night"
  | "lightsleetshowers_polartwilight"
  | "snow"
  | "heavyrainshowersandthunder_day"
  | "heavyrainshowersandthunder_night"
  | "heavyrainshowersandthunder_polartwilight"
  | "snowshowers_day"
  | "snowshowers_night"
  | "snowshowers_polartwilight"
  | "fog"
  | "snowshowersandthunder_day"
  | "snowshowersandthunder_night"
  | "snowshowersandthunder_polartwilight"
  | "lightsnowandthunder"
  | "heavysleetandthunder"
  | "lightrain"
  | "rainshowersandthunder_day"
  | "rainshowersandthunder_night"
  | "rainshowersandthunder_polartwilight"
  | "rain"
  | "lightsnow"
  | "lightrainshowersandthunder_day"
  | "lightrainshowersandthunder_night"
  | "lightrainshowersandthunder_polartwilight"
  | "heavysleet"
  | "sleetandthunder"
  | "lightrainandthunder"
  | "sleet"
  | "lightssleetshowersandthunder_day"
  | "lightssleetshowersandthunder_night"
  | "lightssleetshowersandthunder_polartwilight"
  | "lightsleetandthunder"
  | "partlycloudy_day"
  | "partlycloudy_night"
  | "partlycloudy_polartwilight"
  | "sleetshowersandthunder_day"
  | "sleetshowersandthunder_night"
  | "sleetshowersandthunder_polartwilight"
  | "rainshowers_day"
  | "rainshowers_night"
  | "rainshowers_polartwilight"
  | "snowandthunder"
  | "sleetshowers_day"
  | "sleetshowers_night"
  | "sleetshowers_polartwilight"
  | "cloudy"
  | "heavysnowshowersandthunder_day"
  | "heavysnowshowersandthunder_night"
  | "heavysnowshowersandthunder_polartwilight"
  | "heavysnowshowers_day"
  | "heavysnowshowers_night"
  | "heavysnowshowers_polartwilight";
