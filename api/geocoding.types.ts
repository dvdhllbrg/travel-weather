export interface SearchResult {
  features: Feature[];
  type: string;
}

export interface Feature {
  geometry: Geometry;
  type: string;
  properties: Properties;
}

export interface Geometry {
  coordinates: number[];
  type: string;
}

export interface Properties {
  osm_id: number;
  extent?: number[];
  country?: string;
  city?: string;
  countrycode?: string;
  postcode?: string;
  county?: string;
  type: string;
  osm_type: string;
  osm_key: string;
  osm_value: string;
  name: string;
  state?: string;
  locality?: string;
  street?: string;
  housenumber?: string;
}

export type Place = {
  id: string;
  lat: number;
  lon: number;
  type: string;
  name: string;
};
