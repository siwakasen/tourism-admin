import { Api } from "./api";
import axios from "axios";

import {
  CarsReqI,
  CreateCarsReqI,
  UpdateCarsReqI,
  CarsResI,
  ListCarsResI,
  UploadImageCarsReqI,
} from "../../__interface/cars.interface";
import toast from "react-hot-toast";

import { PaginationI } from "../../__interface/travel_package.interface";
import { VITE_APP_RENT_CAR } from "../../_constants/constant";

export const CarsApi = Api.injectEndpoints({
  endpoints(build) {
    return {
      listCars: build.query<ListCarsResI, PaginationI>({
        keepUnusedDataFor: 0,
        query: (params) => {
          const page = Number(params.page);
          const limit = Number(params.limit);
          const search = params.search;
          return {
            url: `/cars`,
            params: { page, limit, search },
          };
        },
      }),
      getCarsById: build.query<CarsResI, CarsReqI>({
        query: (params) => {
          const id = String(params.id);
          return {
            url: `/cars/${id}`,
          };
        },
      }),
      createCars: build.mutation<CarsResI, CreateCarsReqI>({
        query: (data) => ({
          url: `/cars`,
          method: "POST",
          body: data,
        }),
      }),
      updateCars: build.mutation<CarsResI, UpdateCarsReqI>({
        query: (data) => {
          const { id, ...body } = data;
          return {
            url: `/cars/${id}`,
            method: "PUT",
            body: body,
          };
        },
      }),
      
      deleteCars: build.mutation<CarsResI, CarsReqI>({
        query: (params) => {
          const id = String(params.id);
          return {
            url: `/cars/${id}`,
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
  useDeleteCarsMutation,
} = CarsApi;

export const uploadCarsImage = async (data: UploadImageCarsReqI) => {
  try {
    const id = data.id;
    const formData = new FormData();

    formData.append("image", data.image);

    const res = await axios.post(
      `${VITE_APP_RENT_CAR}/cars/upload-image/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );

    return res.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error("Failed to upload image, reason: " + error);
  }
};
