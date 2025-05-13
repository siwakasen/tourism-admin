import { Api } from "../api";
// import axios from "axios";

import { BrandsReqI } from "../../__interface/brands.interface";

import { PaginationI } from "../../__interface/tourpackage.interface";

export const BrandsApi = Api.injectEndpoints({
  endpoints(build) {
    return {
      listBrands: build.query<BrandsReqI, PaginationI>({
        query: (params) => {
          const page = Number(params.page);
          const limit = Number(params.limit);
          const search = params.search;
          return {
            url: `${VITE_APP_REST_HOST}/brands`,
            params: { page, limit, search },
          };
        },
      }),
    };
  },
  overrideExisting: false,
});

export const { useListBrandsQuery } = BrandsApi;
