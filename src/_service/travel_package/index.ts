import {
  CreateTravelPackageReqI,
  CreateTravelPackageResI,
  DeleteImageReqI,
  ListTravelPackageResI,
  PaginationI,
  TravelPackageReqI,
  TravelPackageResI,
  UpdateTravelPackageReqI,
  UploadTravelPackageReqI,
} from "../../__interface/travel_package.interface";
import { VITE_APP_TRAVEL_PACKAGE } from "../../_constants/constant";

import { Api } from "./api";
import axios from "axios";

export const TravelPackageApi = Api.injectEndpoints({
  endpoints: (build) => ({
    listTravelPackage: build.query<ListTravelPackageResI, PaginationI>({
      keepUnusedDataFor: 0,
      query: (params) => {
        const page = Number(params.page);
        const limit = Number(params.limit);
        const search = params.search;
        return {
          url: `/travel-packages`,
          params: { page, limit, search },
        };
      },
    }),
    getTravelPackageById: build.query<TravelPackageResI, TravelPackageReqI>({
      query: (params) => {
        const id = String(params.id);
        return {
          url: `/travel-packages/${id}`,
        };
      },
    }),
    createTravelPackage: build.mutation<
      CreateTravelPackageResI,
      CreateTravelPackageReqI
    >({
      query: (data) => ({
        url: `/travel-packages`,
        method: "POST",
        body: data,
      }),
    }),
    updateTravelPackage: build.mutation<TravelPackageResI, UpdateTravelPackageReqI>({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/travel-packages/${id}`,
          method: "PUT",
          body: body,
        };
      },
    }),
    deleteImageTravelPackage: build.mutation<TravelPackageResI, DeleteImageReqI>({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/travel-packages/delete-images/${id}`,
          method: "DELETE",
          body: body,
        };
      },
    }),
    deleteTravelPackage: build.mutation<TravelPackageResI, TravelPackageReqI>({
      query: (data) => {
        const id = String(data.id);
        return {
          url: `/travel-packages/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useListTravelPackageQuery,
  useCreateTravelPackageMutation,
  useGetTravelPackageByIdQuery,
  useUpdateTravelPackageMutation,
  useDeleteImageTravelPackageMutation,
  useDeleteTravelPackageMutation,
} = TravelPackageApi;

export const uploadImagesTravelPackage = async (data: UploadTravelPackageReqI) => {
  try {
    const id = String(data.id);
    const formData = new FormData();
    const accessToken = String(data.access_token);
    console.log(accessToken);

    // Append each image to the FormData
    data.images.forEach((image) => {
      formData.append("images", image); // 'images' must match your backend field
    });

    // Make the Axios POST request
    const response = await axios.post(
      `${VITE_APP_TRAVEL_PACKAGE}/travel-packages/upload-images/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error; // Re-throw the error to handle it elsewhere
  }
};
