export interface TourPackage {
  id: string;
  package_name: string;
  description: string;
  images: string[];
  package_price: number;
  duration: number;
  max_group_size: number;
  children_price: number;
  itineraries: string[];
  includes: string[];
  pickup_areas: string[];
  terms_conditions: string[];
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface Params {
  search: string;
  limit: number;
  page: number;
}
