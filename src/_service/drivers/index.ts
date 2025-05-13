import { Api } from "../api";
import axios from "axios";

import {
  DriversReqI,
  DriversResI,
  ListDriversReqI,
  ListDriversResI,
  CreateDriversReqI,
  UpdateDriversReqI,
} from "../../__interface/drivers.interface";
import { toast } from "react-toastify";

export const DriversApi = Api.injectEndpoints({
  endpoints(build) {
    return {
      listDriverss: build.query<ListDriversResI, ListDriversReqI>({
        keepUnusedDataFor: 0,
        query: (params) => {
          const page = Number(params.page);
          const limit = Number(params.limit);
          const search = params.search;
          return {
            url: `${VITE_APP_REST_DRIVERS}/drivers`,
            params: { page, limit, search },
          };
        },
      }),
      getDriversById: build.query<DriversResI, DriversReqI>({
        query: (params) => {
          const id = String(params.id);
          return {
            url: `${VITE_APP_REST_DRIVERS}/drivers/${id}`,
          };
        },
      }),
      deleteDrivers: build.mutation<DriversResI, DriversReqI>({
        query: (data) => {
          const id = String(data.id);
          return {
            url: `${VITE_APP_REST_DRIVERS}/drivers/${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
  overrideExisting: false,
});

export const {
  useListDriverssQuery,
  useGetDriversByIdQuery,
  useDeleteDriversMutation,
} = DriversApi;

export const CreateDrivers = async (data: CreateDriversReqI) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.photo_profile) {
      formData.append("photo_profile", data.photo_profile);
    }

    const res = await axios.post(`${VITE_APP_REST_DRIVERS}/drivers`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    return res.data;
  } catch (error) {
    toast.error("Failed to create driver, reason : " + error);
    console.log(error);
  }
};

export const UpdateDrivers = async (data: UpdateDriversReqI) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.photo_profile)
      formData.append("photo_profile", data.photo_profile);

    const res = await axios.post(
      `${VITE_APP_REST_DRIVERS}/drivers/${data.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    toast.error("Failed to update driver, reason : " + error);
    console.log(error);
  }
};
