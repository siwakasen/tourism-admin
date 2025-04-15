import {
  CreateTourPackageReqI,
  CreateTourPackageResI,
  DeleteImageReqI,
  ListTourPackageResI,
  PaginationI,
  TourPackageReqI,
  TourPackageResI,
  UpdateStatusTourPackageReqI,
  UpdateTourPackageReqI,
  UploadTourPackageReqI,
} from "../../__interface/tourpackage.interface";

import { Api } from "../api";
import axios from "axios";

export const TourPackageApi = Api.injectEndpoints({
  endpoints: (build) => ({
    listTourPackage: build.query<ListTourPackageResI, PaginationI>({
      keepUnusedDataFor: 0,
      query: (params) => {
        const page = Number(params.page);
        const limit = Number(params.limit);
        const search = params.search;
        return {
          url: `/tour-package`,
          params: { page, limit, search },
        };
      },
    }),
    getTourPackageById: build.query<TourPackageResI, TourPackageReqI>({
      query: (params) => {
        const id = String(params.id);
        return {
          url: `/tour-package/${id}`,
        };
      },
    }),
    createTourPackage: build.mutation<
      CreateTourPackageResI,
      CreateTourPackageReqI
    >({
      query: (data) => ({
        url: `/tour-package`,
        method: "POST",
        body: data,
      }),
    }),
    updateTourPackage: build.mutation<TourPackageResI, UpdateTourPackageReqI>({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/tour-package/${id}`,
          method: "PUT",
          body: body,
        };
      },
    }),
    deleteImageTourPackage: build.mutation<TourPackageResI, DeleteImageReqI>({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/tour-package/delete-images/${id}`,
          method: "DELETE",
          body: body,
        };
      },
    }),
    updateStatusTourPackage: build.mutation<
      TourPackageResI,
      UpdateStatusTourPackageReqI
    >({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/tour-package/status/${id}`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    deleteTourPackage: build.mutation<TourPackageResI, TourPackageReqI>({
      query: (data) => {
        const id = String(data.id);
        return {
          url: `/tour-package/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useListTourPackageQuery,
  useCreateTourPackageMutation,
  useGetTourPackageByIdQuery,
  useUpdateTourPackageMutation,
  useDeleteImageTourPackageMutation,
  useUpdateStatusTourPackageMutation,
  useDeleteTourPackageMutation,
} = TourPackageApi;

export const uploadImagesTourPackage = async (data: UploadTourPackageReqI) => {
  try {
    const id = String(data.id);
    const formData = new FormData();
    const accessToken = String(data.access_token);

    // Append each image to the FormData
    data.images.forEach((image) => {
      formData.append("images", image); // 'images' must match your backend field
    });

    // Make the Axios POST request
    const response = await axios.post(
      `${import.meta.env.VITE_APP_REST_HOST}/tour-package/upload-images/${id}`,
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
