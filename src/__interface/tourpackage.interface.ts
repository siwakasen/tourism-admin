export interface TourPackage {
  id: string;
  package_name: string;
  description: string;
  images: string;
  package_price: number;
  duration: number;
  max_group_size: number;
  children_price: number;
  itineraries: Itinerary[];
  includes: string[];
  pickup_areas: string[];
  terms_conditions: string[];
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface ListTourPackageReqI {
  search: string;
  limit: number;
  page: number;
  status: boolean;
}

export interface ListTourPackageResI {
  data: TourPackage[];
  meta: Meta;
}

export interface PaginationI {
  search: string;
  limit: number;
  page: number;
}

export interface Itinerary {
  day: number;
  activity: string;
}

export interface Meta {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
