import { Api } from "../api";
// import axios from "axios";

import {
  CarsReqI,
  CreateCarsReqI,
  UpdateCarsReqI,
  UpdateStatusCarsReqI,
  CarsResI,
  ListCarsResI,
  UploadImageCarsReqI,
} from "../../__interface/cars.interface";

import { PaginationI } from "../../__interface/tourpackage.interface";

export const CarsApi = Api.injectEndpoints({
  endpoints(build) {
    return {
      listCars: build.query<ListCarsResI, PaginationI>({
        query: (params) => {
          const page = Number(params.page);
          const limit = Number(params.limit);
          const search = params.search;
          return {
            url: `${process.env.REACT_APP_REST_HOST}/cars`,
            params: { page, limit, search },
          };
        },
      }),
      getCarsById: build.query<CarsResI, CarsReqI>({
        query: (params) => {
          const id = String(params.id);
          return {
            url: `${process.env.REACT_APP_REST_HOST}/cars/${id}`,
          };
        },
      }),
      createCars: build.mutation<CarsResI, CreateCarsReqI>({
        query: (data) => ({
          url: `${process.env.REACT_APP_REST_HOST}/cars`,
          method: "POST",
          body: data,
        }),
      }),
      updateCars: build.mutation<CarsResI, UpdateCarsReqI>({
        query: (data) => {
          const { id, ...body } = data;
          return {
            url: `${process.env.REACT_APP_REST_HOST}/cars/${id}`,
            method: "PUT",
            body: body,
          };
        },
      }),
      updateStatusCars: build.mutation<CarsResI, UpdateStatusCarsReqI>({
        query: (data) => {
          const { id, ...body } = data;
          return {
            url: `${process.env.REACT_APP_REST_HOST}/cars/status/${id}`,
            method: "PUT",
            body: body,
          };
        },
      }),
      uploadCarsImage: build.mutation<CarsResI, UploadImageCarsReqI>({
        query: (data) => {
          const { id, ...body } = data;
          return {
            url: `${process.env.REACT_APP_REST_HOST}/cars/upload-image/${id}`,
            method: "POST",
            body: body,
          };
        },
      }),
      deleteCars: build.mutation<CarsResI, CarsReqI>({
        query: (params) => {
          const id = String(params.id);
          return {
            url: `${process.env.REACT_APP_REST_HOST}/cars/${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
  overrideExisting: false,
});

export const {
  useListCarsQuery,
  useGetCarsByIdQuery,
  useCreateCarsMutation,
  useUpdateCarsMutation,
  useUpdateStatusCarsMutation,
  useUploadCarsImageMutation,
  useDeleteCarsMutation,
} = CarsApi;
