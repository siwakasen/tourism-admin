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

export interface ListTourPackageReqI {
  search: string;
  limit: number;
  page: number;
  status: boolean;
}

export interface TourPackageReqI {
  id: string;
}

export interface TourPackageResI {
  data: TourPackage;
  message: string;
}

export interface UploadTourPackageReqI {
  id: string;
  access_token: string;
  images: File[];
}

export interface PaginationI {
  limit: number;
  page: number;
  search: string;
}

export interface UpdateStatusTourPackageReqI {
  id: string;
  status: boolean;
}

export interface ListTourPackageResI {
  data: TourPackage[];
  meta: Meta;
}

export interface Meta {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CreateTourPackageReqI {
  package_name: string;
  description: string;
  package_price: number;
  duration: number;
  max_group_size: number;
  children_price: number;
  itineraries: string[];
  includes: string[];
  pickup_areas: string[];
  terms_conditions: string[];
}

export interface UpdateTourPackageReqI
  extends CreateTourPackageReqI,
    TourPackageReqI {}

export interface CreateTourPackageResI {
  data: TourPackage;
  message: string;
}

export interface DeleteImageReqI {
  id: string;
  imagePath: string;
}
