export interface TravelPackage {
  id: number
  package_name: string
  description?: string
  images?: string[]
  package_price: number
  duration: number
  max_persons: number
  itineraries: string[]
  includes: string[]
  created_at: string
  updated_at: string
  deleted_at: string
}

export interface ListTravelPackageReqI {
  search: string;
  limit: number;
  page: number;
  status: boolean;
}

export interface TravelPackageReqI {
  id: number;
}

export interface TravelPackageResI {
  data: TravelPackage;
  message: string;
}

export interface UploadTravelPackageReqI {
  id: number;
  access_token: string;
  images: File[];
}

export interface PaginationI {
  limit: number;
  page: number;
  search: string;
}


export interface ListTravelPackageResI {
  data: TravelPackage[];
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

export interface CreateTravelPackageReqI {
  package_name: string
  description: string
  package_price: number
  duration: number
  max_persons: number
  itineraries: string[]
  includes: string[]
}

export interface UpdateTravelPackageReqI
  extends CreateTravelPackageReqI,
    TravelPackageReqI {}

export interface CreateTravelPackageResI {
  data: TravelPackage;
  message: string;
}

export interface DeleteImageReqI {
  id: number;
  imagePath: string;
}
