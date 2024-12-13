import {
  ListTourPackageResI,
  PaginationI,
} from "../../__interface/tourpackage.interface";

import { Api } from "../api";

export const TourPackageApi = Api.injectEndpoints({
  endpoints: (build) => ({
    listTourPackage: build.query<ListTourPackageResI, PaginationI>({
      keepUnusedDataFor: 0,
      query: (params) => {
        const page = Number(params.page);
        const limit = Number(params.limit);
        const search = params.search;
        return {
          url: `http://localhost:3001/tour-package`,
          params: { page, limit, search },
        };
      },
    }),
    createTourPackage: build.mutation<{ success: boolean }, PaginationI>({
      query(body) {
        return {
          url: `http://localhost:3002/school/staff`,
          method: "POST",
          body,
        };
      },
    }),
  }),

  overrideExisting: false,
});

export const { useListTourPackageQuery, useCreateTourPackageMutation } =
  TourPackageApi;
