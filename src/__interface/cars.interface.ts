import { Brand } from "./brands.interface";

export interface Cars {
  id: string;
  car_name: string;
  car_image: string;
  description: string;
  min_person: number;
  max_person: number;
  price: number;
  includes: string[];
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  brand: Brand;
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
  id: string;
}

export interface CreateCarsReqI {
  car_name: string;
  brand_id: string;
  description: string;
  min_person: number;
  max_person: number;
  price: number;
  includes: string[];
}

export interface UpdateCarsReqI extends CarsReqI, CreateCarsReqI {}

export interface CarsResI {
  data: Cars;
  message: string;
}

export interface UpdateStatusCarsReqI {
  id: string;
  status: boolean;
}

export interface UploadImageCarsReqI {
  id: string;
  image: File;
  access_token: string;
}
