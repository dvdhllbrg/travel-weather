import { Feature, Place, SearchResult } from "./geocoding.types";

const LOCATION_URL_ =
  "https://photon.komoot.io/api?limit=10&osm_tag=place:city&osm_tag=place:suburb&osm_tag=place:town&osm_tag=place:village&osm_tag=place:hamlet&osm_tag=place:isolated_dwelling";
const LOCATION_URL = "https://photon.komoot.io/api?limit=10";
let controller: AbortController | null;

const searchPlaces = async (query: string) => {
  try {
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();
    const res = await fetch(`${LOCATION_URL}&q=${query}`, {
      signal: controller.signal,
    });
    const result = (await res.json()) as SearchResult;
    return result.features.map(placeReducer);
  } catch (err) {
    console.error(err);
  } finally {
    controller = null;
  }
};

const placeReducer = ({ geometry, properties }: Feature) => {
  const [lon, lat] = geometry.coordinates;
  return {
    id: crypto.randomUUID(),
    lat,
    lon,
    type: prettyName(properties.osm_value),
    name: [properties.name, properties.county, properties.country]
      .filter((o) => o)
      .join(", "),
  } as Place;
};

const prettyName = (name: string) =>
  name[0].toUpperCase() + name.substring(1).replaceAll("_", " ");

export { searchPlaces };
