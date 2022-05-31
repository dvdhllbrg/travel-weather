export interface Address {
  city?: string;
  municipality?: string;
  county?: string;
  "ISO3166-2-lvl4"?: string;
  postcode?: string;
  country: string;
  country_code: string;
  tourism?: string;
  house_number?: string;
  road?: string;
  suburb?: string;
  city_district?: string;
  hamlet?: string;
  place?: string;
  town?: string;
  isolated_dwelling?: string;
  quarter?: string;
  state?: string;
  neighbourhood?: string;
  office?: string;
  railway?: string;
  amenity?: string;
  building?: string;
  village?: string;
}

export interface SearchResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  place_rank: number;
  category: string;
  type: string;
  importance: number;
  icon?: string;
  address: Address;
}
