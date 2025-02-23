export interface ListDriversReqI {
  search: string;
  limit: number;
  page: number;
}

export interface ListDriversResI {
  data: Drivers[];
  meta: Meta;
}

export interface Drivers {
  id: string;
  name: string;
  photo_profile: string;
  created_at: string;
  updated_at: string;
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

export interface DriversReqI {
  id: string;
}

export interface DriversResI {
  data: Drivers;
  message: string;
}

export interface CreateDriversReqI {
  name: string;
  photo_profile?: File;
  access_token: string;
}

export interface BodyDriversReqI {
  name: string;
}

export interface UpdateDriversReqI extends DriversReqI, CreateDriversReqI {}
