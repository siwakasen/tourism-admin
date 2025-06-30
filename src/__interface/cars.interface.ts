

export interface Cars {
  id: number
  car_name: string
  car_image?: string
  car_color: string
  police_number: string
  transmission: string
  description: string
  max_persons: number
  price_per_day: number
  includes: string[]
  created_at: string
  updated_at: string
  deleted_at: string;
}

export interface Meta {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ListCarsResI {
  data: Cars[];
  meta: Meta;
}

export interface CarsReqI {
  id: number;
}

export interface CreateCarsReqI {
  car_name: string
  car_color: string
  police_number: string
  transmission: string
  description: string
  max_persons: number
  price_per_day: number
  includes: string[]
}

export interface UpdateCarsReqI extends CarsReqI, CreateCarsReqI {}

export interface CarsResI {
  data: Cars;
  message: string;
}


export interface UploadImageCarsReqI {
  id: number;
  image: File;
  access_token: string;
}
