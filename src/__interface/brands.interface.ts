export interface Brand {
  id: string;
  brand_name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
export interface BrandsReqI {
  data: Brand[];
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
