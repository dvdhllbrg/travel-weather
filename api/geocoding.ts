import { SearchResult } from "./geocoding.types";

const LOCATION_URL =
  "https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1";

const searchCity = async (city: string) => {
  try {
    const res = await fetch(`${LOCATION_URL}&city=${city}`);
    return (await res.json()) as SearchResult[];
  } catch (err) {
    console.error(err);
  }
};

export { searchCity };
